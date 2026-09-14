// This docs site dogfoods the actual published package: `vanilla.js` here
// is a verbatim copy of `dist/vanilla/index.js`, placed by
// `scripts/build-site.mjs`. Keep this metadata list in sync with
// `src/variants.ts` when adding a new variant (see CONTRIBUTING.md).
import { mountThemeSwitch, ThemeController } from './vanilla.js';

const VARIANTS = [
  {
    id: 'classic-sky',
    name: 'Classic Sky',
    description:
      'Animated day/night sky with drifting clouds, twinkling stars, and a spotted moon.',
  },
  {
    id: 'minimal-pill',
    name: 'Minimal Pill',
    description: 'Clean rounded pill track with a sliding thumb and cross-fading sun/moon icons.',
  },
  {
    id: 'macos',
    name: 'macOS',
    description: 'A faithful recreation of the macOS System Settings toggle switch.',
  },
  {
    id: 'neumorphic',
    name: 'Neumorphic',
    description: 'Soft-UI switch with inset/raised shadows and a subtle embossed feel.',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted-glass track with backdrop blur and a glowing translucent thumb.',
  },
  {
    id: 'retro-led',
    name: 'Retro LED',
    description: 'Chunky 8-bit inspired switch with hard steps and neon LED-style labels.',
  },
  {
    id: 'gradient-orb',
    name: 'Gradient Orb',
    description: 'Dark track with a glowing gradient orb thumb that shifts hue on toggle.',
  },
  {
    id: 'icon-button',
    name: 'Icon Button',
    description: 'A single circular button that rotates and swaps between a sun and moon icon.',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Cyberpunk terminal look: neon green monospace brackets on a black background.',
  },
  {
    id: 'line',
    name: 'Line',
    description: 'Ultra-minimal single-line track with a small dot gliding between sun and moon.',
  },
];

// One shared controller drives every switch on the page, including the
// page's own light/dark theme — the same pattern you'd use across the
// components of a real app.
const controller = new ThemeController({
  storageKey: 'theme-switcher-docs',
  darkClassName: 'site-dark',
});

mountThemeSwitch(document.getElementById('hero-switch'), {
  variant: 'classic-sky',
  controller,
});

const grid = document.getElementById('grid');
for (const variant of VARIANTS) {
  const card = document.createElement('div');
  card.className = 'card';

  const slot = document.createElement('div');
  slot.className = 'switch-slot';

  const h3 = document.createElement('h3');
  h3.textContent = variant.name;

  const p = document.createElement('p');
  p.textContent = variant.description;

  const badge = document.createElement('span');
  badge.className = 'id-badge';
  badge.textContent = variant.id;

  card.append(slot, h3, p, badge);
  grid.appendChild(card);

  mountThemeSwitch(slot, { variant: variant.id, controller });
}

// ---------- Install command copy button ----------
const copyBtn = document.getElementById('copy-install');
const installCmd = document.getElementById('install-cmd');
copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(installCmd.textContent ?? '');
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 1500);
  } catch {
    // Clipboard API unavailable (e.g. insecure context) — no-op.
  }
});

// ---------- Framework usage tabs ----------
const snippets = [
  {
    id: 'vanilla',
    label: 'Vanilla / HTML',
    file: 'index.html',
    code: `&lt;div id="theme-switch"&gt;&lt;/div&gt;
&lt;link rel="stylesheet" href="node_modules/theme-switcher-ts/dist/styles/base.css" /&gt;
&lt;link rel="stylesheet" href="node_modules/theme-switcher-ts/dist/styles/variants/classic-sky.css" /&gt;

&lt;script type="module"&gt;
  <span class="kw">import</span> { mountThemeSwitch } <span class="kw">from</span> <span class="str">'theme-switcher-ts/vanilla'</span>;

  mountThemeSwitch(document.getElementById(<span class="str">'theme-switch'</span>), {
    variant: <span class="str">'classic-sky'</span>,
  });
&lt;/script&gt;`,
  },
  {
    id: 'react',
    label: 'React',
    file: 'Header.tsx',
    code: `<span class="kw">import</span> <span class="str">'theme-switcher-ts/styles/base.css'</span>;
<span class="kw">import</span> <span class="str">'theme-switcher-ts/styles/variants/classic-sky.css'</span>;
<span class="kw">import</span> { ThemeSwitch } <span class="kw">from</span> <span class="str">'theme-switcher-ts/react'</span>;

<span class="kw">export function</span> Header() {
  <span class="kw">return</span> &lt;ThemeSwitch variant=<span class="str">"classic-sky"</span> /&gt;;
}`,
  },
  {
    id: 'vue',
    label: 'Vue 3',
    file: 'Header.vue',
    code: `&lt;script setup&gt;
<span class="kw">import</span> <span class="str">'theme-switcher-ts/styles/base.css'</span>;
<span class="kw">import</span> <span class="str">'theme-switcher-ts/styles/variants/classic-sky.css'</span>;
<span class="kw">import</span> { ThemeSwitch } <span class="kw">from</span> <span class="str">'theme-switcher-ts/vue'</span>;
&lt;/script&gt;

&lt;template&gt;
  &lt;ThemeSwitch variant=<span class="str">"classic-sky"</span> /&gt;
&lt;/template&gt;`,
  },
  {
    id: 'angular',
    label: 'Angular',
    file: 'theme-switch.component.ts',
    code: `<span class="kw">import</span> { Component } <span class="kw">from</span> <span class="str">'@angular/core'</span>;
<span class="kw">import</span> { injectTheme, VARIANTS } <span class="kw">from</span> <span class="str">'theme-switcher-ts/angular'</span>;

<span class="cm">@Component</span>({
  selector: <span class="str">'app-theme-switch'</span>,
  standalone: <span class="kw">true</span>,
  template: <span class="str">\`
    &lt;label class="theme-switch theme-switch--classic-sky"&gt;
      &lt;input type="checkbox" class="theme-switch__checkbox"
        [checked]="theme.theme() === 'dark'"
        (change)="theme.toggleTheme()" /&gt;
      &lt;div class="theme-switch__visual" [innerHTML]="markup"&gt;&lt;/div&gt;
    &lt;/label&gt;
  \`</span>,
})
<span class="kw">export class</span> ThemeSwitchComponent {
  protected readonly theme = injectTheme();
  protected readonly markup = VARIANTS[<span class="str">'classic-sky'</span>].markup;
}`,
  },
  {
    id: 'astro',
    label: 'Astro',
    file: 'ThemeSwitch.astro',
    code: `---
---
&lt;div id="theme-switch"&gt;&lt;/div&gt;
&lt;link rel="stylesheet" href="theme-switcher-ts/styles/base.css" /&gt;
&lt;link rel="stylesheet" href="theme-switcher-ts/styles/variants/classic-sky.css" /&gt;

&lt;script&gt;
  <span class="kw">import</span> { mountThemeSwitch } <span class="kw">from</span> <span class="str">'theme-switcher-ts/vanilla'</span>;
  mountThemeSwitch(document.getElementById(<span class="str">'theme-switch'</span>)!, { variant: <span class="str">'classic-sky'</span> });
&lt;/script&gt;`,
  },
];

const tabsEl = document.querySelector('.tabs');
const panelsEl = document.querySelector('.panels');

snippets.forEach((snippet, i) => {
  const btn = document.createElement('button');
  btn.className = 'tab-btn';
  btn.type = 'button';
  btn.setAttribute('role', 'tab');
  btn.textContent = snippet.label;
  btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  btn.addEventListener('click', () => selectTab(snippet.id));
  tabsEl.appendChild(btn);

  const panel = document.createElement('div');
  panel.className = 'tab-panel';
  panel.dataset.id = snippet.id;
  panel.dataset.active = i === 0 ? 'true' : 'false';
  panel.innerHTML = `<span class="file-label">${snippet.file}</span><pre>${snippet.code}</pre>`;
  panelsEl.appendChild(panel);
});

function selectTab(id) {
  tabsEl.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.setAttribute('aria-selected', snippets[i].id === id ? 'true' : 'false');
  });
  panelsEl.querySelectorAll('.tab-panel').forEach((p) => {
    p.dataset.active = p.dataset.id === id ? 'true' : 'false';
  });
}
