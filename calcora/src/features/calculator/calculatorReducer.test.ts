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

  it("calculates the reciprocal of the current expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "reciprocal",
    });

    expect(state.result).toBe("0.2");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the reciprocal of a decimal", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "12.5",
    });

    state = calculatorReducer(state, {
      type: "reciprocal",
    });

    expect(state.result).toBe("0.08");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the reciprocal of an expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "3",
    });

    state = calculatorReducer(state, {
      type: "reciprocal",
    });

    expect(state.result).toBe("0.2");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the reciprocal of an existing result", () => {
    let state = {
      ...initialCalculatorState,
      expression: "2+3",
      result: "5",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "reciprocal",
    });

    expect(state.result).toBe("0.2");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("shows an error when calculating the reciprocal of zero", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "0",
    });

    state = calculatorReducer(state, {
      type: "reciprocal",
    });

    expect(state.result).toBe("");
    expect(state.error).toBe("Cannot divide by zero.");
    expect(state.justEvaluated).toBe(false);
  });

  it("calculates the factorial of the current expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("120");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the factorial of zero", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "0",
    });

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("1");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the factorial of an expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "3",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("120");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the factorial of an existing result", () => {
    let state = {
      ...initialCalculatorState,
      expression: "3+2",
      result: "5",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("120");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("rejects factorial for negative numbers", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "-5",
    });

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("");
    expect(state.error).toBe(
      "Factorial requires a non-negative number.",
    );
    expect(state.justEvaluated).toBe(false);
  });

  it("rejects factorial for decimal numbers", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5.5",
    });

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("");
    expect(state.error).toBe(
      "Factorial requires a whole number.",
    );
    expect(state.justEvaluated).toBe(false);
  });

  it("rejects factorial values above 170", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "171",
    });

    state = calculatorReducer(state, {
      type: "factorial",
    });

    expect(state.result).toBe("");
    expect(state.error).toBe(
      "The factorial result is too large.",
    );
    expect(state.justEvaluated).toBe(false);
  });

  it("toggles a positive number to negative", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "signToggle",
    });

    expect(state.result).toBe("-5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("toggles a negative number to positive", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "-5",
    });

    state = calculatorReducer(state, {
      type: "signToggle",
    });

    expect(state.result).toBe("5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("toggles a decimal number", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "12.5",
    });

    state = calculatorReducer(state, {
      type: "signToggle",
    });

    expect(state.result).toBe("-12.5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("toggles the result of an expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "3",
    });

    state = calculatorReducer(state, {
      type: "signToggle",
    });

    expect(state.result).toBe("-5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("toggles an existing result", () => {
    let state = {
      ...initialCalculatorState,
      expression: "2+3",
      result: "5",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "signToggle",
    });

    expect(state.result).toBe("-5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("keeps zero unchanged when toggling its sign", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "0",
    });

    state = calculatorReducer(state, {
      type: "signToggle",
    });

    expect(state.result).toBe("0");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("does nothing when there is no value to toggle", () => {
    const state = calculatorReducer(
      initialCalculatorState,
      {
        type: "signToggle",
      },
    );

    expect(state).toEqual(
      initialCalculatorState,
    );
  });

  it("calculates the cube of the current expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "5",
    });

    state = calculatorReducer(state, {
      type: "cube",
    });

    expect(state.result).toBe("125");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube of a negative number", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "-3",
    });

    state = calculatorReducer(state, {
      type: "cube",
    });

    expect(state.result).toBe("-27");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube of a decimal", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "2.5",
    });

    state = calculatorReducer(state, {
      type: "cube",
    });

    expect(state.result).toBe("15.625");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube of zero", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "0",
    });

    state = calculatorReducer(state, {
      type: "cube",
    });

    expect(state.result).toBe("0");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube of an expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "3",
    });

    state = calculatorReducer(state, {
      type: "cube",
    });

    expect(state.result).toBe("125");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube of an existing result", () => {
    let state = {
      ...initialCalculatorState,
      expression: "2+3",
      result: "5",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "cube",
    });

    expect(state.result).toBe("125");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of the current expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "27",
    });

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("3");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of a larger perfect cube", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "125",
    });

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of a negative number", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "-27",
    });

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("-3");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of zero", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "0",
    });

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("0");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of a decimal", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "0.125",
    });

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("0.5");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of an expression", () => {
    let state = initialCalculatorState;

    state = calculatorReducer(state, {
      type: "input",
      value: "2",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "+",
    });

    state = calculatorReducer(state, {
      type: "input",
      value: "6",
    });

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("2");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });

  it("calculates the cube root of an existing result", () => {
    let state = {
      ...initialCalculatorState,
      expression: "2+6",
      result: "8",
      justEvaluated: true,
    };

    state = calculatorReducer(state, {
      type: "cubeRoot",
    });

    expect(state.result).toBe("2");
    expect(state.error).toBeNull();
    expect(state.justEvaluated).toBe(true);
  });
});