import CalculatorKey from "./CalculatorKey";

interface CalculatorKeypadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onEvaluate: () => void;
}

function CalculatorKeypad({
  onInput,
  onClear,
  onBackspace,
  onEvaluate,
}: CalculatorKeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <CalculatorKey
        variant="action"
        onClick={onClear}
      >
        AC
      </CalculatorKey>

      <CalculatorKey
        variant="action"
        onClick={() => onInput("%")}
        ariaLabel="Percentage"
      >
        %
      </CalculatorKey>

      <CalculatorKey
        variant="action"
        onClick={() => onInput("(")}
      >
        (
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("÷")}
        ariaLabel="Divide"
      >
        ÷
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("7")}
      >
        7
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("8")}
      >
        8
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("9")}
      >
        9
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("×")}
        ariaLabel="Multiply"
      >
        ×
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("4")}
      >
        4
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("5")}
      >
        5
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("6")}
      >
        6
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("-")}
        ariaLabel="Subtract"
      >
        −
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("1")}
      >
        1
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("2")}
      >
        2
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("3")}
      >
        3
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("+")}
        ariaLabel="Add"
      >
        +
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput("0")}
        className="col-span-2"
      >
        0
      </CalculatorKey>

      <CalculatorKey
        onClick={() => onInput(".")}
        ariaLabel="Decimal"
      >
        .
      </CalculatorKey>

      <CalculatorKey
        variant="equals"
        onClick={onEvaluate}
        ariaLabel="Equals"
      >
        =
      </CalculatorKey>

      <CalculatorKey
        variant="action"
        onClick={onBackspace}
        className="col-span-4"
        ariaLabel="Backspace"
      >
        ←
      </CalculatorKey>
    </div>
  );
}

export default CalculatorKeypad;