import { useMemo, useState } from "react";
import { ArrowRightLeft, Scale } from "lucide-react";
import {
  convertWeight,
  type WeightUnit,
} from "../converterUtils";

const units: {
  value: WeightUnit;
  label: string;
}[] = [
  { value: "milligram", label: "Milligram" },
  { value: "gram", label: "Gram" },
  { value: "kilogram", label: "Kilogram" },
  { value: "tonne", label: "Tonne" },
  { value: "ounce", label: "Ounce" },
  { value: "pound", label: "Pound" },
  { value: "stone", label: "Stone" },
];

function WeightConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] =
    useState<WeightUnit>("kilogram");
  const [toUnit, setToUnit] =
    useState<WeightUnit>("pound");

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return null;
    }

    try {
      return convertWeight(
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

  const getUnitLabel = (unit: WeightUnit) =>
    units.find((item) => item.value === unit)?.label ??
    unit;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
          <Scale size={18} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-semibold">
            Weight
          </h2>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Convert between common weight and mass units.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <div>
          <label
            htmlFor="weight-value"
            className="mb-2 block text-sm font-medium"
          >
            Value
          </label>

          <input
            id="weight-value"
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
              htmlFor="weight-from"
              className="mb-2 block text-sm font-medium"
            >
              From
            </label>

            <select
              id="weight-from"
              value={fromUnit}
              onChange={(event) =>
                setFromUnit(
                  event.target.value as WeightUnit,
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
              htmlFor="weight-to"
              className="mb-2 block text-sm font-medium"
            >
              To
            </label>

            <select
              id="weight-to"
              value={toUnit}
              onChange={(event) =>
                setToUnit(
                  event.target.value as WeightUnit,
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

export default WeightConverter;