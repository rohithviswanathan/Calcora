import { useCallback, useReducer } from "react";

import {
  calculatorReducer,
  initialCalculatorState,
} from "./calculatorReducer";

export function useCalculator() {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialCalculatorState,
  );

  const input = useCallback((value: string) => {
    dispatch({
      type: "input",
      value,
    });
  }, []);

  const clear = useCallback(() => {
    dispatch({
      type: "clear",
    });
  }, []);

  const backspace = useCallback(() => {
    dispatch({
      type: "backspace",
    });
  }, []);

  const evaluate = useCallback(() => {
    dispatch({
      type: "evaluate",
    });
  }, []);

  return {
    expression: state.expression,
    result: state.result,
    error: state.error,
    justEvaluated: state.justEvaluated,
    input,
    clear,
    backspace,
    evaluate,
  };
}