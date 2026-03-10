import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
const css = fs.readFileSync(cssPath, 'utf8');

describe('hero to content transition', () => {
  it('avoids a hard split and includes a gradient bridge', () => {
    const heroMatch = css.match(/\.hero-stage\s*\{([\s\S]*?)\n\}/);
    expect(heroMatch).not.toBeNull();

    const heroRules = heroMatch?.[1] ?? '';
    expect(heroRules).not.toMatch(/border-bottom\s*:/i);

    expect(css).toMatch(/\.hero-stage::after\s*\{/);
  });
});
