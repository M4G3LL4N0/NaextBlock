import Link from "next/link";
import { Header } from "@/components/header";
import { NeighborhoodCard } from "@/components/neighborhood-card";
import { getNeighborhoods } from "@/lib/data";

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

      <section className="mx-auto max-w-7xl px-6 py-14">
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

            <div className="mt-4 mb-6 flex flex-wrap gap-4">
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
              <Link
                href="/map?min_momentum=80"
                className={`rounded-full px-4 py-2 text-sm ${
                  resolvedSearchParams.min_momentum === "80"
                    ? "bg-white text-black"
                    : "border border-white/15 bg-white/5 text-white/80"
                }`}
              >
                80+ Momentum
              </Link>
            </div>
          </div>

          <MapLegend />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="grid h-[520px] grid-cols-3 gap-4">
              {filteredNeighborhoods.map((n) => (
                <div
                  key={n.slug}
                  className={`rounded-[1.5rem] border p-4 ${
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
