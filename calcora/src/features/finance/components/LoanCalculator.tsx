import { useMemo, useState } from "react";
import { calculateLoan } from "../financeUtils";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [tenureUnit, setTenureUnit] = useState<
    "years" | "months"
  >("years");

  const calculation = useMemo(() => {
    const principal = Number(loanAmount);
    const rate = Number(interestRate);
    const enteredTenure = Number(tenure);

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(enteredTenure) ||
      principal <= 0 ||
      rate < 0 ||
      enteredTenure <= 0
    ) {
      return null;
    }

    const tenureYears =
      tenureUnit === "years"
        ? enteredTenure
        : enteredTenure / 12;

    try {
      return calculateLoan(
        principal,
        rate,
        tenureYears,
      );
    } catch {
      return null;
    }
  }, [
    loanAmount,
    interestRate,
    tenure,
    tenureUnit,
  ]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold">
          Loan / EMI Calculator
        </h2>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--muted)]">
          Enter your loan details to calculate your monthly
          repayment.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Loan amount */}
        {/* Loan amount */}
<div className="min-w-0">
  <label
    htmlFor="loan-amount"
    className="mb-2 block text-sm font-medium"
  >
    Loan amount
  </label>

  <div className="relative min-w-0">
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
      ₹
    </span>

    <input
      id="loan-amount"
      type="number"
      min="0"
      value={loanAmount}
      onChange={(event) =>
        setLoanAmount(event.target.value)
      }
      className="block h-11 min-w-0 w-full max-w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--background)] pl-8 pr-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
      placeholder="1,000,000"
    />
  </div>
</div>

{/* Interest rate */}
<div className="min-w-0">
  <label
    htmlFor="interest-rate"
    className="mb-2 block text-sm font-medium"
  >
    Interest rate
  </label>

  <div className="relative min-w-0">
    <input
      id="interest-rate"
      type="number"
      min="0"
      step="0.01"
      value={interestRate}
      onChange={(event) =>
        setInterestRate(event.target.value)
      }
      className="block h-11 min-w-0 w-full max-w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 pr-8 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
      placeholder="8.5"
    />

    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">
      %
    </span>
  </div>

  <p className="mt-1.5 text-xs text-[var(--muted)]">
    Annual interest rate
  </p>
</div>

{/* Loan tenure */}
<div className="min-w-0 md:col-span-2">
  <label
    htmlFor="loan-tenure"
    className="mb-2 block text-sm font-medium"
  >
    Loan tenure
  </label>

  <div className="flex min-w-0 w-full gap-2">
    <input
      id="loan-tenure"
      type="number"
      min="0"
      step="1"
      value={tenure}
      onChange={(event) =>
        setTenure(event.target.value)
      }
      className="block h-11 min-w-0 flex-1 w-0 max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]"
      placeholder={
        tenureUnit === "years"
          ? "20"
          : "240"
      }
    />

    <div className="flex shrink-0 rounded-lg border border-[var(--border)] bg-[var(--background)] p-1">
      <button
        type="button"
        onClick={() =>
          setTenureUnit("years")
        }
        className={`min-h-9 rounded-md px-3 text-xs font-medium transition-colors sm:px-4 ${
          tenureUnit === "years"
            ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
      >
        Years
      </button>

      <button
        type="button"
        onClick={() =>
          setTenureUnit("months")
        }
        className={`min-h-9 rounded-md px-3 text-xs font-medium transition-colors sm:px-4 ${
          tenureUnit === "months"
            ? "bg-[var(--surface-hover)] text-[var(--foreground)]"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
      >
        Months
      </button>
    </div>
  </div>

  <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">
    Choose whether to enter the loan duration in
    years or months.
  </p>
</div>
      </div>

      {/* Results */}
      {calculation && (
        <div className="mt-7 border-t border-[var(--border)] pt-6 sm:mt-8">
          {/* Monthly EMI */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              Monthly payment
            </p>

            <p className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
              {formatCurrency(
                calculation.monthlyEmi,
              )}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Estimated monthly EMI
            </p>
          </div>

          {/* Summary cards */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="text-xs text-[var(--muted)]">
                Total interest
              </p>

              <p className="mt-2 break-words text-base font-semibold tracking-tight sm:text-lg">
                {formatCurrency(
                  calculation.totalInterest,
                )}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="text-xs text-[var(--muted)]">
                Total payment
              </p>

              <p className="mt-2 break-words text-base font-semibold tracking-tight sm:text-lg">
                {formatCurrency(
                  calculation.totalPayment,
                )}
              </p>
            </div>
          </div>

          {/* Payment breakdown */}
          <div className="mt-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">
                Payment breakdown
              </p>

              <p className="text-xs text-[var(--muted)]">
                Principal + Interest
              </p>
            </div>

            {/* Breakdown bar */}
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--surface-hover)]">
              <div className="flex h-full w-full">
                <div
                  className="h-full bg-[var(--foreground)]"
                  style={{
                    width: `${
                      (calculation.principal /
                        calculation.totalPayment) *
                      100
                    }%`,
                  }}
                />

                <div
                  className="h-full bg-[var(--muted)]"
                  style={{
                    width: `${
                      (calculation.totalInterest /
                        calculation.totalPayment) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Legend */}
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
                        calculation.totalPayment) *
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
                      (calculation.totalInterest /
                        calculation.totalPayment) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>

                <p className="mt-1.5 break-words text-xs text-[var(--muted)]">
                  {formatCurrency(
                    calculation.totalInterest,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;