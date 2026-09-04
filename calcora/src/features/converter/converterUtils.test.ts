import { describe, expect, it } from "vitest";
import {
  convertLength,
  convertWeight,
  convertTemperature,
  convertArea,
  convertVolume,
  convertTime,
  convertSpeed,
  convertData,
  convertEnergy,
} from "./converterUtils";

describe("convertLength", () => {
  it("converts meters to kilometers", () => {
    expect(
      convertLength(1000, "meter", "kilometer"),
    ).toBe(1);
  });

  it("converts kilometers to meters", () => {
    expect(
      convertLength(2.5, "kilometer", "meter"),
    ).toBe(2500);
  });

  it("converts centimeters to meters", () => {
    expect(
      convertLength(100, "centimeter", "meter"),
    ).toBe(1);
  });

  it("converts inches to centimeters", () => {
    expect(
      convertLength(1, "inch", "centimeter"),
    ).toBeCloseTo(2.54, 10);
  });

  it("converts feet to meters", () => {
    expect(
      convertLength(10, "foot", "meter"),
    ).toBeCloseTo(3.048, 10);
  });

  it("converts miles to kilometers", () => {
    expect(
      convertLength(1, "mile", "kilometer"),
    ).toBeCloseTo(1.609344, 10);
  });

  it("converts yards to feet", () => {
    expect(
      convertLength(1, "yard", "foot"),
    ).toBeCloseTo(3, 10);
  });

  it("returns the same value for the same unit", () => {
    expect(
      convertLength(42, "meter", "meter"),
    ).toBe(42);
  });

  it("supports decimal values", () => {
    expect(
      convertLength(1.5, "meter", "centimeter"),
    ).toBe(150);
  });

  it("supports zero", () => {
    expect(
      convertLength(0, "meter", "kilometer"),
    ).toBe(0);
  });

  it("rejects NaN", () => {
    expect(() =>
      convertLength(
        Number.NaN,
        "meter",
        "kilometer",
      ),
    ).toThrow("Invalid length value");
  });

  it("rejects Infinity", () => {
    expect(() =>
      convertLength(
        Number.POSITIVE_INFINITY,
        "meter",
        "kilometer",
      ),
    ).toThrow("Invalid length value");
  });
});

describe("convertWeight", () => {
  it("converts kilograms to grams", () => {
    expect(
      convertWeight(2, "kilogram", "gram"),
    ).toBe(2000);
  });

  it("converts grams to kilograms", () => {
    expect(
      convertWeight(2500, "gram", "kilogram"),
    ).toBe(2.5);
  });

  it("converts kilograms to pounds", () => {
    expect(
      convertWeight(1, "kilogram", "pound"),
    ).toBeCloseTo(2.20462262, 8);
  });

  it("converts pounds to kilograms", () => {
    expect(
      convertWeight(10, "pound", "kilogram"),
    ).toBeCloseTo(4.5359237, 8);
  });

  it("converts ounces to grams", () => {
    expect(
      convertWeight(1, "ounce", "gram"),
    ).toBeCloseTo(28.349523125, 8);
  });

  it("converts tonnes to kilograms", () => {
    expect(
      convertWeight(2, "tonne", "kilogram"),
    ).toBe(2000);
  });

  it("converts stones to kilograms", () => {
    expect(
      convertWeight(1, "stone", "kilogram"),
    ).toBeCloseTo(6.35029318, 8);
  });

  it("returns the same value for the same unit", () => {
    expect(
      convertWeight(42, "kilogram", "kilogram"),
    ).toBe(42);
  });

  it("supports decimal values", () => {
    expect(
      convertWeight(1.5, "kilogram", "gram"),
    ).toBe(1500);
  });

  it("supports zero", () => {
    expect(
      convertWeight(0, "kilogram", "pound"),
    ).toBe(0);
  });

  it("rejects NaN", () => {
    expect(() =>
      convertWeight(
        Number.NaN,
        "kilogram",
        "gram",
      ),
    ).toThrow("Invalid weight value");
  });

  it("rejects Infinity", () => {
    expect(() =>
      convertWeight(
        Number.POSITIVE_INFINITY,
        "kilogram",
        "gram",
      ),
    ).toThrow("Invalid weight value");
  });
});

describe("convertTemperature", () => {
  it("converts Celsius to Fahrenheit", () => {
    expect(
      convertTemperature(0, "celsius", "fahrenheit"),
    ).toBeCloseTo(32, 10);
  });

  it("converts Fahrenheit to Celsius", () => {
    expect(
      convertTemperature(212, "fahrenheit", "celsius"),
    ).toBeCloseTo(100, 10);
  });

  it("converts Celsius to Kelvin", () => {
    expect(
      convertTemperature(0, "celsius", "kelvin"),
    ).toBeCloseTo(273.15, 10);
  });

  it("converts Kelvin to Celsius", () => {
    expect(
      convertTemperature(273.15, "kelvin", "celsius"),
    ).toBeCloseTo(0, 10);
  });

  it("converts Fahrenheit to Kelvin", () => {
    expect(
      convertTemperature(32, "fahrenheit", "kelvin"),
    ).toBeCloseTo(273.15, 10);
  });

  it("converts Kelvin to Fahrenheit", () => {
    expect(
      convertTemperature(273.15, "kelvin", "fahrenheit"),
    ).toBeCloseTo(32, 10);
  });

  it("returns the same value for the same unit", () => {
    expect(
      convertTemperature(25, "celsius", "celsius"),
    ).toBe(25);
  });

  it("supports negative Celsius values", () => {
    expect(
      convertTemperature(-40, "celsius", "fahrenheit"),
    ).toBeCloseTo(-40, 10);
  });

  it("supports negative Fahrenheit values", () => {
    expect(
      convertTemperature(-40, "fahrenheit", "celsius"),
    ).toBeCloseTo(-40, 10);
  });

  it("supports decimal values", () => {
    expect(
      convertTemperature(36.5, "celsius", "fahrenheit"),
    ).toBeCloseTo(97.7, 10);
  });

  it("supports zero", () => {
    expect(
      convertTemperature(0, "fahrenheit", "celsius"),
    ).toBeCloseTo(-17.7777777778, 10);
  });

  it("rejects NaN", () => {
    expect(() =>
      convertTemperature(
        Number.NaN,
        "celsius",
        "fahrenheit",
      ),
    ).toThrow("Invalid temperature value");
  });

  it("rejects Infinity", () => {
    expect(() =>
      convertTemperature(
        Number.POSITIVE_INFINITY,
        "celsius",
        "fahrenheit",
      ),
    ).toThrow("Invalid temperature value");
  });
});

describe("convertArea", () => {
  it("converts square meters to square centimeters", () => {
    expect(
      convertArea(1, "squareMeter", "squareCentimeter"),
    ).toBe(10000);
  });

  it("converts square kilometers to square meters", () => {
    expect(
      convertArea(2, "squareKilometer", "squareMeter"),
    ).toBe(2_000_000);
  });

  it("converts square feet to square meters", () => {
    expect(
      convertArea(10, "squareFoot", "squareMeter"),
    ).toBeCloseTo(0.9290304, 10);
  });

  it("converts square meters to square feet", () => {
    expect(
      convertArea(1, "squareMeter", "squareFoot"),
    ).toBeCloseTo(10.7639104167, 8);
  });

  it("converts acres to square meters", () => {
    expect(
      convertArea(1, "acre", "squareMeter"),
    ).toBeCloseTo(4046.8564224, 8);
  });

  it("converts hectares to square meters", () => {
    expect(
      convertArea(1, "hectare", "squareMeter"),
    ).toBe(10000);
  });

  it("converts square miles to square kilometers", () => {
    expect(
      convertArea(1, "squareMile", "squareKilometer"),
    ).toBeCloseTo(2.589988110336, 8);
  });

  it("converts square yards to square feet", () => {
    expect(
      convertArea(1, "squareYard", "squareFoot"),
    ).toBeCloseTo(9, 10);
  });

  it("returns the same value for the same unit", () => {
    expect(
      convertArea(42, "squareMeter", "squareMeter"),
    ).toBe(42);
  });

  it("supports decimal values", () => {
    expect(
      convertArea(1.5, "squareMeter", "squareCentimeter"),
    ).toBe(15000);
  });

  it("supports zero", () => {
    expect(
      convertArea(0, "squareMeter", "squareFoot"),
    ).toBe(0);
  });

  it("rejects NaN", () => {
    expect(() =>
      convertArea(
        Number.NaN,
        "squareMeter",
        "squareFoot",
      ),
    ).toThrow("Invalid area value");
  });

  it("rejects Infinity", () => {
    expect(() =>
      convertArea(
        Number.POSITIVE_INFINITY,
        "squareMeter",
        "squareFoot",
      ),
    ).toThrow("Invalid area value");
  });
});

describe("convertVolume", () => {
  it("converts liters to milliliters", () => {
    expect(convertVolume(1, "liter", "milliliter")).toBeCloseTo(1000);
  });

  it("converts milliliters to liters", () => {
    expect(convertVolume(1000, "milliliter", "liter")).toBeCloseTo(1);
  });

  it("converts cubic meters to liters", () => {
    expect(convertVolume(1, "cubicMeter", "liter")).toBeCloseTo(1000);
  });

  it("converts liters to cubic meters", () => {
    expect(convertVolume(1000, "liter", "cubicMeter")).toBeCloseTo(1);
  });

  it("converts cubic centimeters to liters", () => {
    expect(convertVolume(1000, "cubicCentimeter", "liter")).toBeCloseTo(1);
  });

  it("converts cubic inches to cubic centimeters", () => {
    expect(
      convertVolume(1, "cubicInch", "cubicCentimeter"),
    ).toBeCloseTo(16.387064);
  });

  it("converts cubic feet to liters", () => {
    expect(convertVolume(1, "cubicFoot", "liter")).toBeCloseTo(
      28.316846592,
    );
  });

  it("converts gallons to liters", () => {
    expect(convertVolume(1, "gallon", "liter")).toBeCloseTo(
      3.785411784,
    );
  });

  it("converts quarts to liters", () => {
    expect(convertVolume(1, "quart", "liter")).toBeCloseTo(
      0.946352946,
    );
  });

  it("converts pints to liters", () => {
    expect(convertVolume(1, "pint", "liter")).toBeCloseTo(
      0.473176473,
    );
  });

  it("returns the same value for the same unit", () => {
    expect(convertVolume(42, "liter", "liter")).toBeCloseTo(42);
  });

  it("handles decimal values", () => {
    expect(convertVolume(2.5, "liter", "milliliter")).toBeCloseTo(2500);
  });

  it("handles zero", () => {
    expect(convertVolume(0, "liter", "gallon")).toBe(0);
  });

  it("throws for NaN", () => {
    expect(() =>
      convertVolume(NaN, "liter", "milliliter"),
    ).toThrow("Invalid volume value");
  });

  it("throws for Infinity", () => {
    expect(() =>
      convertVolume(Infinity, "liter", "milliliter"),
    ).toThrow("Invalid volume value");
  });
});

describe("convertTime", () => {
  it("converts seconds to milliseconds", () => {
    expect(convertTime(1, "second", "millisecond")).toBeCloseTo(1000);
  });

  it("converts milliseconds to seconds", () => {
    expect(convertTime(1000, "millisecond", "second")).toBeCloseTo(1);
  });

  it("converts minutes to seconds", () => {
    expect(convertTime(1, "minute", "second")).toBeCloseTo(60);
  });

  it("converts hours to minutes", () => {
    expect(convertTime(1, "hour", "minute")).toBeCloseTo(60);
  });

  it("converts days to hours", () => {
    expect(convertTime(1, "day", "hour")).toBeCloseTo(24);
  });

  it("converts weeks to days", () => {
    expect(convertTime(1, "week", "day")).toBeCloseTo(7);
  });

  it("converts months to days", () => {
    expect(convertTime(1, "month", "day")).toBeCloseTo(30.4375);
  });

  it("converts years to days", () => {
    expect(convertTime(1, "year", "day")).toBeCloseTo(365.25);
  });

  it("converts hours to seconds", () => {
    expect(convertTime(2, "hour", "second")).toBeCloseTo(7200);
  });

  it("converts days to minutes", () => {
    expect(convertTime(2, "day", "minute")).toBeCloseTo(2880);
  });

  it("returns the same value for the same unit", () => {
    expect(convertTime(42, "hour", "hour")).toBeCloseTo(42);
  });

  it("handles decimal values", () => {
    expect(convertTime(1.5, "hour", "minute")).toBeCloseTo(90);
  });

  it("handles zero", () => {
    expect(convertTime(0, "hour", "second")).toBe(0);
  });

  it("throws for NaN", () => {
    expect(() =>
      convertTime(NaN, "hour", "second"),
    ).toThrow("Invalid time value");
  });

  it("throws for Infinity", () => {
    expect(() =>
      convertTime(Infinity, "hour", "second"),
    ).toThrow("Invalid time value");
  });
});

describe("convertSpeed", () => {
  it("converts meters per second to kilometers per hour", () => {
    expect(
      convertSpeed(1, "meterPerSecond", "kilometerPerHour"),
    ).toBeCloseTo(3.6);
  });

  it("converts kilometers per hour to meters per second", () => {
    expect(
      convertSpeed(36, "kilometerPerHour", "meterPerSecond"),
    ).toBeCloseTo(10);
  });

  it("converts miles per hour to kilometers per hour", () => {
    expect(
      convertSpeed(1, "milePerHour", "kilometerPerHour"),
    ).toBeCloseTo(1.609344);
  });

  it("converts kilometers per hour to miles per hour", () => {
    expect(
      convertSpeed(1, "kilometerPerHour", "milePerHour"),
    ).toBeCloseTo(0.6213711922);
  });

  it("converts feet per second to meters per second", () => {
    expect(
      convertSpeed(1, "footPerSecond", "meterPerSecond"),
    ).toBeCloseTo(0.3048);
  });

  it("converts knots to kilometers per hour", () => {
    expect(
      convertSpeed(1, "knot", "kilometerPerHour"),
    ).toBeCloseTo(1.852);
  });

  it("converts kilometers per hour to knots", () => {
    expect(
      convertSpeed(1, "kilometerPerHour", "knot"),
    ).toBeCloseTo(0.5399568035);
  });

  it("returns the same value for the same unit", () => {
    expect(
      convertSpeed(42, "kilometerPerHour", "kilometerPerHour"),
    ).toBeCloseTo(42);
  });

  it("handles decimal values", () => {
    expect(
      convertSpeed(2.5, "meterPerSecond", "kilometerPerHour"),
    ).toBeCloseTo(9);
  });

  it("handles zero", () => {
    expect(
      convertSpeed(0, "kilometerPerHour", "milePerHour"),
    ).toBe(0);
  });

  it("handles negative values", () => {
    expect(
      convertSpeed(-10, "kilometerPerHour", "meterPerSecond"),
    ).toBeCloseTo(-2.7777777778);
  });

  it("throws for NaN", () => {
    expect(() =>
      convertSpeed(NaN, "kilometerPerHour", "meterPerSecond"),
    ).toThrow("Invalid speed value");
  });

  it("throws for Infinity", () => {
    expect(() =>
      convertSpeed(Infinity, "kilometerPerHour", "meterPerSecond"),
    ).toThrow("Invalid speed value");
  });
});

describe("convertData", () => {
  it("converts bytes to bits", () => {
    expect(convertData(1, "byte", "bit")).toBeCloseTo(8);
  });

  it("converts bits to bytes", () => {
    expect(convertData(8, "bit", "byte")).toBeCloseTo(1);
  });

  it("converts kilobytes to bytes", () => {
    expect(convertData(1, "kilobyte", "byte")).toBeCloseTo(1000);
  });

  it("converts megabytes to kilobytes", () => {
    expect(convertData(1, "megabyte", "kilobyte")).toBeCloseTo(1000);
  });

  it("converts gigabytes to megabytes", () => {
    expect(convertData(1, "gigabyte", "megabyte")).toBeCloseTo(1000);
  });

  it("converts terabytes to gigabytes", () => {
    expect(convertData(1, "terabyte", "gigabyte")).toBeCloseTo(1000);
  });

  it("converts kilobits to bits", () => {
    expect(convertData(1, "kilobit", "bit")).toBeCloseTo(1000);
  });

  it("converts megabits to bits", () => {
    expect(convertData(1, "megabit", "bit")).toBeCloseTo(1_000_000);
  });

  it("converts gigabits to megabits", () => {
    expect(convertData(1, "gigabit", "megabit")).toBeCloseTo(1000);
  });

  it("converts megabytes to megabits", () => {
    expect(convertData(1, "megabyte", "megabit")).toBeCloseTo(8);
  });

  it("returns the same value for the same unit", () => {
    expect(convertData(42, "gigabyte", "gigabyte")).toBeCloseTo(42);
  });

  it("handles decimal values", () => {
    expect(convertData(1.5, "gigabyte", "megabyte")).toBeCloseTo(1500);
  });

  it("handles zero", () => {
    expect(convertData(0, "gigabyte", "byte")).toBe(0);
  });

  it("throws for NaN", () => {
    expect(() =>
      convertData(NaN, "gigabyte", "megabyte"),
    ).toThrow("Invalid data value");
  });

  it("throws for Infinity", () => {
    expect(() =>
      convertData(Infinity, "gigabyte", "megabyte"),
    ).toThrow("Invalid data value");
  });
});

describe("convertEnergy", () => {
  it("converts joules to kilojoules", () => {
    expect(convertEnergy(1000, "joule", "kilojoule")).toBeCloseTo(1);
  });

  it("converts kilojoules to joules", () => {
    expect(convertEnergy(1, "kilojoule", "joule")).toBeCloseTo(1000);
  });

  it("converts calories to joules", () => {
    expect(convertEnergy(1, "calorie", "joule")).toBeCloseTo(4.184);
  });

  it("converts kilocalories to joules", () => {
    expect(convertEnergy(1, "kilocalorie", "joule")).toBeCloseTo(4184);
  });

  it("converts kilocalories to calories", () => {
    expect(convertEnergy(1, "kilocalorie", "calorie")).toBeCloseTo(1000);
  });

  it("converts watt-hours to joules", () => {
    expect(convertEnergy(1, "wattHour", "joule")).toBeCloseTo(3600);
  });

  it("converts kilowatt-hours to joules", () => {
    expect(
      convertEnergy(1, "kilowattHour", "joule"),
    ).toBeCloseTo(3_600_000);
  });

  it("converts kilowatt-hours to watt-hours", () => {
    expect(
      convertEnergy(1, "kilowattHour", "wattHour"),
    ).toBeCloseTo(1000);
  });

  it("converts electronvolts to joules", () => {
    expect(
      convertEnergy(1, "electronvolt", "joule"),
    ).toBeCloseTo(1.602176634e-19);
  });

  it("converts BTU to joules", () => {
    expect(
      convertEnergy(1, "britishThermalUnit", "joule"),
    ).toBeCloseTo(1055.05585262);
  });

  it("returns the same value for the same unit", () => {
    expect(convertEnergy(42, "joule", "joule")).toBeCloseTo(42);
  });

  it("handles decimal values", () => {
    expect(
      convertEnergy(2.5, "kilojoule", "joule"),
    ).toBeCloseTo(2500);
  });

  it("handles zero", () => {
    expect(
      convertEnergy(0, "kilowattHour", "joule"),
    ).toBe(0);
  });

  it("throws for NaN", () => {
    expect(() =>
      convertEnergy(NaN, "joule", "kilojoule"),
    ).toThrow("Invalid energy value");
  });

  it("throws for Infinity", () => {
    expect(() =>
      convertEnergy(Infinity, "joule", "kilojoule"),
    ).toThrow("Invalid energy value");
  });
});