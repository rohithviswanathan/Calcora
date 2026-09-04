import { ArrowLeftRight, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import {
  convertEnergy,
  type EnergyUnit,
} from "../converterUtils";

const energyUnits: {
  value: EnergyUnit;
  label: string;
}[] = [
  { value: "joule", label: "Joule (J)" },
  { value: "kilojoule", label: "Kilojoule (kJ)" },
  { value: "calorie", label: "Calorie (cal)" },
  { value: "kilocalorie", label: "Kilocalorie (kcal)" },
  { value: "wattHour", label: "Watt-hour (Wh)" },
  { value: "kilowattHour", label: "Kilowatt-hour (kWh)" },
  { value: "electronvolt", label: "Electronvolt (eV)" },
  {
    value: "britishThermalUnit",
    label: "British thermal unit (BTU)",
  },
];

function EnergyConverter() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState<EnergyUnit>("kilowattHour");
  const [to, setTo] = useState<EnergyUnit>("joule");

  const result = useMemo(() => {
    const numericValue = Number(value);

    if (!value.trim() || !Number.isFinite(numericValue)) {
      return null;
    }

    return convertEnergy(numericValue, from, to);
  }, [value, from, to]);

  const formattedResult =
    result === null
      ? "—"
      : new Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 10,
        }).format(result);

  const fromLabel =
    energyUnits.find((unit) => unit.value === from)?.label ?? from;

  const toLabel =
    energyUnits.find((unit) => unit.value === to)?.label ?? to;

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <Zap
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Energy
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Convert between common units of energy.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="energy-value"
              className="mb-2 block text-xs font-medium text-[var(--muted)]"
            >
              Value
            </label>

            <input
              id="energy-value"
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
                htmlFor="energy-from"
                className="mb-2 block text-xs font-medium text-[var(--muted)]"
              >
                From
              </label>

              <select
                id="energy-from"
                value={from}
                onChange={(event) =>
                  setFrom(event.target.value as EnergyUnit)
                }
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]"
              >
                {energyUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="energy-to"
                className="mb-2 block text-xs font-medium text-[var(--muted)]"
              >
                To
              </label>

              <select
                id="energy-to"
                value={to}
                onChange={(event) =>
                  setTo(event.target.value as EnergyUnit)
                }
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]"
              >
                {energyUnits.map((unit) => (
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
          aria-label="Swap energy units"
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

export default EnergyConverter;