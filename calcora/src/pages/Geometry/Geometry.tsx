import AreaPerimeterCalculator from "../../features/geometry/components/AreaPerimeterCalculator";
import VolumeSurfaceCalculator from "../../features/geometry/components/VolumeSurfaceCalculator";
import TriangleCalculator from "../../features/geometry/components/TriangleCalculator";

function Geometry() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Geometry
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Geometry calculators
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Calculate areas, perimeters, volumes, surface areas, and triangle
          dimensions with ease.
        </p>
      </div>

      <div className="space-y-5">
        <AreaPerimeterCalculator />
        <VolumeSurfaceCalculator />
        <TriangleCalculator />
      </div>
    </section>
  );
}

export default Geometry;