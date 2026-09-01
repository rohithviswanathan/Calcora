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
});