import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ScoreBadge } from "@/components/score-badge";
import { getNeighborhoodBySlug } from "@/lib/data";
import { generateNeighborhoodInsight } from "@/lib/insights";

import { Neighborhood } from '@/lib/types'

function formatMoney(value: number | null) {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getMarketProfile(neighborhood: Neighborhood): string {
  const statusColor = {
    rising: "bg-emerald-400",
    stable: "bg-amber-400",
    declining: "bg-sky-400"
  }[neighborhood.status];
  
  const statusLabel = {
    rising: "Rising Momentum",
    stable: "Stable Market",
    declining: "Declining Market"
  }[neighborhood.status];
  if (neighborhood.generational_hold_score > 70) {
    return "Scarcity Market";
  }
  if (neighborhood.momentum_score > 80 && neighborhood.generational_hold_score < 50) {
    return "Emerging Acquisition Window";
  }
  if (neighborhood.status === "stable") {
    return "Stable Long-Hold Zone";
  }
  if (neighborhood.status === "rising") {
    return "Momentum Opportunity";
  }
  return "Conditional Opportunity";
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    notFound();
  }

  const marketProfile = getMarketProfile(neighborhood);

  return (
    <main className="bg-black">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Intelligence Header */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${
                  {
                    rising: "bg-emerald-400",
                    stable: "bg-amber-400", 
                    declining: "bg-sky-400"
                  }[neighborhood.status]
                }`} />
                <span className="text-sm font-medium uppercase tracking-wider text-white/60">
                  {statusLabel}
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                {neighborhood.name}
              </h1>
              <p className="text-lg text-white/80">
                {neighborhood.short_description}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row md:flex-col">
              <div className="space-y-1 text-right">
                <p className="text-sm text-white/60">Median Price</p>
                <p className="text-2xl font-medium text-white">
                  {formatMoney(neighborhood.median_home_price)}
                </p>
                {neighborhood.tracking_count && neighborhood.tracking_count > 0 && (
                  <p className="text-xs text-emerald-400/80">
                    Tracked by {neighborhood.tracking_count} investors
                  </p>
                )}
              </div>
              <TrackButton 
                neighborhoodId={neighborhood.id}
                isTracked={neighborhood.is_tracked}
                trackingCount={neighborhood.tracking_count}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                Market Profile
              </p>
              <p className="mt-2 text-xl font-medium text-white">{marketProfile}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                Growth Outlook
              </p>
              <p className="mt-2 text-xl font-medium text-white">
                {neighborhood.projected_growth_3y ?? 0}%
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                Investor Score
              </p>
              <p className="mt-2 text-xl font-medium text-white">
                {neighborhood.investor_opportunity_score}
              </p>
            </div>
          </div>
        </div>

        {/* Analyst Summary */}
        <div className="mt-8 rounded-xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-emerald-400"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                NaextBlock Analyst Note
              </h3>
              <p className="mt-2 text-white/90">
                {generateNeighborhoodInsight(neighborhood)}
              </p>
            </div>
          </div>
        </div>

        {/* Score Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Demand Signals */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
              Demand Signals
            </h3>
            <div className="space-y-4">
              <ScoreBadge
                label="Momentum"
                value={neighborhood.momentum_score}
                description="Velocity of price and demand growth"
              />
              <ScoreBadge
                label="Appreciation"
                value={neighborhood.appreciation_score}
                description="Historical price growth sustainability"
              />
              <ScoreBadge
                label="Amenity Growth"
                value={neighborhood.amenity_growth_score}
                description="Retail/service expansion rate"
              />
            </div>
          </div>

          {/* Supply Dynamics */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
              Supply Dynamics
            </h3>
            <div className="space-y-4">
              <ScoreBadge
                label="Seller Intent"
                value={neighborhood.seller_intent_score}
                description="Likelihood of inventory emergence"
              />
              <ScoreBadge
                label="Generational Hold"
                value={neighborhood.generational_hold_score}
                description="Owner retention tendencies"
              />
              <ScoreBadge
                label="Turnover Risk"
                value={neighborhood.turnover_risk_score}
                description="Probability of forced sales"
              />
            </div>
          </div>

          {/* Timing Indicators */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
              Timing Indicators
            </h3>
            <div className="space-y-4">
              <ScoreBadge
                label="Investor Opportunity"
                value={neighborhood.investor_opportunity_score}
                description="Relative value for capital deployment"
              />
              <ScoreBadge
                label="Buyer Timing"
                value={neighborhood.buyer_timing_score}
                description="Optimal entry point assessment"
              />
            </div>
          </div>

          {/* Strategic Fit */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
              Strategic Fit
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                <h4 className="text-sm font-medium text-white">Best For</h4>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  {neighborhood.investor_opportunity_score > 70 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Yield-seeking investors
                    </li>
                  )}
                  {neighborhood.generational_hold_score > 60 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Long-term holders
                    </li>
                  )}
                  {neighborhood.turnover_risk_score > 65 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      Turnaround operators
                    </li>
                  )}
                </ul>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                <h4 className="text-sm font-medium text-white">Key Considerations</h4>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  {neighborhood.momentum_score > 75 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Strong demand momentum
                    </li>
                  )}
                  {neighborhood.seller_intent_score > 65 && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Potential inventory growth
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Section */}
        <div className="mt-8 rounded-xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-white/60">
                Track This Neighborhood
              </h3>
              <p className="mt-2 text-white/80">
                Get alerts when market conditions change or new opportunities emerge.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-400/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Track Neighborhood
            </button>
          </div>
        </div>

        {/* Neighborhood Description */}
        <div className="mt-8 rounded-xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-sm font-medium uppercase tracking-wider text-white/60">
            Neighborhood Profile
          </h3>
          <p className="mt-4 text-white/80">{neighborhood.long_description}</p>
        </div>
      </div>
    </main>
  );
}
