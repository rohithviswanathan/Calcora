import { useMemo, useState } from "react";
import {
  Calendar,
  CalendarDays,
  Clock3,
  Minus,
  Plus,
} from "lucide-react";
import {
  addDays,
  calculateAge,
  dateDifference,
  dayOfWeek,
  daysInMonth,
} from "../dateTimeUtils";

type Mode =
  | "difference"
  | "addDays"
  | "age"
  | "weekday"
  | "monthDays";

function formatDateForDisplay(value: string): string {
  if (!value) {
    return "—";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function DateTimeCalculator() {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const [mode, setMode] = useState<Mode>("difference");

  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-01-10");

  const [baseDate, setBaseDate] = useState(todayString);
  const [dayAmount, setDayAmount] = useState("30");

  const [birthDate, setBirthDate] = useState("2000-01-15");
  const [referenceDate, setReferenceDate] = useState(todayString);

  const [weekdayDate, setWeekdayDate] = useState(todayString);

  const [monthYear, setMonthYear] = useState(String(today.getFullYear()));
  const [month, setMonth] = useState(String(today.getMonth() + 1));

  const result = useMemo(() => {
    try {
      switch (mode) {
        case "difference": {
          if (!startDate || !endDate) {
            return null;
          }

          return {
            primary: `${dateDifference(startDate, endDate)} days`,
            secondary: `${formatDateForDisplay(startDate)} → ${formatDateForDisplay(endDate)}`,
          };
        }

        case "addDays": {
          const days = Number(dayAmount);

          if (
            !baseDate ||
            !dayAmount.trim() ||
            !Number.isFinite(days)
          ) {
            return null;
          }

          const calculatedDate = addDays(baseDate, days);

          return {
            primary: formatDateForDisplay(calculatedDate),
            secondary: `${days >= 0 ? "Added" : "Subtracted"} ${Math.abs(days)} days`,
          };
        }

        case "age": {
          if (!birthDate || !referenceDate) {
            return null;
          }

          const age = calculateAge(birthDate, referenceDate);

          return {
            primary: `${age.years} years`,
            secondary: `${age.months} months · ${age.days} days`,
          };
        }

        case "weekday": {
          if (!weekdayDate) {
            return null;
          }

          return {
            primary: dayOfWeek(weekdayDate),
            secondary: formatDateForDisplay(weekdayDate),
          };
        }

        case "monthDays": {
          const year = Number(monthYear);
          const selectedMonth = Number(month);

          if (
            !monthYear.trim() ||
            !month.trim() ||
            !Number.isInteger(year) ||
            !Number.isInteger(selectedMonth)
          ) {
            return null;
          }

          return {
            primary: `${daysInMonth(year, selectedMonth)} days`,
            secondary: `${new Intl.DateTimeFormat("en-IN", {
              month: "long",
            }).format(new Date(year, selectedMonth - 1, 1))} ${year}`,
          };
        }
      }
    } catch {
      return null;
    }
  }, [
    mode,
    startDate,
    endDate,
    baseDate,
    dayAmount,
    birthDate,
    referenceDate,
    weekdayDate,
    monthYear,
    month,
  ]);

  const inputClassName =
    "h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]";

  const labelClassName =
    "mb-2 block text-xs font-medium text-[var(--muted)]";

  const resultClassName =
    "rounded-xl border border-[var(--border)] bg-[var(--background)] p-4";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <Calendar
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Date & Time Calculator
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Calculate date differences, ages, weekdays, and date offsets.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <button
          type="button"
          onClick={() => setMode("difference")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "difference"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Date Difference
        </button>

        <button
          type="button"
          onClick={() => setMode("addDays")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "addDays"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Add / Subtract
        </button>

        <button
          type="button"
          onClick={() => setMode("age")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "age"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Age
        </button>

        <button
          type="button"
          onClick={() => setMode("weekday")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "weekday"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Day of Week
        </button>

        <button
          type="button"
          onClick={() => setMode("monthDays")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "monthDays"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Days in Month
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-4">
          {mode === "difference" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date-difference-start"
                  className={labelClassName}
                >
                  Start Date
                </label>

                <input
                  id="date-difference-start"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="date-difference-end"
                  className={labelClassName}
                >
                  End Date
                </label>

                <input
                  id="date-difference-end"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          {mode === "addDays" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date-add-base"
                  className={labelClassName}
                >
                  Starting Date
                </label>

                <input
                  id="date-add-base"
                  type="date"
                  value={baseDate}
                  onChange={(event) => setBaseDate(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="date-add-days"
                  className={labelClassName}
                >
                  Days
                </label>

                <input
                  id="date-add-days"
                  type="number"
                  value={dayAmount}
                  onChange={(event) => setDayAmount(event.target.value)}
                  className={inputClassName}
                />

                <p className="mt-2 text-xs text-[var(--muted)]">
                  Use a negative number to subtract days.
                </p>
              </div>
            </div>
          )}

          {mode === "age" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date-age-birth"
                  className={labelClassName}
                >
                  Date of Birth
                </label>

                <input
                  id="date-age-birth"
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="date-age-reference"
                  className={labelClassName}
                >
                  Calculate Age On
                </label>

                <input
                  id="date-age-reference"
                  type="date"
                  value={referenceDate}
                  onChange={(event) =>
                    setReferenceDate(event.target.value)
                  }
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          {mode === "weekday" && (
            <div>
              <label
                htmlFor="date-weekday"
                className={labelClassName}
              >
                Date
              </label>

              <input
                id="date-weekday"
                type="date"
                value={weekdayDate}
                onChange={(event) => setWeekdayDate(event.target.value)}
                className={inputClassName}
              />
            </div>
          )}

          {mode === "monthDays" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date-month-year"
                  className={labelClassName}
                >
                  Year
                </label>

                <input
                  id="date-month-year"
                  type="number"
                  value={monthYear}
                  onChange={(event) => setMonthYear(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="date-month"
                  className={labelClassName}
                >
                  Month
                </label>

                <select
                  id="date-month"
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className={inputClassName}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className={resultClassName}>
          <p className="text-xs font-medium text-[var(--muted)]">
            Result
          </p>

          <p className="mt-3 break-all text-2xl font-semibold tracking-tight">
            {result ? result.primary : "—"}
          </p>

          <p className="mt-2 text-sm text-[var(--muted)]">
            {result ? result.secondary : "Enter valid values to calculate"}
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs text-[var(--muted)]">
            {mode === "difference" && <Clock3 size={14} />}
            {mode === "addDays" && <Plus size={14} />}
            {mode === "age" && <CalendarDays size={14} />}
            {mode === "weekday" && <Calendar size={14} />}
            {mode === "monthDays" && <Minus size={14} />}

            <span>
              {mode === "difference" && "Days between two dates"}
              {mode === "addDays" && "Move forward or backward in time"}
              {mode === "age" && "Age at a specific reference date"}
              {mode === "weekday" && "Weekday for the selected date"}
              {mode === "monthDays" && "Calendar month length"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DateTimeCalculator;