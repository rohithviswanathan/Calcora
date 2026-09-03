export type CalculatorAction =
  | {
      type: "input";
      value: string;
    }
  | {
      type: "clear";
    }
  |
    {
      type: "cube";
    }
  |
    {
      type: "cubeRoot";
    }
  |
    {
      type: "powerOfTen";
    }
  | 
    {
      type: "powerOfE";
    }
  |
    {
      type: "scientificNotation";
    }
  | {
      type: "backspace";
    }
  | {
      type: "evaluate";
      angleMode?: "deg" | "rad";
    }
  | {
      type: "reciprocal";
    }
  | {
      type: "factorial";
    }
  |
    {
      type: "signToggle";
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