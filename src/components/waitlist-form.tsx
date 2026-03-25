"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_name: fullName, email, city }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || "Something went wrong.");
      return;
    }

    setStatus("You're in.");
    setFullName("");
    setEmail("");
    setCity("");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full name"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
      />
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
        className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-black transition hover:opacity-90"
      >
        Join the waitlist
      </button>
      <p className="text-sm text-white/60">{status}</p>
    </form>
  );
}
