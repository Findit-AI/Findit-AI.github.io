import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
const css = fs.readFileSync(cssPath, 'utf8');

describe('header pinning', () => {
  it('keeps the site header fixed at viewport top with body offset', () => {
    const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/);
    expect(rootMatch).not.toBeNull();
    const rootRules = rootMatch?.[1] ?? '';
    expect(rootRules).toMatch(/--site-header-height\s*:\s*\d+px/i);

    const bodyBlocks = [...css.matchAll(/\nbody\s*\{([\s\S]*?)\n\}/g)];
    expect(bodyBlocks.length).toBeGreaterThan(0);
    const bodyRules = bodyBlocks.map((match) => match[1]).join('\n');
    expect(bodyRules).toMatch(/padding-top\s*:\s*var\(--site-header-height\)/i);

    const headerMatch = css.match(/\.site-header\s*\{([\s\S]*?)\n\}/);
    expect(headerMatch).not.toBeNull();
    const headerRules = headerMatch?.[1] ?? '';
    expect(headerRules).toMatch(/position\s*:\s*fixed/i);
    expect(headerRules).toMatch(/top\s*:\s*0/i);
    expect(headerRules).toMatch(/left\s*:\s*0/i);
    expect(headerRules).toMatch(/right\s*:\s*0/i);
  });
});
