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

/**
 * Converts calculator-style percentage expressions into
 * regular mathematical expressions before passing them to mathjs.
 *
 * Examples:
 * 50%          -> 0.5
 * 200*15%      -> 200*0.15
 * 200+15%      -> 200+(200*0.15)
 * 200-15%      -> 200-(200*0.15)
 * 200/10%      -> 200/0.10
 */
function normalizePercentageExpression(
  expression: string,
): string {
  const percentageMatch =
    expression.match(
      /^(.+?)([+\-*/])(\d+(?:\.\d+)?)%$/,
    );

  if (percentageMatch) {
    const [, left, operator, percentage] =
      percentageMatch;

    const percentageValue =
      Number(percentage) / 100;

    if (
      operator === "+" ||
      operator === "-"
    ) {
      return `${left}${operator}(${left}*${percentageValue})`;
    }

    if (operator === "*") {
      return `${left}*${percentageValue}`;
    }

    if (operator === "/") {
      return `${left}/${percentageValue}`;
    }
  }

  const standalonePercentageMatch =
    expression.match(
      /^(\d+(?:\.\d+)?)%$/,
    );

  if (standalonePercentageMatch) {
    const percentage =
      Number(standalonePercentageMatch[1]) /
      100;

    return String(percentage);
  }

  return expression;
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

    const normalizedWithPercentage =
      normalizePercentageExpression(normalized);

    const value = evaluate(
      normalizedWithPercentage,
    );

    if (typeof value !== "number") {
      return {
        success: false,
        error: {
          expression,
          message:
            "The expression did not produce a number.",
        },
      };
    }

    if (!Number.isFinite(value)) {
      return {
        success: false,
        error: {
          expression,
          message:
            "The result is not a finite number.",
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
        message:
          "Unable to calculate this expression.",
      },
    };
  }
}