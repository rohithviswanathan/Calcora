import { ArrowLeftRight, HardDrive } from "lucide-react";
import { useMemo, useState } from "react";
import {
  convertData,
  type DataUnit,
} from "../converterUtils";

const dataUnits: {
  value: DataUnit;
  label: string;
}[] = [
  { value: "bit", label: "Bit (b)" },
  { value: "byte", label: "Byte (B)" },
  { value: "kilobit", label: "Kilobit (Kb)" },
  { value: "kilobyte", label: "Kilobyte (KB)" },
  { value: "megabit", label: "Megabit (Mb)" },
  { value: "megabyte", label: "Megabyte (MB)" },
  { value: "gigabit", label: "Gigabit (Gb)" },
  { value: "gigabyte", label: "Gigabyte (GB)" },
  { value: "terabit", label: "Terabit (Tb)" },
  { value: "terabyte", label: "Terabyte (TB)" },
];

function DataConverter() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<DataUnit>("gigabyte");
  const [to, setTo] = useState<DataUnit>("megabyte");

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!value.trim() || !Number.isFinite(numericValue)) {
      return null;
    }

    return convertData(numericValue, from, to);
  }, [value, from, to]);

  const formattedResult =
    result === null
      ? "—"
      : new Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 10,
        }).format(result);

  const fromLabel =
    dataUnits.find((unit) => unit.value === from)?.label ?? from;

  const toLabel =
    dataUnits.find((unit) => unit.value === to)?.label ?? to;

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <HardDrive
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Data
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Convert between common digital storage and data units.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="data-value"
              className="mb-2 block text-xs font-medium text-[var(--muted)]"
            >
              Value
            </label>

            <input
              id="data-value"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]"
              placeholder="Enter a value"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="data-from"
                className="mb-2 block text-xs font-medium text-[var(--muted)]"
              >
                From
              </label>

              <select
                id="data-from"
                value={from}
                onChange={(event) =>
                  setFrom(event.target.value as DataUnit)
                }
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]"
              >
                {dataUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="data-to"
                className="mb-2 block text-xs font-medium text-[var(--muted)]"
              >
                To
              </label>

              <select
                id="data-to"
                value={to}
                onChange={(event) =>
                  setTo(event.target.value as DataUnit)
                }
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]"
              >
                {dataUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap data units"
          title="Swap units"
          className="flex h-11 w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--foreground)] transition hover:border-[var(--foreground)] hover:bg-[var(--background)] lg:w-11"
        >
          <ArrowLeftRight size={18} strokeWidth={1.8} />
        </button>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs font-medium text-[var(--muted)]">
            Result
          </p>

          <div className="mt-2 min-h-9 break-all text-2xl font-semibold tracking-tight">
            {formattedResult}
          </div>

          <p className="mt-1 text-xs text-[var(--muted)]">
            {fromLabel} → {toLabel}
          </p>
        </div>
      </div>
    </section>
  );
}

export default DataConverter;