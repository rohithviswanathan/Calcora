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
    .replace(
      /(\d+(?:\.\d+)?)\s*mod\s*(\d+(?:\.\d+)?)/g,
      "mod($1, $2)",
    )
    .trim();
}

function normalizeScientificExpression(
  expression: string,
  angleMode: "deg" | "rad" = "deg",
): string {
  let normalized = expression;

  // Convert square root symbol to mathjs syntax.
  // √25 -> sqrt(25)
  normalized = normalized.replace(
    /√(\d+(?:\.\d+)?)/g,
    "sqrt($1)",
  );

  /*
   * Trigonometric functions.
   *
   * DEG mode:
   * sin(30) -> sin((30 * pi) / 180)
   *
   * RAD mode:
   * sin(30) -> sin(30)
   */
  if (angleMode === "deg") {
    normalized = normalized.replace(
      /\b(sin|cos|tan)\(([^()]*)\)/g,
      "$1((($2) * pi) / 180)",
    );
  }

  /*
   * Inverse trigonometric functions.
   *
   * mathjs returns inverse trig results in radians.
   *
   * DEG mode:
   * asin(0.5) -> 30
   *
   * RAD mode:
   * asin(0.5) -> pi / 6
   */
  if (angleMode === "deg") {
    normalized = normalized.replace(
      /\b(asin|acos|atan)\(([^()]*)\)/g,
      "($1(($2)) * 180 / pi)",
    );
  }

  // log() -> base-10 logarithm
  normalized = normalized.replace(
    /\blog\(/g,
    "log10(",
  );

  // ln() -> natural logarithm
  normalized = normalized.replace(
    /\bln\(/g,
    "log(",
  );

  return normalized;
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
  angleMode: "deg" | "rad" = "deg",
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

    const normalizedScientific =
      normalizeScientificExpression(
        normalized,
        angleMode,
    );

    const normalizedWithPercentage =
      normalizePercentageExpression(
        normalizedScientific,
      );

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