export type PlanId = 'free' | 'pro' | 'team';
export type BillingCycle = 'monthly' | 'yearly';

export interface PricingPlan {
  id: PlanId;
  monthlyPriceCents: number;
  yearlyPriceCents: number;
  monthlyCredits: number;
  featureKeys: readonly string[];
  highlight?: boolean;
}

const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'free',
    monthlyPriceCents: 0,
    yearlyPriceCents: 0,
    monthlyCredits: 100,
    featureKeys: [
      'pricing_feature_clip_search',
      'pricing_feature_local_indexing',
      'pricing_feature_portable_index',
      'pricing_feature_privacy_local',
      'pricing_feature_free_credits',
    ],
  },
  {
    id: 'pro',
    monthlyPriceCents: 1200,
    yearlyPriceCents: 12000,
    monthlyCredits: 1100,
    highlight: true,
    featureKeys: [
      'pricing_feature_everything_in_free',
      'pricing_feature_cloud_vision',
      'pricing_feature_cloud_embedding',
      'pricing_feature_fallback_local',
      'pricing_feature_extra_credits',
    ],
  },
  {
    id: 'team',
    monthlyPriceCents: 6000,
    yearlyPriceCents: 60000,
    monthlyCredits: 10100,
    featureKeys: [
      'pricing_feature_everything_in_pro',
      'pricing_feature_team_credits',
      'pricing_feature_team_collab',
      'pricing_feature_priority_support',
    ],
  },
] as const;

export function getPricingPlans(): PricingPlan[] {
  return [...PRICING_PLANS];
}

export function getPrimaryPricingPlans(): PricingPlan[] {
  return [...PRICING_PLANS];
}

export function getPricingAmountCents(planId: PlanId, cycle: BillingCycle): number {
  const plan = PRICING_PLANS.find((entry) => entry.id === planId);
  if (!plan) return 0;
  if (cycle === 'yearly') return plan.yearlyPriceCents;
  return plan.monthlyPriceCents;
}
