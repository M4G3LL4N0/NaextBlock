import Link from "next/link";
import { Home, Map, LineChart } from "lucide-react";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-emerald-400 to-emerald-500" />
          <p className="text-lg font-medium tracking-tight text-white">
            Naext<span className="font-light text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-500">Block</span>
          </p>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <Home className="h-3.5 w-3.5" />
            Dashboard
          </Link>
          <Link
            href="/map"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <Map className="h-3.5 w-3.5" />
            Market Intelligence
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5">
            <LineChart className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <Link
            href="#waitlist"
            className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-400 transition hover:bg-emerald-400/20 hover:border-emerald-400/30"
          >
            Request Access
          </Link>
        </div>
      </div>
    </header>
  );
}
