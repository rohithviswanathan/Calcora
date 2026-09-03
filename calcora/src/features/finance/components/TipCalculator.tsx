import { useMemo, useState } from "react";
import {
  Calculator,
  IndianRupee,
  Percent,
  Users,
} from "lucide-react";
import { calculateTip } from "../financeUtils";

function TipCalculator() {
  const [billAmount, setBillAmount] = useState("2000");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [numberOfPeople, setNumberOfPeople] = useState("1");

  const calculation = useMemo(() => {
    const bill = Number(billAmount);
    const tip = Number(tipPercentage);
    const people = Number(numberOfPeople);

    if (
      !Number.isFinite(bill) ||
      !Number.isFinite(tip) ||
      !Number.isFinite(people) ||
      bill < 0 ||
      tip < 0 ||
      people <= 0
    ) {
      return null;
    }

    try {
      return calculateTip(bill, tip, people);
    } catch {
      return null;
    }
  }, [billAmount, tipPercentage, numberOfPeople]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const billPercentage =
    calculation && calculation.totalAmount > 0
      ? (calculation.billAmount /
          calculation.totalAmount) *
        100
      : 0;

  const tipPercentageOfTotal =
    calculation && calculation.totalAmount > 0
      ? (calculation.tipAmount /
          calculation.totalAmount) *
        100
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
            Tip Calculator
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Calculate your tip, total bill, and amount per person.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Bill amount */}
          <div>
            <label
              htmlFor="tip-bill-amount"
              className="mb-2 block text-sm font-medium"
            >
              Bill amount
            </label>

            <div className="relative">
              <IndianRupee
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                id="tip-bill-amount"
                type="number"
                min="0"
                step="0.01"
                value={billAmount}
                onChange={(event) =>
                  setBillAmount(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="2000"
              />
            </div>
          </div>

          {/* Tip percentage */}
          <div>
            <label
              htmlFor="tip-percentage"
              className="mb-2 block text-sm font-medium"
            >
              Tip percentage
            </label>

            <div className="relative">
              <input
                id="tip-percentage"
                type="number"
                min="0"
                step="0.01"
                value={tipPercentage}
                onChange={(event) =>
                  setTipPercentage(event.target.value)
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

          {/* Number of people */}
          <div>
            <label
              htmlFor="tip-number-of-people"
              className="mb-2 block text-sm font-medium"
            >
              Number of people
            </label>

            <div className="relative">
              <Users
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                id="tip-number-of-people"
                type="number"
                min="1"
                step="1"
                value={numberOfPeople}
                onChange={(event) =>
                  setNumberOfPeople(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
          {calculation ? (
            <>
              {/* Total */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Total bill
                </p>

                <p className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatCurrency(
                    calculation.totalAmount,
                  )}
                </p>
              </div>

              {/* Summary */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-[var(--muted)]">
                    Tip amount
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(
                      calculation.tipAmount,
                    )}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-[var(--muted)]">
                    Per person
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(
                      calculation.perPersonAmount,
                    )}
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Bill breakdown
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    {calculation.tipPercentage}% tip
                  </p>
                </div>

                <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full bg-[var(--foreground)]"
                    style={{
                      width: `${billPercentage}%`,
                    }}
                  />

                  <div
                    className="h-full bg-[var(--muted)]"
                    style={{
                      width: `${tipPercentageOfTotal}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                    Bill {billPercentage.toFixed(1)}%
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--muted)]" />
                    Tip {tipPercentageOfTotal.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Per-person calculation */}
              <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                <p className="text-xs text-[var(--muted)]">
                  Split between
                </p>

                <p className="mt-1 text-sm font-medium">
                  {calculation.numberOfPeople}{" "}
                  {calculation.numberOfPeople === 1
                    ? "person"
                    : "people"}
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
                  Your tip and total bill will appear here automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TipCalculator;