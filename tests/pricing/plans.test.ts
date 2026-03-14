import { describe, expect, it } from 'vitest';
import {
  getPricingAmountCents,
  getPricingPlans,
  getPrimaryPricingPlans,
  type BillingCycle,
} from '../../src/pricing/plans';

describe('pricing plans', () => {
  it('keeps canonical plan order aligned with product model', () => {
    const ids = getPricingPlans().map((plan) => plan.id);
    expect(ids).toEqual(['free', 'pro', 'team']);
  });

  it('exposes monthly credits from subscription model', () => {
    const plans = getPricingPlans();
    expect(plans.find((plan) => plan.id === 'free')?.monthlyCredits).toBe(100);
    expect(plans.find((plan) => plan.id === 'pro')?.monthlyCredits).toBe(1100);
    expect(plans.find((plan) => plan.id === 'team')?.monthlyCredits).toBe(10100);
  });

  it('computes billing cycle amount for monthly and yearly views', () => {
    const monthly: BillingCycle = 'monthly';
    const yearly: BillingCycle = 'yearly';

    expect(getPricingAmountCents('pro', monthly)).toBe(1200);
    expect(getPricingAmountCents('pro', yearly)).toBe(12000);
    expect(getPricingAmountCents('team', monthly)).toBe(6000);
    expect(getPricingAmountCents('team', yearly)).toBe(60000);
  });

  it('yearly price includes discount (not simply monthly x 12)', () => {
    const proMonthly = getPricingAmountCents('pro', 'monthly');
    const proYearly = getPricingAmountCents('pro', 'yearly');
    expect(proYearly).toBeLessThan(proMonthly * 12);

    const teamMonthly = getPricingAmountCents('team', 'monthly');
    const teamYearly = getPricingAmountCents('team', 'yearly');
    expect(teamYearly).toBeLessThan(teamMonthly * 12);
  });

  it('returns all plans for marketing page cards', () => {
    expect(getPrimaryPricingPlans().map((plan) => plan.id)).toEqual(['free', 'pro', 'team']);
  });
});
