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

      <section className="container-wrap pt-20 pb-28">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-neutral-400">
            Predictive Real Estate Intelligence
          </p>
          <h1 className="section-title">
            Data-Driven Insights for Strategic Investors
          </h1>
          <p className="section-copy mt-6 max-w-2xl">
            NaextBlock delivers premium neighborhood-level intelligence to help investors
            identify emerging opportunities, assess market momentum, and make informed
            decisions backed by proprietary analytics.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/auth/sign-up" className="btn btn-primary">
              Get Started
            </Link>
            <Link href="/map" className="btn btn-secondary">
              Explore Markets
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

      <section id="privacy" className="container-wrap py-14">
        <div className="card grid gap-8 p-8 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">Privacy first</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Your loved one’s likeness should never belong to a platform.
            </h2>
          </div>
          <div className="space-y-4 text-neutral-300">
            <p>ForeverLuvd is built on the principle that memory is sacred.</p>
            <p>You own the data. Your family controls the access. Encryption and protected storage are defaults, not add-ons.</p>
            <p>No resale. No hidden training. No exploiting grief.</p>
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
