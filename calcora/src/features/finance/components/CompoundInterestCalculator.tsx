import { useMemo, useState } from "react";
import {
  Calculator,
  ChevronDown,
  Percent,
  IndianRupee,
} from "lucide-react";
import {
  calculateCompoundInterest,
  type CompoundingFrequency,
} from "../financeUtils";

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [interestRate, setInterestRate] = useState("8");
  const [time, setTime] = useState("2");
  const [timeUnit, setTimeUnit] = useState<"years" | "months">(
    "years",
  );
  const [frequency, setFrequency] =
    useState<CompoundingFrequency>("yearly");

  const calculation = useMemo(() => {
    const principalValue = Number(principal);
    const rateValue = Number(interestRate);
    const timeValue = Number(time);

    if (
      !Number.isFinite(principalValue) ||
      !Number.isFinite(rateValue) ||
      !Number.isFinite(timeValue) ||
      principalValue <= 0 ||
      rateValue < 0 ||
      timeValue <= 0
    ) {
      return null;
    }

    const timeYears =
      timeUnit === "months"
        ? timeValue / 12
        : timeValue;

    try {
      return calculateCompoundInterest(
        principalValue,
        rateValue,
        timeYears,
        frequency,
      );
    } catch {
      return null;
    }
  }, [
    principal,
    interestRate,
    time,
    timeUnit,
    frequency,
  ]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  const principalPercentage =
    calculation && calculation.totalAmount > 0
      ? (calculation.principal /
          calculation.totalAmount) *
        100
      : 0;

  const interestPercentage =
    calculation && calculation.totalAmount > 0
      ? (calculation.interest /
          calculation.totalAmount) *
        100
      : 0;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
          <Calculator size={18} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-semibold">
            Compound Interest
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Calculate how your money grows with compound interest.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Principal */}
          <div>
            <label
              htmlFor="compound-principal"
              className="mb-2 block text-sm font-medium"
            >
              Principal amount
            </label>

            <div className="relative">
              <IndianRupee
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                id="compound-principal"
                type="number"
                min="0"
                value={principal}
                onChange={(event) =>
                  setPrincipal(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="100000"
              />
            </div>
          </div>

          {/* Interest rate */}
          <div>
            <label
              htmlFor="compound-rate"
              className="mb-2 block text-sm font-medium"
            >
              Annual interest rate
            </label>

            <div className="relative">
              <input
                id="compound-rate"
                type="number"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(event) =>
                  setInterestRate(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 pr-10 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="8"
              />

              <Percent
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="compound-time"
              className="mb-2 block text-sm font-medium"
            >
              Time period
            </label>

            <div className="flex min-w-0 w-full gap-2">
              <input
                id="compound-time"
                type="number"
                min="0"
                step="0.1"
                value={time}
                onChange={(event) =>
                  setTime(event.target.value)
                }
                className="block h-11 min-w-0 w-0 flex-1 max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="2"
              />

              <div className="flex shrink-0 rounded-lg border border-[var(--border)] bg-[var(--background)] p-1">
                <button
                  type="button"
                  onClick={() => setTimeUnit("years")}
                  className={`min-h-9 rounded-md px-3 text-xs font-medium transition-colors ${
                    timeUnit === "years"
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Years
                </button>

                <button
                  type="button"
                  onClick={() => setTimeUnit("months")}
                  className={`min-h-9 rounded-md px-3 text-xs font-medium transition-colors ${
                    timeUnit === "months"
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Months
                </button>
              </div>
            </div>
          </div>

          {/* Compounding frequency */}
          <div>
            <label
              htmlFor="compound-frequency"
              className="mb-2 block text-sm font-medium"
            >
              Compounding frequency
            </label>

            <div className="relative">
              <select
                id="compound-frequency"
                value={frequency}
                onChange={(event) =>
                  setFrequency(
                    event.target.value as CompoundingFrequency,
                  )
                }
                className="block h-11 w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 pr-10 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
              >
                <option value="yearly">Yearly</option>
                <option value="half-yearly">
                  Half-yearly
                </option>
                <option value="quarterly">
                  Quarterly
                </option>
                <option value="monthly">Monthly</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
          {calculation ? (
            <>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Total amount
                </p>

                <p className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatCurrency(
                    calculation.totalAmount,
                  )}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-[var(--muted)]">
                    Principal
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(
                      calculation.principal,
                    )}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-[var(--muted)]">
                    Interest earned
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(
                      calculation.interest,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Amount breakdown
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    {calculation.numberOfCompounds} compounds
                  </p>
                </div>

                <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full bg-[var(--foreground)]"
                    style={{
                      width: `${principalPercentage}%`,
                    }}
                  />

                  <div
                    className="h-full bg-[var(--muted)]"
                    style={{
                      width: `${interestPercentage}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                    Principal {principalPercentage.toFixed(1)}%
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--muted)]" />
                    Interest {interestPercentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[220px] items-center justify-center text-center">
              <div>
                <p className="text-sm font-medium">
                  Enter valid values
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Results will appear here automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompoundInterestCalculator;