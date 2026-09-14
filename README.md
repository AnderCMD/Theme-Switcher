# Theme Switcher

A tiny, dependency-free dark/light theme switcher for the web. One core engine, zero framework lock-in, and **10 built-in animated toggle designs** — works with plain HTML/CSS, React, Vue, and Tailwind CSS out of the box.

[![CI](https://github.com/AnderCMD/Theme-Switcher/actions/workflows/ci.yml/badge.svg)](https://github.com/AnderCMD/Theme-Switcher/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40andercmd%2Ftheme-switcher.svg)](https://www.npmjs.com/package/@andercmd/theme-switcher)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Why this exists

Most of my projects repeat the same dark/light toggle logic with small variations: persist to `localStorage`, respect `prefers-color-scheme`, sync across tabs, flip a `dark` class on `<html>`. This package extracts that logic once, tests it, and ships it as a framework-agnostic core plus thin adapters for React and Vue — so every new project gets a solid, accessible toggle in one import instead of a copy-pasted component.

## Features

- 🧠 **Framework-agnostic core** (`ThemeController`) — plain TypeScript, no dependencies, works anywhere JS runs in a browser.
- ⚛️ **React** adapter — `useTheme()` hook, `<ThemeProvider>`, and a ready-made `<ThemeSwitch>` component.
- 🟢 **Vue 3** adapter — `useTheme()` composable, `<ThemeProvider>`, and `<ThemeSwitch>` component.
- 🍦 **Vanilla JS** helper — `mountThemeSwitch()` for plain HTML pages, Astro, or anything else.
- 🎨 **10 built-in designs** — Classic Sky, Minimal Pill, macOS, Neumorphic, Glassmorphism, Retro LED, Gradient Orb, Icon Button, Terminal, and Line. Pick one, or write your own CSS against the same predictable class names.
- 🌗 **`light` / `dark` / `system`** preferences, with automatic OS-level sync via `prefers-color-scheme`.
- 💾 Persists to `localStorage` and **syncs across browser tabs**.
- 🎯 **Tailwind CSS compatible** by default (toggles the `dark` class Tailwind's `darkMode: 'class'` strategy expects) — and works identically with **no Tailwind at all**, since every stylesheet is plain, framework-free CSS.
- ♿ Accessible: real `<input type="checkbox">` semantics, keyboard support, `aria-label`, visible focus ring, and `prefers-reduced-motion` support.
- 📦 ESM + CJS builds, full TypeScript types, tree-shakeable subpath exports (`/react`, `/vue`, `/vanilla` are never bundled unless you import them).

## Installation

```bash
npm install @andercmd/theme-switcher
```

```bash
pnpm add @andercmd/theme-switcher
```

```bash
yarn add @andercmd/theme-switcher
```

React and Vue are optional [peer dependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies) — install whichever one your project already uses; the core and vanilla adapter need neither.

## Quick start

### Plain HTML / vanilla JS

```html
<div id="theme-switch"></div>
<link rel="stylesheet" href="node_modules/@andercmd/theme-switcher/dist/styles/base.css" />
<link
  rel="stylesheet"
  href="node_modules/@andercmd/theme-switcher/dist/styles/variants/classic-sky.css"
/>
<script type="module">
  import { mountThemeSwitch } from '@andercmd/theme-switcher/vanilla';

  mountThemeSwitch(document.getElementById('theme-switch'), {
    variant: 'classic-sky',
  });
</script>
```

### React

```tsx
import '@andercmd/theme-switcher/styles/base.css';
import '@andercmd/theme-switcher/styles/variants/classic-sky.css';
import { ThemeSwitch } from '@andercmd/theme-switcher/react';

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
import { useTheme } from '@andercmd/theme-switcher/react';

function CustomToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'}</button>;
}
```

### Vue 3

```vue
<script setup>
import '@andercmd/theme-switcher/styles/base.css';
import '@andercmd/theme-switcher/styles/variants/classic-sky.css';
import { ThemeSwitch } from '@andercmd/theme-switcher/vue';
</script>

<template>
  <ThemeSwitch variant="classic-sky" />
</template>
```

```vue
<script setup>
import { useTheme } from '@andercmd/theme-switcher/vue';
const { state, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">Switch to {{ state.theme === 'dark' ? 'light' : 'dark' }}</button>
</template>
```

### Just the engine (any framework, or none)

```ts
import { ThemeController } from '@andercmd/theme-switcher';

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
import { themeSwitcherPreset } from '@andercmd/theme-switcher/tailwind';

export default {
  presets: [themeSwitcherPreset],
};
```

**Without Tailwind**, everything still works: every variant ships as plain, hand-written CSS with no utility-class dependency, so it's equally at home in a project with no CSS framework at all.

## The 10 built-in designs

| Variant id       | Name           | Description                                                        |
| ---------------- | -------------- | ------------------------------------------------------------------- |
| `classic-sky`     | Classic Sky    | Animated day/night sky with drifting clouds, stars, and a moon.    |
| `minimal-pill`    | Minimal Pill   | Clean rounded pill with a sliding thumb and cross-fading icons.    |
| `macos`           | macOS          | A faithful recreation of the macOS System Settings toggle.         |
| `neumorphic`      | Neumorphic     | Soft-UI switch with inset/raised shadows.                          |
| `glassmorphism`   | Glassmorphism  | Frosted-glass track with backdrop blur.                            |
| `retro-led`       | Retro LED      | Chunky 8-bit switch with hard steps and neon LED labels.           |
| `gradient-orb`    | Gradient Orb   | Dark track with a glowing gradient orb thumb.                      |
| `icon-button`     | Icon Button    | A single circular button that rotates between sun and moon.        |
| `terminal`        | Terminal       | Cyberpunk terminal look with neon green monospace text.            |
| `line`            | Line           | Ultra-minimal single-line track with a gliding dot.                |

Every variant is import-only — pick one stylesheet from `@andercmd/theme-switcher/styles/variants/*.css`, plus the shared `base.css`. See [`examples/vanilla/index.html`](./examples/vanilla/index.html) for a page that renders all 10 side by side.

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

| Option                       | Type                              | Default                | Description                                                            |
| ---------------------------- | ---------------------------------- | ----------------------- | ------------------------------------------------------------------------ |
| `storageKey`                 | `string`                          | `'theme-switcher:theme'` | `localStorage` key used for persistence.                               |
| `target`                     | `HTMLElement`                     | `document.documentElement` | Element that receives the theme class/attribute.                    |
| `darkClassName`               | `string \| null`                   | `'dark'`                | Class applied when the resolved theme is `dark`. `null` disables it.   |
| `lightClassName`              | `string \| null`                   | `null`                   | Class applied when the resolved theme is `light`.                      |
| `attribute`                  | `string \| null`                   | `'data-theme'`           | Data attribute mirroring the resolved theme.                           |
| `defaultPreference`          | `'light' \| 'dark' \| 'system'`     | `'system'`               | Preference used before anything is stored.                             |
| `disablePersistence`         | `boolean`                          | `false`                  | Skip reading/writing `localStorage`.                                   |
| `disableSystemPreference`    | `boolean`                          | `false`                  | Skip following `prefers-color-scheme`.                                 |
| `disableCrossTabSync`        | `boolean`                          | `false`                  | Skip syncing across tabs via the `storage` event.                      |
| `suppressTransitionOnChange` | `boolean`                          | `true`                   | Briefly disable CSS transitions while applying a theme change.         |

Methods: `getPreference()`, `getResolvedTheme()`, `getState()`, `setPreference()`, `setDark()`, `setLight()`, `useSystemPreference()`, `toggle()`, `subscribe(listener)`, `destroy()`.

### React (`@andercmd/theme-switcher/react`)

- `useTheme(options?)` → `{ theme, preference, setTheme, toggleTheme, controller }`
- `<ThemeProvider {...options}>` — share one controller across the tree.
- `<ThemeSwitch variant?, ariaLabel? />` — ready-made toggle.

### Vue (`@andercmd/theme-switcher/vue`)

- `useTheme(options?)` → `{ state, setTheme, toggleTheme, controller }` (reactive `state`)
- `<ThemeProvider>` / `provideTheme(options?)` — share one controller.
- `<ThemeSwitch variant?, aria-label? />` — ready-made toggle.

### Vanilla (`@andercmd/theme-switcher/vanilla`)

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
