# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-14

First public release, published as `theme-switcher-ts` (an earlier `0.1.0` was prepared
under the `@andercmd/theme-switcher` scope but never completed publishing).

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

[Unreleased]: https://github.com/AnderCMD/Theme-Switcher/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/AnderCMD/Theme-Switcher/releases/tag/v1.0.0
