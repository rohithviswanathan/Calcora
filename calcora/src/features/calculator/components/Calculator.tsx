import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeypad from "./CalculatorKeypad";
import { useCalculator } from "../useCalculator";

function Calculator() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    expression,
    result,
    error,
    input,
    clear,
    backspace,
    evaluate,
    memory,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    setExpression
  } = useCalculator();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {

      const target =
        event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      const { key } = event;

      if (/^[0-9]$/.test(key)) {
        input(key);
        return;
      }

      if (key === ".") {
        input(".");
        return;
      }

      if (key === "%") {
        input("%");
        return;
      }

      if (key === "+") {
        input("+");
        return;
      }

      if (key === "-") {
        input("-");
        return;
      }

      if (key === "*") {
        input("×");
        return;
      }

      if (key === "/") {
        event.preventDefault();
        input("÷");
        return;
      }

      if (key === "^") {
        input("^");
        return;
      }

      if (key === "(" || key === ")") {
        input(key);
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        evaluate();
        return;
      }

      if (key === "Backspace") {
        backspace();
        return;
      }

      if (
        key === "Escape" ||
        key === "Delete"
      ) {
        clear();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    input,
    clear,
    backspace,
    evaluate,
  ]);

  useEffect(() => {
    const incomingExpression =
      location.state?.expression;

    if (
      typeof incomingExpression !== "string" ||
      !incomingExpression.trim()
    ) {
      return;
    }

    setExpression(incomingExpression);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [
    location.pathname,
    location.state,
    navigate,
    setExpression,
  ]);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Calculate
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Calculator
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Perform everyday calculations quickly and accurately.
        </p>
      </div>

      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm sm:p-4">
          <CalculatorDisplay
            expression={expression}
            result={result}
            error={error}
            memory={memory}
          />

          <div className="mt-3">
            <CalculatorKeypad
              onInput={input}
              onClear={clear}
              onBackspace={backspace}
              onEvaluate={evaluate}
              onMemoryClear={memoryClear}
              onMemoryRecall={memoryRecall}
              onMemoryAdd={memoryAdd}
              onMemorySubtract={memorySubtract}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;