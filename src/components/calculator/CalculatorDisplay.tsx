type CalculatorDisplayProps = {
  value: string;
  expression: string;
  errorMessage: string;
};

export function CalculatorDisplay({ value, expression, errorMessage }: CalculatorDisplayProps) {
  return (
    <div className="calculator-display" aria-live="polite" aria-atomic="true">
      <p className="calculator-expression">{expression || "CURRENT INPUT"}</p>
      <output
        className="calculator-current"
        data-error={value === "Error"}
        data-compact={value.length > 10}
        aria-label="Current input and result"
      >
        {value}
      </output>
      <p className="calculator-error" aria-live="polite">{errorMessage || " "}</p>
    </div>
  );
}