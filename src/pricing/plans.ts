export type PlanId = 'free' | 'trial' | 'pro';
export type BillingCycle = 'monthly' | 'yearly';

export interface PricingPlan {
  id: PlanId;
  monthlyPriceCents: number;
  monthlyBudgetUsd: number;
  trialDays?: number;
  featureKeys: readonly string[];
  highlight?: boolean;
}

const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'free',
    monthlyPriceCents: 0,
    monthlyBudgetUsd: 0,
    featureKeys: [
      'pricing_feature_clip_search',
      'pricing_feature_keyword_search',
      'pricing_feature_local_indexing',
      'pricing_feature_privacy_local',
    ],
  },
  {
    id: 'trial',
    monthlyPriceCents: 0,
    monthlyBudgetUsd: 1,
    trialDays: 14,
    highlight: true,
    featureKeys: [
      'pricing_feature_everything_in_free',
      'pricing_feature_cloud_vision',
      'pricing_feature_cloud_embedding',
      'pricing_feature_trial_days',
    ],
  },
  {
    id: 'pro',
    monthlyPriceCents: 999,
    monthlyBudgetUsd: 10,
    featureKeys: [
      'pricing_feature_everything_in_trial',
      'pricing_feature_higher_budget',
      'pricing_feature_priority_quality',
      'pricing_feature_upgrade_ready',
    ],
  },
] as const;

export function getPricingPlans(): PricingPlan[] {
  return [...PRICING_PLANS];
}

export function getPrimaryPricingPlans(): PricingPlan[] {
  return PRICING_PLANS.filter((plan) => plan.id !== 'trial');
}

export function getPricingAmountCents(planId: PlanId, cycle: BillingCycle): number {
  const plan = PRICING_PLANS.find((entry) => entry.id === planId);
  if (!plan) return 0;
  if (cycle === 'yearly') return plan.monthlyPriceCents * 12;
  return plan.monthlyPriceCents;
}
