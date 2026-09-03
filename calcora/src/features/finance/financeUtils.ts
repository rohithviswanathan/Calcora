export interface LoanCalculation {
  monthlyEmi: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  numberOfPayments: number;
}

export function calculateLoan(
  principal: number,
  annualInterestRate: number,
  tenureYears: number,
): LoanCalculation {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualInterestRate) ||
    !Number.isFinite(tenureYears) ||
    principal <= 0 ||
    annualInterestRate < 0 ||
    tenureYears <= 0
  ) {
    throw new Error("Invalid loan values");
  }

  const numberOfPayments = Math.round(tenureYears * 12);

  const monthlyInterestRate =
    annualInterestRate / 100 / 12;

  let monthlyEmi: number;

  if (monthlyInterestRate === 0) {
    monthlyEmi = principal / numberOfPayments;
  } else {
    const rateFactor = Math.pow(
      1 + monthlyInterestRate,
      numberOfPayments,
    );

    monthlyEmi =
      (principal *
        monthlyInterestRate *
        rateFactor) /
      (rateFactor - 1);
  }

  const totalPayment =
    monthlyEmi * numberOfPayments;

  const totalInterest =
    totalPayment - principal;

  return {
    monthlyEmi,
    totalPayment,
    totalInterest,
    principal,
    numberOfPayments,
  };
}

export interface SimpleInterestCalculation {
  principal: number;
  interest: number;
  totalAmount: number;
}

export function calculateSimpleInterest(
  principal: number,
  annualInterestRate: number,
  timeYears: number,
): SimpleInterestCalculation {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualInterestRate) ||
    !Number.isFinite(timeYears) ||
    principal <= 0 ||
    annualInterestRate < 0 ||
    timeYears <= 0
  ) {
    throw new Error("Invalid simple interest values");
  }

  const interest =
    (principal * annualInterestRate * timeYears) / 100;

  const totalAmount = principal + interest;

  return {
    principal,
    interest,
    totalAmount,
  };
}

export type CompoundingFrequency =
  | "yearly"
  | "half-yearly"
  | "quarterly"
  | "monthly";

export interface CompoundInterestCalculation {
  principal: number;
  interest: number;
  totalAmount: number;
  numberOfCompounds: number;
}

export function calculateCompoundInterest(
  principal: number,
  annualInterestRate: number,
  timeYears: number,
  frequency: CompoundingFrequency,
): CompoundInterestCalculation {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualInterestRate) ||
    !Number.isFinite(timeYears) ||
    principal <= 0 ||
    annualInterestRate < 0 ||
    timeYears <= 0
  ) {
    throw new Error("Invalid compound interest values");
  }

  const compoundsPerYear: Record<
    CompoundingFrequency,
    number
  > = {
    yearly: 1,
    "half-yearly": 2,
    quarterly: 4,
    monthly: 12,
  };

  const n = compoundsPerYear[frequency];

  const numberOfCompounds = Math.round(
    n * timeYears,
  );

  const periodicRate =
    annualInterestRate / 100 / n;

  const totalAmount =
    principal *
    Math.pow(
      1 + periodicRate,
      numberOfCompounds,
    );

  const interest = totalAmount - principal;

  return {
    principal,
    interest,
    totalAmount,
    numberOfCompounds,
  };
}

export interface PercentageCalculation {
  percentage: number;
  value: number;
  result: number;
}

export function calculatePercentage(
  percentage: number,
  value: number,
): PercentageCalculation {
  if (
    !Number.isFinite(percentage) ||
    !Number.isFinite(value) ||
    percentage < 0 ||
    value < 0
  ) {
    throw new Error("Invalid percentage values");
  }

  const result = (percentage / 100) * value;

  return {
    percentage,
    value,
    result,
  };
}

export interface DiscountCalculation {
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number,
): DiscountCalculation {
  if (
    !Number.isFinite(originalPrice) ||
    !Number.isFinite(discountPercentage) ||
    originalPrice < 0 ||
    discountPercentage < 0 ||
    discountPercentage > 100
  ) {
    throw new Error("Invalid discount values");
  }

  const discountAmount =
    (originalPrice * discountPercentage) / 100;

  const finalPrice =
    originalPrice - discountAmount;

  return {
    originalPrice,
    discountPercentage,
    discountAmount,
    finalPrice,
  };
}

export interface TipCalculation {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  numberOfPeople: number;
  perPersonAmount: number;
}

export function calculateTip(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number = 1,
): TipCalculation {
  if (
    !Number.isFinite(billAmount) ||
    !Number.isFinite(tipPercentage) ||
    !Number.isFinite(numberOfPeople) ||
    billAmount < 0 ||
    tipPercentage < 0 ||
    numberOfPeople <= 0
  ) {
    throw new Error("Invalid tip values");
  }

  const tipAmount =
    (billAmount * tipPercentage) / 100;

  const totalAmount =
    billAmount + tipAmount;

  const perPersonAmount =
    totalAmount / numberOfPeople;

  return {
    billAmount,
    tipPercentage,
    tipAmount,
    totalAmount,
    numberOfPeople,
    perPersonAmount,
  };
}