import { getSupabaseClient } from "@/lib/supabase/client";
import type { Neighborhood, NeighborhoodStatus } from "@/lib/types";

import { generateNeighborhoodInsight, getCityStrategy } from "./insights";

export function getStrategicSummary(neighborhood: Neighborhood): string {
  const insight = generateNeighborhoodInsight(neighborhood);
  const bestFor = getBestForClassification(neighborhood).join(", ");
  
  return `${insight} Best suited for: ${bestFor}.`;
}

export function getTopOpportunity(neighborhoods: Neighborhood[]): string {
  if (!neighborhoods.length) return "No neighborhood data available";
  
  const top = neighborhoods.reduce((prev, current) => 
    current.investor_opportunity_score > prev.investor_opportunity_score ? current : prev
  );

  return `${top.name} presents the strongest investment opportunity ` +
    `with an investor score of ${top.investor_opportunity_score}. ` +
    generateNeighborhoodInsight(top);
}

const fallbackNeighborhoods: Neighborhood[] = [
  {
    id: "1",
    city_id: "sf",
    slug: "mission-district",
    name: "Mission District",
    short_description: "High energy, strong demand, durable amenity pull.",
    long_description:
      "A strong-demand neighborhood with cultural gravity, high walkability, and durable retail interest. NaextBlock flags it as liquid and desirable, though no longer the cheapest entry point.",
    median_home_price: 1450000,
    projected_growth_3y: 12.5,
    momentum_score: 82,
    seller_intent_score: 61,
    appreciation_score: 79,
    amenity_growth_score: 85,
    turnover_risk_score: 54,
    generational_hold_score: 42,
    investor_opportunity_score: 83,
    buyer_timing_score: 74,
    status: "rising",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    city_id: "sf",
    slug: "bayview",
    name: "Bayview",
    short_description: "Higher upside signal with redevelopment potential.",
    long_description:
      "Bayview shows strong forward-looking opportunity because of land dynamics, selective investment, and potential value migration from more expensive nearby neighborhoods.",
    median_home_price: 920000,
    projected_growth_3y: 18.2,
    momentum_score: 86,
    seller_intent_score: 57,
    appreciation_score: 84,
    amenity_growth_score: 71,
    turnover_risk_score: 49,
    generational_hold_score: 38,
    investor_opportunity_score: 89,
    buyer_timing_score: 81,
    status: "rising",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    city_id: "sf",
    slug: "sunset-district",
    name: "Sunset District",
    short_description: "Stable family demand, strong long-hold behavior.",
    long_description:
      "The Sunset tends to behave like a durable long-hold market with strong owner attachment. Opportunity exists, but seller emergence is less frequent unless pricing is compelling.",
    median_home_price: 1380000,
    projected_growth_3y: 8.4,
    momentum_score: 67,
    seller_intent_score: 43,
    appreciation_score: 65,
    amenity_growth_score: 58,
    turnover_risk_score: 41,
    generational_hold_score: 74,
    investor_opportunity_score: 56,
    buyer_timing_score: 59,
    status: "stable",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    city_id: "sf",
    slug: "dogpatch",
    name: "Dogpatch",
    short_description: "New-build energy, amenity momentum, design-forward growth.",
    long_description:
      "Dogpatch scores well on amenity growth and future desirability due to waterfront adjacency, design-forward development, and continued neighborhood positioning upgrades.",
    median_home_price: 1650000,
    projected_growth_3y: 14.6,
    momentum_score: 84,
    seller_intent_score: 52,
    appreciation_score: 82,
    amenity_growth_score: 88,
    turnover_risk_score: 46,
    generational_hold_score: 33,
    investor_opportunity_score: 85,
    buyer_timing_score: 77,
    status: "rising",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    city_id: "sf",
    slug: "tenderloin",
    name: "Tenderloin",
    short_description: "Mixed upside with elevated present-day volatility.",
    long_description:
      "NaextBlock sees this neighborhood as more path-dependent. There is optionality if public safety and investment improve, but near-term volatility keeps the score lower.",
    median_home_price: 780000,
    projected_growth_3y: 4.9,
    momentum_score: 39,
    seller_intent_score: 64,
    appreciation_score: 43,
    amenity_growth_score: 36,
    turnover_risk_score: 72,
    generational_hold_score: 29,
    investor_opportunity_score: 51,
    buyer_timing_score: 40,
    status: "declining",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackNeighborhoods;
  }

  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .order("momentum_score", { ascending: false });

  if (error || !data || data.length === 0) {
    return fallbackNeighborhoods;
  }

  return data as Neighborhood[];
}

export async function getNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackNeighborhoods.find((item) => item.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return fallbackNeighborhoods.find((item) => item.slug === slug) || null;
  }

  return data as Neighborhood;
}
