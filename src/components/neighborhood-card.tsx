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
  const investmentLabel = getInvestmentLabel(neighborhood.investor_opportunity_score);
  const timingLabel = getTimingLabel(neighborhood.buyer_timing_score);
  const sellerLabel = getSellerLabel(neighborhood.seller_intent_score);
  const trendLabel =
    neighborhood.status === "rising"
      ? "Rising"
      : neighborhood.status === "stable"
        ? "Stable"
        : "Declining";

  const trendColor =
    neighborhood.status === "rising"
      ? "bg-emerald-400"
      : neighborhood.status === "stable"
        ? "bg-amber-400"
        : "bg-sky-400";

  return (
    <Link
      href={`/neighborhood/${neighborhood.slug}`}
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
    >
      <button
        className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/20 hover:text-white/80"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // TODO: Implement watchlist tracking
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
        <span>Track</span>
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
          <p className="text-white/45">Opportunity</p>
          <p className="text-xl font-semibold text-white">
            {neighborhood.investor_opportunity_score}
          </p>
          <p className="text-xs uppercase tracking-[0.1em] text-white/50">
            {neighborhood.investor_opportunity_score >= 80 ? "High Conviction" : 
             neighborhood.investor_opportunity_score >= 60 ? "Growth" : "Selective"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white/45">Timing</p>
          <p className="text-xl font-semibold text-white">
            {neighborhood.buyer_timing_score}
          </p>
          <p className="text-xs uppercase tracking-[0.1em] text-white/50">
            {neighborhood.buyer_timing_score >= 75 ? "Buy Now" :
             neighborhood.buyer_timing_score >= 50 ? "Monitor" : "Wait"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white/45">Sellers</p>
          <p className="text-xl font-semibold text-white">
            {neighborhood.seller_intent_score}
          </p>
          <p className="text-xs uppercase tracking-[0.1em] text-white/50">
            {neighborhood.seller_intent_score >= 60 ? "Motivated" : 
             neighborhood.seller_intent_score >= 40 ? "Balanced" : "Reluctant"}
          </p>
        </div>
      </div>

      <div className="mt-4 text-xs leading-5 text-white/70">
        {neighborhood.investor_opportunity_score >= 80 && (
          <p>Prime target with strong fundamentals and upside potential.</p>
        )}
        {neighborhood.investor_opportunity_score >= 60 && neighborhood.investor_opportunity_score < 80 && (
          <p>Growth opportunity with balanced risk/reward.</p>
        )}
        {neighborhood.investor_opportunity_score < 60 && (
          <p>Special situations or long-term hold potential.</p>
        )}
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
