import { calculate } from "./calculatorEngine";
import type { CalculatorAction } from "./calculatorActions";
import type { CalculatorState } from "./calculatorState";

import {
  canAppendDecimal,
  getLastCharacter,
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
          isOperator(lastCharacter)
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