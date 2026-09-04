import { describe, expect, it } from "vitest";
import {
  addDays,
  calculateAge,
  dateDifference,
  dayOfWeek,
  daysInMonth,
} from "./dateTimeUtils";

describe("dateTimeUtils", () => {
  describe("dateDifference", () => {
    it("calculates the number of days between two dates", () => {
      expect(dateDifference("2026-01-01", "2026-01-10")).toBe(9);
    });

    it("works regardless of date order", () => {
      expect(dateDifference("2026-01-10", "2026-01-01")).toBe(9);
    });

    it("returns zero for the same date", () => {
      expect(dateDifference("2026-05-15", "2026-05-15")).toBe(0);
    });

    it("handles dates across months", () => {
      expect(dateDifference("2026-01-30", "2026-02-02")).toBe(3);
    });
  });

  describe("addDays", () => {
    it("adds days to a date", () => {
      expect(addDays("2026-01-01", 10)).toBe("2026-01-11");
    });

    it("subtracts days from a date", () => {
      expect(addDays("2026-01-11", -10)).toBe("2026-01-01");
    });

    it("handles month boundaries", () => {
      expect(addDays("2026-01-30", 3)).toBe("2026-02-02");
    });

    it("handles year boundaries", () => {
      expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    });

    it("rejects non-finite day values", () => {
      expect(() => addDays("2026-01-01", Number.NaN)).toThrow();
    });
  });

  describe("calculateAge", () => {
    it("calculates a complete age", () => {
      expect(
        calculateAge("2000-01-15", "2026-01-15"),
      ).toEqual({
        years: 26,
        months: 0,
        days: 0,
      });
    });

    it("calculates age before the birthday", () => {
      expect(
        calculateAge("2000-06-15", "2026-05-10"),
      ).toEqual({
        years: 25,
        months: 10,
        days: 25,
      });
    });

    it("handles month and day differences", () => {
      expect(
        calculateAge("2000-01-10", "2026-03-15"),
      ).toEqual({
        years: 26,
        months: 2,
        days: 5,
      });
    });

    it("rejects a birth date after the reference date", () => {
      expect(() =>
        calculateAge("2027-01-01", "2026-01-01"),
      ).toThrow();
    });
  });

  describe("dayOfWeek", () => {
    it("returns the correct weekday", () => {
      expect(dayOfWeek("2026-01-01")).toBe("Thursday");
    });

    it("handles another known date", () => {
      expect(dayOfWeek("2026-09-04")).toBe("Friday");
    });
  });

  describe("daysInMonth", () => {
    it("returns 31 for January", () => {
      expect(daysInMonth(2026, 1)).toBe(31);
    });

    it("returns 30 for April", () => {
      expect(daysInMonth(2026, 4)).toBe(30);
    });

    it("handles February in a non-leap year", () => {
      expect(daysInMonth(2026, 2)).toBe(28);
    });

    it("handles February in a leap year", () => {
      expect(daysInMonth(2028, 2)).toBe(29);
    });

    it("rejects an invalid month", () => {
      expect(() => daysInMonth(2026, 13)).toThrow();
    });

    it("rejects an invalid year", () => {
      expect(() => daysInMonth(2026.5, 1)).toThrow();
    });
  });

  describe("date validation", () => {
    it("rejects an invalid date", () => {
      expect(() => dateDifference("2026-02-30", "2026-03-01")).toThrow();
    });

    it("rejects incorrectly formatted dates", () => {
      expect(() => dayOfWeek("01-01-2026")).toThrow();
    });
  });
});