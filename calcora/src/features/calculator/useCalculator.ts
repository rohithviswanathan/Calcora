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

  const evaluate = useCallback(
    (angleMode?: "deg" | "rad") => {
      dispatch({
        type: "evaluate",
        angleMode,
      });
    },
    [],
  );

  const reciprocal = useCallback(() => {
    dispatch({
      type: "reciprocal",
    });
  }, []);

  const signToggle = useCallback(() => {
    dispatch({
      type: "signToggle",
    });
  }, []);

  const factorial = useCallback(() => {
    dispatch({
      type: "factorial",
    });
  }, []);

  const cube = useCallback(() => {
    dispatch({
      type: "cube",
    });
  }, []);

  const cubeRoot = useCallback(() => {
    dispatch({
      type: "cubeRoot",
    });
  }, []);

  const memoryClear = useCallback(() => {
    dispatch({
      type: "memoryClear",
    });
  }, []);

  const memoryRecall = useCallback(() => {
    dispatch({
      type: "memoryRecall",
    });
  }, []);

  const memoryAdd = useCallback(() => {
    dispatch({
      type: "memoryAdd",
    });
  }, []);

  const memorySubtract = useCallback(() => {
    dispatch({
      type: "memorySubtract",
    });
  }, []);

  return {
    expression: state.expression,
    result: state.result,
    error: state.error,
    justEvaluated: state.justEvaluated,
    memory: state.memory,
    factorial,
    cube,
    cubeRoot,
    input,
    clear,
    backspace,
    signToggle,
    evaluate,
    reciprocal,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
  };
}