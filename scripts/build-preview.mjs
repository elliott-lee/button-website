import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';

const output = resolve('dist');
const mimeTypes = {
  '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.svg': 'image/svg+xml', '.png': 'image/png',
};
const assetPath = (url, from = output) => resolve(url.startsWith('/') ? output : from, url.replace(/^\//, ''));
async function dataUrl(file) {
  const bytes = await readFile(file);
  return `data:${mimeTypes[extname(file)] || 'application/octet-stream'};base64,${bytes.toString('base64')}`;
}
async function replaceAsync(text, expression, replacer) {
  const matches = [...text.matchAll(expression)];
  const values = await Promise.all(matches.map(match => replacer(...match)));
  let index = 0;
  return text.replace(expression, () => values[index++]);
}

let html = await readFile(resolve(output, 'index.html'), 'utf8');
const scripts = [];
html = await replaceAsync(html, /<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g, async (_, src) => {
  scripts.push(await readFile(assetPath(src), 'utf8'));
  return '';
});
html = await replaceAsync(html, /<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, async (_, href) => {
  const file = assetPath(href);
  const css = await replaceAsync(await readFile(file, 'utf8'), /url\((['"]?)([^)'"\s]+)\1\)/g, async (match, quote, url) => {
    if (/^(data:|https?:)/.test(url)) return match;
    return `url("${await dataUrl(assetPath(url, dirname(file)))}")`;
  });
  return `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`;
});
html = await replaceAsync(html, /(src|href)="((?:\.\/|\/)?button-(?:logo|mark)\.svg)"/g, async (_, attr, url) => `${attr}="${await dataUrl(assetPath(url))}"`);
html = html.replace('</body>', `<script>(()=>{${scripts.join('\n').replace(/<\/script/gi, '<\\/script')}\n})();</script></body>`);
await writeFile(resolve(output, 'button-preview.html'), html);
console.log(`Created dist/button-preview.html — ${Math.round(Buffer.byteLength(html) / 1024)} KB, fully self-contained.`);
