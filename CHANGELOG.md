# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-09-14

### Added

- 20 new toggle designs, bringing the total to 30: Rocker, Eclipse, Papercut, Neon Tube, Pixel, Flip Card, Droplet, Brass Lever, Origami, Aurora, Brutalist, Candy, Wood, Holographic, Matrix, Lava, Crystal, Vinyl, Constellation, Sunrise.

## [1.0.1] - 2026-09-14

First public release, published as `theme-switcher-ts`. (Two earlier publish attempts —
`0.1.0` under the `@andercmd/theme-switcher` scope, then `1.0.0` under this name — each got
stuck in a registry-side "ghost" state after an interrupted npm 2FA flow: the registry
rejected republishing that exact version while never actually making it visible. Both are
abandoned; `1.0.1` is the first version that actually went live.)

### Added

- Framework-agnostic `ThemeController` core: `light`/`dark`/`system` preferences, `localStorage` persistence, cross-tab sync, `prefers-color-scheme` sync, and transition suppression on change.
- React adapter: `useTheme()`, `<ThemeProvider>`, `<ThemeSwitch>`.
- Vue 3 adapter: `useTheme()`, `<ThemeProvider>` / `provideTheme()`, `<ThemeSwitch>`.
- Angular adapter: DI-based `provideThemeSwitcher()` and a signal-based `injectTheme()`.
- Vanilla adapter: `mountThemeSwitch()` — also the basis for Astro, Svelte, Solid, and any other framework's integration.
- 10 built-in toggle designs: Classic Sky, Minimal Pill, macOS, Neumorphic, Glassmorphism, Retro LED, Gradient Orb, Icon Button, Terminal, Line.
- Tailwind CSS compatibility (class-based dark mode) and a tiny optional preset.
- A live docs/demo site deployed to GitHub Pages, dogfooding the published build.
- Test suite for the core controller, ESLint + Prettier configuration, and CI workflow.

[Unreleased]: https://github.com/AnderCMD/Theme-Switcher/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/AnderCMD/Theme-Switcher/releases/tag/v1.1.0
[1.0.1]: https://github.com/AnderCMD/Theme-Switcher/releases/tag/v1.0.1
