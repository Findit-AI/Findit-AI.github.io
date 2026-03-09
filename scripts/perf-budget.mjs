import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, '_astro');

const budget = {
  jsGzipKB: 140,
  cssGzipKB: 80,
  htmlKB: 120,
};

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function gzipSize(buffer) {
  return zlib.gzipSync(buffer, { level: 9 }).length;
}

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

if (!(await exists(distDir))) {
  console.error('[perf-budget] dist not found. Run `npm run build` first.');
  process.exit(1);
}

let jsGzip = 0;
let cssGzip = 0;
let maxHtml = 0;

if (await exists(assetsDir)) {
  const assetFiles = await getFiles(assetsDir);

  for (const file of assetFiles) {
    const buffer = await fs.readFile(file);
    if (file.endsWith('.js')) jsGzip += gzipSize(buffer);
    if (file.endsWith('.css')) cssGzip += gzipSize(buffer);
  }
}

const allDistFiles = await getFiles(distDir);
for (const file of allDistFiles) {
  if (!file.endsWith('.html')) continue;
  const stat = await fs.stat(file);
  if (stat.size > maxHtml) maxHtml = stat.size;
}

const jsGzipKB = jsGzip / 1024;
const cssGzipKB = cssGzip / 1024;
const maxHtmlKB = maxHtml / 1024;

const errors = [];
if (jsGzipKB > budget.jsGzipKB) {
  errors.push(`JS gzip ${jsGzipKB.toFixed(2)}KB > ${budget.jsGzipKB}KB`);
}
if (cssGzipKB > budget.cssGzipKB) {
  errors.push(`CSS gzip ${cssGzipKB.toFixed(2)}KB > ${budget.cssGzipKB}KB`);
}
if (maxHtmlKB > budget.htmlKB) {
  errors.push(`Largest HTML ${maxHtmlKB.toFixed(2)}KB > ${budget.htmlKB}KB`);
}

console.log('[perf-budget] Metrics');
console.log(`- JS gzip total: ${jsGzipKB.toFixed(2)}KB`);
console.log(`- CSS gzip total: ${cssGzipKB.toFixed(2)}KB`);
console.log(`- Largest HTML: ${maxHtmlKB.toFixed(2)}KB`);

if (errors.length) {
  console.error('\n[perf-budget] FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\n[perf-budget] OK');
