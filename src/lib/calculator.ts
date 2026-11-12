export type Operator = "+" | "−" | "×" | "÷";

export function calculate(left: number, right: number, operator: Operator): number {
  if (operator === "+") return left + right;
  if (operator === "−") return left - right;
  if (operator === "×") return left * right;
  if (operator === "÷") {
    if (right === 0) throw new RangeError("Cannot divide by zero.");
    return left / right;
  }

  throw new Error("Unknown operator.");
}

export function formatNumber(value: number): string {
  return String(Number(value.toPrecision(12)));
}