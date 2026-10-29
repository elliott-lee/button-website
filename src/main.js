import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/instrument-serif/400-italic.css';
import './style.css';
import './experience.css';
import './positioning.css';

const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a4 4 0 0 1 0 8m3 9v-3a6 6 0 0 0-2-4"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  chart: '<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',
  link: '<path d="m9 15 6-6M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 0)"/>',
  settings: '<path d="m9 3-.6 3-2 .9-2.8-1-2 3.4L4 11v2l-2.4 1.7 2 3.4 2.8-1 2 .9.6 3h4l.6-3 2-.9 2.8 1 2-3.4L18 13v-2l2.4-1.7-2-3.4-2.8 1-2-.9-.6-3Z"/><circle cx="11" cy="12" r="3"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  bell: '<path d="M5 16h14l-2-3V8a5 5 0 0 0-10 0v5Zm5 4h4"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  shield: '<path d="M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7Zm0 10L3 7m9 5 9-5m-9 5v10M7 4l10 6"/>',
  filter: '<path d="M3 6h18M6 12h12m-8 6h4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.grid}</svg>`;

// Draw decorative glyphs as vectors so every platform gets the same artwork.
function replaceDecorativeGlyphs(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (/[↗↘↙↴✳]/.test(node.textContent) && !node.parentElement.closest('script,style,code,textarea,svg,.matrix-rain')) nodes.push(node);
  }
  nodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/([↗↘↙↴✳])/).forEach(part => {
      if (!/^[↗↘↙↴✳]$/.test(part)) { fragment.append(document.createTextNode(part)); return; }
      const template = document.createElement('template');
      const star = part === '✳';
      template.innerHTML = `<svg class="decorative-glyph ${star ? 'asterisk-glyph' : 'arrow-glyph'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" style="${!star ? `transform:rotate(${({'↗':0,'↘':90,'↙':180,'↴':90})[part]}deg)` : ''}">${star ? '<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/>' : '<path d="M5 19 19 5M5 5h14v14"/>'}</svg>`;
      fragment.append(template.content);
    });
    node.replaceWith(fragment);
  });
}

const customers = [
  { name: 'Layers', initials: 'La', color: 'purple', person: 'Olivia Rhye', email: 'olivia@layers.design', stage: 'Active', amount: '$12,500', source: 'Notion', initial: 'N' },
  { name: 'Quotient', initials: 'Q', color: 'pink', person: 'Phoenix Baker', email: 'phoenix@quotient.co', stage: 'Active', amount: '$8,200', source: 'HubSpot', initial: '☷' },
  { name: 'Circooles', initials: '◉', color: 'blue', person: 'Lana Steiner', email: 'lana@circooles.io', stage: 'Onboarding', amount: '$15,750', source: 'Sheets', initial: '▤' },
  { name: 'Sisyphus', initials: 'S', color: 'orange', person: 'Demi Wilkinson', email: 'demi@sisyphus.com', stage: 'Active', amount: '$6,400', source: 'Stripe', initial: 's' },
  { name: 'Catalog', initials: 'C', color: 'green', person: 'Drew Cano', email: 'drew@catalog.studio', stage: 'In review', amount: '$9,800', source: 'Notion', initial: 'N' },
];
let selectedView = 'Overview';
let dashboardFilter = '';
let activeOnly = false;

function dashboardRows() {
  return customers.filter(c => `${c.name} ${c.person} ${c.stage}`.toLowerCase().includes(dashboardFilter.toLowerCase()) && (!activeOnly || c.stage === 'Active')).map(c => `<tr><td><span class="table-checkbox"></span></td><td><div class="company-cell"><span class="company-avatar ${c.color}">${c.initials}</span><b>${c.name}</b></div></td><td><div class="person-cell"><span>${c.person}</span><small>${c.email}</small></div></td><td><span class="status-pill ${c.stage.toLowerCase().replace(' ', '-')}"><i></i>${c.stage}</span></td><td class="table-amount">${c.amount}</td><td><span class="source-logo ${c.source.toLowerCase()}">${c.initial}</span>${c.source}</td><td class="row-more">···</td></tr>`).join('') || '<tr><td colspan="7" class="empty-state">No customers found. Try another search.</td></tr>';
}

document.querySelector('.product-scene').innerHTML = `
  <aside class="app-sidebar">
    <div class="app-brand"><span class="workspace-symbol">${icon('grid')}</span><div><b>Your workspace</b><small>EXAMPLE CUSTOM BUILD</small></div></div>
    <button class="app-search" data-search>${icon('search')}<span>Quick search</span><kbd>⌘ K</kbd></button>
    <div class="app-nav">${[['home','Overview'],['people','Customers'],['layers','Projects'],['chart','Reports']].map(([i,n]) => `<button class="${n === 'Overview' ? 'selected' : ''}" data-view="${n}">${icon(i)}<span>${n}</span>${n === 'Customers' ? '<small>48</small>' : ''}</button>`).join('')}</div>
    <div class="sidebar-label">YOUR WORKSPACE <span>+</span></div><div class="workspace-item"><i class="workspace-dot violet"></i> Sales pipeline</div><div class="workspace-item"><i class="workspace-dot mint"></i> Customer success</div><div class="workspace-item"><i class="workspace-dot peach"></i> Operations</div>
    <div class="sidebar-connections"><span class="sidebar-label">CONNECTED SOURCES</span><div class="connected-source"><span class="source-logo notion">N</span> Notion <i></i></div><div class="connected-source"><span class="source-logo sheets">▤</span> Google Sheets <i></i></div><div class="connected-source"><span class="source-logo stripe">s</span> Stripe <i></i></div><div class="connected-source"><span class="source-logo hubspot">☷</span> HubSpot <i></i></div></div>
    <div class="sidebar-footer"><span class="user-avatar">JD</span><span><b>Jamie Davis</b><small>Example team</small></span><span>⌄</span></div>
  </aside>
  <div class="app-main"><div class="app-topbar"><div>${icon('grid')}<span>Illustrative workspace</span><span>/</span><b id="app-breadcrumb">Overview</b></div><div><span class="sync-status"><i></i> All changes synced</span><span class="topbar-divider"></span>${icon('bell')}<span class="mini-avatar">JD</span></div></div>
    <div class="app-content"><div class="app-welcome"><div><span class="app-eyebrow">AN EXAMPLE OF WHAT WE CAN BUILD FOR YOU</span><h3 id="app-title">Your operations, connected. <span>✳</span></h3><p>A custom view of the people, processes, and data that matter to your team.</p></div><span class="date-range">${icon('grid')} This month <span>⌄</span></span></div>
      <div class="metrics"><div class="metric"><span>Total revenue ${icon('chart')}</span><strong>$52,650<span class="mini-trend">↗</span></strong><div><span class="metric-change">↗ 18.6%</span><small>vs. last month</small></div><div class="sparkline"><i style="--h:20%"></i><i style="--h:35%"></i><i style="--h:29%"></i><i style="--h:45%"></i><i style="--h:38%"></i><i style="--h:56%"></i><i style="--h:49%"></i><i style="--h:70%"></i><i style="--h:60%"></i><i style="--h:85%"></i><i style="--h:78%"></i><i style="--h:100%"></i></div></div>
      <div class="metric"><span>Active customers ${icon('people')}</span><strong>48 <small class="metric-badge">+6 this month</small></strong><div><span class="metric-change">↗ 14.2%</span><small>vs. last month</small></div><div class="avatar-stack"><i class="purple">OR</i><i class="orange">PB</i><i class="blue">LS</i><i class="pink">DW</i><i>+44</i></div></div>
      <div class="metric time-metric"><span>Time given back ${icon('layers')}</span><strong>32.5 <small>hrs</small></strong><div><span class="metric-change">↗ 24.8%</span><small>more time for good work</small></div><div class="time-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>
      <div class="app-table"><div class="table-heading"><div><b id="table-title">Customer overview</b><span class="count-badge" id="customer-count">48 customers</span></div><div><label class="table-search">${icon('search')}<input aria-label="Search sample customers" placeholder="Search customers…" /></label><button class="filter-button" aria-pressed="false">${icon('filter')} Filter</button><button class="app-add" data-add>+ Add customer</button></div></div><div class="table-scroll"><table><thead><tr><th><span class="table-checkbox"></span></th><th>Company <span>↓</span></th><th>Contact</th><th>Status</th><th>Revenue</th><th>Source</th><th></th></tr></thead><tbody>${dashboardRows()}</tbody></table></div><div class="table-footer"><span id="table-results">Showing 5 of 48 customers</span><span><i class="green-dot"></i> Data that stays in sync. Work that stays in flow.</span></div></div>
    </div><div class="app-statusbar"><span>${icon('link')} Illustrative build <span class="statusbar-separator">·</span> 4 example sources</span><span>Sample data. Custom software possibilities. <span class="tiny-star">✳</span></span></div>
  </div>`;

const codeLines = [
  ['comment', '// Good architecture is invisible. Until you need it.'],
  ['', '<span class="syntax-purple">import</span> { connect, protect } <span class="syntax-purple">from</span> <span class="syntax-green">"./integrations"</span>;'],
  ['', ''],
  ['', '<span class="syntax-purple">export const</span> <span class="syntax-blue">workspace</span> = <span class="syntax-yellow">defineWorkspace</span>({'],
  ['', '  name: <span class="syntax-green">"your-business"</span>,'],
  ['', '  sources: [notion, sheets, stripe, hubspot],'],
  ['', ''],
  ['comment', '  // The right data. Only the right people.'],
  ['', '  security: <span class="syntax-yellow">protect</span>({'],
  ['', '    authentication: <span class="syntax-green">"identity-verified"</span>,'],
  ['', '    permissions: <span class="syntax-green">"role-based"</span>,'],
  ['', '    encryption: <span class="syntax-green">"in-transit-and-at-rest"</span>,'],
  ['', '    auditLog: <span class="syntax-orange">true</span>,'],
  ['', '  }),'],
  ['', ''],
  ['comment', '  // Everything connected. Nothing left to chance.'],
  ['', '  pipeline: <span class="syntax-yellow">connect</span>(<span class="syntax-purple">async</span> ({ data }) <span class="syntax-purple">=&gt;</span> {'],
  ['', '    <span class="syntax-purple">const</span> clean = <span class="syntax-purple">await</span> <span class="syntax-yellow">validate</span>(data);'],
  ['', '    <span class="syntax-purple">await</span> <span class="syntax-yellow">syncWithWorkspace</span>(clean);'],
  ['', '    <span class="syntax-purple">return</span> { status: <span class="syntax-green">"in-flow"</span> };'],
  ['', '  }),'],
  ['', '});'],
];

document.querySelector('.architecture-scene').innerHTML = `
  <div class="architecture-top"><div><span class="code-file-dot"></span> UNDER THE HOOD <span class="architecture-slash">/</span> Built for peace of mind.</div><span>${icon('shield')} SECURITY BY DESIGN</span></div>
  <div class="architecture-body"><div class="code-editor"><div class="editor-tabs"><span class="active-file"><span>TS</span> workspace.ts <i>×</i></span><span>security.config.ts</span><span>+ </span></div><div class="code-lines">${codeLines.map(([cls, line], index) => `<div class="code-line ${cls}"><span>${index + 1}</span><code>${line || '&nbsp;'}</code></div>`).join('')}</div><div class="editor-footer"><span>◉ main</span><span>✓ 0 problems <span>TypeScript</span></span></div></div>
  <div class="architecture-diagram"><div class="diagram-heading"><span>01 — THE FOUNDATION</span><h3>Quietly doing <br>the <em>heavy lifting.</em></h3></div><div class="architecture-flow"><div class="source-nodes"><span>N</span><span>▤</span><span>s</span><span>☷</span></div><div class="flow-connector flow-connector-top"></div><div class="arch-node gateway">${icon('lock')}<div><b>Secure API gateway</b><small>Authenticated. Validated. Protected.</small></div><i></i></div><div class="flow-connector"></div><div class="arch-node engine">${icon('box')}<div><b>Your business logic</b><small>Clean, tested, purpose-built.</small></div><span>✳</span></div><div class="flow-connector"></div><div class="architecture-bottom-nodes"><div class="arch-node">${icon('database')}<div><b>Data layer</b><small>Encrypted storage</small></div></div><div class="arch-node">${icon('shield')}<div><b>Observability</b><small>Logs & monitoring</small></div></div></div></div><div class="architecture-badges"><span>${icon('check')} Role-based access</span><span>${icon('check')} Audit-ready logs</span><span>${icon('check')} Built to scale</span></div></div></div>
  <div class="architecture-status"><span><i></i> AN ILLUSTRATIVE ARCHITECTURE, BUILT AROUND REAL PRINCIPLES</span><span>Clean code. Clear thinking. Complete confidence.</span></div>`;

document.querySelector('.wireframe-scene').innerHTML = `
  <div class="wireframe-top"><span class="wire-logo">✳</span><b>The thinking before the making.</b><span>BUTTON STUDIO <i>/</i> PROTOTYPE 001</span></div>
  <div class="wireframe-canvas"><div class="wire-note note-one"><span>01</span> Start with what matters.<svg viewBox="0 0 100 70"><path d="M5 3Q90 0 74 55m-10-9 10 12 13-11"/></svg></div><div class="wireframe-app"><aside><div class="wire-brand">[ workspace ]</div><div class="wire-block short"></div><div class="wire-nav active">⌂ &nbsp; Overview</div><div class="wire-nav">♙ &nbsp; Customers</div><div class="wire-nav">▱ &nbsp; Projects</div><div class="wire-nav">↗ &nbsp; Reports</div><div class="wire-sidebar-lines"><i></i><i></i><i></i></div></aside><div class="wire-main"><div class="wire-appbar">Workspace <span>/</span> Overview <i></i></div><div class="wire-content"><h3>Your business at a glance.</h3><div class="wire-block medium"></div><div class="wire-metrics">${['Revenue','Customers','Time saved'].map(n => `<div><span>${n}</span><div class="wire-block"></div><svg viewBox="0 0 100 30"><path d="m0 25 12-8 10 4 14-12 12 7L65 4l10 7L100 0"/></svg></div>`).join('')}</div><div class="wire-table-title">Customer overview <span>[ + Add customer ]</span></div><div class="wire-table">${[0,1,2,3].map(() => '<div><i></i><span></span><span></span><b>— —</b><span></span></div>').join('')}</div></div></div></div><div class="wire-note note-two">Less noise.<br>More clarity.<svg viewBox="0 0 100 70"><path d="M95 10Q30-10 14 55m-3-14 2 17 17-4"/></svg></div><div class="wire-note note-three">Test it. Learn. Make it better. <span>↗</span></div><div class="prototype-pill"><span class="status-dot"></span> PROTOTYPED WITH PEOPLE. NOT ASSUMPTIONS.</div></div>`;

document.querySelector('.process-scene').innerHTML = `
  <div class="process-top"><div><span class="tiny-star">✳</span><b>First, we follow the work.</b></div><span>YOUR BUSINESS <i>/</i> THE BIGGER PICTURE</span></div>
  <div class="process-content"><div class="process-heading"><div><span class="app-eyebrow">FROM FIRST HELLO TO REAL VALUE</span><h3>Good tools fit your process.<br><em>Great tools move it forward.</em></h3></div><span class="process-sticky-note">Find the friction.<br>Free up the flow. <span>↙</span></span></div>
  <div class="bpmn-diagram"><div class="bpmn-lane"><span class="lane-label">YOUR CUSTOMER</span><div class="process-event"><i>◌</i><small>A need appears</small></div><span class="bpmn-connector"></span><div class="process-node">${icon('people')}<b>Shares their details</b><small>One simple form</small></div><span class="bpmn-connector cross-down"></span><div class="process-node service-node">${icon('check')}<b>Gets taken care of</b><small>The right service, on time</small></div></div>
  <div class="bpmn-lane"><span class="lane-label">YOUR SYSTEMS</span><div class="process-node data-node">${icon('database')}<b>Data finds its home</b><small>Connected spreadsheet</small></div><span class="bpmn-connector"></span><div class="process-gateway"><span>+</span><small>Validate & route</small></div><span class="bpmn-connector"></span><div class="process-node auto-node">${icon('layers')}<b>The work moves</b><small>Automated, not manual</small></div><span class="bpmn-connector cross-up"></span></div>
  <div class="bpmn-lane finance-lane"><span class="lane-label">YOUR BUSINESS</span><div class="process-insight"><span>↗</span><div><b>Every connection creates value.</b><small>Less re-entry. Fewer bottlenecks. A clear path forward.</small></div></div><span class="bpmn-connector"></span><div class="process-node revenue-node"><span>$</span><b>Revenue arrives</b><small>Tied back to the work</small></div><span class="bpmn-connector"></span><div class="process-event end-event"><i>✓</i><small>A complete picture</small></div></div></div>
  <div class="value-stream"><span>THE VALUE STREAM</span><div><i></i><b>Understand</b><span>→</span><b>Connect</b><span>→</span><b>Improve</b><span>→</span><b>Deliver</b><span>→</span><b>Grow</b></div><span>LESS FRICTION. MORE REVENUE. ↗</span></div></div>`;

const stories = [
  {title: 'We build around your business.', copy: 'Custom apps, connected systems, and simpler workflows. Designed and built with your team.'},
  {title: 'We engineer the foundation.', copy: 'We design the architecture and write clean, tested code that connects your systems securely.'},
  {title: 'We prototype with your team.', copy: 'We turn your needs into workflows and prototypes, then test them with the people who will use them.'},
  {title: 'We start with how you work.', copy: 'We map your processes, find the slowdowns, and shape a software project around the improvements that matter.'},
];
const experience = document.querySelector('.experience');
const stage = document.querySelector('.stage');
const scenes = [...document.querySelectorAll('.scene')];
// The surface supplies depth; the outer scene owns the layer transition.
const surfaces = scenes.map(scene => {
  const surface = document.createElement('div');
  surface.className = 'scene-surface';
  surface.append(...scene.childNodes);
  scene.append(surface);
  return surface;
});
const tabs = [...document.querySelectorAll('[data-tab]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sticky = document.querySelector('.experience-sticky');
const clamp = value => Math.max(0, Math.min(1, value));
let currentLayer = 0;
let pendingFrame = false;
let geometry;
let lastProgress = -1;

function measureExperience() {
  geometry = {
    start: window.scrollY + experience.getBoundingClientRect().top,
    distance: Math.max(1, experience.offsetHeight - sticky.offsetHeight),
    stageHeight: stage.clientHeight,
  };
  lastProgress = -1;
}

const rain = document.querySelector('.matrix-rain');
rain.innerHTML = Array.from({length: 32}, (_, i) => `<span style="--col:${i};--delay:${(i * .37) % 1.3}s">${Array.from({length: 24}, (_, n) => '01{}→;/[]'.charAt((n * 7 + i * 3) % 9)).join('<br>')}</span>`).join('');

function setNarrative(layer) {
  if (layer === currentLayer && stage.dataset.ready) return;
  currentLayer = layer;
  stage.dataset.ready = 'true';
  stage.dataset.layer = layer;
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === layer));
    tab.tabIndex = i === layer ? 0 : -1;
  });
  scenes.forEach((scene, i) => { scene.inert = i !== layer; });
  document.querySelector('#story-title').textContent = stories[layer].title;
  document.querySelector('#story-copy').textContent = stories[layer].copy;
  document.querySelector('#story-number').textContent = `0${layer + 1} / 04`;
  document.querySelectorAll('[data-next]').forEach(button => button.setAttribute('aria-label', layer === 3 ? 'Continue to our services' : `Explore ${tabs[layer + 1].textContent.trim()}`));
}

function renderScroll() {
  pendingFrame = false;
  if (!geometry) measureExperience();
  const progress = clamp((window.scrollY - geometry.start) / geometry.distance);
  if (progress === lastProgress) return;
  lastProgress = progress;
  const position = progress * 3.65;
  const layer = Math.min(3, Math.floor(position + .16));
  setNarrative(layer);
  sticky.style.setProperty('--ambient-drift', `${reducedMotion.matches ? 0 : progress * -60}px`);
  for (let i = 0; i < 4; i++) {
    const t = clamp((position - i - .48) / .52);
    const arrival = i === 0 ? 1 : clamp((position - i + 1 - .48) / .52);
    const depth = clamp((position - i) / .48);
    const scene = scenes[i];
    scene.style.zIndex = 4 - i;
    scene.style.setProperty('--depth', reducedMotion.matches ? 0 : depth);
    surfaces[i].style.transform = reducedMotion.matches ? 'none' : `translate3d(0,${(1 - arrival) * 18 - depth * 12}px,0) scale(${.985 + arrival * .015})`;
    surfaces[i].style.opacity = reducedMotion.matches ? 1 : .94 + arrival * .06;
    if (reducedMotion.matches) {
      scene.style.opacity = i === layer ? 1 : 0;
      scene.style.visibility = i === layer ? 'visible' : 'hidden';
      scene.style.transform = 'none';
      scene.style.clipPath = 'none';
      scene.style.filter = 'none';
      continue;
    }
    scene.style.visibility = t >= 1 ? 'hidden' : 'visible';
    if (i === 0) {
      scene.style.opacity = 1;
      scene.style.clipPath = 'none';
      scene.style.transform = `perspective(2000px) translateY(${-t * 104}%) rotateX(${t * 8}deg) scale(${1 - t * .018})`;
      scene.style.filter = `brightness(${1 - t * .07})`;
      scene.style.borderRadius = `0 0 ${t * 55}px ${t * 12}px`;
    } else if (i === 1) {
      scene.style.transform = `translateY(${-t * 102}%)`;
      scene.style.opacity = 1 - t * .2;
      scene.style.clipPath = `polygon(0 0, 100% 0, 100% ${100 - t * 8}%, 80% ${100 - t * 2}%, 60% ${100 - t * 10}%, 40% ${100 - t * 4}%, 20% ${100 - t * 8}%, 0 100%)`;
    } else {
      scene.style.transform = 'none';
      scene.style.clipPath = i === 2 ? `inset(0 ${t * 110}% 0 0)` : 'none';
      scene.style.opacity = 1;
    }
  }
  const peelT = Math.max(0, Math.min(1, (position - .48) / .52));
  const matrixT = Math.max(0, Math.min(1, (position - 1.48) / .52));
  const eraseT = Math.max(0, Math.min(1, (position - 2.48) / .52));
  stage.style.setProperty('--peel', peelT);
  stage.style.setProperty('--erase', eraseT);
  stage.classList.toggle('is-peeling', !reducedMotion.matches && peelT > 0 && peelT < 1);
  stage.classList.toggle('is-matrix', !reducedMotion.matches && matrixT > 0 && matrixT < 1);
  stage.classList.toggle('is-erasing', !reducedMotion.matches && eraseT > 0 && eraseT < 1);
  rain.style.opacity = !reducedMotion.matches && matrixT > 0 && matrixT < 1 ? Math.sin(matrixT * Math.PI) * .32 : 0;
  if (matrixT > 0 && matrixT < 1 && !reducedMotion.matches) {
    [...rain.children].forEach((column, i) => {
      column.style.transform = `translate3d(0,${geometry.stageHeight * (1 - matrixT * 2) + ((i * 53) % 220) - 110}px,0)`;
    });
  }
}

function requestRender() {
  if (!pendingFrame) { pendingFrame = true; requestAnimationFrame(renderScroll); }
}
function goToLayer(index) {
  if (!geometry) measureExperience();
  window.scrollTo({top: geometry.start + (index / 3.65) * geometry.distance + 1, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => goToLayer(index));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target !== undefined) { event.preventDefault(); tabs[target].focus(); goToLayer(target); }
  });
});
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
  if (currentLayer < 3) goToLayer(currentLayer + 1);
  else document.querySelector('#work').scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}));
window.addEventListener('scroll', requestRender, {passive:true});
window.addEventListener('resize', () => {
  const previous = geometry && (window.scrollY - geometry.start) / geometry.distance;
  measureExperience();
  if (previous > 0 && previous < 1) window.scrollTo({top: geometry.start + previous * geometry.distance, behavior: 'instant'});
  requestRender();
});
new ResizeObserver(() => { measureExperience(); requestRender(); }).observe(sticky);
reducedMotion.addEventListener('change', () => { lastProgress = -1; requestRender(); });
renderScroll();

function updateTable() {
  document.querySelector('tbody').innerHTML = dashboardRows();
  const count = document.querySelectorAll('tbody tr .company-cell').length;
  document.querySelector('#table-results').textContent = dashboardFilter || activeOnly ? `${count} matching customers` : `Showing ${count} of ${48 + customers.length - 5} customers`;
}
document.querySelector('.table-search input').addEventListener('input', e => { dashboardFilter = e.target.value; updateTable(); });
document.querySelector('[data-search]').addEventListener('click', () => document.querySelector('.table-search input').focus());
document.querySelector('.filter-button').addEventListener('click', event => {
  activeOnly = !activeOnly;
  event.currentTarget.setAttribute('aria-pressed', String(activeOnly));
  event.currentTarget.innerHTML = `${icon('filter')} ${activeOnly ? 'Active only' : 'Filter'}`;
  updateTable();
});
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  selectedView = button.dataset.view;
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('selected', b === button));
  document.querySelector('#app-breadcrumb').textContent = selectedView;
  const content = { Overview: ['Your operations, connected.','Customer overview'], Customers: ['Every relationship, connected.','Your customer relationships'], Projects: ['Good work, moving forward.','Customers with active projects'], Reports: ['The numbers behind the progress.','Revenue by customer'] };
  document.querySelector('#app-title').innerHTML = `${content[selectedView][0]} <span>✳</span>`;
  replaceDecorativeGlyphs(document.querySelector('#app-title'));
  document.querySelector('#table-title').textContent = content[selectedView][1];
}));

const dialog = document.querySelector('#contact-dialog');
const dialogContent = document.querySelector('#dialog-content');
const dialogObserver = new MutationObserver(() => replaceDecorativeGlyphs(dialogContent));
dialogObserver.observe(dialogContent, {childList:true, subtree:true});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) dialog.close(); });
function openContact(context = '') {
  dialogContent.innerHTML = `<p class="eyebrow">LET’S MAKE THE CONNECTION</p><h2 id="dialog-title">What’s your<br><em>next unlock?</em></h2><p class="dialog-intro">Start with the messy bit. We’ll help you see what’s possible.</p><form id="contact-form"><label>Your name<input name="name" autocomplete="name" required placeholder="Alex Morgan" maxlength="100"></label><label>Your email<input type="email" name="email" autocomplete="email" required placeholder="alex@yourcompany.com" maxlength="254"></label><label>What’s getting in the way?<textarea name="challenge" required rows="3" placeholder="The systems, the slowdowns, the big idea…" maxlength="3000">${context}</textarea></label><button class="form-submit" type="submit">Create project brief <span>↗</span></button><small class="form-note">This creates a brief you can download or copy. Nothing is sent automatically.</small></form>`;
  dialog.showModal();
  document.querySelector('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = `BUTTON, INC. — PROJECT CONVERSATION\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\n\nWhat we’d like to solve:\n${data.get('challenge')}\n`;
    const escapedName = String(data.get('name')).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    dialogContent.innerHTML = `<div class="brief-success"><span class="success-symbol">✓</span><p class="eyebrow">A GOOD PLACE TO START</p><h2 id="dialog-title">Great thinking,<br><em>${escapedName.split(' ')[0]}.</em></h2><p>Your project brief is ready. Save it for your conversation with Button. Your details haven’t been sent or stored.</p><div class="brief-actions"><button class="form-submit" id="download-brief">Download your brief ↓</button><button class="copy-brief" id="copy-brief">Copy brief</button></div><p class="brief-status" role="status"></p></div>`;
    document.querySelector('#download-brief').addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([brief], {type:'text/plain'}));
      const link = document.createElement('a'); link.href = url; link.download = 'button-project-brief.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    document.querySelector('#copy-brief').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(brief); document.querySelector('.brief-status').textContent = 'Copied. Ready for your next conversation.'; }
      catch { document.querySelector('.brief-status').textContent = 'Clipboard unavailable. Download the brief instead.'; }
    });
    document.querySelector('#download-brief').focus();
  });
}
document.querySelectorAll('[data-contact]').forEach(b => b.addEventListener('click', () => openContact()));
document.querySelectorAll('[data-case]').forEach(b => b.addEventListener('click', () => openContact(b.dataset.case === 'operations' ? 'I’d like to connect our data and simplify the way our team works.' : 'I’d like to improve our customer journey with a system built around our process.')));
document.querySelector('[data-add]').addEventListener('click', () => {
  dialogContent.innerHTML = `<p class="eyebrow">ILLUSTRATIVE CUSTOM WORKSPACE</p><h2 id="dialog-title">Make a<br><em>connection.</em></h2><p class="dialog-intro">Try adding a record to this example of a custom build. Changes stay in this page only.</p><form id="customer-form"><label>Company name<input name="company" required maxlength="60" placeholder="Your company"></label><label>Contact name<input name="person" required maxlength="60" placeholder="Alex Morgan"></label><label>Contact email<input name="email" type="email" required maxlength="254" placeholder="alex@company.com"></label><button class="form-submit">Add sample customer +</button></form>`;
  dialog.showModal();
  document.querySelector('#customer-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    customers.unshift({name:escape(data.get('company')), initials:escape(String(data.get('company')).slice(0,2)),color:'purple',person:escape(data.get('person')),email:escape(data.get('email')),stage:'Onboarding',amount:'$0',source:'Notion',initial:'N'});
    dashboardFilter = ''; activeOnly = false;
    document.querySelector('.table-search input').value = '';
    document.querySelector('.filter-button').setAttribute('aria-pressed','false');
    document.querySelector('.filter-button').innerHTML = `${icon('filter')} Filter`;
    document.querySelector('#customer-count').textContent = `${48 + customers.length - 5} customers`;
    updateTable(); dialog.close();
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
replaceDecorativeGlyphs();

// Connect the actual task positions, rather than drawing disconnected ornament.
const processDiagram = document.querySelector('.bpmn-diagram');
const processArrows = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
processArrows.classList.add('process-arrows');
processArrows.setAttribute('aria-hidden', 'true');
processDiagram.append(processArrows);
processDiagram.setAttribute('role', 'img');
processDiagram.setAttribute('aria-label', 'Illustrative business process: a customer shares their details; data enters a connected spreadsheet, is validated and routed, and triggers automated work; the customer receives a service, revenue arrives, and payment is tied back to the process.');
function drawProcessArrows() {
  const bounds = processDiagram.getBoundingClientRect();
  const point = (selector, side) => {
    const rect = processDiagram.querySelector(selector).getBoundingClientRect();
    return {x: (side === 'left' ? rect.left : side === 'right' ? rect.right : rect.left + rect.width / 2) - bounds.left, y: (side === 'top' ? rect.top : side === 'bottom' ? rect.bottom : rect.top + rect.height / 2) - bounds.top};
  };
  const line = (from, to, route = '') => `<path d="M${from.x},${from.y} ${route || `H${to.x}`} L${to.x},${to.y}"/>`;
  const start = point('.bpmn-lane:nth-of-type(1) .process-event','right');
  const share = point('.bpmn-lane:nth-of-type(1) .process-node','left');
  const shareBottom = point('.bpmn-lane:nth-of-type(1) .process-node','bottom');
  const dataTop = point('.data-node','top');
  const dataRight = point('.data-node','right');
  const gatewayLeft = point('.process-gateway','left');
  const gatewayRight = point('.process-gateway','right');
  const autoLeft = point('.auto-node','left');
  const autoTop = point('.auto-node','top');
  const serviceBottom = point('.service-node','bottom');
  const serviceRight = point('.service-node','right');
  const revenueTop = point('.revenue-node','top');
  const revenueRight = point('.revenue-node','right');
  const end = point('.end-event','left');
  const width = bounds.width, height = bounds.height;
  processArrows.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const gapY = (shareBottom.y + dataTop.y) / 2;
  const serviceY = (autoTop.y + serviceBottom.y) / 2;
  const revenueY = revenueTop.y - 10;
  processArrows.innerHTML = `<defs><marker id="process-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1 8 5 1 9" fill="none" stroke="#7ba1c4" stroke-width="1.4"/></marker></defs><g fill="none" stroke="#93b1ce" stroke-width="1" marker-end="url(#process-arrow)">${line(start,share)}${line(shareBottom,dataTop,`V${gapY} H${dataTop.x}`)}${line(dataRight,gatewayLeft)}${line(gatewayRight,autoLeft)}${line(autoTop,serviceBottom,`V${serviceY} H${serviceBottom.x}`)}${line(serviceRight,revenueTop,`H${width-8} V${revenueY} H${revenueTop.x}`)}${line(revenueRight,end)}</g>`;
}
new ResizeObserver(drawProcessArrows).observe(processDiagram);
document.fonts.ready.then(drawProcessArrows);
