import clsx from "clsx";

export function ScoreBadge({
  label,
  value,
  description,
}: {
  label: string;
  value: number | null;
  description?: string;
}) {
  const numericValue = value ?? 0;
  const status = numericValue >= 80 ? 'accelerating' : numericValue >= 50 ? 'stable' : 'warning';

  const statusColors = {
    accelerating: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      bar: 'bg-emerald-400',
    },
    stable: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      bar: 'bg-amber-400',
    },
    warning: {
      bg: 'bg-sky-500/10',
      text: 'text-sky-400',
      bar: 'bg-sky-400',
    },
  };

  return (
    <div className={clsx(
      "rounded-lg border border-white/5 p-3",
      statusColors[status].bg
    )}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">{label}</p>
          <p className="mt-1 text-sm text-white/80">{description}</p>
        </div>
        <span className={clsx(
          "rounded-full px-2.5 py-1 text-xs font-medium",
          statusColors[status].text,
          statusColors[status].bg
        )}>
          {status}
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-semibold text-white">{numericValue}</span>
        <div className="relative h-1.5 w-3/4 overflow-hidden rounded-full bg-white/5">
          <div
            className={clsx(
              "absolute h-1.5",
              statusColors[status].bar
            )}
            style={{ width: `${numericValue}%` }}
          />
        </div>
      </div>
    </div>
  );
}
