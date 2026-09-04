import { useMemo, useState } from "react";
import {
  Box,
  Circle,
  Cylinder,
  Pyramid,
  RectangleHorizontal,
} from "lucide-react";
import {
  coneSurfaceArea,
  coneVolume,
  cubeSurfaceArea,
  cubeVolume,
  cuboidSurfaceArea,
  cuboidVolume,
  cylinderSurfaceArea,
  cylinderVolume,
  sphereSurfaceArea,
  sphereVolume,
} from "../geometryUtils";

type Shape = "cube" | "cuboid" | "cylinder" | "sphere" | "cone";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 10,
  }).format(value);
}

function VolumeSurfaceCalculator() {
  const [shape, setShape] = useState<Shape>("cube");

  const [side, setSide] = useState("3");
  const [length, setLength] = useState("2");
  const [width, setWidth] = useState("3");
  const [height, setHeight] = useState("4");
  const [radius, setRadius] = useState("3");

  const result = useMemo(() => {
    try {
      switch (shape) {
        case "cube": {
          const value = Number(side);

          if (!side.trim() || !Number.isFinite(value) || value < 0) {
            return null;
          }

          return {
            volume: cubeVolume(value),
            surfaceArea: cubeSurfaceArea(value),
          };
        }

        case "cuboid": {
          const lengthValue = Number(length);
          const widthValue = Number(width);
          const heightValue = Number(height);

          if (
            !length.trim() ||
            !width.trim() ||
            !height.trim() ||
            !Number.isFinite(lengthValue) ||
            !Number.isFinite(widthValue) ||
            !Number.isFinite(heightValue) ||
            lengthValue < 0 ||
            widthValue < 0 ||
            heightValue < 0
          ) {
            return null;
          }

          return {
            volume: cuboidVolume(
              lengthValue,
              widthValue,
              heightValue,
            ),
            surfaceArea: cuboidSurfaceArea(
              lengthValue,
              widthValue,
              heightValue,
            ),
          };
        }

        case "cylinder": {
          const radiusValue = Number(radius);
          const heightValue = Number(height);

          if (
            !radius.trim() ||
            !height.trim() ||
            !Number.isFinite(radiusValue) ||
            !Number.isFinite(heightValue) ||
            radiusValue < 0 ||
            heightValue < 0
          ) {
            return null;
          }

          return {
            volume: cylinderVolume(
              radiusValue,
              heightValue,
            ),
            surfaceArea: cylinderSurfaceArea(
              radiusValue,
              heightValue,
            ),
          };
        }

        case "sphere": {
          const radiusValue = Number(radius);

          if (
            !radius.trim() ||
            !Number.isFinite(radiusValue) ||
            radiusValue < 0
          ) {
            return null;
          }

          return {
            volume: sphereVolume(radiusValue),
            surfaceArea: sphereSurfaceArea(radiusValue),
          };
        }

        case "cone": {
          const radiusValue = Number(radius);
          const heightValue = Number(height);

          if (
            !radius.trim() ||
            !height.trim() ||
            !Number.isFinite(radiusValue) ||
            !Number.isFinite(heightValue) ||
            radiusValue < 0 ||
            heightValue < 0
          ) {
            return null;
          }

          return {
            volume: coneVolume(
              radiusValue,
              heightValue,
            ),
            surfaceArea: coneSurfaceArea(
              radiusValue,
              heightValue,
            ),
          };
        }
      }
    } catch {
      return null;
    }
  }, [shape, side, length, width, height, radius]);

  const inputClassName =
    "h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--foreground)]";

  const labelClassName =
    "mb-2 block text-xs font-medium text-[var(--muted)]";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]">
          <Box
            size={20}
            strokeWidth={1.8}
            className="text-[var(--foreground)]"
          />
        </div>

        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Volume & Surface Area
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Calculate volume and surface area for common 3D shapes.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <button
          type="button"
          onClick={() => setShape("cube")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "cube"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Box size={16} strokeWidth={1.8} />
          Cube
        </button>

        <button
          type="button"
          onClick={() => setShape("cuboid")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "cuboid"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <RectangleHorizontal size={16} strokeWidth={1.8} />
          Cuboid
        </button>

        <button
          type="button"
          onClick={() => setShape("cylinder")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "cylinder"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Cylinder size={16} strokeWidth={1.8} />
          Cylinder
        </button>

        <button
          type="button"
          onClick={() => setShape("sphere")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "sphere"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Circle size={16} strokeWidth={1.8} />
          Sphere
        </button>

        <button
          type="button"
          onClick={() => setShape("cone")}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition ${
            shape === "cone"
              ? "border-[var(--foreground)] bg-[var(--surface-hover)]"
              : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Pyramid size={16} strokeWidth={1.8} />
          Cone
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          {shape === "cube" && (
            <div>
              <label htmlFor="cube-side" className={labelClassName}>
                Side
              </label>

              <input
                id="cube-side"
                type="number"
                min="0"
                value={side}
                onChange={(event) => setSide(event.target.value)}
                className={inputClassName}
                placeholder="Enter side length"
              />
            </div>
          )}

          {shape === "cuboid" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="cuboid-length" className={labelClassName}>
                  Length
                </label>

                <input
                  id="cuboid-length"
                  type="number"
                  min="0"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="cuboid-width" className={labelClassName}>
                  Width
                </label>

                <input
                  id="cuboid-width"
                  type="number"
                  min="0"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="cuboid-height" className={labelClassName}>
                  Height
                </label>

                <input
                  id="cuboid-height"
                  type="number"
                  min="0"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          {(shape === "cylinder" || shape === "cone") && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={`${shape}-radius`}
                  className={labelClassName}
                >
                  Radius
                </label>

                <input
                  id={`${shape}-radius`}
                  type="number"
                  min="0"
                  value={radius}
                  onChange={(event) => setRadius(event.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor={`${shape}-height`}
                  className={labelClassName}
                >
                  Height
                </label>

                <input
                  id={`${shape}-height`}
                  type="number"
                  min="0"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          )}

          {shape === "sphere" && (
            <div>
              <label htmlFor="sphere-radius" className={labelClassName}>
                Radius
              </label>

              <input
                id="sphere-radius"
                type="number"
                min="0"
                value={radius}
                onChange={(event) => setRadius(event.target.value)}
                className={inputClassName}
              />
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs font-medium text-[var(--muted)]">
              Volume
            </p>

            <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
              {result ? formatNumber(result.volume) : "—"}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              cubic units
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs font-medium text-[var(--muted)]">
              Surface Area
            </p>

            <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
              {result ? formatNumber(result.surfaceArea) : "—"}
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              square units
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VolumeSurfaceCalculator;