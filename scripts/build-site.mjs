// Assembles the static docs site published to GitHub Pages into `site-dist/`.
// Run `npm run build` first — this script copies real build output
// (styles + the vanilla bundle) alongside the hand-written site shell, so
// the docs site dogfoods the exact package that ships to npm.
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const dist = path.join(rootDir, 'dist');
const site = path.join(rootDir, 'site');
const outDir = path.join(rootDir, 'site-dist');

if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` before `node scripts/build-site.mjs`.');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

// Site shell (HTML/CSS/JS hand-authored under site/).
await cp(site, outDir, { recursive: true });

// Real build output the site imports, so the demo runs the published code.
await cp(path.join(dist, 'styles'), path.join(outDir, 'styles'), { recursive: true });
await cp(path.join(dist, 'vanilla', 'index.js'), path.join(outDir, 'vanilla.js'));

// Tell GitHub Pages not to run this through Jekyll.
await writeFile(path.join(outDir, '.nojekyll'), '');

const pkg = JSON.parse(await readFile(path.join(rootDir, 'package.json'), 'utf8'));
console.log(`Built docs site for ${pkg.name}@${pkg.version} -> ${path.relative(rootDir, outDir)}/`);
