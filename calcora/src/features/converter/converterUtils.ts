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