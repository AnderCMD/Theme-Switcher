# Examples

These files demonstrate the public API against the library's TypeScript sources directly (not the built `dist/`), so they need a bundler/dev server that can resolve `.ts` on the fly — browsers can't `import` TypeScript natively.

Quickest way to try them — serve the **repo root** (not the `examples` folder) so the relative `../../src` paths resolve, then open the example in your browser:

```bash
npx vite .
# then open http://localhost:5173/examples/vanilla/
```

Or copy the relevant snippet from [`../README.md`](../README.md) into your own project, pointing imports at `@andercmd/theme-switcher` instead of relative `src` paths.

- [`vanilla/index.html`](./vanilla/index.html) — all 10 built-in variants rendered side by side, sharing one `ThemeController`.
