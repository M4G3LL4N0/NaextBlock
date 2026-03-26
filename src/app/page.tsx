import Link from "next/link";
import { ArrowRight, Radar, Building, Map } from "lucide-react";
import { Header } from "@/components/header";
import { WaitlistForm } from "@/components/waitlist-form";
import { getNeighborhoods } from "@/lib/data";
import { NeighborhoodCard } from "@/components/neighborhood-card";

export default async function HomePage() {
  const neighborhoods = await getNeighborhoods();
  const featured = neighborhoods.slice(0, 3);

  return (
    <main>
      <Header />

      <section className="border-b border-white/10 bg-gradient-to-br from-black/80 to-black/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Top Opportunities Right Now
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Where Smart Money Is Moving Next
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
              Highest-scoring neighborhoods based on investor metrics including price momentum, 
              seller intent, and projected growth.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {neighborhoods
              .sort((a, b) => b.investor_opportunity_score - a.investor_opportunity_score)
              .slice(0, 5)
              .map((neighborhood) => (
                <div key={neighborhood.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium">{neighborhood.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">
                      {neighborhood.investor_opportunity_score}/100
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">{neighborhood.short_description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-white/40">Growth</p>
                      <p className="font-medium">{neighborhood.projected_growth_3y}%</p>
                    </div>
                    <div>
                      <p className="text-white/40">Median Price</p>
                      <p className="font-medium">{Math.round(neighborhood.median_home_price! / 1000)}K</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/60">
              Predictive Real Estate Intelligence
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
              Find the next block before it happens.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              NaextBlock predicts where neighborhoods are rising, where seller
              opportunity is emerging, and where real estate momentum is moving
              before the market fully sees it.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
              >
                Explore NaextMap
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/80 transition hover:bg-white/10"
              >
                Join waitlist
              </a>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Radar className="h-6 w-6 text-white/80" />
                <p className="mt-4 text-lg font-semibold">Neighborhood momentum</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Rank neighborhoods by forward-looking growth signals, not just
                  stale comps.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Building className="h-6 w-6 text-white/80" />
                <p className="mt-4 text-lg font-semibold">Seller emergence</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Estimate where turnover may happen before listings become obvious.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Map className="h-6 w-6 text-white/80" />
                <p className="mt-4 text-lg font-semibold">Street-level context</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  See where amenities, migration, and demand are reshaping value.
                </p>
              </div>
            </div>
          </div>

          <div
            id="waitlist"
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 lg:p-8"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Launch access
            </p>
            <h2 className="mt-4 text-3xl font-semibold">Get early access</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              We’re launching with a focused city-by-city intelligence layer for
              buyers, investors, and operators who want an information edge.
            </p>
            <div className="mt-6">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Premium Insights
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Market Momentum</h2>
          </div>
          <Link href="/map" className="text-sm text-white/65 hover:text-white">
            Explore Full Analytics →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium text-white/80">Top Momentum Signals</h3>
            <div className="grid gap-5">
              {featured.map((neighborhood) => (
                <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-medium text-white/80">Prime Investor Opportunities</h3>
            <div className="grid gap-5">
              {neighborhoods
                .sort((a, b) => b.investor_opportunity_score - a.investor_opportunity_score)
                .slice(0, 3)
                .map((neighborhood) => (
                  <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
