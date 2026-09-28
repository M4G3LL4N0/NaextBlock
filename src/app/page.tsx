import Link from "next/link";
import { ProductHonestyNote } from "@/components/ProductHonestyNote";
import { Header } from "@/components/header";
import { NeighborhoodCard } from "@/components/neighborhood-card";
import { WaitlistForm } from "@/components/waitlist-form";
import { getNeighborhoods, getTopOpportunities } from "@/lib/data";
import { getOpportunityReason } from "@/lib/insights";

export default async function HomePage() {
  const neighborhoods = await getNeighborhoods();
  const topOpportunities = getTopOpportunities(neighborhoods, 5);

  return (
    <div>
      <Header />

      <section className="border-b border-white/10" data-reveal>
        <div data-stagger className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/55">
              Predictive Real Estate Intelligence
            </p>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Find the next block and the overlooked house inside it.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              NaextBlock combines neighborhood momentum, seller emergence, buyer timing, and Defect Alpha to identify where hidden real estate upside may emerge before the market fully prices it in.
            </p>

            <div data-stagger className="mt-8 flex flex-wrap gap-4">
              <Link href="/map" className="motion-card motion-hover-lift rounded-2xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90">
                Explore NaextMap
              </Link>
              <Link href="/deal-analyzer" className="motion-card motion-hover-lift rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/80 hover:bg-white/10">
                Analyze a deal
              </Link>
            </div>

            <div data-stagger className="mt-12 grid gap-4 md:grid-cols-3">
              <Feature title="Neighborhood momentum" body="See where demand, amenities, and future appreciation signals are strengthening." />
              <Feature title="Seller emergence" body="Track turnover, hold behavior, and inventory signals before listings become obvious." />
              <Feature title="Defect Alpha" body="Separate fixable fear from real risk when a property issue creates a repair-adjusted discount." />
            </div>
          </div>

          <div id="waitlist" className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Early access</p>
            <h2 className="mt-4 text-3xl font-semibold">Get the first NaextBlock reads</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Built for investors, serious buyers, and operators who want to understand opportunity before it becomes obvious.
            </p>
            <div className="mt-6">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" data-reveal>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Defect Alpha</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Some problems are deal killers. Some are hidden spread.</h2>
          <p className="mt-4 text-white/65 leading-7">
            A bad backyard, old roof, ugly finishes, poor photos, or cosmetic neglect can scare away normal buyers. NaextBlock estimates whether the market discount is larger than the repair cost plus risk buffer.
          </p>
        </div>

        <div data-stagger className="mt-8 grid gap-5 lg:grid-cols-4">
          <Metric title="Market discount" value="Sample walkthrough" />
          <Metric title="Repair estimate" value="Input your numbers" />
          <Metric title="Risk buffer" value="You set the buffer" />
          <Metric title="Hidden spread" value="Discount − repair − buffer" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" data-reveal>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Top opportunities</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Signals worth watching now</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/55">
              Scores below come from this demo&apos;s neighborhood dataset — planning signals, not audited market returns.
            </p>
          </div>
          <Link href="/map" className="text-sm text-white/60 hover:text-white">Open NaextMap →</Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {topOpportunities.map((item) => (
            <div key={item.slug} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="mt-2 text-3xl font-semibold">{item.investor_opportunity_score}</p>
              <p className="mt-3 text-sm leading-6 text-white/60">{getOpportunityReason(item)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16" data-reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {neighborhoods.slice(0, 3).map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>NaextBlock is an early-stage predictive real estate intelligence demo.</p>
        </div>
      </footer>
      <ProductHonestyNote status="demo" />
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/60">{body}</p>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
