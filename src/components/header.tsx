"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, Map, LineChart } from "lucide-react";

const navLinks = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/map", label: "Market Intelligence", icon: Map },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <div className="h-6 w-6 shrink-0 rounded-sm bg-gradient-to-br from-emerald-400 to-emerald-500" />
          <p className="truncate text-base font-medium tracking-tight text-white sm:text-lg">
            <span className="font-medium">Naext</span>
            <span className="bg-gradient-to-br from-emerald-400 to-emerald-500 bg-clip-text font-light text-transparent">
              Block
            </span>
            <span className="ml-1.5 text-xs font-medium tracking-wider text-white/40">BETA</span>
          </p>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 sm:flex">
            <LineChart className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <Link
            href="/#waitlist"
            className="hidden rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-400 transition hover:border-emerald-400/30 hover:bg-emerald-400/20 sm:inline-flex sm:px-4"
            onClick={() => setOpen(false)}
          >
            Request Access
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
            aria-expanded={open}
            aria-controls="naextblock-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="naextblock-mobile-nav"
          className="border-t border-white/10 bg-black md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4 text-emerald-400" />
                {label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-300"
              onClick={() => setOpen(false)}
            >
              Request Access
            </Link>
            <p className="px-3 pt-1 text-[11px] leading-relaxed text-white/45">
              Market intelligence for research — not investment, lending, or legal advice. Verify signals independently.
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
