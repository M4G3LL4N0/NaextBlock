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

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Featured neighborhoods
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Top signals right now</h2>
          </div>
          <Link href="/map" className="text-sm text-white/65 hover:text-white">
            Open full map →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featured.map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
          ))}
        </div>
      </section>
    </main>
  );
}
