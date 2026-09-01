export interface CalculatorState {
  expression: string;
  result: string;
  error: string | null;
  justEvaluated: boolean;
}