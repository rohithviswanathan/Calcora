import { useEffect, useState } from "react";
import type { AngleMode } from "../../calculator/calculatorTypes";

import CalculatorDisplay from "../../calculator/components/CalculatorDisplay";
import ScientificKeypad from "./ScientificKeypad";
import { useCalculator } from "../../calculator/useCalculator";

function ScientificCalculator() {
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const {
    expression,
    result,
    error,
    input,
    clear,
    backspace,
    evaluate,
    reciprocal,
    factorial,
    memory,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    signToggle,
    cube,
    cubeRoot
  } = useCalculator();

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
        evaluate(angleMode);
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
    angleMode,
  ]);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Advanced mathematics
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Scientific Calculator
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Solve advanced mathematical expressions with scientific functions and constants.
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

          <div className="mb-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAngleMode("deg")}
              className={`h-10 rounded-lg border text-sm font-medium transition ${
                angleMode === "deg"
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              DEG
            </button>

            <button
              type="button"
              onClick={() => setAngleMode("rad")}
              className={`h-10 rounded-lg border text-sm font-medium transition ${
                angleMode === "rad"
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              RAD
            </button>
          </div>

          <div className="mt-3">
            <ScientificKeypad
              onInput={input}
              onClear={clear}
              onBackspace={backspace}
              onEvaluate={() => evaluate(angleMode)}
              onReciprocal={reciprocal}
              onMemoryClear={memoryClear}
              onMemoryRecall={memoryRecall}
              onMemoryAdd={memoryAdd}
              onMemorySubtract={memorySubtract}
              onFactorial={factorial}
              onSignToggle={signToggle}
              onCube={cube}
              onCubeRoot={cubeRoot}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScientificCalculator;