export type CalculatorAction =
  | {
      type: "input";
      value: string;
    }
  | {
      type: "clear";
    }
  | {
      type: "backspace";
    }
  | {
      type: "evaluate";
    }
  | {
      type: "memoryClear";
    }
  | {
      type: "memoryRecall";
    }
  | {
      type: "memoryAdd";
    }
  | {
      type: "memorySubtract";
    };