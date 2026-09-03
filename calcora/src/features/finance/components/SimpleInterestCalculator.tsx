import { useMemo, useState } from "react";
import { calculateSimpleInterest } from "../financeUtils";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [interestRate, setInterestRate] = useState("8");
  const [time, setTime] = useState("2");
  const [timeUnit, setTimeUnit] = useState<
    "years" | "months"
  >("years");

  const calculation = useMemo(() => {
    const principalValue = Number(principal);
    const rate = Number(interestRate);
    const enteredTime = Number(time);

    if (
      !Number.isFinite(principalValue) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(enteredTime) ||
      principalValue <= 0 ||
      rate < 0 ||
      enteredTime <= 0
    ) {
      return null;
    }

    const timeYears =
      timeUnit === "years"
        ? enteredTime
        : enteredTime / 12;

    try {
      return calculateSimpleInterest(
        principalValue,
        rate,
        timeYears,
      );
    } catch {
      return null;
    }
  }, [
    principal,
    interestRate,
    time,
    timeUnit,
  ]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold">
          Simple Interest Calculator
        </h2>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--muted)]">
          Calculate the interest earned and total amount on
          a principal over a fixed period.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Principal */}
        <div className="min-w-0">
          <label
            htmlFor="simple-interest-principal"
            className="mb-2 block text-sm font-medium"
          >
            Principal amount
          </label>

          <div className="relative min-w-0">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
              ₹
            </span>

            <input
              id="simple-interest-principal"
              type="number"
              min="0"
              value={principal}
              onChange={(event) =>
                setPrincipal(event.target.value)
              }
              className="block h-11 min-w-0 w-full max-w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--background)] pl-8 pr-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
              placeholder="100,000"
            />
          </div>
        </div>

        {/* Interest rate */}
        <div className="min-w-0">
          <label
            htmlFor="simple-interest-rate"
            className="mb-2 block text-sm font-medium"
          >
            Interest rate
          </label>

          <div className="relative min-w-0">
            <input
              id="simple-interest-rate"
              type="number"
              min="0"
              step="0.01"
              value={interestRate}
              onChange={(event) =>
                setInterestRate(event.target.value)
              }
              className="block h-11 min-w-0 w-full max-w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 pr-8 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
              placeholder="8"
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
              %
            </span>
          </div>

          <p className="mt-1.5 text-xs text-[var(--muted)]">
            Annual interest rate
          </p>
        </div>

        {/* Time */}
        <div className="min-w-0 md:col-span-2">
          <label
            htmlFor="simple-interest-time"
            className="mb-2 block text-sm font-medium"
          >
            Time period
          </label>

          <div className="flex min-w-0 w-full gap-2">
            <input
              id="simple-interest-time"
              type="number"
              min="0"
              step="0.01"
              value={time}
              onChange={(event) =>
                setTime(event.target.value)
              }
              className="block h-11 min-w-0 w-0 flex-1 max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
              placeholder={
                timeUnit === "years"
                  ? "2"
                  : "24"
              }
            />

            <div className="flex shrink-0 rounded-lg border border-[var(--border)] bg-[var(--background)] p-1">
              <button
                type="button"
                onClick={() =>
                  setTimeUnit("years")
                }
                className={`min-h-9 rounded-md px-3 text-xs font-medium transition-colors sm:px-4 ${
                  timeUnit === "years"
                    ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Years
              </button>

              <button
                type="button"
                onClick={() =>
                  setTimeUnit("months")
                }
                className={`min-h-9 rounded-md px-3 text-xs font-medium transition-colors sm:px-4 ${
                  timeUnit === "months"
                    ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Months
              </button>
            </div>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
            Choose whether to enter the time period in years
            or months.
          </p>
        </div>
      </div>

      {/* Results */}
      {calculation && (
        <div className="mt-7 border-t border-[var(--border)] pt-6 sm:mt-8">
          {/* Interest */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              Simple interest
            </p>

            <p className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
              {formatCurrency(calculation.interest)}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Interest earned over the selected period
            </p>
          </div>

          {/* Total amount */}
          <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
            <p className="text-xs text-[var(--muted)]">
              Total amount
            </p>

            <p className="mt-2 break-words text-xl font-semibold tracking-tight sm:text-2xl">
              {formatCurrency(
                calculation.totalAmount,
              )}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Principal + simple interest
            </p>
          </div>

          {/* Breakdown */}
          <div className="mt-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">
                Amount breakdown
              </p>

              <p className="text-xs text-[var(--muted)]">
                Principal + Interest
              </p>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--surface-hover)]">
              <div className="flex h-full w-full">
                <div
                  className="h-full bg-[var(--foreground)]"
                  style={{
                    width: `${
                      (calculation.principal /
                        calculation.totalAmount) *
                      100
                    }%`,
                  }}
                />

                <div
                  className="h-full bg-[var(--muted)]"
                  style={{
                    width: `${
                      (calculation.interest /
                        calculation.totalAmount) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Principal */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--foreground)]" />

                    <span className="text-xs text-[var(--muted)]">
                      Principal
                    </span>
                  </div>

                  <span className="shrink-0 text-sm font-medium">
                    {(
                      (calculation.principal /
                        calculation.totalAmount) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>

                <p className="mt-1.5 break-words text-xs text-[var(--muted)]">
                  {formatCurrency(calculation.principal)}
                </p>
              </div>

              {/* Interest */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--muted)]" />

                    <span className="text-xs text-[var(--muted)]">
                      Interest
                    </span>
                  </div>

                  <span className="shrink-0 text-sm font-medium">
                    {(
                      (calculation.interest /
                        calculation.totalAmount) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>

                <p className="mt-1.5 break-words text-xs text-[var(--muted)]">
                  {formatCurrency(calculation.interest)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleInterestCalculator;