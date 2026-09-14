# Contributing to Theme Switcher

Thanks for taking the time to contribute! This document covers how to set up the project, the conventions we follow, and how to submit changes.

## Getting started

```bash
git clone https://github.com/AnderCMD/Theme-Switcher.git
cd Theme-Switcher
npm install
```

Useful scripts:

| Script                 | What it does                                             |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Builds the library in watch mode.                        |
| `npm run build`        | Produces the production `dist/` output.                  |
| `npm test`             | Runs the Vitest suite once.                               |
| `npm run test:watch`   | Runs Vitest in watch mode.                                 |
| `npm run typecheck`    | Type-checks the project without emitting files.           |
| `npm run lint`         | Lints `src/` and `test/` with ESLint.                      |
| `npm run lint:fix`     | Same as above, auto-fixing what it can.                    |
| `npm run format`       | Formats the repo with Prettier.                            |
| `npm run format:check` | Checks formatting without writing changes (used in CI).   |

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

## Pull requests

- Keep PRs focused on a single change.
- Add/adjust tests for behavior changes in `src/core`.
- Run `npm run lint`, `npm run typecheck`, and `npm test` before opening the PR — CI runs the same checks.
- Describe *why* the change is needed, not just what changed.

## Reporting bugs / requesting features

Please use the issue templates under `.github/ISSUE_TEMPLATE`. Include a minimal reproduction when reporting a bug — a CodeSandbox/StackBlitz link or a short code snippet is ideal.

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
