import LengthConverter from "../../features/converter/components/LengthConverter";
import WeightConverter from "../../features/converter/components/WeightConverter";
import TemperatureConverter from "../../features/converter/components/TemperatureConverter";
import AreaConverter from "../../features/converter/components/AreaConverter";
import VolumeConverter from "../../features/converter/components/VolumeConverter";
import TimeConverter from "../../features/converter/components/TimeConverter";
import SpeedConverter from "../../features/converter/components/SpeedConverter";
import DataConverter from "../../features/converter/components/DataConverter";
import EnergyConverter from "../../features/converter/components/EnergyConverter";

function Converter() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Converter
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Unit converters
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          Convert common measurements quickly and accurately across different
          units.
        </p>
      </div>

      <div className="space-y-5">
        <LengthConverter />
        <WeightConverter />
        <TemperatureConverter />
        <AreaConverter />
        <VolumeConverter />
        <TimeConverter />
        <SpeedConverter />
        <DataConverter />
        <EnergyConverter />
      </div>
    </section>
  );
}

export default Converter;