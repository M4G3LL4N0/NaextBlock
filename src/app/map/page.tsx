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
  searchParams: { status?: string; min_momentum?: string };
}) {
  let neighborhoods = await getNeighborhoods();
  
  // Apply filters
  if (searchParams.status) {
    neighborhoods = neighborhoods.filter(
      (n) => n.status === searchParams.status
    );
  }
  if (searchParams.min_momentum) {
    const minScore = parseInt(searchParams.min_momentum);
    neighborhoods = neighborhoods.filter(
      (n) => n.momentum_score >= minScore
    );
  }

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
          </div>
          <MapLegend />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex flex-wrap gap-4">
              <Link
                href="/map"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:bg-white/5"
              >
                All neighborhoods
              </Link>
              <Link
                href="/map?status=rising"
                className="rounded-full border border-emerald-400/20 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
              >
                Rising
              </Link>
              <Link
                href="/map?status=stable"
                className="rounded-full border border-amber-400/20 px-4 py-2 text-sm text-amber-300 hover:bg-amber-500/10"
              >
                Stable
              </Link>
              <Link
                href="/map?status=declining"
                className="rounded-full border border-sky-400/20 px-4 py-2 text-sm text-sky-300 hover:bg-sky-500/10"
              >
                Declining
              </Link>
              <Link
                href="/map?min_momentum=80"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 hover:bg-white/5"
              >
                Momentum ≥ 80
              </Link>
            </div>
            <div className="grid h-[520px] grid-cols-3 gap-4 overflow-y-auto">
              {neighborhoods.map((n) => (
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
            {neighborhoods.map((neighborhood) => (
              <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
