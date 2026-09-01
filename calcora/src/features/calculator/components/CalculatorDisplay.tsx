interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error: string | null;
}

function CalculatorDisplay({
  expression,
  result,
  error,
}: CalculatorDisplayProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
      <div
        className="min-h-7 overflow-x-auto text-right text-sm text-[var(--muted)]"
        aria-label="Expression"
      >
        {expression || "0"}
      </div>

      <div
        className={`mt-2 min-h-14 overflow-x-auto text-right text-4xl font-semibold tracking-tight ${
          error
            ? "text-red-400"
            : "text-[var(--foreground)]"
        }`}
        aria-live="polite"
        aria-label="Result"
      >
        {error || result || "0"}
      </div>
    </div>
  );
}

export default CalculatorDisplay;