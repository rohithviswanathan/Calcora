import LoanCalculator from "../../features/finance/components/LoanCalculator";
import SimpleInterestCalculator from "../../features/finance/components/SimpleInterestCalculator";
import CompoundInterestCalculator from "../../features/finance/components/CompoundInterestCalculator";
import PercentageCalculator from "../../features/finance/components/PercentageCalculator";
import DiscountCalculator from "../../features/finance/components/DiscountCalculator";
import TipCalculator from "../../features/finance/components/TipCalculator";

function Finance() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Finance
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Financial calculators
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Calculate loans, interest, percentages, and other everyday financial
          values with clarity.
        </p>
      </div>

      <div className="space-y-5">
        <LoanCalculator />
        <SimpleInterestCalculator />
        <CompoundInterestCalculator />
        <PercentageCalculator />
        <DiscountCalculator />
        <TipCalculator />
      </div>
    </section>
  );
}

export default Finance;