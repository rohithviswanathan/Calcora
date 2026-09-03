import { describe, expect, it } from "vitest";
import {
  convertLength,
  convertWeight
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