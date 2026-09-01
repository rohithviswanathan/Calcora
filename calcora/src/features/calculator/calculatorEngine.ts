import { evaluate } from "mathjs";
import type {
  CalculatorEvaluation,
} from "./calculatorTypes";

function normalizeExpression(expression: string): string {
  return expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("−", "-")
    .replaceAll("π", "pi")
    .trim();
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  if (Number.isInteger(value)) {
    return value.toLocaleString("en-US");
  }

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

export function calculate(
  expression: string,
): CalculatorEvaluation {
  const trimmedExpression = expression.trim();

  if (!trimmedExpression) {
    return {
      success: false,
      error: {
        expression,
        message: "Enter an expression to calculate.",
      },
    };
  }

  try {
    const normalized = normalizeExpression(
      trimmedExpression,
    );

    const value = evaluate(normalized);

    if (typeof value !== "number") {
      return {
        success: false,
        error: {
          expression,
          message: "The expression did not produce a number.",
        },
      };
    }

    if (!Number.isFinite(value)) {
      return {
        success: false,
        error: {
          expression,
          message: "The result is not a finite number.",
        },
      };
    }

    return {
      success: true,
      result: {
        expression: trimmedExpression,
        value,
        formattedValue: formatResult(value),
      },
    };
  } catch {
    return {
      success: false,
      error: {
        expression: trimmedExpression,
        message: "Unable to calculate this expression.",
      },
    };
  }
}