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
            Predictive Market Intelligence
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            Capitalize on Neighborhood Momentum Before It's Obvious
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            NaextBlock surfaces emerging neighborhood opportunities 12-24 months before they're priced in. 
            Our proprietary models analyze momentum, timing, and market inefficiencies to give 
            investors a decisive edge in capital allocation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/map"
              className="rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Explore Market Intelligence
            </Link>
            <Link
              href="#waitlist"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/20"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      </section>

      <section className="container-wrap py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Top Opportunities Right Now
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Our proprietary scoring identifies neighborhoods with the strongest
            investment potential based on momentum, growth projections, and market dynamics.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topOpportunities.map((neighborhood) => {
            const rationale = neighborhood.investor_opportunity_score >= 85
              ? "Exceptional growth potential with strong momentum"
              : neighborhood.investor_opportunity_score >= 75
                ? "High upside with favorable market conditions"
                : "Emerging opportunity with improving fundamentals";

            return (
              <div key={neighborhood.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-white">{neighborhood.name}</h3>
                  <span className={`h-3 w-3 rounded-full ${
                    neighborhood.status === "rising" ? "bg-emerald-400" :
                    neighborhood.status === "stable" ? "bg-amber-400" : "bg-sky-400"
                  }`} />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    {neighborhood.investor_opportunity_score}
                  </span>
                  <span className="text-sm text-white/50">Investor Score</span>
                </div>
                <p className="mt-4 text-sm text-white/70">{rationale}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/50">Projected Growth</p>
                    <p className="mt-1 font-medium text-white">
                      {neighborhood.projected_growth_3y}%
                    </p>
                  </div>
                  <div>
                    <p className="text-white/50">Median Price</p>
                    <p className="mt-1 font-medium text-white">
                      {neighborhood.median_home_price
                        ? `$${neighborhood.median_home_price.toLocaleString()}`
                        : "—"}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/neighborhood/${neighborhood.slug}`}
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    View Analysis →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-wrap py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Featured Neighborhoods
          </h2>
          <p className="mt-4 text-lg text-white/80">
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
            Identify emerging opportunities through predictive analytics, capitalize on market momentum,
            and optimize your investment strategy with real-time neighborhood intelligence.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Market Analysis", "Our models analyze neighborhood momentum and market dynamics to surface high-potential opportunities."],
            ["Investment Scoring", "Proprietary scoring system evaluates investor opportunity, timing, and risk factors."],
            ["Strategic Insights", "Get actionable recommendations tailored to your investment profile and goals."]
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-white/80">{copy}</p>
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
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-10 xl:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Join NaextBlock{"'"}s Beta Program
              </h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Apply for early access to our predictive real estate intelligence platform. 
                  Spaces are limited to serious investors only.
                </p>
                <p>
                  Beta members receive 3 months of premium access and direct input into product development.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur sm:p-8">
                <WaitlistForm />
              </div>
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
