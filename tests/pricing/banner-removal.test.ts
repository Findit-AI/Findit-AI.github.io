import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const pricingSectionsPath = path.resolve(process.cwd(), 'src/components/PricingSections.astro');
const pricingSections = fs.readFileSync(pricingSectionsPath, 'utf8');

describe('pricing banner removal', () => {
  it('does not render cloud enhancement banner box', () => {
    expect(pricingSections).not.toContain('pricing-banner');
    expect(pricingSections).not.toContain('pricing_banner_title');
    expect(pricingSections).not.toContain('pricing_banner_body');
  });
});
