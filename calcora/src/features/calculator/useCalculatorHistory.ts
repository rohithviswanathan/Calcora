import { useCallback, useEffect, useState } from "react";

import type {
  CalculationHistoryItem,
} from "./calculatorTypes";

const STORAGE_KEY =
  "calcora-calculation-history";

const MAX_HISTORY_ITEMS = 50;

function loadHistory(): CalculationHistoryItem[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function useCalculatorHistory() {
  const [history, setHistory] =
    useState<CalculationHistoryItem[]>(loadHistory);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history),
      );
    } catch {
      // Ignore storage errors.
    }
  }, [history]);

  const addCalculation = useCallback(
    (
      expression: string,
      result: string,
    ) => {
      const item: CalculationHistoryItem = {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 9)}`,
        expression,
        result,
        timestamp: Date.now(),
      };

      setHistory((currentHistory) => [
        item,
        ...currentHistory,
      ].slice(0, MAX_HISTORY_ITEMS));
    },
    [],
  );

  const removeCalculation = useCallback(
    (id: string) => {
      setHistory((currentHistory) =>
        currentHistory.filter(
          (item) => item.id !== id,
        ),
      );
    },
    [],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
  };
}