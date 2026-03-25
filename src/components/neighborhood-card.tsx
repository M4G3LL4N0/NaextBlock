import Link from "next/link";
import type { Neighborhood } from "@/lib/types";

function formatMoney(value: number | null) {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  const trendLabel =
    neighborhood.status === "rising"
      ? "Rising"
      : neighborhood.status === "stable"
        ? "Stable"
        : "Declining";

  return (
    <Link
      href={`/neighborhood/${neighborhood.slug}`}
      className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.08]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{neighborhood.name}</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            {neighborhood.short_description}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
          {trendLabel}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-white/45">Momentum</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {neighborhood.momentum_score}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-white/45">Projected 3Y</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {neighborhood.projected_growth_3y ?? 0}%
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-white/45">Median price</p>
          <p className="mt-1 text-base font-semibold text-white">
            {formatMoney(neighborhood.median_home_price)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-white/45">Investor score</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {neighborhood.investor_opportunity_score}
          </p>
        </div>
      </div>

      <div className="mt-5 text-sm font-medium text-white/80 transition group-hover:text-white">
        Open intelligence page →
      </div>
    </Link>
  );
}
