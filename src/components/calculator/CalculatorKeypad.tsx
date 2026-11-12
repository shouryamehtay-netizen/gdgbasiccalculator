import { Button } from "@/components/ui/button";

type CalculatorKeypadProps = {
  onPress: (key: string) => void;
};

const keys = [
  { label: "AC", value: "AC", style: "key-clear", name: "All Clear" },
  { label: "⌫", value: "backspace", style: "key-utility", name: "Backspace" },
  { label: "÷", value: "÷", style: "key-operator", name: "Divide" },
  { label: "×", value: "×", style: "key-operator", name: "Multiply" },
  { label: "7", value: "7", style: "key-number", name: "7" },
  { label: "8", value: "8", style: "key-number", name: "8" },
  { label: "9", value: "9", style: "key-number", name: "9" },
  { label: "−", value: "−", style: "key-operator", name: "Subtract" },
  { label: "4", value: "4", style: "key-number", name: "4" },
  { label: "5", value: "5", style: "key-number", name: "5" },
  { label: "6", value: "6", style: "key-number", name: "6" },
  { label: "+", value: "+", style: "key-operator", name: "Add" },
  { label: "1", value: "1", style: "key-number", name: "1" },
  { label: "2", value: "2", style: "key-number", name: "2" },
  { label: "3", value: "3", style: "key-number", name: "3" },
  { label: "=", value: "=", style: "key-equals", name: "Equals" },
  { label: "0", value: "0", style: "key-number key-zero", name: "0" },
  { label: ".", value: ".", style: "key-number", name: "Decimal point" },
];

export function CalculatorKeypad({ onPress }: CalculatorKeypadProps) {
  return (
    <div className="calculator-keypad">
      {keys.map((key) => (
        <Button
          key={key.value}
          type="button"
          variant="ghost"
          className={`calculator-key ${key.style}`}
          aria-label={key.name}
          onClick={() => onPress(key.value)}
        >
          {key.label}
        </Button>
      ))}
    </div>
  );
}