import Link from "next/link";
import { Header } from "@/components/header";
import { NeighborhoodCard } from "@/components/neighborhood-card";
import { getNeighborhoods } from "@/lib/data";
import { getCityStrategy } from "@/lib/strategy";
import { formatMoney } from "@/app/neighborhood/[slug]/page";

function MapLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-sm text-white/65">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        Rising
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        Stable
      </div>
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-sky-400" />
        Declining
      </div>
    </div>
  );
}

function getSummaryStats(neighborhoods: Neighborhood[]) {
  const risingCount = neighborhoods.filter(n => n.status === "rising").length;
  const avgMomentum = neighborhoods.reduce((sum, n) => sum + n.momentum_score, 0) / neighborhoods.length;
  const topInvestorOpp = Math.max(...neighborhoods.map(n => n.investor_opportunity_score));
  const avgBuyerTiming = neighborhoods.reduce((sum, n) => sum + n.buyer_timing_score, 0) / neighborhoods.length;

  return {
    total: neighborhoods.length,
    risingCount,
    avgMomentum: Math.round(avgMomentum),
    topInvestorOpp,
    avgBuyerTiming: Math.round(avgBuyerTiming)
  };
}

export default async function MapPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
    min_momentum?: string;
  }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const neighborhoods = await getNeighborhoods();

  const statusFilter = resolvedSearchParams.status;
  const minMomentum = Number(resolvedSearchParams.min_momentum ?? 0);

  const filteredNeighborhoods = neighborhoods.filter((n) => {
    const matchesStatus = statusFilter ? n.status === statusFilter : true;
    const matchesMomentum = Number.isFinite(minMomentum)
      ? n.momentum_score >= minMomentum
      : true;

    return matchesStatus && matchesMomentum;
  });

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-7xl px-6 pt-6 pb-12">
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">Market Overview</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Neighborhoods</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stats.total}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Rising</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stats.risingCount}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Momentum</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stats.avgMomentum}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Timing</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stats.avgBuyerTiming}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-400/80">Strategic Outlook</p>
            <p className="mt-3 text-lg font-medium text-white">
              {getCityStrategy(neighborhoods)}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Top Opportunity</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stats.topInvestorOpp}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Prime Targets</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {neighborhoods.filter(n => n.investor_opportunity_score >= 80).length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400/80">Portfolio Mix</p>
            <div className="mt-3 flex justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="text-sm text-white/80">Growth</span>
              </div>
              <span className="text-sm font-medium text-white">
                {Math.round((neighborhoods.filter(n => n.status === "rising").length / neighborhoods.length) * 100)}%
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="text-sm text-white/80">Core</span>
              </div>
              <span className="text-sm font-medium text-white">
                {Math.round((neighborhoods.filter(n => n.status === "stable").length / neighborhoods.length) * 100)}%
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-sky-400" />
                <span className="text-sm text-white/80">Value</span>
              </div>
              <span className="text-sm font-medium text-white">
                {Math.round((neighborhoods.filter(n => n.status === "declining").length / neighborhoods.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              NaextMap
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Where the market is moving next
            </h1>
            <p className="mt-4 max-w-2xl text-white/60">
              Start with San Francisco. Rank neighborhoods by forward-looking
              momentum, investor opportunity, and buyer timing.
            </p>

            <div className="mt-4 mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Filters:</p>
                <Link
                  href="/map"
                  className={`rounded-full px-4 py-2 text-sm ${
                    !resolvedSearchParams.status && !resolvedSearchParams.min_momentum
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  All
                </Link>
                <Link
                  href="/map?status=rising"
                  className={`rounded-full px-4 py-2 text-sm ${
                    resolvedSearchParams.status === "rising"
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  Rising
                </Link>
                <Link
                  href="/map?status=stable"
                  className={`rounded-full px-4 py-2 text-sm ${
                    resolvedSearchParams.status === "stable"
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  Stable
                </Link>
                <Link
                  href="/map?status=declining"
                  className={`rounded-full px-4 py-2 text-sm ${
                    resolvedSearchParams.status === "declining"
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  Declining
                </Link>
              </div>
              
              <div className="flex items-center gap-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Momentum:</p>
                <Link
                  href="/map?min_momentum=50"
                  className={`rounded-full px-4 py-2 text-sm ${
                    resolvedSearchParams.min_momentum === "50"
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  50+
                </Link>
                <Link
                  href="/map?min_momentum=70"
                  className={`rounded-full px-4 py-2 text-sm ${
                    resolvedSearchParams.min_momentum === "70"
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  70+
                </Link>
                <Link
                  href="/map?min_momentum=80"
                  className={`rounded-full px-4 py-2 text-sm ${
                    resolvedSearchParams.min_momentum === "80"
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/80"
                  }`}
                >
                  80+
                </Link>
              </div>
            </div>
          </div>

          <MapLegend />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Market Grid</h2>
              <p className="text-sm text-white/50">
                Showing {filteredNeighborhoods.length} of {neighborhoods.length} neighborhoods
              </p>
            </div>
            <div className="grid h-[520px] grid-cols-3 gap-4 overflow-y-auto">
              {filteredNeighborhoods.map((n) => (
                <div
                  key={n.slug}
                  className={`rounded-xl border p-4 backdrop-blur ${
                    n.status === "rising"
                      ? "border-emerald-400/20 bg-emerald-500/10"
                      : n.status === "stable"
                        ? "border-amber-400/20 bg-amber-500/10"
                        : "border-sky-400/20 bg-sky-500/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{n.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {n.momentum_score}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">
                    {n.status}
                  </p>
                  <p className="mt-4 text-xs leading-5 text-white/60">
                    {n.short_description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {filteredNeighborhoods.map((neighborhood) => (
              <NeighborhoodCard
                key={neighborhood.slug}
                neighborhood={neighborhood}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
