import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { ScoreBadge } from "@/components/score-badge";
import { getNeighborhoodBySlug } from "@/lib/data";

function formatMoney(value: number | null) {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    notFound();
  }

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">
          Neighborhood intelligence
        </p>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight">
              {neighborhood.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/60">
              {neighborhood.long_description}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm text-white/45">Median home price</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {formatMoney(neighborhood.median_home_price)}
            </p>
            <p className="mt-2 text-sm text-white/60">
              Projected 3Y growth: {neighborhood.projected_growth_3y ?? 0}%
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {/* Market Fundamentals */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">Market Fundamentals</h3>
            <div className="grid gap-4">
              <ScoreBadge label="Momentum" value={neighborhood.momentum_score} />
              <ScoreBadge label="Appreciation" value={neighborhood.appreciation_score} />
              <ScoreBadge label="Amenity Growth" value={neighborhood.amenity_growth_score} />
            </div>
          </div>

          {/* Supply Dynamics */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">Supply Dynamics</h3>
            <div className="grid gap-4">
              <ScoreBadge label="Seller Intent" value={neighborhood.seller_intent_score} />
              <ScoreBadge label="Generational Hold" value={neighborhood.generational_hold_score} />
              <ScoreBadge label="Turnover Risk" value={neighborhood.turnover_risk_score} />
            </div>
          </div>

          {/* Investment Profile */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">Investment Profile</h3>
            <div className="grid gap-4">
              <ScoreBadge label="Investor Opportunity" value={neighborhood.investor_opportunity_score} />
              <ScoreBadge label="Buyer Timing" value={neighborhood.buyer_timing_score} />
              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-sm font-medium text-white/80">Strategic Pulse</p>
                <p className="mt-1 text-xs text-white/50">
                  {neighborhood.status === 'rising' 
                    ? 'Strong momentum with favorable demand/supply dynamics.'
                    : neighborhood.status === 'stable'
                    ? 'Steady fundamentals with balanced risks.'
                    : 'Caution advised - monitor supply and pricing trends.'}
                </p>
              </div>
            </div>
          </div>

          {/* Operator Signals */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">Operator Signals</h3>
            <div className="grid gap-4">
              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-sm font-medium text-white/80">Best For</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-white/50">
                  {neighborhood.investor_opportunity_score > 70 && <li>Yield-seeking investors</li>}
                  {neighborhood.generational_hold_score > 60 && <li>Long-term holders</li>}
                  {neighborhood.turnover_risk_score > 65 && <li>Turnaround operators</li>}
                  {neighborhood.amenity_growth_score > 75 && <li>Location arbitrage</li>}
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="text-sm font-medium text-white/80">Key Insights</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-white/50">
                  {neighborhood.momentum_score > 75 && <li>Strong demand momentum</li>}
                  {neighborhood.seller_intent_score > 65 && <li>Potential inventory growth</li>}
                  {neighborhood.turnover_risk_score > 60 && <li>Watch for supply timing</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              NaextBlock read
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Why this area matters</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              NaextBlock combines location desirability, demand migration,
              amenity momentum, turnover probability, and hold behavior to estimate
              where opportunities are emerging before mainstream marketplaces turn
              them into consensus.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p>• Rising neighborhoods tend to compound attention after signals align.</p>
              <p>• Low hold score + high momentum often creates better acquisition windows.</p>
              <p>• High hold score can signal scarcity unless pricing pressure changes behavior.</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Operator view
            </p>
            <h2 className="mt-3 text-2xl font-semibold">How to use this scorecard</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-white/60">
              <p>
                <span className="font-medium text-white">Investors:</span> prioritize
                areas with rising momentum and strong investor opportunity while
                watching turnover risk for supply timing.
              </p>
              <p>
                <span className="font-medium text-white">Buyers:</span> use buyer timing
                and appreciation scores to compare whether you are buying into future
                upside or paying peak pricing.
              </p>
              <p>
                <span className="font-medium text-white">Agents:</span> watch seller
                intent and generational hold to understand whether inventory is likely
                to emerge organically or requires aggressive prospecting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
