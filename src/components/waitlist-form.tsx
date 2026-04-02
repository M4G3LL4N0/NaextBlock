"use client";

import { useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";

export function WaitlistForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const isLoading = status === "submitting";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_name: fullName, email, city }),
    });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch (err) {
      setError("Failed to connect. Please check your connection.");
      setStatus("error");
    }
    setFullName("");
    setEmail("");
    setCity("");
  }

  if (status === "success") {
    return (
      <div className="space-y-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/10">
          <FiCheck className="h-6 w-6 text-emerald-400" />
        </div>
        <h3 className="text-lg font-medium text-white">Access Secured</h3>
        <p className="text-sm text-white/80">
          You're now on the NaextBlock waitlist. We'll notify you when your access is ready.
        </p>
        <p className="text-xs text-white/50">
          Early access includes 3 months of premium intelligence at no cost.
        </p>
        <p className="text-xs text-white/50">
          Spaces are limited to serious investors only.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Smith"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-white/35 focus:border-white/20 focus:ring-1 focus:ring-white/5 hover:bg-white/10"
          disabled={isLoading}
        />
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
      />
      <button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 px-4 py-3 font-semibold text-black transition hover:opacity-90"
      >
        Join the waitlist
      </button>
      <div className="pt-2">
        {error && (
          <div className="mb-2 rounded-lg border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-400">
            {error}
          </div>
        )}
        <p className="text-xs text-white/45">
          By joining, you agree to our terms and privacy policy.
        </p>
      </div>
    </form>
  );
}
