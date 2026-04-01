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

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-white/45">Momentum</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {neighborhood.momentum_score}
          </p>
        </div>
        <div>
          <p className="text-white/45">Projected Growth</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {neighborhood.projected_growth_3y ?? 0}%
          </p>
        </div>
        <div>
          <p className="text-white/45">Median Price</p>
          <p className="mt-1 text-base font-semibold text-white">
            {formatMoney(neighborhood.median_home_price)}
          </p>
        </div>
        <div>
          <p className="text-white/45">Investor Score</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {neighborhood.investor_opportunity_score}
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm font-medium text-white/80 transition group-hover:text-white">
        View Market Analysis →
      </div>
    </Link>
  );
}
