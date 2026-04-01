import Link from "next/link";
import Nav from "@/components/Nav";
import { NeighborhoodCard } from "@/components/neighborhood-card";
import { getNeighborhoods } from "@/lib/data";

export default async function HomePage() {
  const neighborhoods = await getNeighborhoods();
  const topOpportunities = neighborhoods
    .sort((a, b) => b.investor_opportunity_score - a.investor_opportunity_score)
    .slice(0, 5);

  return (
    <main className="pb-20">
      <Nav />

      <section className="mx-auto max-w-7xl px-6 pt-32 pb-40">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-emerald-400/80">
            Predictive Real Estate Intelligence
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            See Where Markets Are Moving Next
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            NaextBlock delivers premium neighborhood-level intelligence to help investors
            identify emerging opportunities before the market fully sees them. Our proprietary
            analytics surface momentum signals, timing indicators, and strategic insights
            for discerning investors.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/map"
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Explore Markets
            </Link>
            <Link
              href="#waitlist"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Request Access
            </Link>
          </div>
        </div>
      </section>

      <section className="container-wrap py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Top Opportunities Right Now
          </h2>
          <p className="section-copy mt-4">
            Our proprietary scoring identifies neighborhoods with the strongest
            investment potential based on momentum, growth projections, and market dynamics.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topOpportunities.map((neighborhood) => {
            let rationale = "";
            if (neighborhood.investor_opportunity_score >= 85) {
              rationale = "Exceptional growth potential with strong momentum";
            } else if (neighborhood.investor_opportunity_score >= 75) {
              rationale = "High upside with favorable market conditions";
            } else {
              rationale = "Emerging opportunity with improving fundamentals";
            }

            return (
              <div key={neighborhood.id} className="card p-6">
                <h3 className="text-xl font-semibold">{neighborhood.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {neighborhood.investor_opportunity_score}
                  </span>
                  <span className="text-sm text-neutral-400">Investor Score</span>
                </div>
                <p className="mt-4 text-neutral-400">{rationale}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-neutral-400">Projected Growth</p>
                    <p className="mt-1 font-medium">
                      {neighborhood.projected_growth_3y}%
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">Median Price</p>
                    <p className="mt-1 font-medium">
                      {neighborhood.median_home_price
                        ? `$${neighborhood.median_home_price.toLocaleString()}`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-wrap py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Featured Neighborhoods
          </h2>
          <p className="section-copy mt-4">
            Explore in-depth analytics for neighborhoods with strong investment profiles
            across key metrics including momentum, appreciation potential, and market timing.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.slice(0, 6).map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="container-wrap py-14">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="section-copy mt-4">
            Start with preservation first. Build trust first. Then expand into voice, legacy,
            and AI interaction later.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Create a loved one", "Start a private profile for someone important in your life."],
            ["Upload memories", "Add photos, videos, audio, stories, and written notes."],
            ["Build their timeline", "Organize the moments that define who they are and what they meant to you."]
          ].map(([title, copy]) => (
            <div key={title} className="card p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-neutral-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wrap py-14">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card p-6">
                <Icon className="h-6 w-6" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-neutral-400">{feature.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-wrap py-20">
        <div className="card grid gap-10 p-8 xl:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight">
              Join NaextBlock{"'"}s Beta Program
            </h2>
            <div className="space-y-4 text-neutral-300">
              <p>
                Apply for early access to our predictive real estate intelligence platform. 
                Spaces are limited to serious investors only.
              </p>
              <p>
                Beta members receive 3 months of free access and direct input into product development.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur sm:p-10">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="container-wrap py-14">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Simple pricing</h2>
          <p className="section-copy mt-4">
            Start with a clean consumer plan now. Add family and legacy tiers after launch.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Starter", "Free", "1 loved one profile, basic memory uploads, private dashboard"],
            ["Personal", "$12/mo", "More storage, unlimited memory entries, better organization"],
            ["Family", "$29/mo", "Multiple loved ones, shared family access, future legacy features"],
          ].map(([name, price, copy]) => (
            <div key={name} className="card p-6">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="mt-3 text-3xl font-bold">{price}</p>
              <p className="mt-4 text-neutral-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
