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
      angleMode?: "deg" | "rad";
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