"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrackButton({
  neighborhoodId,
  isTracked,
  trackingCount,
}: {
  neighborhoodId: string;
  isTracked?: boolean;
  trackingCount?: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ neighborhoodId }),
      });

      if (!response.ok) {
        throw new Error("Failed to track neighborhood");
      }
    } catch (err) {
      setError("Failed to track neighborhood. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleTrack}
        disabled={isLoading}
        className={cn(
          "flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
          isTracked
            ? "border-emerald-400/30 bg-gradient-to-b from-emerald-400/10 to-emerald-500/10 text-emerald-400 hover:bg-emerald-400/20"
            : "border-white/10 bg-black/50 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white/80",
          isLoading && "opacity-70"
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            {isTracked ? "Tracking" : "Track Neighborhood"}
          </>
        )}
      </button>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
      {trackingCount && trackingCount > 0 && (
        <p className="mt-1 text-xs text-emerald-400/80">
          Tracked by {trackingCount} investors
        </p>
      )}
    </div>
  );
}
