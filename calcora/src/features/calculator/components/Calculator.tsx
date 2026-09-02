import { useEffect } from "react";

import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorHistory from "./CalculatorHistory";
import CalculatorKeypad from "./CalculatorKeypad";
import { useCalculator } from "../useCalculator";
import { useCalculatorHistory } from "../useCalculatorHistory";

function Calculator() {
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
  } = useCalculator();

  const {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
  } = useCalculatorHistory();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
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

      if (key === "Escape" || key === "Delete") {
        clear();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [input, clear, backspace, evaluate]);

  useEffect(() => {
    if (!result || !expression || error) {
      return;
    }

    addCalculation(expression, result);
  }, [result, expression, error, addCalculation]);

  function handleHistorySelect(
    selectedExpression: string,
  ) {
    clear();

    for (const character of selectedExpression) {
      input(character);
    }
  }

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

      <div className="mx-auto w-full max-w-md">
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

        <CalculatorHistory
          history={history}
          onSelect={handleHistorySelect}
          onRemove={removeCalculation}
          onClear={clearHistory}
        />
      </div>
    </section>
  );
}

export default Calculator;