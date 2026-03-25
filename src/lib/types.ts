export type NeighborhoodStatus = "rising" | "stable" | "declining";

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  long_description: string | null;
  median_home_price: number | null;
  projected_growth_3y: number | null;
  momentum_score: number;
  seller_intent_score: number;
  appreciation_score: number;
  amenity_growth_score: number;
  turnover_risk_score: number;
  generational_hold_score: number;
  investor_opportunity_score: number;
  buyer_timing_score: number;
  status: NeighborhoodStatus;
  city_id: string;
  created_at: string;
  updated_at: string;
}

export interface WaitlistSignupInput {
  email: string;
  full_name?: string;
  city?: string;
}
