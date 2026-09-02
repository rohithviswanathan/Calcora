export type CalculatorOperator =
  | "+"
  | "-"
  | "*"
  | "/"
  | "^";

export type AngleMode = "deg" | "rad";

export interface CalculationResult {
  expression: string;
  value: number;
  formattedValue: string;
}

export interface CalculationError {
  expression: string;
  message: string;
}

export type CalculatorEvaluation =
  | {
      success: true;
      result: CalculationResult;
    }
  | {
      success: false;
      error: CalculationError;
    };