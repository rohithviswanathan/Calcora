import { useMemo, useState } from "react";
import {
  Calculator,
  IndianRupee,
  Percent,
} from "lucide-react";
import { calculatePercentage } from "../financeUtils";

function PercentageCalculator() {
  const [percentage, setPercentage] = useState("15");
  const [value, setValue] = useState("2000");

  const calculation = useMemo(() => {
    const percentageValue = Number(percentage);
    const valueAmount = Number(value);

    if (
      !Number.isFinite(percentageValue) ||
      !Number.isFinite(valueAmount) ||
      percentageValue < 0 ||
      valueAmount < 0
    ) {
      return null;
    }

    try {
      return calculatePercentage(
        percentageValue,
        valueAmount,
      );
    } catch {
      return null;
    }
  }, [percentage, value]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const resultPercentage =
    calculation && calculation.value > 0
      ? (calculation.result / calculation.value) * 100
      : 0;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
          <Calculator size={18} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-semibold">
            Percentage
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Find what percentage of a value a given amount represents.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Percentage */}
          <div>
            <label
              htmlFor="percentage-value"
              className="mb-2 block text-sm font-medium"
            >
              Percentage
            </label>

            <div className="relative">
              <input
                id="percentage-value"
                type="number"
                min="0"
                step="0.01"
                value={percentage}
                onChange={(event) =>
                  setPercentage(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 pr-10 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="15"
              />

              <Percent
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
            </div>
          </div>

          {/* Value */}
          <div>
            <label
              htmlFor="percentage-base-value"
              className="mb-2 block text-sm font-medium"
            >
              Value
            </label>

            <div className="relative">
              <IndianRupee
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                id="percentage-base-value"
                type="number"
                min="0"
                step="0.01"
                value={value}
                onChange={(event) =>
                  setValue(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="2000"
              />
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
          {calculation ? (
            <>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Result
                </p>

                <p className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatCurrency(calculation.result)}
                </p>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {calculation.percentage}% of{" "}
                  {formatCurrency(calculation.value)}
                </p>
              </div>

              {/* Visual breakdown */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Percentage of value
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    {resultPercentage.toFixed(1)}%
                  </p>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-[var(--foreground)]"
                    style={{
                      width: `${Math.min(
                        resultPercentage,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Formula */}
              <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                <p className="text-xs text-[var(--muted)]">
                  Calculation
                </p>

                <p className="mt-1 break-words text-sm font-medium">
                  ({calculation.percentage} ÷ 100) ×{" "}
                  {formatCurrency(calculation.value)}
                </p>
              </div>
            </>
          ) : (
            <div className="flex min-h-[220px] items-center justify-center text-center">
              <div>
                <p className="text-sm font-medium">
                  Enter valid values
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Your percentage result will appear here automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PercentageCalculator;