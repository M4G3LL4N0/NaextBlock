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
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-end justify-between gap-3">
          <span className="text-3xl font-semibold text-white">{numericValue}</span>
          <span
            className={clsx(
              "rounded-full px-2 py-1 text-xs font-medium",
              numericValue >= 80 && "bg-emerald-500/15 text-emerald-300",
              numericValue >= 50 && numericValue < 80 && "bg-amber-500/15 text-amber-300",
              numericValue < 50 && "bg-sky-500/15 text-sky-300",
            )}
          >
            {numericValue >= 80 ? "accelerating" : numericValue >= 50 ? "stable" : "warning"}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={clsx(
              "h-1",
              numericValue >= 80 && "bg-gradient-to-r from-emerald-400 to-emerald-500",
              numericValue >= 50 && numericValue < 80 && "bg-gradient-to-r from-amber-400 to-amber-500",
              numericValue < 50 && "bg-gradient-to-r from-sky-400 to-sky-500",
            )}
            style={{ width: `${numericValue}%` }}
          />
        </div>
      </div>
    </div>
  );
}
