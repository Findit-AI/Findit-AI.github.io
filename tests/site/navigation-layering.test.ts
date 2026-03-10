import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
const css = fs.readFileSync(cssPath, 'utf8');

describe('navigation layering', () => {
  it('does not clip dropdown panel from site header container', () => {
    const siteHeaderMatch = css.match(/\.site-header\s*\{([\s\S]*?)\n\}/);
    expect(siteHeaderMatch).not.toBeNull();

    const siteHeaderRules = siteHeaderMatch?.[1] ?? '';
    expect(siteHeaderRules).not.toMatch(/overflow-x\s*:\s*hidden/i);
    expect(siteHeaderRules).not.toMatch(/overflow\s*:\s*hidden/i);
    expect(siteHeaderRules).not.toMatch(/overflow-y\s*:\s*hidden/i);
  });
});
