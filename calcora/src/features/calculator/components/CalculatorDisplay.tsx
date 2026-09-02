interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error: string | null;
  memory: number | null;
}

function CalculatorDisplay({
  expression,
  result,
  error,
  memory,
}: CalculatorDisplayProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
      <div className="mb-2 flex min-h-4 items-center justify-between">
        {memory !== null ? (
          <span className="text-[10px] font-semibold tracking-wider text-[var(--muted)]">
            M
          </span>
        ) : (
          <span />
        )}
      </div>
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