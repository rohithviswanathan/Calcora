import CalculatorKey from "../../calculator/components/CalculatorKey";

interface ScientificKeypadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onEvaluate: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
}

function ScientificKeypad({
  onInput,
  onClear,
  onBackspace,
  onEvaluate,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
}: ScientificKeypadProps) {
  return (
    <div className="space-y-2">
      {/* Memory */}
      <div className="grid grid-cols-4 gap-2">
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
      </div>

      {/* Scientific functions */}
      <div className="grid grid-cols-4 gap-2">
        <CalculatorKey
          variant="action"
          onClick={() => onInput("sin(")}
          ariaLabel="Sine"
        >
          sin
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("cos(")}
          ariaLabel="Cosine"
        >
          cos
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("tan(")}
          ariaLabel="Tangent"
        >
          tan
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("sqrt(")}
          ariaLabel="Square root"
        >
          √
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("log(")}
          ariaLabel="Logarithm"
        >
          log
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("ln(")}
          ariaLabel="Natural logarithm"
        >
          ln
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("^2")}
          ariaLabel="Square"
        >
          x²
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("^")}
          ariaLabel="Power"
        >
          xʸ
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("π")}
          ariaLabel="Pi"
        >
          π
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("e")}
          ariaLabel="Euler's number"
        >
          e
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput("(")}
          ariaLabel="Open parenthesis"
        >
          (
        </CalculatorKey>

        <CalculatorKey
          variant="action"
          onClick={() => onInput(")")}
          ariaLabel="Close parenthesis"
        >
          )
        </CalculatorKey>
      </div>

      {/* Main controls */}
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
          ariaLabel="Open parenthesis"
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
    </div>
  );
}

export default ScientificKeypad;