import { X } from "lucide-react";

import type { CalculationHistoryItem } from "../calculatorTypes";

interface CalculatorHistoryProps {
  history: CalculationHistoryItem[];
  onSelect: (expression: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function CalculatorHistory({
  history,
  onSelect,
  onRemove,
  onClear,
}: CalculatorHistoryProps) {
  if (history.length === 0) {
    return (
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">
              History
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Your recent calculations will appear here.
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-dashed border-[var(--border)] p-6 text-center">
          <p className="text-sm text-[var(--muted)]">
            No calculations yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold">
            History
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Your recent calculations.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          Clear all
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition-colors hover:bg-[var(--surface-hover)]"
          >
            <button
              type="button"
              onClick={() => onSelect(item.expression)}
              className="min-w-0 flex-1 text-left"
              aria-label={`Reuse ${item.expression}`}
            >
              <div className="truncate text-sm text-[var(--muted)]">
                {item.expression}
              </div>

              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="truncate text-lg font-semibold">
                  {item.result}
                </span>

                <span className="shrink-0 text-[10px] text-[var(--muted)]">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] opacity-70 transition-all hover:bg-[var(--background)] hover:text-[var(--foreground)] sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={`Remove ${item.expression} from history`}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalculatorHistory;