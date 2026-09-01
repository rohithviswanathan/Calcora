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
    };