import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { dictionaries, requiredKeys } from '../src/i18n/dictionaries.js';

const strictMode = process.env.CONTENT_HEALTH_STRICT !== '0';
const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.join(rootDir, 'src');
const generatedDir = path.join(srcDir, 'generated');
const generatedFile = path.join(generatedDir, 'content-invalid.json');

const targetLocales = ['en', 'zh'];
const supportedLocales = ['en', 'zh', 'ja'];
const issues = [];

const contentRules = {
  blog: ['title', 'description', 'locale', 'publishedAt'],
  resources: ['title', 'description', 'locale', 'publishedAt', 'kind'],
};

const invalidByCollection = {
  blog: [],
  resources: [],
};

function isMarkdownFile(fileName) {
  return fileName.endsWith('.md') || fileName.endsWith('.mdx');
}

function normalizeSlug(filePath) {
  const noExt = filePath.replace(/\.(md|mdx)$/i, '');
  return noExt.replace(/\\/g, '/');
}

async function walkMarkdownFiles(baseDir, relative = '') {
  const current = path.join(baseDir, relative);
  const entries = await fs.readdir(current, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const relPath = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkMarkdownFiles(baseDir, relPath);
      files.push(...nested);
      continue;
    }

    if (entry.isFile() && isMarkdownFile(entry.name)) {
      files.push(relPath);
    }
  }

  return files;
}

function pushIssue(type, message, collection, slug, file) {
  issues.push({ type, message, collection, slug, file });
  if (!invalidByCollection[collection].includes(slug)) {
    invalidByCollection[collection].push(slug);
  }
}

function validateFrontmatter(collection, slug, file, data) {
  const required = contentRules[collection];

  for (const key of required) {
    const value = data[key];
    if (value === undefined || value === null || String(value).trim() === '') {
      pushIssue(
        'content',
        `Missing required frontmatter key "${key}"`,
        collection,
        slug,
        file,
      );
    }
  }

  if (data.locale && !supportedLocales.includes(String(data.locale))) {
    pushIssue(
      'content',
      `Unsupported locale "${data.locale}" in frontmatter`,
      collection,
      slug,
      file,
    );
  }
}

for (const locale of targetLocales) {
  const dict = dictionaries[locale] ?? {};
  for (const key of requiredKeys) {
    const value = dict[key];
    if (typeof value !== 'string' || value.trim().length === 0) {
      issues.push({
        type: 'i18n',
        message: `Missing required i18n key: locale=${locale}, key=${key}`,
      });
    }
  }
}

for (const collection of Object.keys(contentRules)) {
  const collectionDir = path.join(srcDir, 'content', collection);
  try {
    const files = await walkMarkdownFiles(collectionDir);

    for (const relFile of files) {
      const fullPath = path.join(collectionDir, relFile);
      const slug = normalizeSlug(relFile);
      const raw = await fs.readFile(fullPath, 'utf8');

      try {
        const parsed = matter(raw);
        validateFrontmatter(collection, slug, relFile, parsed.data || {});
      } catch (error) {
        pushIssue(
          'content',
          `Failed to parse frontmatter: ${error instanceof Error ? error.message : String(error)}`,
          collection,
          slug,
          relFile,
        );
      }
    }
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      continue;
    }
    throw error;
  }
}

await fs.mkdir(generatedDir, { recursive: true });
await fs.writeFile(
  generatedFile,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      strictMode,
      invalidByCollection,
      details: issues.filter((issue) => issue.type === 'content'),
    },
    null,
    2,
  ) + '\n',
);

const hardErrors = issues.filter((issue) => issue.type === 'i18n');
const contentIssues = issues.filter((issue) => issue.type === 'content');

if (issues.length > 0) {
  console.error('\n[content-health] REPORT\n');
  for (const issue of issues) {
    console.error(`- ${issue.message}`);
  }
}

if (strictMode && (hardErrors.length > 0 || contentIssues.length > 0)) {
  console.error('\n[content-health] FAILED (strict mode)\n');
  process.exit(1);
}

if (!strictMode && hardErrors.length > 0) {
  console.error('\n[content-health] FAILED (soft mode still blocks i18n hard errors)\n');
  process.exit(1);
}

console.log(
  strictMode
    ? '[content-health] OK (strict mode)'
    : '[content-health] OK (soft mode, content issues recorded)',
);
