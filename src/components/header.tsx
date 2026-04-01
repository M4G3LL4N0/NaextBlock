import Link from "next/link";
import { Building2 } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-white">
              NAEXTBLOCK
            </p>
            <p className="mt-0.5 text-[0.7rem] tracking-[0.1em] text-white/50">
              PREDICTIVE REAL ESTATE INTELLIGENCE
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-5 text-[0.8rem] font-medium tracking-[0.1em] text-white/80">
          <Link href="/map" className="transition hover:text-white">
            NaextMap
          </Link>
          <a href="#waitlist" className="transition hover:text-white">
            Join Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
