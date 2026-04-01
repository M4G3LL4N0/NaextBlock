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
  const status = numericValue >= 80 ? 'prime' : numericValue >= 60 ? 'strong' : 'selective';

  const statusConfig = {
    prime: {
      color: 'emerald',
      label: 'Prime',
      description: 'High conviction opportunity'
    },
    strong: {
      color: 'amber',
      label: 'Strong',
      description: 'Favorable conditions'
    },
    selective: {
      color: 'sky',
      label: 'Selective',
      description: 'Conditional opportunity'
    }
  }[status];

  return (
    <div className={clsx(
      "rounded-lg border border-white/5 p-4",
      `bg-${statusConfig.color}-500/5`
    )}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">
            {label}
          </p>
          <p className="mt-1 text-sm text-white/80">
            {description || statusConfig.description}
          </p>
        </div>
        <span className={clsx(
          "rounded-full px-2.5 py-1 text-xs font-medium",
          `text-${statusConfig.color}-400`,
          `bg-${statusConfig.color}-500/10`
        )}>
          {statusConfig.label}
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-semibold text-white">
          {numericValue}
        </span>
        <div className="relative h-1.5 w-3/4 overflow-hidden rounded-full bg-white/5">
          <div
            className={clsx(
              "absolute h-1.5",
              `bg-${statusConfig.color}-400`
            )}
            style={{ width: `${numericValue}%` }}
          />
        </div>
      </div>
    </div>
  );
}
