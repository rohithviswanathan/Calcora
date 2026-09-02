export type CalculatorOperator =
  | "+"
  | "-"
  | "*"
  | "/"
  | "^";

export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

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