import clsx from "clsx";

export function ScoreBadge({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  const numericValue = value ?? 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-white/50">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <span className="text-3xl font-semibold text-white">{numericValue}</span>
        <span
          className={clsx(
            "rounded-full px-2 py-1 text-xs font-medium",
            numericValue >= 80 && "bg-emerald-500/15 text-emerald-300",
            numericValue >= 50 &&
              numericValue < 80 &&
              "bg-amber-500/15 text-amber-300",
            numericValue < 50 && "bg-sky-500/15 text-sky-300",
          )}
        >
          {numericValue >= 80
            ? "rising"
            : numericValue >= 50
              ? "stable"
              : "declining"}
        </span>
      </div>
    </div>
  );
}
