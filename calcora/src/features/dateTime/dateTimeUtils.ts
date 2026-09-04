export function dateDifference(
  startDate: string,
  endDate: string,
): number {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  return Math.round(
    Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function addDays(date: string, days: number): string {
  const parsedDate = parseDate(date);

  if (!Number.isFinite(days)) {
    throw new Error("Invalid number of days");
  }

  parsedDate.setDate(parsedDate.getDate() + days);

  return formatDate(parsedDate);
}

export function calculateAge(
  birthDate: string,
  referenceDate: string,
): {
  years: number;
  months: number;
  days: number;
} {
  const birth = parseDate(birthDate);
  const reference = parseDate(referenceDate);

  if (birth > reference) {
    throw new Error("Birth date cannot be after reference date");
  }

  let years = reference.getFullYear() - birth.getFullYear();
  let months = reference.getMonth() - birth.getMonth();
  let days = reference.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;

    const previousMonthDays = new Date(
      reference.getFullYear(),
      reference.getMonth(),
      0,
    ).getDate();

    days += previousMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    days,
  };
}

export function dayOfWeek(date: string): string {
  const parsedDate = parseDate(date);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(parsedDate);
}

export function daysInMonth(year: number, month: number): number {
  if (!Number.isInteger(year) || !Number.isInteger(month)) {
    throw new Error("Invalid year or month");
  }

  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }

  return new Date(year, month, 0).getDate();
}

function parseDate(value: string): Date {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error("Invalid date");
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("Invalid date");
  }

  return date;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}