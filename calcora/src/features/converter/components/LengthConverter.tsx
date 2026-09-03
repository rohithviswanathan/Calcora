import { useMemo, useState } from "react";
import { ArrowRightLeft, Ruler } from "lucide-react";
import {
  convertLength,
  type LengthUnit,
} from "../converterUtils";

const units: {
  value: LengthUnit;
  label: string;
}[] = [
  { value: "millimeter", label: "Millimeter" },
  { value: "centimeter", label: "Centimeter" },
  { value: "meter", label: "Meter" },
  { value: "kilometer", label: "Kilometer" },
  { value: "inch", label: "Inch" },
  { value: "foot", label: "Foot" },
  { value: "yard", label: "Yard" },
  { value: "mile", label: "Mile" },
];

function LengthConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] =
    useState<LengthUnit>("meter");
  const [toUnit, setToUnit] =
    useState<LengthUnit>("kilometer");

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return null;
    }

    try {
      return convertLength(
        numericValue,
        fromUnit,
        toUnit,
      );
    } catch {
      return null;
    }
  }, [value, fromUnit, toUnit]);

  const formatNumber = (number: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 10,
    }).format(number);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnitLabel = (unit: LengthUnit) =>
    units.find((item) => item.value === unit)?.label ??
    unit;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
          <Ruler size={18} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-semibold">
            Length
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Convert between common length and distance units.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <div>
          <label
            htmlFor="length-value"
            className="mb-2 block text-sm font-medium"
          >
            Value
          </label>

          <input
            id="length-value"
            type="number"
            step="any"
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
            className="block h-11 min-w-0 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
            placeholder="Enter a value"
          />
        </div>

        <button
          type="button"
          onClick={swapUnits}
          aria-label="Swap units"
          className="flex h-11 w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] lg:w-11"
        >
          <ArrowRightLeft size={17} />
        </button>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="length-from"
              className="mb-2 block text-sm font-medium"
            >
              From
            </label>

            <select
              id="length-from"
              value={fromUnit}
              onChange={(event) =>
                setFromUnit(
                  event.target.value as LengthUnit,
                )
              }
              className="block h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
            >
              {units.map((unit) => (
                <option
                  key={unit.value}
                  value={unit.value}
                >
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="length-to"
              className="mb-2 block text-sm font-medium"
            >
              To
            </label>

            <select
              id="length-to"
              value={toUnit}
              onChange={(event) =>
                setToUnit(
                  event.target.value as LengthUnit,
                )
              }
              className="block h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
            >
              {units.map((unit) => (
                <option
                  key={unit.value}
                  value={unit.value}
                >
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          Result
        </p>

        {result !== null ? (
          <div className="mt-2">
            <p className="break-words text-2xl font-semibold tracking-tight sm:text-3xl">
              {formatNumber(result)}
            </p>

            <p className="mt-1 text-sm text-[var(--muted)]">
              {getUnitLabel(toUnit)}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-[var(--muted)]">
            Enter a valid value to see the result.
          </p>
        )}
      </div>
    </div>
  );
}

export default LengthConverter;