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
    expect(ids).toEqual(['free', 'trial', 'pro']);
  });

  it('exposes cloud budget limits from subscription model', () => {
    const plans = getPricingPlans();
    expect(plans.find((plan) => plan.id === 'free')?.monthlyBudgetUsd).toBe(0);
    expect(plans.find((plan) => plan.id === 'trial')?.monthlyBudgetUsd).toBe(1);
    expect(plans.find((plan) => plan.id === 'pro')?.monthlyBudgetUsd).toBe(10);
  });

  it('computes billing cycle amount for monthly and yearly views', () => {
    const monthly: BillingCycle = 'monthly';
    const yearly: BillingCycle = 'yearly';

    expect(getPricingAmountCents('pro', monthly)).toBe(999);
    expect(getPricingAmountCents('pro', yearly)).toBe(11988);
    expect(getPricingAmountCents('trial', yearly)).toBe(0);
  });

  it('returns only displayable primary plans for marketing page cards', () => {
    expect(getPrimaryPricingPlans().map((plan) => plan.id)).toEqual(['free', 'pro']);
  });
});
