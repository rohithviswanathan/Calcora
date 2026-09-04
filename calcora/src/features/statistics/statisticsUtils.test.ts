import { describe, expect, it } from "vitest";
import {
  count,
  maximum,
  mean,
  median,
  minimum,
  mode,
  range,
  sum,
} from "./statisticsUtils";

describe("statisticsUtils", () => {
  describe("sum", () => {
    it("calculates the sum", () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });

    it("handles negative values", () => {
      expect(sum([-5, 2, 3])).toBe(0);
    });

    it("handles decimal values", () => {
      expect(sum([1.5, 2.5, 3])).toBe(7);
    });
  });

  describe("count", () => {
    it("counts values", () => {
      expect(count([10, 20, 30, 40])).toBe(4);
    });

    it("counts a single value", () => {
      expect(count([7])).toBe(1);
    });
  });

  describe("mean", () => {
    it("calculates the mean", () => {
      expect(mean([2, 4, 6, 8])).toBe(5);
    });

    it("calculates a decimal mean", () => {
      expect(mean([1, 2, 2])).toBe(5 / 3);
    });

    it("handles negative values", () => {
      expect(mean([-2, 0, 2])).toBe(0);
    });
  });

  describe("median", () => {
    it("calculates the median of an odd-length dataset", () => {
      expect(median([1, 3, 5])).toBe(3);
    });

    it("calculates the median of an even-length dataset", () => {
      expect(median([1, 2, 3, 4])).toBe(2.5);
    });

    it("sorts values before calculating the median", () => {
      expect(median([9, 1, 5, 3, 7])).toBe(5);
    });
  });

  describe("mode", () => {
    it("finds a single mode", () => {
      expect(mode([1, 2, 2, 3, 4])).toEqual([2]);
    });

    it("finds multiple modes", () => {
      expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
    });

    it("returns an empty array when there is no mode", () => {
      expect(mode([1, 2, 3, 4])).toEqual([]);
    });

    it("returns modes in ascending order", () => {
      expect(mode([5, 2, 5, 2, 3])).toEqual([2, 5]);
    });
  });

  describe("range", () => {
    it("calculates the range", () => {
      expect(range([2, 5, 9, 12])).toBe(10);
    });

    it("handles negative values", () => {
      expect(range([-10, -5, 0, 5])).toBe(15);
    });
  });

  describe("minimum", () => {
    it("finds the minimum value", () => {
      expect(minimum([5, 2, 8, 1, 9])).toBe(1);
    });
  });

  describe("maximum", () => {
    it("finds the maximum value", () => {
      expect(maximum([5, 2, 8, 1, 9])).toBe(9);
    });
  });

  describe("validation", () => {
    it("rejects an empty dataset", () => {
      expect(() => mean([])).toThrow();
    });

    it("rejects non-finite values", () => {
      expect(() => sum([1, Number.NaN, 3])).toThrow();
    });

    it("rejects Infinity", () => {
      expect(() => median([1, Infinity, 3])).toThrow();
    });
  });
});