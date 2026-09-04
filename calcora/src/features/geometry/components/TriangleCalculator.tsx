import { useMemo, useState } from "react";
import { Triangle } from "lucide-react";
import {
  pythagoreanHypotenuse,
  pythagoreanLeg,
  triangleAngleFromSides,
  triangleAreaFromSides,
} from "../geometryUtils";

type Mode = "pythagorean" | "area" | "angle";

type PythagoreanMode = "hypotenuse" | "leg";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 10,
  }).format(value);
}

function TriangleCalculator() {
  const [mode, setMode] = useState<Mode>("pythagorean");
  const [pythagoreanMode, setPythagoreanMode] =
    useState<PythagoreanMode>("hypotenuse");

  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [hypotenuse, setHypotenuse] = useState("5");
  const [knownLeg, setKnownLeg] = useState("3");

  const [areaSideA, setAreaSideA] = useState("3");
  const [areaSideB, setAreaSideB] = useState("4");
  const [areaSideC, setAreaSideC] = useState("5");

  const [angleSideA, setAngleSideA] = useState("3");
  const [angleSideB, setAngleSideB] = useState("4");
  const [oppositeSide, setOppositeSide] = useState("5");

  const result = useMemo(() => {
    try {
      switch (mode) {
        case "pythagorean": {
          if (pythagoreanMode === "hypotenuse") {
            const a = Number(sideA);
            const b = Number(sideB);

            if (
              !sideA.trim() ||
              !sideB.trim() ||
              !Number.isFinite(a) ||
              !Number.isFinite(b) ||
              a < 0 ||
              b < 0
            ) {
              return null;
            }

            return {
              value: pythagoreanHypotenuse(a, b),
              label: "Hypotenuse",
              unit: "units",
            };
          }

          const h = Number(hypotenuse);
          const leg = Number(knownLeg);

          if (
            !hypotenuse.trim() ||
            !knownLeg.trim() ||
            !Number.isFinite(h) ||
            !Number.isFinite(leg) ||
            h < 0 ||
            leg < 0
          ) {
            return null;
          }

          return {
            value: pythagoreanLeg(h, leg),
            label: "Missing leg",
            unit: "units",
          };
        }

        case "area": {
          const a = Number(areaSideA);
          const b = Number(areaSideB);
          const c = Number(areaSideC);

          if (
            !areaSideA.trim() ||
            !areaSideB.trim() ||
            !areaSideC.trim() ||
            !Number.isFinite(a) ||
            !Number.isFinite(b) ||
            !Number.isFinite(c) ||
            a <= 0 ||
            b <= 0 ||
            c <= 0
          ) {
            return null;
          }

          return {
            value: triangleAreaFromSides(a, b, c),
            label: "Triangle area",
            unit: "square units",
          };
        }

        case "angle": {
          const a = Number(angleSideA);
          const b = Number(angleSideB);
          const opposite = Number(oppositeSide);

          if (
            !angleSideA.trim() ||
            !angleSideB.trim() ||
            !oppositeSide.trim() ||
            !Number.isFinite(a) ||
            !Number.isFinite(b) ||
            !Number.isFinite(opposite) ||
            a <= 0 ||
            b <= 0 ||
            opposite <= 0
          ) {
            return null;
          }

          return {
            value: triangleAngleFromSides(a, b, opposite),
            label: "Angle",
            unit: "degrees",
          };
        }
      }
    } catch {
      return null;
    }
  }, [
    mode,
    pythagoreanMode,
    sideA,
    sideB,
    hypotenuse,
    knownLeg,
    areaSideA,
    areaSideB,
    areaSideC,
    angleSideA,
    angleSideB,
    oppositeSide,
  ]);

  const inputClassName =
    "h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]";

  const labelClassName =
    "mb-2 block text-xs font-medium text-[var(--muted)]";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <Triangle
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Triangle Calculator
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Solve triangle dimensions, areas, and angles.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setMode("pythagorean")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "pythagorean"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Pythagorean
        </button>

        <button
          type="button"
          onClick={() => setMode("area")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "area"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Area from Sides
        </button>

        <button
          type="button"
          onClick={() => setMode("angle")}
          className={`h-10 rounded-lg border px-3 text-sm transition ${
            mode === "angle"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Find Angle
        </button>
      </div>

      {mode === "pythagorean" && (
        <div className="mb-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPythagoreanMode("hypotenuse")}
            className={`h-10 rounded-lg border px-3 text-sm transition ${
              pythagoreanMode === "hypotenuse"
                ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
                : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            Find Hypotenuse
          </button>

          <button
            type="button"
            onClick={() => setPythagoreanMode("leg")}
            className={`h-10 rounded-lg border px-3 text-sm transition ${
              pythagoreanMode === "leg"
                ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
                : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            Find Missing Leg
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          {mode === "pythagorean" &&
            pythagoreanMode === "hypotenuse" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pythagorean-side-a" className={labelClassName}>
                    Side A
                  </label>

                  <input
                    id="pythagorean-side-a"
                    type="number"
                    min="0"
                    value={sideA}
                    onChange={(event) => setSideA(event.target.value)}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="pythagorean-side-b" className={labelClassName}>
                    Side B
                  </label>

                  <input
                    id="pythagorean-side-b"
                    type="number"
                    min="0"
                    value={sideB}
                    onChange={(event) => setSideB(event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>
            )}

          {mode === "pythagorean" &&
            pythagoreanMode === "leg" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pythagorean-hypotenuse" className={labelClassName}>
                    Hypotenuse
                  </label>

                  <input
                    id="pythagorean-hypotenuse"
                    type="number"
                    min="0"
                    value={hypotenuse}
                    onChange={(event) =>
                      setHypotenuse(event.target.value)
                    }
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="pythagorean-known-leg" className={labelClassName}>
                    Known Leg
                  </label>

                  <input
                    id="pythagorean-known-leg"
                    type="number"
                    min="0"
                    value={knownLeg}
                    onChange={(event) => setKnownLeg(event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>
            )}

          {mode === "area" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="triangle-area-a" className={labelClassName}>
                  Side A
                </label>

                <input
                  id="triangle-area-a"
                  type="number"
                  min="0"
                  value={areaSideA}
                  onChange={(event) => setAreaSideA(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="triangle-area-b" className={labelClassName}>
                  Side B
                </label>

                <input
                  id="triangle-area-b"
                  type="number"
                  min="0"
                  value={areaSideB}
                  onChange={(event) => setAreaSideB(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="triangle-area-c" className={labelClassName}>
                  Side C
                </label>

                <input
                  id="triangle-area-c"
                  type="number"
                  min="0"
                  value={areaSideC}
                  onChange={(event) => setAreaSideC(event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          {mode === "angle" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="triangle-angle-a" className={labelClassName}>
                  Side A
                </label>

                <input
                  id="triangle-angle-a"
                  type="number"
                  min="0"
                  value={angleSideA}
                  onChange={(event) => setAngleSideA(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="triangle-angle-b" className={labelClassName}>
                  Side B
                </label>

                <input
                  id="triangle-angle-b"
                  type="number"
                  min="0"
                  value={angleSideB}
                  onChange={(event) => setAngleSideB(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="triangle-angle-opposite"
                  className={labelClassName}
                >
                  Opposite Side
                </label>

                <input
                  id="triangle-angle-opposite"
                  type="number"
                  min="0"
                  value={oppositeSide}
                  onChange={(event) => setOppositeSide(event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs font-medium text-[var(--muted)]">
            Result
          </p>

          <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
            {result ? formatNumber(result.value) : "—"}
          </p>

          <p className="mt-1 text-xs text-[var(--muted)]">
            {result
              ? `${result.label} · ${result.unit}`
              : "Enter valid values to calculate"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default TriangleCalculator;