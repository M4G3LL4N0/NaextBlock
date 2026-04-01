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
