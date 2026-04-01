import Link from "next/link";
import { Home, Map, LineChart } from "lucide-react";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <p className="text-lg font-medium tracking-tight text-white">
            Naext<span className="font-light text-emerald-400">Block</span>
          </p>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/map"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
          >
            <Map className="h-4 w-4" />
            Market Pulse
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LineChart className="h-5 w-5 text-emerald-400" />
          <Link
            href="#waitlist"
            className="rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 px-4 py-2 text-xs font-medium text-black transition hover:shadow-lg hover:shadow-emerald-400/10"
          >
            Request Access
          </Link>
        </div>
      </div>
    </header>
  );
}
