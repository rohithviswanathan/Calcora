import { calculate } from "./calculatorEngine";
import type { CalculatorAction } from "./calculatorActions";
import type { CalculatorState } from "./calculatorState";

import {
  canAppendDecimal,
  endsWithOperator,
  getLastCharacter,
  getTrailingOperator,
  isDigit,
  isOperator,
  removeLastCharacter,
  isPercentage,
} from "./calculatorUtils";

export const initialCalculatorState: CalculatorState = {
  expression: "",
  result: "",
  error: null,
  justEvaluated: false,
  memory: null,
};

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "input": {
      const value = action.value;

      if (state.error) {
        return {
          ...initialCalculatorState,
          expression: value,
          memory: state.memory,
        };
      }

      if (state.justEvaluated) {
        if (isDigit(value) || value === ".") {
          return {
            ...initialCalculatorState,
            expression: value,
            memory: state.memory,
          };
        }

        if (isOperator(value)) {
          return {
            ...state,
            expression: `${state.result}${value}`,
            result: "",
            justEvaluated: false,
          };
        }
      }

      const lastCharacter =
        getLastCharacter(state.expression);

      if (isPercentage(value)) {
        if (
          !state.expression ||
          lastCharacter === "%" ||
          endsWithOperator(state.expression)
        ) {
          return state;
        }

        return {
          ...state,
          expression:
            `${state.expression}${value}`,
          result: "",
          error: null,
          justEvaluated: false,
        };
      }

      /*
       * Prevent consecutive operators.
       *
       * Example:
       * 12 + ×
       *
       * becomes:
       * 12 ×
       */
      if (
        isOperator(value) &&
        endsWithOperator(state.expression)
      ) {
        const trailingOperator =
          getTrailingOperator(state.expression);

        if (trailingOperator) {
          return {
            ...state,
            expression:
              state.expression.slice(
                0,
                -trailingOperator.length,
              ) + value,
            result: "",
            error: null,
            justEvaluated: false,
          };
        }
      }

      /*
       * Prevent multiple decimal points
       * in the same number.
       */
      if (
        value === "." &&
        !canAppendDecimal(state.expression)
      ) {
        return state;
      }

      /*
       * Add leading zero before decimal.
       *
       * Example:
       * .5
       *
       * becomes:
       * 0.5
       */
      if (
        value === "." &&
        (!state.expression ||
          endsWithOperator(state.expression))
      ) {
        return {
          ...state,
          expression:
            `${state.expression}0.`,
        };
      }

      return {
        ...state,
        expression:
          `${state.expression}${value}`,
        result: "",
        error: null,
        justEvaluated: false,
      };
    }

    case "clear":
      /*
       * AC clears the calculator,
       * but memory must remain intact.
       */
      return {
        ...initialCalculatorState,
        memory: state.memory,
      };

    case "backspace":
      return {
        ...state,
        expression:
          removeLastCharacter(state.expression),
        result: "",
        error: null,
        justEvaluated: false,
      };

    case "evaluate": {
      if (!state.expression) {
        return state;
      }

      const evaluation = calculate(
        state.expression,
        action.angleMode,
      );

      if (!evaluation.success) {
        return {
          ...state,
          result: "",
          error: evaluation.error.message,
          justEvaluated: false,
        };
      }

      return {
        ...state,
        result:
          evaluation.result.formattedValue,
        error: null,
        justEvaluated: true,
      };
    }

    case "reciprocal": {
      let currentValue: number;

      /*
      * If a result is already displayed,
      * use that result directly.
      */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
        * Otherwise evaluate the current
        * expression first.
        */
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      /*
      * Reciprocal of zero is undefined.
      */
      if (currentValue === 0) {
        return {
          ...state,
          result: "",
          error: "Cannot divide by zero.",
          justEvaluated: false,
        };
      }

      if (!Number.isFinite(currentValue)) {
        return {
          ...state,
          result: "",
          error: "Unable to calculate the reciprocal.",
          justEvaluated: false,
        };
      }

      const reciprocal = 1 / currentValue;

      if (!Number.isFinite(reciprocal)) {
        return {
          ...state,
          result: "",
          error: "Unable to calculate the reciprocal.",
          justEvaluated: false,
        };
      }

      return {
        ...state,
        result: reciprocal.toLocaleString("en-US", {
          maximumFractionDigits: 12,
        }),
        error: null,
        justEvaluated: true,
      };
    }

    case "factorial": {
      let currentValue: number;

      /*
      * If a result is already displayed,
      * use that result directly.
      */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
        * Otherwise evaluate the current
        * expression first.
        */
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      /*
      * Factorial is only defined for
      * non-negative integers.
      */
     if (!Number.isInteger(currentValue)) {
        return {
          ...state,
          result: "",
          error:
            "Factorial requires a whole number.",
          justEvaluated: false,
        };
      }

      if (currentValue < 0) {
        return {
          ...state,
          result: "",
          error:
            "Factorial requires a non-negative number.",
          justEvaluated: false,
        };
      }

      /*
      * Prevent excessively large factorials
      * from producing Infinity.
      */
      if (currentValue > 170) {
        return {
          ...state,
          result: "",
          error:
            "The factorial result is too large.",
          justEvaluated: false,
        };
      }

      /*
      * Calculate n!
      */
      let factorial = 1;

      for (
        let i = 2;
        i <= currentValue;
        i += 1
      ) {
        factorial *= i;
      }

      return {
        ...state,
        result: factorial.toLocaleString("en-US"),
        error: null,
        justEvaluated: true,
      };
    }

    case "cube": {
      let currentValue: number;

      /*
      * If a result is already displayed,
      * use that result directly.
      */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
        * Otherwise evaluate the current
        * expression first.
        */
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      const cube = currentValue ** 3;

      if (!Number.isFinite(cube)) {
        return {
          ...state,
          result: "",
          error: "The result is too large.",
          justEvaluated: false,
        };
      }

      return {
        ...state,
        result: cube.toLocaleString("en-US", {
          maximumFractionDigits: 12,
        }),
        error: null,
        justEvaluated: true,
      };
    }

    case "cubeRoot": {
      let currentValue: number;

      /*
      * If a result is already displayed,
      * use that result directly.
      */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
        * Otherwise evaluate the current
        * expression first.
        */
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      /*
      * Math.cbrt() correctly handles both
      * positive and negative numbers.
      *
      * Example:
      * cbrt(27)  = 3
      * cbrt(-27) = -3
      */
      const cubeRoot = Math.cbrt(currentValue);

      if (!Number.isFinite(cubeRoot)) {
        return {
          ...state,
          result: "",
          error: "Unable to calculate the cube root.",
          justEvaluated: false,
        };
      }

      return {
        ...state,
        result: cubeRoot.toLocaleString("en-US", {
          maximumFractionDigits: 12,
        }),
        error: null,
        justEvaluated: true,
      };
    }

    case "powerOfTen": {
      let currentValue: number;

      /*
      * If a result is already displayed,
      * use that result directly.
      */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
        * Otherwise evaluate the current
        * expression first.
        */
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      /*
      * Calculate 10^x.
      */
      const powerOfTen =
        10 ** currentValue;

      /*
      * Prevent Infinity / invalid results.
      */
      if (!Number.isFinite(powerOfTen)) {
        return {
          ...state,
          result: "",
          error: "The result is too large.",
          justEvaluated: false,
        };
      }

      return {
        ...state,
        result: powerOfTen.toLocaleString("en-US", {
          maximumFractionDigits: 12,
        }),
        error: null,
        justEvaluated: true,
      };
    }

    case "powerOfE": {
      let currentValue: number;

      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      const powerOfE = Math.exp(currentValue);

      if (!Number.isFinite(powerOfE)) {
        return {
          ...state,
          result: "",
          error: "The result is too large.",
          justEvaluated: false,
        };
      }

      return {
        ...state,
        result: powerOfE.toLocaleString("en-US", {
          maximumFractionDigits: 12,
        }),
        error: null,
        justEvaluated: true,
      };
    }

    case "scientificNotation": {
      /*
      * Scientific notation requires a value
      * before EXP.
      *
      * Example:
      * 6.02 → 6.02e
      */

      if (!state.expression) {
        return state;
      }

      /*
      * EXP cannot be added twice to the
      * same number.
      */
      if (
        state.expression.endsWith("e") ||
        state.expression.endsWith("E")
      ) {
        return state;
      }

      /*
      * EXP should only be added when the
      * expression currently ends with a number.
      *
      * Prevent:
      * 5+EXP
      * 5×EXP
      * 5modEXP
      */
      const lastCharacter =
        getLastCharacter(state.expression);

      if (
        !isDigit(lastCharacter) &&
        lastCharacter !== "."
      ) {
        return state;
      }

      return {
        ...state,
        expression: `${state.expression}e`,
        result: "",
        error: null,
        justEvaluated: false,
      };
    }

    case "signToggle": {
      let currentValue: number;

      /*
      * If a result is already displayed,
      * toggle that result directly.
      */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
        * Otherwise evaluate the current
        * expression first.
        */
        const evaluation = calculate(
          state.expression,
        );

        if (!evaluation.success) {
          return {
            ...state,
            result: "",
            error: evaluation.error.message,
            justEvaluated: false,
          };
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      /*
      * Zero has no meaningful positive/negative
      * distinction, so leave it unchanged.
      */
      if (currentValue === 0) {
        return {
          ...state,
          result: "0",
          error: null,
          justEvaluated: true,
        };
      }

      const toggledValue = -currentValue;

      return {
        ...state,
        result: toggledValue.toLocaleString("en-US", {
          maximumFractionDigits: 12,
        }),
        error: null,
        justEvaluated: true,
      };
    }

    case "memoryClear":
      return {
        ...state,
        memory: null,
      };

    case "memoryRecall": {
      if (state.memory === null) {
        return state;
      }

      const recalledValue =
        String(state.memory);

      /*
       * MR after a completed calculation
       * starts a new expression.
       */
      if (state.justEvaluated) {
        return {
          ...initialCalculatorState,
          expression: recalledValue,
          memory: state.memory,
        };
      }

      return {
        ...state,
        expression: recalledValue,
        result: "",
        error: null,
        justEvaluated: false,
      };
    }

    case "memoryAdd": {
      let currentValue: number;

      /*
       * If there is a displayed result,
       * use that result.
       */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
         * Otherwise calculate the current
         * expression directly.
         */
        const evaluation =
          calculate(state.expression);

        if (!evaluation.success) {
          return state;
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      if (!Number.isFinite(currentValue)) {
        return state;
      }

      return {
        ...state,
        memory:
          (state.memory ?? 0) + currentValue,
      };
    }

    case "memorySubtract": {
      let currentValue: number;

      /*
       * If there is a displayed result,
       * use that result.
       */
      if (state.result) {
        currentValue = Number(
          state.result.replaceAll(",", ""),
        );
      } else if (state.expression) {
        /*
         * Otherwise calculate the current
         * expression directly.
         */
        const evaluation =
          calculate(state.expression);

        if (!evaluation.success) {
          return state;
        }

        currentValue =
          evaluation.result.value;
      } else {
        return state;
      }

      if (!Number.isFinite(currentValue)) {
        return state;
      }

      return {
        ...state,
        memory:
          (state.memory ?? 0) - currentValue,
      };
    }

    default:
      return state;
  }
}