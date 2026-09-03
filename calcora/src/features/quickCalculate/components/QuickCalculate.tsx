import {
  useEffect,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowRight,
  Calculator,
  X,
} from "lucide-react";
import { calculate } from "../../calculator/calculatorEngine";
import { useNavigate } from "react-router-dom";

interface QuickCalculateProps {
  open: boolean;
  onClose: () => void;
}

function QuickCalculate({
  open,
  onClose,
}: QuickCalculateProps) {
  const [expression, setExpression] =
    useState("");

  const navigate = useNavigate();

  const openCalculator = () => {
    if (!expression.trim()) {
        return;
    }

    onClose();

    navigate("/calculator", {
        state: {
        expression: expression.trim(),
        },
    });
    };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setExpression("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const evaluation = expression.trim()
    ? calculate(expression)
    : null;

  const result =
    evaluation?.success
      ? evaluation.result?.formattedValue ?? ""
      : "";

  const hasError =
    Boolean(expression.trim()) &&
    evaluation !== null &&
    !evaluation.success;

    const handleInputKeyDown = (
     event: KeyboardEvent<HTMLInputElement>,
        ) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (evaluation?.success) {
            openCalculator();
            }
        }
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-calculate-title"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div>
            <h2
              id="quick-calculate-title"
              className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]"
            >
              <Calculator size={16} />
              Quick Calculate
            </h2>

            <p className="mt-0.5 text-xs text-[var(--muted)]">
              Enter an expression to calculate it
              instantly
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick calculate"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Calculator */}
        <div className="p-4">
          <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)]">
            <input
              autoFocus
              type="text"
              value={expression}
              onChange={(event) =>
                setExpression(event.target.value)
              }
              onKeyDown={handleInputKeyDown}
              placeholder="e.g. 125 × 24"
              aria-label="Calculation expression"
              className="w-full bg-transparent px-4 py-4 text-lg text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />

            {expression.trim() && (
              <div className="border-t border-[var(--border)] px-4 py-4">
                {result ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-[var(--muted)]">
                      Result
                    </span>

                    <span className="break-all text-xl font-medium text-[var(--foreground)]">
                      {result}
                    </span>
                  </div>
                ) : hasError ? (
                  <span className="text-sm text-[var(--danger)]">
                    Invalid expression
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
            <span>
              Press Enter to calculate
            </span>

           <button
              type="button"
              onClick={openCalculator}
              disabled={!evaluation?.success}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)] disabled:pointer-events-none disabled:opacity-40"
            >
              Open calculator
            <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickCalculate;