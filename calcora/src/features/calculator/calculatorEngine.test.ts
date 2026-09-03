import { describe, expect, it } from "vitest";
import { calculate } from "./calculatorEngine";

describe("calculate", () => {
  it("calculates basic addition", () => {
    const result = calculate("12 + 5");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(17);
    }
  });

  it("respects mathematical operator precedence", () => {
    const result = calculate("12 + 5 × 3");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(27);
    }
  });

  it("supports parentheses", () => {
    const result = calculate("(12 + 5) × 3");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(51);
    }
  });

  it("supports division", () => {
    const result = calculate("100 ÷ 4");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(25);
    }
  });

  it("supports powers", () => {
    const result = calculate("2 ^ 10");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(1024);
    }
  });

  it("supports negative numbers", () => {
    const result = calculate("-25 + 10");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(-15);
    }
  });

  it("handles decimal calculations", () => {
    const result = calculate("10.5 × 2");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(21);
    }
  });

  it("handles invalid expressions", () => {
    const result = calculate("12 +");

    expect(result.success).toBe(false);
  });

  it("handles empty expressions", () => {
    const result = calculate("");

    expect(result.success).toBe(false);
  });

  it("calculates standalone percentages", () => {
    const result = calculate("50%");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(0.5);
    }
  });

  it("calculates percentage multiplication", () => {
    const result = calculate("200 × 15%");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(30);
    }
  });

  it("calculates percentage addition", () => {
    const result = calculate("200 + 15%");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(230);
    }
  });

  it("calculates percentage subtraction", () => {
    const result = calculate("200 − 15%");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(170);
    }
  });

  it("calculates percentage division", () => {
    const result = calculate("200 ÷ 10%");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(2000);
    }
  });

    it("calculates sine in degrees", () => {
    const result = calculate("sin(30)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(0.5, 10);
    }
  });

  it("calculates cosine in degrees", () => {
    const result = calculate("cos(60)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(0.5, 10);
    }
  });

  it("calculates tangent in degrees", () => {
    const result = calculate("tan(45)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(1, 10);
    }
  });

  it("calculates square root", () => {
    const result = calculate("sqrt(25)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(5);
    }
  });

  it("calculates square root using the calculator symbol", () => {
    const result = calculate("√25");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(5);
    }
  });

  it("calculates logarithm", () => {
    const result = calculate("log(100)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(2, 10);
    }
  });

  it("calculates natural logarithm", () => {
    const result = calculate("ln(e)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(1, 10);
    }
  });

  it("supports pi", () => {
    const result = calculate("π × 2");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(
        Math.PI * 2,
        10,
      );
    }
  });

  it("supports Euler's number", () => {
    const result = calculate("e");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(
        Math.E,
        10,
      );
    }
  });

  it("supports squared values", () => {
    const result = calculate("5 ^ 2");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(25);
    }
  });

    it("calculates trigonometric functions with arithmetic expressions", () => {
    const result = calculate("sin(30 + 15)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(
        Math.sin((45 * Math.PI) / 180),
        10,
      );
    }
  });

  it("combines scientific functions with arithmetic", () => {
    const result = calculate("sqrt(25) + 5 ^ 2");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(30);
    }
  });

  it("calculates inverse sine in degrees", () => {
    const result = calculate("asin(0.5)", "deg");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(30, 10);
    }
  });

  it("calculates inverse cosine in degrees", () => {
    const result = calculate("acos(0.5)", "deg");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(60, 10);
    }
  });

  it("calculates inverse tangent in degrees", () => {
    const result = calculate("atan(1)", "deg");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(45, 10);
    }
  });

  it("calculates inverse sine in radians", () => {
    const result = calculate("asin(0.5)", "rad");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(
        Math.PI / 6,
        10,
      );
    }
  });

  it("calculates inverse cosine in radians", () => {
    const result = calculate("acos(0.5)", "rad");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(
        Math.PI / 3,
        10,
      );
    }
  });

  it("calculates inverse tangent in radians", () => {
    const result = calculate("atan(1)", "rad");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBeCloseTo(
        Math.PI / 4,
        10,
      );
    }
  });

  it("calculates absolute value", () => {
    const result = calculate("abs(-5)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(5);
    }
  });

  it("calculates absolute value of a decimal", () => {
    const result = calculate("abs(-12.5)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(12.5);
    }
  });

  it("calculates absolute value of an expression", () => {
    const result = calculate("abs(3 - 8)");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.result.value).toBe(5);
    }
  });
});