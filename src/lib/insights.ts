import type { Neighborhood } from "./types";

export function generateNeighborhoodInsight(n: Neighborhood): string {
  if (n.momentum_score > 80 && n.generational_hold_score < 50) {
    return "High momentum with low hold resistance — strong acquisition window forming.";
  }

  if (n.momentum_score > 80 && n.generational_hold_score > 70) {
    return "Strong growth but constrained supply — expect competition and pricing pressure.";
  }

  if (n.investor_opportunity_score > 85) {
    return "High investor signal — asymmetric upside vs current pricing.";
  }

  if (n.turnover_risk_score > 70) {
    return "Elevated turnover probability — inventory likely to increase soon.";
  }

  if (n.status === "declining") {
    return "Weak trajectory — opportunity depends on reversal or targeted intervention.";
  }

  return "Stable conditions — moderate opportunity depending on entry price.";
}
import type { Neighborhood, NeighborhoodStatus } from "./types";

export function generateNeighborhoodInsight(neighborhood: Neighborhood): string {
  const { 
    momentum_score,
    seller_intent_score,
    appreciation_score,
    amenity_growth_score,
    turnover_risk_score,
    generational_hold_score,
    investor_opportunity_score,
    buyer_timing_score,
    status
  } = neighborhood;

  // Core opportunity assessment
  let opportunity = "";
  if (investor_opportunity_score >= 85) {
    opportunity = "Exceptional asymmetric opportunity";
  } else if (investor_opportunity_score >= 75) {
    opportunity = "Strong growth potential";
  } else if (investor_opportunity_score >= 60) {
    opportunity = "Selective opportunity";
  } else {
    opportunity = "Special situations only";
  }

  // Timing assessment
  let timing = "";
  if (buyer_timing_score >= 80) {
    timing = "Favorable entry window";
  } else if (buyer_timing_score >= 60) {
    timing = "Monitor for opportunities";
  } else {
    timing = "Wait for better conditions";
  }

  // Inventory dynamics
  let inventory = "";
  if (seller_intent_score >= 70 && turnover_risk_score >= 60) {
    inventory = "Likely inventory growth";
  } else if (generational_hold_score >= 70) {
    inventory = "Scarce inventory expected";
  } else if (seller_intent_score >= 60) {
    inventory = "Potential motivated sellers";
  }

  // Compose the insight
  const statusPhrase = status === "rising" ? "accelerating" 
    : status === "stable" ? "steady" 
    : "facing headwinds";

  return `${opportunity} in a ${statusPhrase} market. ${timing}. ${
    inventory ? inventory + "." : ""
  }`.trim();
}

export function getBestForClassification(neighborhood: Neighborhood): string[] {
  const classifications = [];
  const { 
    investor_opportunity_score,
    generational_hold_score,
    turnover_risk_score,
    amenity_growth_score
  } = neighborhood;

  if (investor_opportunity_score > 80) {
    classifications.push("Yield-focused investors");
  }
  if (generational_hold_score > 65) {
    classifications.push("Long-term holders");
  }
  if (turnover_risk_score > 60) {
    classifications.push("Turnaround operators");
  }
  if (amenity_growth_score > 75) {
    classifications.push("Location arbitrage");
  }
  if (investor_opportunity_score < 60 && turnover_risk_score > 55) {
    classifications.push("Value investors");
  }

  return classifications.length > 0 
    ? classifications 
    : ["Investors with local expertise"];
}

export function getCityStrategy(neighborhoods: Neighborhood[]): string {
  if (!neighborhoods.length) return "No neighborhood data available";

  const risingCount = neighborhoods.filter(n => n.status === "rising").length;
  const total = neighborhoods.length;
  const risingPct = Math.round((risingCount / total) * 100);
  
  const avgOpportunity = neighborhoods.reduce(
    (sum, n) => sum + n.investor_opportunity_score, 0
  ) / total;

  const highConvictionCount = neighborhoods.filter(
    n => n.investor_opportunity_score >= 80
  ).length;

  if (risingPct >= 60 && avgOpportunity >= 75) {
    return `Strong growth market (${risingPct}% rising). Focus on ${highConvictionCount} high-conviction neighborhoods.`;
  }

  if (risingPct >= 40 || avgOpportunity >= 65) {
    return `Selective growth pockets (${risingPct}% rising). Target neighborhoods with momentum.`;
  }

  return `Stable market (${risingPct}% rising). Focus on value and special situations.`;
}
