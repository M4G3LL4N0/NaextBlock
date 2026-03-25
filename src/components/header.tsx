import Link from "next/link";
import { Building2 } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-white">
              NAEXTBLOCK
            </p>
            <p className="text-xs text-white/45">
              Predictive Real Estate Intelligence
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/map" className="transition hover:text-white">
            NaextMap
          </Link>
          <a href="#waitlist" className="transition hover:text-white">
            Join waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
