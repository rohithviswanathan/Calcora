import { useMemo, useState } from "react";
import { Circle, RectangleHorizontal, Square, Triangle } from "lucide-react";
import {
  circleArea,
  circleCircumference,
  rectangleArea,
  rectanglePerimeter,
  squareArea,
  squarePerimeter,
  triangleArea,
  trianglePerimeter,
} from "../geometryUtils";

type Shape = "square" | "rectangle" | "triangle" | "circle";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 10,
  }).format(value);
}

function AreaPerimeterCalculator() {
  const [shape, setShape] = useState<Shape>("square");

  const [side, setSide] = useState("5");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("5");
  const [base, setBase] = useState("10");
  const [height, setHeight] = useState("6");
  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [sideC, setSideC] = useState("5");
  const [radius, setRadius] = useState("5");

  const result = useMemo(() => {
    try {
      switch (shape) {
        case "square": {
          const value = Number(side);

          if (!side.trim() || !Number.isFinite(value) || value < 0) {
            return null;
          }

          return {
            area: squareArea(value),
            perimeter: squarePerimeter(value),
          };
        }

        case "rectangle": {
          const lengthValue = Number(length);
          const widthValue = Number(width);

          if (
            !length.trim() ||
            !width.trim() ||
            !Number.isFinite(lengthValue) ||
            !Number.isFinite(widthValue) ||
            lengthValue < 0 ||
            widthValue < 0
          ) {
            return null;
          }

          return {
            area: rectangleArea(lengthValue, widthValue),
            perimeter: rectanglePerimeter(lengthValue, widthValue),
          };
        }

        case "triangle": {
          const baseValue = Number(base);
          const heightValue = Number(height);
          const a = Number(sideA);
          const b = Number(sideB);
          const c = Number(sideC);

          if (
            !base.trim() ||
            !height.trim() ||
            !sideA.trim() ||
            !sideB.trim() ||
            !sideC.trim() ||
            !Number.isFinite(baseValue) ||
            !Number.isFinite(heightValue) ||
            !Number.isFinite(a) ||
            !Number.isFinite(b) ||
            !Number.isFinite(c) ||
            baseValue < 0 ||
            heightValue < 0 ||
            a < 0 ||
            b < 0 ||
            c < 0
          ) {
            return null;
          }

          return {
            area: triangleArea(baseValue, heightValue),
            perimeter: trianglePerimeter(a, b, c),
          };
        }

        case "circle": {
          const radiusValue = Number(radius);

          if (
            !radius.trim() ||
            !Number.isFinite(radiusValue) ||
            radiusValue < 0
          ) {
            return null;
          }

          return {
            area: circleArea(radiusValue),
            perimeter: circleCircumference(radiusValue),
          };
        }
      }
    } catch {
      return null;
    }
  }, [
    shape,
    side,
    length,
    width,
    base,
    height,
    sideA,
    sideB,
    sideC,
    radius,
  ]);

  function inputClassName() {
    return "h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]";
  }

  function labelClassName() {
    return "mb-2 block text-xs font-medium text-[var(--muted)]";
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <Square
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Area & Perimeter
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Calculate area and perimeter for common geometric shapes.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => setShape("square")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "square"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Square size={16} strokeWidth={1.8} />
          Square
        </button>

        <button
          type="button"
          onClick={() => setShape("rectangle")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "rectangle"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <RectangleHorizontal size={16} strokeWidth={1.8} />
          Rectangle
        </button>

        <button
          type="button"
          onClick={() => setShape("triangle")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "triangle"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Triangle size={16} strokeWidth={1.8} />
          Triangle
        </button>

        <button
          type="button"
          onClick={() => setShape("circle")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "circle"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Circle size={16} strokeWidth={1.8} />
          Circle
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          {shape === "square" && (
            <div>
              <label htmlFor="square-side" className={labelClassName()}>
                Side
              </label>

              <input
                id="square-side"
                type="number"
                min="0"
                value={side}
                onChange={(event) => setSide(event.target.value)}
                className={inputClassName()}
                placeholder="Enter side length"
              />
            </div>
          )}

          {shape === "rectangle" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="rectangle-length" className={labelClassName()}>
                  Length
                </label>

                <input
                  id="rectangle-length"
                  type="number"
                  min="0"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  className={inputClassName()}
                  placeholder="Length"
                />
              </div>

              <div>
                <label htmlFor="rectangle-width" className={labelClassName()}>
                  Width
                </label>

                <input
                  id="rectangle-width"
                  type="number"
                  min="0"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  className={inputClassName()}
                  placeholder="Width"
                />
              </div>
            </div>
          )}

          {shape === "triangle" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="triangle-base" className={labelClassName()}>
                    Base
                  </label>

                  <input
                    id="triangle-base"
                    type="number"
                    min="0"
                    value={base}
                    onChange={(event) => setBase(event.target.value)}
                    className={inputClassName()}
                    placeholder="Base"
                  />
                </div>

                <div>
                  <label htmlFor="triangle-height" className={labelClassName()}>
                    Height
                  </label>

                  <input
                    id="triangle-height"
                    type="number"
                    min="0"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    className={inputClassName()}
                    placeholder="Height"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="triangle-side-a" className={labelClassName()}>
                    Side A
                  </label>

                  <input
                    id="triangle-side-a"
                    type="number"
                    min="0"
                    value={sideA}
                    onChange={(event) => setSideA(event.target.value)}
                    className={inputClassName()}
                  />
                </div>

                <div>
                  <label htmlFor="triangle-side-b" className={labelClassName()}>
                    Side B
                  </label>

                  <input
                    id="triangle-side-b"
                    type="number"
                    min="0"
                    value={sideB}
                    onChange={(event) => setSideB(event.target.value)}
                    className={inputClassName()}
                  />
                </div>

                <div>
                  <label htmlFor="triangle-side-c" className={labelClassName()}>
                    Side C
                  </label>

                  <input
                    id="triangle-side-c"
                    type="number"
                    min="0"
                    value={sideC}
                    onChange={(event) => setSideC(event.target.value)}
                    className={inputClassName()}
                  />
                </div>
              </div>
            </>
          )}

          {shape === "circle" && (
            <div>
              <label htmlFor="circle-radius" className={labelClassName()}>
                Radius
              </label>

              <input
                id="circle-radius"
                type="number"
                min="0"
                value={radius}
                onChange={(event) => setRadius(event.target.value)}
                className={inputClassName()}
                placeholder="Enter radius"
              />
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs font-medium text-[var(--muted)]">
              Area
            </p>

            <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
              {result ? formatNumber(result.area) : "—"}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              square units
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs font-medium text-[var(--muted)]">
              {shape === "circle" ? "Circumference" : "Perimeter"}
            </p>

            <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
              {result ? formatNumber(result.perimeter) : "—"}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              {shape === "circle" ? "linear units" : "units"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AreaPerimeterCalculator;