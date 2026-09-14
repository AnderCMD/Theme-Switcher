/**
 * This package needs no Tailwind-specific plugin: `ThemeController`
 * toggles a `dark` class on `<html>` by default, which is exactly what
 * Tailwind's `darkMode: 'class'` strategy expects. All 10 stylesheets
 * under `theme-switcher/styles/*.css` are plain CSS and work identically
 * whether or not Tailwind is present on the page.
 *
 * `themeSwitcherPreset` is a tiny convenience preset for projects that
 * want to opt into the class strategy from a single import instead of
 * hand-writing `darkMode: 'class'` in their Tailwind config.
 *
 * @example tailwind.config.js
 * ```js
 * import { themeSwitcherPreset } from 'theme-switcher-ts/tailwind';
 *
 * export default {
 *   presets: [themeSwitcherPreset],
 *   content: ['./src/**\/*.{html,js,ts,jsx,tsx,vue}'],
 * };
 * ```
 */
export const themeSwitcherPreset = {
  darkMode: 'class',
} as const;
