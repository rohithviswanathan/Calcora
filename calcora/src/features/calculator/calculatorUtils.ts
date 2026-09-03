const OPERATORS = [
  "+",
  "-",
  "−",
  "×",
  "÷",
  "^",
  "mod",
];

export function isOperator(value: string): boolean {
  return OPERATORS.includes(value);
}

export function getTrailingOperator(
  expression: string,
): string | null {
  const operator = OPERATORS.find((operator) =>
    expression.endsWith(operator),
  );

  return operator ?? null;
}

export function isDigit(value: string): boolean {
  return /^[0-9]$/.test(value);
}

export function isPercentage(value: string): boolean {
  return value === "%";
}

export function getLastCharacter(
  expression: string,
): string {
  return expression.slice(-1);
}

export function canAppendDecimal(
  expression: string,
): boolean {
  const currentNumber =
    expression.split(/[+\-×÷^()]/).pop() ?? "";

  return !currentNumber.includes(".");
}

export function removeLastCharacter(
  expression: string,
): string {
  return expression.slice(0, -1);
}

export function endsWithOperator(
  expression: string,
): boolean {
  return OPERATORS.some((operator) =>
    expression.endsWith(operator),
  );
}