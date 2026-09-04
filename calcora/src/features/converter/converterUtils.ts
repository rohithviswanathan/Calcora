export type LengthUnit =
  | "millimeter"
  | "centimeter"
  | "meter"
  | "kilometer"
  | "inch"
  | "foot"
  | "yard"
  | "mile";

const lengthToMeters: Record<LengthUnit, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

export function convertLength(
  value: number,
  from: LengthUnit,
  to: LengthUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid length value");
  }

  const valueInMeters = value * lengthToMeters[from];

  return valueInMeters / lengthToMeters[to];
}

export type WeightUnit =
  | "milligram"
  | "gram"
  | "kilogram"
  | "tonne"
  | "ounce"
  | "pound"
  | "stone";

const weightToKilograms: Record<WeightUnit, number> = {
  milligram: 0.000001,
  gram: 0.001,
  kilogram: 1,
  tonne: 1000,
  ounce: 0.028349523125,
  pound: 0.45359237,
  stone: 6.35029318,
};

export function convertWeight(
  value: number,
  from: WeightUnit,
  to: WeightUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid weight value");
  }

  const valueInKilograms =
    value * weightToKilograms[from];

  return valueInKilograms / weightToKilograms[to];
}

export type TemperatureUnit =
  | "celsius"
  | "fahrenheit"
  | "kelvin";

export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid temperature value");
  }

  if (from === to) {
    return value;
  }

  let celsius: number;

  switch (from) {
    case "celsius":
      celsius = value;
      break;

    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;

    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  switch (to) {
    case "celsius":
      return celsius;

    case "fahrenheit":
      return celsius * (9 / 5) + 32;

    case "kelvin":
      return celsius + 273.15;
  }
}

export type AreaUnit =
  | "squareMillimeter"
  | "squareCentimeter"
  | "squareMeter"
  | "squareKilometer"
  | "squareInch"
  | "squareFoot"
  | "squareYard"
  | "acre"
  | "hectare"
  | "squareMile";

const areaToSquareMeters: Record<AreaUnit, number> = {
  squareMillimeter: 0.000001,
  squareCentimeter: 0.0001,
  squareMeter: 1,
  squareKilometer: 1_000_000,
  squareInch: 0.00064516,
  squareFoot: 0.09290304,
  squareYard: 0.83612736,
  acre: 4046.8564224,
  hectare: 10_000,
  squareMile: 2_589_988.110336,
};

export function convertArea(
  value: number,
  from: AreaUnit,
  to: AreaUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid area value");
  }

  const valueInSquareMeters =
    value * areaToSquareMeters[from];

  return valueInSquareMeters / areaToSquareMeters[to];
}

export type VolumeUnit =
  | "milliliter"
  | "liter"
  | "cubicCentimeter"
  | "cubicMeter"
  | "cubicInch"
  | "cubicFoot"
  | "cubicYard"
  | "gallon"
  | "quart"
  | "pint";

const volumeToLiters: Record<VolumeUnit, number> = {
  milliliter: 0.001,
  liter: 1,
  cubicCentimeter: 0.001,
  cubicMeter: 1000,
  cubicInch: 0.016387064,
  cubicFoot: 28.316846592,
  cubicYard: 764.554857984,
  gallon: 3.785411784,
  quart: 0.946352946,
  pint: 0.473176473,
};

export function convertVolume(
  value: number,
  from: VolumeUnit,
  to: VolumeUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid volume value");
  }

  const valueInLiters = value * volumeToLiters[from];

  return valueInLiters / volumeToLiters[to];
}

export type TimeUnit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

const timeToSeconds: Record<TimeUnit, number> = {
  millisecond: 0.001,
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629800,
  year: 31557600,
};

export function convertTime(
  value: number,
  from: TimeUnit,
  to: TimeUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid time value");
  }

  const valueInSeconds = value * timeToSeconds[from];

  return valueInSeconds / timeToSeconds[to];
}

export type SpeedUnit =
  | "meterPerSecond"
  | "kilometerPerHour"
  | "milePerHour"
  | "footPerSecond"
  | "knot";

const speedToMetersPerSecond: Record<SpeedUnit, number> = {
  meterPerSecond: 1,
  kilometerPerHour: 1000 / 3600,
  milePerHour: 1609.344 / 3600,
  footPerSecond: 0.3048,
  knot: 1852 / 3600,
};

export function convertSpeed(
  value: number,
  from: SpeedUnit,
  to: SpeedUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid speed value");
  }

  const valueInMetersPerSecond =
    value * speedToMetersPerSecond[from];

  return valueInMetersPerSecond / speedToMetersPerSecond[to];
}

export type DataUnit =
  | "bit"
  | "byte"
  | "kilobit"
  | "kilobyte"
  | "megabit"
  | "megabyte"
  | "gigabit"
  | "gigabyte"
  | "terabit"
  | "terabyte";

const dataToBits: Record<DataUnit, number> = {
  bit: 1,
  byte: 8,
  kilobit: 1_000,
  kilobyte: 8_000,
  megabit: 1_000_000,
  megabyte: 8_000_000,
  gigabit: 1_000_000_000,
  gigabyte: 8_000_000_000,
  terabit: 1_000_000_000_000,
  terabyte: 8_000_000_000_000,
};

export function convertData(
  value: number,
  from: DataUnit,
  to: DataUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid data value");
  }

  const valueInBits = value * dataToBits[from];

  return valueInBits / dataToBits[to];
}

export type EnergyUnit =
  | "joule"
  | "kilojoule"
  | "calorie"
  | "kilocalorie"
  | "wattHour"
  | "kilowattHour"
  | "electronvolt"
  | "britishThermalUnit";

const energyToJoules: Record<EnergyUnit, number> = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  wattHour: 3600,
  kilowattHour: 3_600_000,
  electronvolt: 1.602176634e-19,
  britishThermalUnit: 1055.05585262,
};

export function convertEnergy(
  value: number,
  from: EnergyUnit,
  to: EnergyUnit,
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid energy value");
  }

  const valueInJoules = value * energyToJoules[from];

  return valueInJoules / energyToJoules[to];
}