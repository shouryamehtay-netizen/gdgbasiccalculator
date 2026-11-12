import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CalculatorDisplay } from "@/components/calculator/CalculatorDisplay";
import { CalculatorKeypad } from "@/components/calculator/CalculatorKeypad";
import { calculate, formatNumber, type Operator } from "@/lib/calculator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pocket Calculator | CALC 01" },
      {
        name: "description",
        content: "A simple, responsive calculator for everyday arithmetic.",
      },
      { property: "og:title", content: "Pocket Calculator | CALC 01" },
      {
        property: "og:description",
        content: "A simple, responsive calculator for everyday arithmetic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

export function Index() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function clear() {
    setDisplay("0");
    setFirstOperand(null);
    setPendingOperator(null);
    setWaitingForOperand(false);
    setExpression("");
    setErrorMessage("");
  }

  function enterDigit(digit: string) {
    setErrorMessage("");

    if (waitingForOperand || display === "Error") {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay(display === "0" ? digit : `${display}${digit}`);
  }

  function enterDecimal() {
    setErrorMessage("");

    if (waitingForOperand || display === "Error") {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) setDisplay(`${display}.`);
  }

  function chooseOperator(operator: Operator) {
    setErrorMessage("");

    if (pendingOperator && firstOperand !== null && !waitingForOperand) {
      try {
        const result = calculate(firstOperand, Number(display), pendingOperator);
        const resultText = formatNumber(result);
        setDisplay(resultText);
        setFirstOperand(result);
        setExpression(`${resultText} ${operator}`);
      } catch {
        setDisplay("Error");
        setErrorMessage("Division by zero is undefined.");
        setFirstOperand(null);
        setPendingOperator(null);
        setWaitingForOperand(true);
        return;
      }
    } else if (firstOperand === null || !pendingOperator) {
      const value = Number(display);
      setFirstOperand(value);
      setExpression(`${formatNumber(value)} ${operator}`);
    } else {
      setExpression(`${formatNumber(firstOperand)} ${operator}`);
    }

    setPendingOperator(operator);
    setWaitingForOperand(true);
  }

  function showResult() {
    if (firstOperand === null || pendingOperator === null || waitingForOperand) return;

    const secondOperand = Number(display);
    try {
      const result = calculate(firstOperand, secondOperand, pendingOperator);
      setDisplay(formatNumber(result));
      setExpression(
        `${formatNumber(firstOperand)} ${pendingOperator} ${formatNumber(secondOperand)} =`,
      );
      setFirstOperand(null);
      setPendingOperator(null);
      setWaitingForOperand(true);
      setErrorMessage("");
    } catch {
      setExpression(`${formatNumber(firstOperand)} ${pendingOperator} ${display} =`);
      setDisplay("Error");
      setFirstOperand(null);
      setPendingOperator(null);
      setWaitingForOperand(true);
      setErrorMessage("Division by zero is undefined.");
    }
  }

  function backspace() {
    if (display === "Error") {
      clear();
      return;
    }

    setErrorMessage("");
    if (waitingForOperand) {
      if (pendingOperator) {
        setPendingOperator(null);
        setExpression("");
      }
      setWaitingForOperand(false);
      return;
    }

    const shortened = display.slice(0, -1);
    setDisplay(shortened === "" || shortened === "-" ? "0" : shortened);
  }

  function handleKey(key: string) {
    if (/^\d$/.test(key)) {
      enterDigit(key);
    } else if (key === ".") {
      enterDecimal();
    } else if (key === "AC") {
      clear();
    } else if (key === "backspace") {
      backspace();
    } else if (key === "=") {
      showResult();
    } else {
      chooseOperator(key as Operator);
    }
  }

  return (
    <main className="calculator-page">
      <header className="calculator-heading">
        <p className="calculator-eyebrow">CALC <span>/</span> 01</p>
        <h1>Calculator</h1>
      </header>

      <section className="calculator" aria-label="Calculator">
        <CalculatorDisplay value={display} expression={expression} errorMessage={errorMessage} />
        <CalculatorKeypad onPress={handleKey} />
      </section>
    </main>
  );
}
