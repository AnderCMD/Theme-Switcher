# Theme Switcher

A tiny, dependency-free dark/light theme switcher for the web. One core engine, zero framework lock-in, and **30 built-in animated toggle designs** — works with plain HTML/CSS, React, Vue, Angular, Astro, and Tailwind CSS out of the box.

[![CI](https://github.com/AnderCMD/Theme-Switcher/actions/workflows/ci.yml/badge.svg)](https://github.com/AnderCMD/Theme-Switcher/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/theme-switcher-ts.svg)](https://www.npmjs.com/package/theme-switcher-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**[Live demo — see all 30 designs and try every framework snippet →](https://andercmd.github.io/Theme-Switcher/)**

## Why this exists

Most of my projects repeat the same dark/light toggle logic with small variations: persist to `localStorage`, respect `prefers-color-scheme`, sync across tabs, flip a `dark` class on `<html>`. This package extracts that logic once, tests it, and ships it as a framework-agnostic core plus thin adapters for React, Vue, and Angular — so every new project gets a solid, accessible toggle in one import instead of a copy-pasted component, whatever framework that project happens to use.

## Features

- 🧠 **Framework-agnostic core** (`ThemeController`) — plain TypeScript, no dependencies, works anywhere JS runs in a browser.
- ⚛️ **React** adapter — `useTheme()` hook, `<ThemeProvider>`, and a ready-made `<ThemeSwitch>` component.
- 🟢 **Vue 3** adapter — `useTheme()` composable, `<ThemeProvider>`, and `<ThemeSwitch>` component.
- 🅰️ **Angular** adapter — DI-based `provideThemeSwitcher()` + a signal-based `injectTheme()`.
- 🚀 **Astro**, **Svelte**, **Solid**, and everything else — the vanilla adapter is plain DOM APIs, so it drops into any framework's lifecycle hook or a bare `<script>` tag.
- 🍦 **Vanilla JS** helper — `mountThemeSwitch()` for plain HTML pages or anything without a framework.
- 🎨 **30 built-in designs** — from a Classic Sky day/night scene to a steampunk Brass Lever, a spinning Vinyl record, and a Matrix code-rain track. Pick one, or write your own CSS against the same predictable class names.
- 🌗 **`light` / `dark` / `system`** preferences, with automatic OS-level sync via `prefers-color-scheme`.
- 💾 Persists to `localStorage` and **syncs across browser tabs**.
- 🎯 **Tailwind CSS compatible** by default (toggles the `dark` class Tailwind's `darkMode: 'class'` strategy expects) — and works identically with **no Tailwind at all**, since every stylesheet is plain, framework-free CSS.
- ♿ Accessible: real `<input type="checkbox">` semantics, keyboard support, `aria-label`, visible focus ring, and `prefers-reduced-motion` support.
- 📦 ESM + CJS builds, full TypeScript types, tree-shakeable subpath exports (`/react`, `/vue`, `/vanilla` are never bundled unless you import them).

## Installation

```bash
npm install theme-switcher-ts
```

```bash
pnpm add theme-switcher-ts
```

```bash
yarn add theme-switcher-ts
```

React, Vue, and `@angular/core` are optional [peer dependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies) — install whichever one your project already uses; the core and vanilla adapter (the ones Astro, Svelte, Solid, etc. use) need none of them.

## Quick start

### Plain HTML / vanilla JS

```html
<div id="theme-switch"></div>
<link rel="stylesheet" href="node_modules/theme-switcher-ts/dist/styles/base.css" />
<link rel="stylesheet" href="node_modules/theme-switcher-ts/dist/styles/variants/classic-sky.css" />
<script type="module">
  import { mountThemeSwitch } from 'theme-switcher-ts/vanilla';

  mountThemeSwitch(document.getElementById('theme-switch'), {
    variant: 'classic-sky',
  });
</script>
```

### React

```tsx
import 'theme-switcher-ts/styles/base.css';
import 'theme-switcher-ts/styles/variants/classic-sky.css';
import { ThemeSwitch } from 'theme-switcher-ts/react';

export function Header() {
  return (
    <header>
      <ThemeSwitch variant="classic-sky" />
    </header>
  );
}
```

Need the raw state instead of the pre-built component?

```tsx
import { useTheme } from 'theme-switcher-ts/react';

function CustomToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'}</button>;
}
```

### Vue 3

```vue
<script setup>
import 'theme-switcher-ts/styles/base.css';
import 'theme-switcher-ts/styles/variants/classic-sky.css';
import { ThemeSwitch } from 'theme-switcher-ts/vue';
</script>

<template>
  <ThemeSwitch variant="classic-sky" />
</template>
```

```vue
<script setup>
import { useTheme } from 'theme-switcher-ts/vue';
const { state, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">Switch to {{ state.theme === 'dark' ? 'light' : 'dark' }}</button>
</template>
```

### Angular

This package ships **no** `@Component`/`@Directive` classes — an Angular library built from plain `tsc`/`tsup` output (rather than `ng-packagr`'s Ivy partial compiler) can't safely ship decorated components, since Angular's decorators need to go through Angular's own compiler to produce working Ivy instructions. Instead, `theme-switcher-ts/angular` gives you a proper DI-based `ThemeController` (an `InjectionToken` + `provideThemeSwitcher()` + a functional `injectTheme()` using signals) and the same static variant markup used internally, so you can drop it straight into a **standalone component you own** — no ng-packagr, no version lock-in to a specific Angular major:

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideThemeSwitcher } from 'theme-switcher-ts/angular';

export const appConfig: ApplicationConfig = {
  providers: [provideThemeSwitcher({ defaultPreference: 'system' })],
};
```

```ts
// theme-switch.component.ts
import { Component } from '@angular/core';
import { injectTheme, VARIANTS } from 'theme-switcher-ts/angular';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  template: `
    <label class="theme-switch theme-switch--classic-sky">
      <input
        type="checkbox"
        class="theme-switch__checkbox"
        aria-label="Toggle dark mode"
        [checked]="theme.theme() === 'dark'"
        (change)="theme.toggleTheme()"
      />
      <div class="theme-switch__visual" [innerHTML]="markup"></div>
    </label>
  `,
})
export class ThemeSwitchComponent {
  protected readonly theme = injectTheme();
  protected readonly markup = VARIANTS['classic-sky'].markup;
}
```

Import `theme-switcher-ts/styles/base.css` and `.../styles/variants/classic-sky.css` globally (e.g. in `angular.json`'s `styles` array), same as any other framework. Swap `'classic-sky'` for any of the [30 variant ids](#the-30-built-in-designs) in both the template's modifier class and the `VARIANTS[...]` lookup.

### Astro

Astro components render to static HTML by default, so the simplest integration is the vanilla adapter in a `<script>` tag — Astro bundles it for you automatically:

```astro
---
// ThemeSwitch.astro
---
<div id="theme-switch"></div>

<link rel="stylesheet" href="theme-switcher-ts/styles/base.css" />
<link rel="stylesheet" href="theme-switcher-ts/styles/variants/classic-sky.css" />

<script>
  import { mountThemeSwitch } from 'theme-switcher-ts/vanilla';
  mountThemeSwitch(document.getElementById('theme-switch')!, { variant: 'classic-sky' });
</script>
```

Already using Astro's React or Vue integration elsewhere in the same project? Use the framework component directly with a client directive instead:

```astro
import { ThemeSwitch } from 'theme-switcher-ts/react';
<ThemeSwitch client:load variant="classic-sky" />
```

### Svelte, Solid, htmx, jQuery, or anything else

The [vanilla adapter](#vanilla-andercmdtheme-switchervanilla) has zero framework dependencies — it's plain DOM APIs — so it works unmodified in Svelte's `onMount`, SolidJS's `onMount`, a `<script>` on an htmx page, or literally any environment that runs JavaScript in a browser:

```ts
import { mountThemeSwitch } from 'theme-switcher-ts/vanilla';

// Svelte: call inside onMount(() => { ... })
// Solid: call inside onMount(() => { ... })
// Anywhere else: call once the target element exists in the DOM.
mountThemeSwitch(document.getElementById('theme-switch')!, { variant: 'classic-sky' });
```

### Just the engine (any framework, or none)

```ts
import { ThemeController } from 'theme-switcher-ts';

const controller = new ThemeController({ defaultPreference: 'system' });

controller.subscribe(({ resolved, preference }) => {
  console.log(`Theme is now ${resolved} (preference: ${preference})`);
});

document.getElementById('my-toggle')?.addEventListener('click', () => controller.toggle());
```

## Tailwind CSS

No plugin required. `ThemeController` toggles a `dark` class on `<html>` by default — exactly what Tailwind's class-based dark mode expects:

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  // ...
};
```

Then use `dark:` variants anywhere in your app as usual. If you'd rather not hand-write `darkMode: 'class'`, a one-line preset is included:

```js
import { themeSwitcherPreset } from 'theme-switcher-ts/tailwind';

export default {
  presets: [themeSwitcherPreset],
};
```

**Without Tailwind**, everything still works: every variant ships as plain, hand-written CSS with no utility-class dependency, so it's equally at home in a project with no CSS framework at all.

## The 30 built-in designs

| Variant id      | Name          | Description                                                      |
| --------------- | ------------- | ---------------------------------------------------------------- |
| `classic-sky`   | Classic Sky   | Animated day/night sky with drifting clouds, stars, and a moon.  |
| `minimal-pill`  | Minimal Pill  | Clean rounded pill with a sliding thumb and cross-fading icons.  |
| `macos`         | macOS         | A faithful recreation of the macOS System Settings toggle.       |
| `neumorphic`    | Neumorphic    | Soft-UI switch with inset/raised shadows.                        |
| `glassmorphism` | Glassmorphism | Frosted-glass track with backdrop blur.                          |
| `retro-led`     | Retro LED     | Chunky 8-bit switch with hard steps and neon LED labels.         |
| `gradient-orb`  | Gradient Orb  | Dark track with a glowing gradient orb thumb.                    |
| `icon-button`   | Icon Button   | A single circular button that rotates between sun and moon.      |
| `terminal`      | Terminal      | Cyberpunk terminal look with neon green monospace text.          |
| `line`          | Line          | Ultra-minimal single-line track with a gliding dot.              |
| `rocker`        | Rocker        | A physical wall light-switch rocker on a mounting plate.         |
| `eclipse`       | Eclipse       | A sun and moon disc that slide into total eclipse.               |
| `papercut`      | Papercut      | Layered paper-craft circles with soft drop shadows.              |
| `neon-tube`     | Neon Tube     | A glowing glass-tube outline switch, like a neon sign.           |
| `pixel`         | Pixel         | A crisp 8-bit sprite sun and moon on a blocky track.             |
| `flip-card`     | Flip Card     | A two-sided card that flips between sun and moon faces.          |
| `droplet`       | Droplet       | A soft liquid blob that stretches and squashes as it slides.     |
| `brass-lever`   | Brass Lever   | A steampunk brass lever on a riveted plate with a ticking gear.  |
| `origami`       | Origami       | Folded-paper triangles that rearrange sun into crescent moon.    |
| `aurora`        | Aurora        | A shifting aurora-borealis gradient behind a frosted thumb.      |
| `brutalist`     | Brutalist     | Raw neo-brutalist switch: thick borders, hard offset shadow.     |
| `candy`         | Candy         | A glossy jelly-bean pill with a bright specular highlight.       |
| `wood`          | Wood          | A varnished wooden switch plate with grain and brass screws.     |
| `holographic`   | Holographic   | An iridescent foil-gradient switch that shifts hue as it slides. |
| `matrix`        | Matrix        | Falling green digits on a black track, hacker-terminal style.    |
| `lava`          | Lava          | Warm gradient blobs that merge and separate like a lava lamp.    |
| `crystal`       | Crystal       | A faceted gemstone thumb that catches the light as it slides.    |
| `vinyl`         | Vinyl         | A miniature spinning record that slows to a stop on toggle.      |
| `constellation` | Constellation | Hand-drawn stars connect into constellation lines.               |
| `sunrise`       | Sunrise       | A sun that rises and sets behind a horizon line.                 |

Every variant is import-only — pick one stylesheet from `theme-switcher-ts/styles/variants/*.css`, plus the shared `base.css`. See [`examples/vanilla/index.html`](./examples/vanilla/index.html) for a page that renders all 30 side by side.

### Writing your own design

All variants share the same predictable DOM contract, so you can style your own from scratch instead of using a built-in one:

```html
<label class="theme-switch">
  <input type="checkbox" class="theme-switch__checkbox" />
  <div class="theme-switch__visual">
    <!-- anything you want -->
  </div>
</label>
```

Target the checked state with `.theme-switch__checkbox:checked + .theme-switch__visual ...` in your own CSS.

## API reference

### `ThemeController` (core)

```ts
new ThemeController(options?: ThemeControllerOptions)
```

| Option                       | Type                            | Default                    | Description                                                          |
| ---------------------------- | ------------------------------- | -------------------------- | -------------------------------------------------------------------- |
| `storageKey`                 | `string`                        | `'theme-switcher:theme'`   | `localStorage` key used for persistence.                             |
| `target`                     | `HTMLElement`                   | `document.documentElement` | Element that receives the theme class/attribute.                     |
| `darkClassName`              | `string \| null`                | `'dark'`                   | Class applied when the resolved theme is `dark`. `null` disables it. |
| `lightClassName`             | `string \| null`                | `null`                     | Class applied when the resolved theme is `light`.                    |
| `attribute`                  | `string \| null`                | `'data-theme'`             | Data attribute mirroring the resolved theme.                         |
| `defaultPreference`          | `'light' \| 'dark' \| 'system'` | `'system'`                 | Preference used before anything is stored.                           |
| `disablePersistence`         | `boolean`                       | `false`                    | Skip reading/writing `localStorage`.                                 |
| `disableSystemPreference`    | `boolean`                       | `false`                    | Skip following `prefers-color-scheme`.                               |
| `disableCrossTabSync`        | `boolean`                       | `false`                    | Skip syncing across tabs via the `storage` event.                    |
| `suppressTransitionOnChange` | `boolean`                       | `true`                     | Briefly disable CSS transitions while applying a theme change.       |

Methods: `getPreference()`, `getResolvedTheme()`, `getState()`, `setPreference()`, `setDark()`, `setLight()`, `useSystemPreference()`, `toggle()`, `subscribe(listener)`, `destroy()`.

### React (`theme-switcher-ts/react`)

- `useTheme(options?)` → `{ theme, preference, setTheme, toggleTheme, controller }`
- `<ThemeProvider {...options}>` — share one controller across the tree.
- `<ThemeSwitch variant?, ariaLabel? />` — ready-made toggle.

### Vue (`theme-switcher-ts/vue`)

- `useTheme(options?)` → `{ state, setTheme, toggleTheme, controller }` (reactive `state`)
- `<ThemeProvider>` / `provideTheme(options?)` — share one controller.
- `<ThemeSwitch variant?, aria-label? />` — ready-made toggle.

### Angular (`theme-switcher-ts/angular`)

- `provideThemeSwitcher(options?)` → `EnvironmentProviders` for `ApplicationConfig.providers`.
- `THEME_CONTROLLER` — `InjectionToken<ThemeController>`, in case you'd rather call `inject()` yourself.
- `injectTheme()` → `{ theme, preference, setTheme, toggleTheme, controller }` (signal-based; must be called from an injection context).

### Vanilla (`theme-switcher-ts/vanilla`)

- `mountThemeSwitch(container, options?)` → `{ element, input, controller, destroy }`

## Browser support

Any browser with `matchMedia`, `localStorage`, and `classList` — i.e. every browser released in the last decade. Full functionality degrades gracefully in restricted environments (e.g. private browsing where `localStorage` throws): the toggle still works for the current page load, it just won't persist.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md) before opening a PR.

```bash
npm install
npm run dev       # watch build
npm test          # vitest
npm run lint      # eslint
npm run format    # prettier
```

## License

[MIT](./LICENSE) © [Ander CMD](https://github.com/AnderCMD)
