import { useMemo, useState } from "react";
import {
  BarChart3,
  Hash,
  Maximize2,
  Minimize2,
  Sigma,
} from "lucide-react";
import {
  count,
  maximum,
  mean,
  median,
  minimum,
  mode,
  range,
  sum,
} from "../statisticsUtils";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 10,
  }).format(value);
}

function parseValues(input: string): number[] | null {
  const trimmed = input.trim();

  if (!trimmed) {
    return null;
  }

  const parts = trimmed.split(/[\s,]+/);

  const values = parts.map(Number);

  if (
    values.length === 0 ||
    values.some((value) => !Number.isFinite(value))
  ) {
    return null;
  }

  return values;
}

function StatisticsCalculator() {
  const [input, setInput] = useState("10, 20, 20, 30, 40");

  const values = useMemo(() => parseValues(input), [input]);

  const results = useMemo(() => {
    if (!values) {
      return null;
    }

    try {
      return {
        count: count(values),
        sum: sum(values),
        mean: mean(values),
        median: median(values),
        mode: mode(values),
        minimum: minimum(values),
        maximum: maximum(values),
        range: range(values),
      };
    } catch {
      return null;
    }
  }, [values]);

  const inputClassName =
    "min-h-28 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm leading-6 outline-none transition focus:border-[var(--foreground)]";

  const statCardClassName =
    "rounded-xl border border-[var(--border)] bg-[var(--background)] p-4";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <BarChart3
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Statistics Calculator
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Analyze a dataset and calculate common statistical values.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <label
            htmlFor="statistics-dataset"
            className="mb-2 block text-xs font-medium text-[var(--muted)]"
          >
            Dataset
          </label>

          <textarea
            id="statistics-dataset"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter numbers separated by commas or spaces"
            className={inputClassName}
          />

          <p className="mt-2 text-xs text-[var(--muted)]">
            Example: 10, 20, 20, 30, 40
          </p>

          {!values && input.trim() && (
            <p className="mt-2 text-xs text-[var(--danger)]">
              Enter only valid numbers separated by commas or spaces.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className={statCardClassName}>
            <div className="flex items-center gap-2 text-[var(--muted)]">
              <Hash size={15} />
              <span className="text-xs font-medium">Count</span>
            </div>

            <p className="mt-3 text-xl font-semibold">
              {results ? formatNumber(results.count) : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <div className="flex items-center gap-2 text-[var(--muted)]">
              <Sigma size={15} />
              <span className="text-xs font-medium">Sum</span>
            </div>

            <p className="mt-3 text-xl font-semibold break-all">
              {results ? formatNumber(results.sum) : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <span className="text-xs font-medium text-[var(--muted)]">
              Mean
            </span>

            <p className="mt-3 text-xl font-semibold break-all">
              {results ? formatNumber(results.mean) : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <span className="text-xs font-medium text-[var(--muted)]">
              Median
            </span>

            <p className="mt-3 text-xl font-semibold break-all">
              {results ? formatNumber(results.median) : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <span className="text-xs font-medium text-[var(--muted)]">
              Mode
            </span>

            <p className="mt-3 text-xl font-semibold break-all">
              {results
                ? results.mode.length > 0
                  ? results.mode.map(formatNumber).join(", ")
                  : "No mode"
                : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <span className="text-xs font-medium text-[var(--muted)]">
              Range
            </span>

            <p className="mt-3 text-xl font-semibold break-all">
              {results ? formatNumber(results.range) : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <div className="flex items-center gap-2 text-[var(--muted)]">
              <Minimize2 size={15} />
              <span className="text-xs font-medium">Minimum</span>
            </div>

            <p className="mt-3 text-xl font-semibold break-all">
              {results ? formatNumber(results.minimum) : "—"}
            </p>
          </div>

          <div className={statCardClassName}>
            <div className="flex items-center gap-2 text-[var(--muted)]">
              <Maximize2 size={15} />
              <span className="text-xs font-medium">Maximum</span>
            </div>

            <p className="mt-3 text-xl font-semibold break-all">
              {results ? formatNumber(results.maximum) : "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatisticsCalculator;