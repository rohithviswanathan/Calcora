import CalculatorKey from "./CalculatorKey";

interface CalculatorKeypadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onEvaluate: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
}

function CalculatorKeypad({
  onInput,
  onClear,
  onBackspace,
  onEvaluate,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
}: CalculatorKeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Memory */}
      <CalculatorKey
        variant="action"
        onClick={onMemoryClear}
        ariaLabel="Memory clear"
      >
        MC
      </CalculatorKey>

      <CalculatorKey
        variant="action"
        onClick={onMemoryRecall}
        ariaLabel="Memory recall"
      >
        MR
      </CalculatorKey>

      <CalculatorKey
        variant="action"
        onClick={onMemorySubtract}
        ariaLabel="Memory subtract"
      >
        M−
      </CalculatorKey>

      <CalculatorKey
        variant="action"
        onClick={onMemoryAdd}
        ariaLabel="Memory add"
      >
        M+
      </CalculatorKey>

      {/* Main controls */}
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
        variant="action"
        onClick={() => onInput(")")}
      >
        )
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("÷")}
        ariaLabel="Divide"
      >
        ÷
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("7")}>
        7
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("8")}>
        8
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("9")}>
        9
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("×")}
        ariaLabel="Multiply"
      >
        ×
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("4")}>
        4
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("5")}>
        5
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("6")}>
        6
      </CalculatorKey>

      <CalculatorKey
        variant="operator"
        onClick={() => onInput("-")}
        ariaLabel="Subtract"
      >
        −
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("1")}>
        1
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("2")}>
        2
      </CalculatorKey>

      <CalculatorKey onClick={() => onInput("3")}>
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
        variant="action"
        onClick={onBackspace}
        ariaLabel="Backspace"
      >
        ←
      </CalculatorKey>

      <CalculatorKey
        variant="equals"
        onClick={onEvaluate}
        ariaLabel="Equals"
        className="col-span-4"
      >
        =
      </CalculatorKey>
    </div>
  );
}

export default CalculatorKeypad;