export function sum(values: number[]): number {
  validateValues(values);

  return values.reduce((total, value) => total + value, 0);
}

export function count(values: number[]): number {
  validateValues(values);

  return values.length;
}

export function mean(values: number[]): number {
  validateValues(values);

  return sum(values) / values.length;
}

export function median(values: number[]): number {
  validateValues(values);

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

export function mode(values: number[]): number[] {
  validateValues(values);

  const frequencies = new Map<number, number>();

  for (const value of values) {
    frequencies.set(value, (frequencies.get(value) ?? 0) + 1);
  }

  const highestFrequency = Math.max(...frequencies.values());

  if (highestFrequency === 1) {
    return [];
  }

  return [...frequencies.entries()]
    .filter(([, frequency]) => frequency === highestFrequency)
    .map(([value]) => value)
    .sort((a, b) => a - b);
}

export function range(values: number[]): number {
  validateValues(values);

  return Math.max(...values) - Math.min(...values);
}

export function minimum(values: number[]): number {
  validateValues(values);

  return Math.min(...values);
}

export function maximum(values: number[]): number {
  validateValues(values);

  return Math.max(...values);
}

function validateValues(values: number[]): void {
  if (
    !Array.isArray(values) ||
    values.length === 0 ||
    values.some((value) => !Number.isFinite(value))
  ) {
    throw new Error("Values must contain at least one finite number");
  }
}