# Security Policy

## Supported Versions

This project is currently pre-1.0. Security fixes are made against the latest published version on the `main` branch / npm `latest` tag.

## Reporting a Vulnerability

Please **do not** open a public issue for security vulnerabilities. Instead, report it privately using [GitHub's private vulnerability reporting](https://github.com/AnderCMD/Theme-Switcher/security/advisories/new) for this repository.

Please include:

- A description of the vulnerability and its potential impact.
- Steps to reproduce (a minimal repro is very helpful).
- The version(s) affected.

We aim to acknowledge reports within a few days and will keep you updated as a fix is developed.

## Scope notes

This library:

- Reads/writes `localStorage` under a configurable key.
- Toggles a CSS class/attribute on a DOM element.
- Renders static, hand-authored HTML for its built-in toggle variants — it never interpolates user-supplied data into markup.

It does not make network requests, evaluate arbitrary strings, or accept untrusted HTML as input.
