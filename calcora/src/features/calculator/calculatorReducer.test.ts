import { describe, expect, it } from "vitest";

import {
  calculatorReducer,
  initialCalculatorState,
} from "./calculatorReducer";

describe("calculatorReducer", () => {
  it("accepts normal numeric input", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "1",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    expect(state.expression).toBe("12");
  });

  it("prevents consecutive operators", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "×",
    });

    expect(state.expression).toBe("5×");
  });

  it("allows changing the current operator", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "10",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "−",
    });

    expect(state.expression).toBe("10−");
  });

  it("prevents consecutive percentages", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "50",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "%",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "%",
    });

    expect(state.expression).toBe("50%");
  });

  it("prevents percentage directly after an operator", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "50",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "%",
    });

    expect(state.expression).toBe("50+");
  });

  it("adds a leading zero before a decimal", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: ".",
    });

    expect(state.expression).toBe("0.");
  });

  it("prevents multiple decimals in the same number", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: ".",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: ".",
    });

    expect(state.expression).toBe("5.2");
  });

  it("allows parentheses", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "(",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: ")",
    });

    expect(state.expression).toBe("(5)");
  });

  it("allows scientific function input", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "sin(",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "30",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: ")",
    });

    expect(state.expression).toBe("sin(30)");
  });

  it("starts a new expression when a number is entered after evaluation", () => {
    let state = {
      ...initialCalculatorState,
      expression: "2+3",
      result: "5",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "input",
      value: "7",
    });

    expect(state.expression).toBe("7");
    expect(state.result).toBe("");
    expect(state.justEvaluated).toBe(false);
  });

  it("continues from the result when an operator is entered after evaluation", () => {
    let state = {
      ...initialCalculatorState,
      expression: "2+3",
      result: "5",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    expect(state.expression).toBe("5+");
    expect(state.result).toBe("");
    expect(state.justEvaluated).toBe(false);
  });
});