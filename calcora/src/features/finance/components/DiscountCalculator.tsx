import { useMemo, useState } from "react";
import {
  Calculator,
  IndianRupee,
  Percent,
} from "lucide-react";
import { calculateDiscount } from "../financeUtils";

function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("2000");
  const [discountPercentage, setDiscountPercentage] =
    useState("15");

  const calculation = useMemo(() => {
    const price = Number(originalPrice);
    const discount = Number(discountPercentage);

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(discount) ||
      price < 0 ||
      discount < 0 ||
      discount > 100
    ) {
      return null;
    }

    try {
      return calculateDiscount(price, discount);
    } catch {
      return null;
    }
  }, [originalPrice, discountPercentage]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const discountPercentageOfPrice =
    calculation && calculation.originalPrice > 0
      ? (calculation.discountAmount /
          calculation.originalPrice) *
        100
      : 0;

  const finalPricePercentage =
    calculation && calculation.originalPrice > 0
      ? (calculation.finalPrice /
          calculation.originalPrice) *
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
            Discount
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Calculate your savings and the final price after a discount.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          {/* Original price */}
          <div>
            <label
              htmlFor="discount-original-price"
              className="mb-2 block text-sm font-medium"
            >
              Original price
            </label>

            <div className="relative">
              <IndianRupee
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                id="discount-original-price"
                type="number"
                min="0"
                step="0.01"
                value={originalPrice}
                onChange={(event) =>
                  setOriginalPrice(event.target.value)
                }
                className="block h-11 min-w-0 w-full max-w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
                placeholder="2000"
              />
            </div>
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="discount-percentage"
              className="mb-2 block text-sm font-medium"
            >
              Discount
            </label>

            <div className="relative">
              <input
                id="discount-percentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={discountPercentage}
                onChange={(event) =>
                  setDiscountPercentage(event.target.value)
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
        </div>

        {/* Results */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
          {calculation ? (
            <>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Final price
                </p>

                <p className="mt-2 break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatCurrency(
                    calculation.finalPrice,
                  )}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-[var(--muted)]">
                    Original price
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(
                      calculation.originalPrice,
                    )}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-xs text-[var(--muted)]">
                    You save
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(
                      calculation.discountAmount,
                    )}
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Price breakdown
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    {calculation.discountPercentage}% off
                  </p>
                </div>

                <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full bg-[var(--foreground)]"
                    style={{
                      width: `${finalPricePercentage}%`,
                    }}
                  />

                  <div
                    className="h-full bg-[var(--muted)]"
                    style={{
                      width: `${discountPercentageOfPrice}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                    Final price {finalPricePercentage.toFixed(1)}%
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--muted)]" />
                    Savings {discountPercentageOfPrice.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Calculation */}
              <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                <p className="text-xs text-[var(--muted)]">
                  Calculation
                </p>

                <p className="mt-1 break-words text-sm font-medium">
                  {formatCurrency(
                    calculation.originalPrice,
                  )}{" "}
                  −{" "}
                  {formatCurrency(
                    calculation.discountAmount,
                  )}
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
                  Your discounted price will appear here automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscountCalculator;