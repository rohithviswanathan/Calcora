import { calculate } from "./calculatorEngine";
import type { CalculatorAction } from "./calculatorActions";
import type { CalculatorState } from "./calculatorState";

import {
  canAppendDecimal,
  getLastCharacter,
  isDigit,
  isOperator,
  removeLastCharacter,
} from "./calculatorUtils";

export const initialCalculatorState: CalculatorState = {
  expression: "",
  result: "",
  error: null,
  justEvaluated: false,
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
        };
      }

      if (state.justEvaluated) {
        if (
          isDigit(value) ||
          value === "."
        ) {
          return {
            ...initialCalculatorState,
            expression: value,
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
        isOperator(lastCharacter)
      ) {
        return {
          ...state,
          expression:
            state.expression.slice(0, -1) + value,
        };
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
       * Prevent multiple opening decimals
       * from creating malformed input.
       */
      if (
        value === "." &&
        (!state.expression ||
          isOperator(lastCharacter))
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
      return initialCalculatorState;

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

      const evaluation =
        calculate(state.expression);

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

    default:
      return state;
  }
}