# Contributing to Theme Switcher

Thanks for taking the time to contribute! This document covers how to set up the project, the conventions we follow, and how to submit changes.

## Getting started

```bash
git clone https://github.com/AnderCMD/Theme-Switcher.git
cd Theme-Switcher
npm install
```

Useful scripts:

| Script                 | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Builds the library in watch mode.                       |
| `npm run build`        | Produces the production `dist/` output.                 |
| `npm test`             | Runs the Vitest suite once.                             |
| `npm run test:watch`   | Runs Vitest in watch mode.                              |
| `npm run typecheck`    | Type-checks the project without emitting files.         |
| `npm run lint`         | Lints `src/` and `test/` with ESLint.                   |
| `npm run lint:fix`     | Same as above, auto-fixing what it can.                 |
| `npm run format`       | Formats the repo with Prettier.                         |
| `npm run format:check` | Checks formatting without writing changes (used in CI). |

## Branching model

- `main` — always releasable. Protected; changes land via pull request.
- `dev` — integration branch for work in progress. Feature branches target `dev`.

Please branch off `dev` (e.g. `feature/my-thing`, `fix/some-bug`) and open your PR against `dev`.

## Commit messages

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`) to keep history and future changelogs readable. This isn't enforced by tooling yet, but please try to follow it.

## Adding a new toggle variant

1. Add the variant id to `ThemeSwitchVariant` in [`src/core/types.ts`](./src/core/types.ts).
2. Add its metadata + static markup to [`src/variants.ts`](./src/variants.ts).
3. Add a stylesheet at `src/styles/variants/<id>.css`, scoped under `.theme-switch--<id>` and following the `.theme-switch__checkbox:checked + .theme-switch__visual ...` pattern used by the existing variants.
4. Add it to `src/styles/index.css`.
5. Add a small entry to the variants table in `README.md` and to `examples/vanilla/index.html`.
6. Add it to the `VARIANTS` array in [`site/app.js`](./site/app.js) so it shows up on the [docs site](https://andercmd.github.io/Theme-Switcher/) — that file keeps its own copy of the id/name/description rather than importing from `src/`, since the site only ever consumes the built package.

## Pull requests

- Keep PRs focused on a single change.
- Add/adjust tests for behavior changes in `src/core`.
- Run `npm run lint`, `npm run typecheck`, and `npm test` before opening the PR — CI runs the same checks.
- Describe _why_ the change is needed, not just what changed.

## Releasing (maintainers)

Publishing to npm goes through [`.github/workflows/publish.yml`](./.github/workflows/publish.yml) using npm's **Trusted Publishing (OIDC)** — GitHub Actions authenticates directly with the npm registry via a short-lived OIDC token, so there's no `NPM_TOKEN` secret to rotate and no interactive 2FA prompt to get stuck on mid-publish.

This requires a one-time setup on npm's side (already done for `theme-switcher-ts`, kept here for reference / in case it's ever reconfigured): on the package's **Settings → Trusted Publisher** page, add a GitHub Actions publisher with

- **Organization or user:** `AnderCMD`
- **Repository:** `Theme-Switcher`
- **Workflow filename:** `publish.yml`
- **Allow `npm publish`:** checked (not just the staged/provenance-only flow)

To cut a release:

1. Bump `version` in `package.json` (and add an entry to `CHANGELOG.md`) on `main`.
2. Publish a [GitHub Release](https://github.com/AnderCMD/Theme-Switcher/releases/new) with tag `v<version>` (e.g. `v1.2.0`) matching `package.json` exactly — the workflow verifies this and fails the run if they disagree.
3. The workflow lints, typechecks, tests, builds, and runs `npm publish --access public --provenance` automatically.

For a one-off publish without cutting a release, trigger the workflow manually from the _Actions_ tab (`workflow_dispatch`), typing `publish` into the confirmation input.

## Reporting bugs / requesting features

Please use the issue templates under `.github/ISSUE_TEMPLATE`. Include a minimal reproduction when reporting a bug — a CodeSandbox/StackBlitz link or a short code snippet is ideal.

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
