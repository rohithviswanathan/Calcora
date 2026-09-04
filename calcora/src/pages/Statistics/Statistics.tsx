import StatisticsCalculator from "../../features/statistics/components/StatisticsCalculator";

function Statistics() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Statistics
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Statistical calculators
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Analyze datasets and calculate common statistical values quickly and
          clearly.
        </p>
      </div>

      <div className="space-y-5">
        <StatisticsCalculator />
      </div>
    </section>
  );
}

export default Statistics;