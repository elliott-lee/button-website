# Button, Inc.

A responsive studio website with a full-screen illustration of custom software and a scroll-driven, four-layer story. Built with Vite and vanilla JavaScript. The supplied PDF logo is included as vector artwork; fonts are bundled locally.

## Development

Use Node.js 24, pinned in `.nvmrc` and `netlify.toml`.

```sh
npm ci
npm run dev -- --port 3000
```

```sh
npm run build
npm run preview
```

For a self-contained preview that can be opened directly in a browser without a server:

```sh
npm run build:preview
```

Open `dist/button-preview.html`. Its code, styles, fonts, and logo are all embedded. The standard production build also uses relative asset paths for hosting under a URL prefix.

The four layers support scrolling, clicking, keyboard navigation, and reduced motion. The illustrative custom workspace includes customer search, an active-status filter, sample customer creation, and alternative dashboard views. Demo changes are kept in memory only.

The full-viewport canvas reserves space for navigation and captions on desktop and mobile. Depth effects follow native scroll with small, bounded translations and scaling; code rain also follows scroll rather than looping independently. Reduced motion disables these effects. Resizing preserves your place in the story.

The project inquiry creates a downloadable or copyable brief locally. It does **not** send inquiries or persist personal data. Connect an approved form endpoint or provide the business's contact address before using it for lead delivery.

Brand sources: the provided `button logo_swatches.pdf`. The SVG assets preserve the original logo artwork; the page uses its printed RGB palette, with yellow accents from the secondary swatches.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete Netlify setup, build settings, domain configuration, and launch checks. The included `netlify.toml` configures the production build automatically.
