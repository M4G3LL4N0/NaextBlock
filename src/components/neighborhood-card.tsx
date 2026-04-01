import Link from "next/link";
import type { Neighborhood } from "@/lib/types";
import clsx from "clsx";

function formatMoney(value: number | null) {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInvestmentLabel(score: number) {
  return score >= 80 
    ? "High Conviction" 
    : score >= 60 
      ? "Growth" 
      : "Selective";
}

function getTimingLabel(score: number) {
  return score >= 75
    ? "Buy Now"
    : score >= 50
      ? "Monitor"
      : "Wait";
}

function getSellerLabel(score: number) {
  return score >= 60
    ? "Motivated"
    : score >= 40
      ? "Balanced"
      : "Reluctant";
}

export function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  const trendColor =
    neighborhood.status === "rising"
      ? "bg-emerald-400"
      : neighborhood.status === "stable"
        ? "bg-amber-400"
        : "bg-sky-400";

  const trendLabel = neighborhood.status === "rising" 
    ? "Rising" 
    : neighborhood.status === "stable" 
      ? "Stable" 
      : "Declining";

  const opportunityRationale = neighborhood.investor_opportunity_score >= 85
    ? "Exceptional growth potential with strong momentum"
    : neighborhood.investor_opportunity_score >= 75
      ? "High upside with favorable market conditions"
      : "Emerging opportunity with improving fundamentals";

  return (
    <Link
      href={`/neighborhood/${neighborhood.slug}`}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
    >
      <button
        className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/20 hover:text-white/80 group-hover:bg-white/10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Will be implemented with auth
        }}
        aria-label="Track neighborhood"
      >
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
          className="h-3.5 w-3.5"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden sm:inline">Track</span>
      </button>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{neighborhood.name}</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {neighborhood.short_description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${trendColor}`} />
          <span className="text-xs uppercase tracking-[0.2em] text-white/60">
            {trendLabel}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.1em] text-white/50">Opportunity</p>
          <p className="text-xl font-semibold text-white">
            {neighborhood.investor_opportunity_score}
          </p>
          <div className="h-1.5 w-full rounded-full bg-white/5">
            <div 
              className="h-1.5 rounded-full bg-emerald-400" 
              style={{ width: `${neighborhood.investor_opportunity_score}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.1em] text-white/50">Momentum</p>
          <p className="text-xl font-semibold text-white">
            {neighborhood.momentum_score}
          </p>
          <div className="h-1.5 w-full rounded-full bg-white/5">
            <div 
              className="h-1.5 rounded-full bg-amber-400" 
              style={{ width: `${neighborhood.momentum_score}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.1em] text-white/50">Timing</p>
          <p className="text-xl font-semibold text-white">
            {neighborhood.buyer_timing_score}
          </p>
          <div className="h-1.5 w-full rounded-full bg-white/5">
            <div 
              className="h-1.5 rounded-full bg-sky-400" 
              style={{ width: `${neighborhood.buyer_timing_score}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs leading-5 text-white/70">
          {opportunityRationale}
        </p>
        <p className="text-xs leading-5 text-white/50">
          {generateNeighborhoodInsight(neighborhood).split(".")[0]}.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white/80 transition group-hover:text-white">
          View Analysis →
        </span>
        {neighborhood.tracking_count && neighborhood.tracking_count > 0 && (
          <span className="text-xs text-white/40">
            {neighborhood.tracking_count} tracking
          </span>
        )}
      </div>
    </Link>
  );
}
