/**
 * scripts/check.js — lightweight static checks
 * Runs `node --check` on every .js file in the project (excluding node_modules,
 * reference/, venv/) and fails the process if any file has a syntax error.
 *
 * Usage: npm test   (or: node scripts/check.js)
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SKIP = new Set(['node_modules', 'reference', 'venv', '.git', 'dist', 'build']);

function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) collect(full, out);
    else if (name.endsWith('.js')) out.push(full);
  }
  return out;
}

const files = collect(ROOT);
let failed = 0;
for (const f of files) {
  try {
    execFileSync('node', ['--check', f], { stdio: 'pipe' });
  } catch (e) {
    failed++;
    console.error('SYNTAX ERROR:', f.replace(ROOT + '/', ''));
    console.error(String(e.stderr || e.message).split('\n').slice(0, 4).join('\n'));
  }
}

if (failed) {
  console.error(`\n${failed} file(s) failed syntax check.`);
  process.exit(1);
}
console.log(`OK — ${files.length} JS files passed syntax check.`);
