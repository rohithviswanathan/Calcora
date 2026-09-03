import { describe, expect, it } from "vitest";
import {
  calculateLoan,
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculatePercentage,
  calculateDiscount,
  calculateTip,
} from "./financeUtils";


describe("calculateLoan", () => {
  it("calculates a standard loan correctly", () => {
    const result = calculateLoan(
      1000000,
      8.5,
      20,
    );

    expect(result.monthlyEmi).toBeCloseTo(
      8678.2323,
      2,
    );

    expect(result.totalPayment).toBeCloseTo(
      2082775.7601,
      1,
    );

    expect(result.totalInterest).toBeCloseTo(
      1082775.7601,
      1,
    );

    expect(result.principal).toBe(1000000);
    expect(result.numberOfPayments).toBe(240);
  });

  it("handles zero interest correctly", () => {
    const result = calculateLoan(
      120000,
      0,
      1,
    );

    expect(result.monthlyEmi).toBe(10000);
    expect(result.totalPayment).toBe(120000);
    expect(result.totalInterest).toBe(0);
  });

  it("supports fractional yearly tenure", () => {
    const result = calculateLoan(
      120000,
      12,
      0.5,
    );

    expect(result.numberOfPayments).toBe(6);

    expect(result.monthlyEmi).toBeCloseTo(
      20705.804,
      2,
    );
  });

  it("rejects invalid loan amounts", () => {
    expect(() =>
      calculateLoan(0, 8.5, 20),
    ).toThrow();

    expect(() =>
      calculateLoan(-100000, 8.5, 20),
    ).toThrow();
  });

  it("rejects negative interest rates", () => {
    expect(() =>
      calculateLoan(1000000, -1, 20),
    ).toThrow();
  });

  it("rejects invalid tenure", () => {
    expect(() =>
      calculateLoan(1000000, 8.5, 0),
    ).toThrow();

    expect(() =>
      calculateLoan(1000000, 8.5, -5),
    ).toThrow();
  });
});

describe("calculateSimpleInterest", () => {
  it("calculates simple interest correctly", () => {
    const result = calculateSimpleInterest(
      100000,
      8,
      2,
    );

    expect(result.principal).toBe(100000);
    expect(result.interest).toBe(16000);
    expect(result.totalAmount).toBe(116000);
  });

  it("handles zero interest correctly", () => {
    const result = calculateSimpleInterest(
      50000,
      0,
      3,
    );

    expect(result.interest).toBe(0);
    expect(result.totalAmount).toBe(50000);
  });

  it("supports fractional time", () => {
    const result = calculateSimpleInterest(
      100000,
      12,
      0.5,
    );

    expect(result.interest).toBe(6000);
    expect(result.totalAmount).toBe(106000);
  });

  it("rejects invalid principal", () => {
    expect(() =>
      calculateSimpleInterest(0, 8, 2),
    ).toThrow();

    expect(() =>
      calculateSimpleInterest(-100000, 8, 2),
    ).toThrow();
  });

  it("rejects negative interest rates", () => {
    expect(() =>
      calculateSimpleInterest(100000, -1, 2),
    ).toThrow();
  });

  it("rejects invalid time", () => {
    expect(() =>
      calculateSimpleInterest(100000, 8, 0),
    ).toThrow();

    expect(() =>
      calculateSimpleInterest(100000, 8, -2),
    ).toThrow();
  });
});

describe("calculateCompoundInterest", () => {
  it("calculates yearly compound interest correctly", () => {
    const result = calculateCompoundInterest(
      100000,
      8,
      2,
      "yearly",
    );

    expect(result.principal).toBe(100000);
    expect(result.totalAmount).toBeCloseTo(
      116640,
      2,
    );
    expect(result.interest).toBeCloseTo(
      16640,
      2,
    );
    expect(result.numberOfCompounds).toBe(2);
  });

  it("calculates monthly compound interest correctly", () => {
    const result = calculateCompoundInterest(
      100000,
      8,
      2,
      "monthly",
    );

    expect(result.totalAmount).toBeCloseTo(
      117288.7932,
      2,
    );

    expect(result.interest).toBeCloseTo(
      17288.7932,
      2,
    );
    expect(result.numberOfCompounds).toBe(24);
  });

  it("supports different compounding frequencies", () => {
    const yearly = calculateCompoundInterest(
      100000,
      8,
      2,
      "yearly",
    );

    const quarterly = calculateCompoundInterest(
      100000,
      8,
      2,
      "quarterly",
    );

    const monthly = calculateCompoundInterest(
      100000,
      8,
      2,
      "monthly",
    );

    expect(quarterly.totalAmount).toBeGreaterThan(
      yearly.totalAmount,
    );

    expect(monthly.totalAmount).toBeGreaterThan(
      quarterly.totalAmount,
    );
  });

  it("handles zero interest correctly", () => {
    const result = calculateCompoundInterest(
      50000,
      0,
      3,
      "monthly",
    );

    expect(result.interest).toBe(0);
    expect(result.totalAmount).toBe(50000);
    expect(result.numberOfCompounds).toBe(36);
  });

  it("supports fractional time", () => {
    const result = calculateCompoundInterest(
      100000,
      12,
      0.5,
      "monthly",
    );

    expect(result.numberOfCompounds).toBe(6);
    expect(result.totalAmount).toBeCloseTo(
      106152.015,
      2,
    );
  });

  it("rejects invalid principal", () => {
    expect(() =>
      calculateCompoundInterest(
        0,
        8,
        2,
        "yearly",
      ),
    ).toThrow();

    expect(() =>
      calculateCompoundInterest(
        -100000,
        8,
        2,
        "yearly",
      ),
    ).toThrow();
  });

  it("rejects negative interest rates", () => {
    expect(() =>
      calculateCompoundInterest(
        100000,
        -1,
        2,
        "yearly",
      ),
    ).toThrow();
  });

  it("rejects invalid time", () => {
    expect(() =>
      calculateCompoundInterest(
        100000,
        8,
        0,
        "yearly",
      ),
    ).toThrow();

    expect(() =>
      calculateCompoundInterest(
        100000,
        8,
        -2,
        "yearly",
      ),
    ).toThrow();
  });
});

describe("calculatePercentage", () => {
  it("calculates a percentage of a value correctly", () => {
    const result = calculatePercentage(15, 2000);

    expect(result.percentage).toBe(15);
    expect(result.value).toBe(2000);
    expect(result.result).toBe(300);
  });

  it("handles zero percentage", () => {
    const result = calculatePercentage(0, 5000);

    expect(result.result).toBe(0);
  });

  it("handles fractional percentages", () => {
    const result = calculatePercentage(12.5, 800);

    expect(result.result).toBe(100);
  });

  it("handles decimal values", () => {
    const result = calculatePercentage(7.5, 1250.5);

    expect(result.result).toBeCloseTo(93.7875, 4);
  });

  it("rejects negative percentage", () => {
    expect(() =>
      calculatePercentage(-5, 1000),
    ).toThrow();
  });

  it("rejects negative values", () => {
    expect(() =>
      calculatePercentage(10, -1000),
    ).toThrow();
  });

  it("rejects invalid percentage", () => {
    expect(() =>
      calculatePercentage(NaN, 1000),
    ).toThrow();
  });

  it("rejects invalid value", () => {
    expect(() =>
      calculatePercentage(10, NaN),
    ).toThrow();
  });
});

describe("calculateDiscount", () => {
  it("calculates discount correctly", () => {
    const result = calculateDiscount(2000, 15);

    expect(result.originalPrice).toBe(2000);
    expect(result.discountPercentage).toBe(15);
    expect(result.discountAmount).toBe(300);
    expect(result.finalPrice).toBe(1700);
  });

  it("handles zero discount", () => {
    const result = calculateDiscount(5000, 0);

    expect(result.discountAmount).toBe(0);
    expect(result.finalPrice).toBe(5000);
  });

  it("handles 100 percent discount", () => {
    const result = calculateDiscount(5000, 100);

    expect(result.discountAmount).toBe(5000);
    expect(result.finalPrice).toBe(0);
  });

  it("handles fractional discount percentages", () => {
    const result = calculateDiscount(1250, 12.5);

    expect(result.discountAmount).toBe(156.25);
    expect(result.finalPrice).toBe(1093.75);
  });

  it("handles decimal prices", () => {
    const result = calculateDiscount(999.99, 10);

    expect(result.discountAmount).toBeCloseTo(99.999, 3);
    expect(result.finalPrice).toBeCloseTo(899.991, 3);
  });

  it("rejects negative prices", () => {
    expect(() =>
      calculateDiscount(-1000, 10),
    ).toThrow();
  });

  it("rejects negative discounts", () => {
    expect(() =>
      calculateDiscount(1000, -10),
    ).toThrow();
  });

  it("rejects discounts above 100 percent", () => {
    expect(() =>
      calculateDiscount(1000, 101),
    ).toThrow();
  });

  it("rejects invalid price", () => {
    expect(() =>
      calculateDiscount(NaN, 10),
    ).toThrow();
  });

  it("rejects invalid discount", () => {
    expect(() =>
      calculateDiscount(1000, NaN),
    ).toThrow();
  });
});

describe("calculateTip", () => {
  it("calculates a tip correctly", () => {
    const result = calculateTip(2000, 15);

    expect(result.billAmount).toBe(2000);
    expect(result.tipPercentage).toBe(15);
    expect(result.tipAmount).toBe(300);
    expect(result.totalAmount).toBe(2300);
    expect(result.perPersonAmount).toBe(2300);
  });

  it("splits the bill between multiple people", () => {
    const result = calculateTip(2000, 15, 4);

    expect(result.tipAmount).toBe(300);
    expect(result.totalAmount).toBe(2300);
    expect(result.perPersonAmount).toBe(575);
  });

  it("handles zero tip", () => {
    const result = calculateTip(5000, 0, 2);

    expect(result.tipAmount).toBe(0);
    expect(result.totalAmount).toBe(5000);
    expect(result.perPersonAmount).toBe(2500);
  });

  it("handles fractional tip percentages", () => {
    const result = calculateTip(1250, 12.5);

    expect(result.tipAmount).toBe(156.25);
    expect(result.totalAmount).toBe(1406.25);
  });

  it("handles decimal bill amounts", () => {
    const result = calculateTip(999.99, 10, 3);

    expect(result.tipAmount).toBeCloseTo(99.999, 3);
    expect(result.totalAmount).toBeCloseTo(1099.989, 3);
    expect(result.perPersonAmount).toBeCloseTo(
      366.663,
      3,
    );
  });

  it("defaults to one person", () => {
    const result = calculateTip(1000, 10);

    expect(result.perPersonAmount).toBe(1100);
  });

  it("rejects negative bill amounts", () => {
    expect(() =>
      calculateTip(-1000, 10),
    ).toThrow();
  });

  it("rejects negative tip percentages", () => {
    expect(() =>
      calculateTip(1000, -10),
    ).toThrow();
  });

  it("rejects zero people", () => {
    expect(() =>
      calculateTip(1000, 10, 0),
    ).toThrow();
  });

  it("rejects negative people", () => {
    expect(() =>
      calculateTip(1000, 10, -2),
    ).toThrow();
  });

  it("rejects invalid bill amount", () => {
    expect(() =>
      calculateTip(NaN, 10),
    ).toThrow();
  });

  it("rejects invalid tip percentage", () => {
    expect(() =>
      calculateTip(1000, NaN),
    ).toThrow();
  });
});