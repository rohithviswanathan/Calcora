import DateTimeCalculator from "../../features/dateTime/components/DateTimeCalculator";

function DateTime() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Date & Time
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Date & time calculators
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Calculate date differences, ages, weekdays, and date offsets quickly
          and clearly.
        </p>
      </div>

      <div className="space-y-5">
        <DateTimeCalculator />
      </div>
    </section>
  );
}

export default DateTime;