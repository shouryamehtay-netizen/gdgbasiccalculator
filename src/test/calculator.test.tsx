import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Index } from "@/routes/index";
import { calculate, formatNumber } from "@/lib/calculator";

describe("calculator math", () => {
  it("supports addition, subtraction, multiplication, and division", () => {
    expect(calculate(8, 2, "+")).toBe(10);
    expect(calculate(8, 2, "−")).toBe(6);
    expect(calculate(8, 2, "×")).toBe(16);
    expect(calculate(8, 2, "÷")).toBe(4);
  });

  it("keeps decimal results readable", () => {
    expect(formatNumber(calculate(0.1, 0.2, "+"))).toBe("0.3");
  });

  it("rejects division by zero", () => {
    expect(() => calculate(8, 0, "÷")).toThrow("Cannot divide by zero.");
  });
});

describe("calculator buttons", () => {
  it("calculates, edits the current input, clears, and reports division by zero", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    fireEvent.click(screen.getByRole("button", { name: "Equals" }));
    expect(screen.getByLabelText("Current input and result")).toHaveTextContent("15");

    fireEvent.click(screen.getByRole("button", { name: "All Clear" }));
    fireEvent.click(screen.getByRole("button", { name: "8" }));
    fireEvent.click(screen.getByRole("button", { name: "Backspace" }));
    expect(screen.getByLabelText("Current input and result")).toHaveTextContent("0");

    fireEvent.click(screen.getByRole("button", { name: "8" }));
    fireEvent.click(screen.getByRole("button", { name: "Divide" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "Equals" }));
    expect(screen.getByLabelText("Current input and result")).toHaveTextContent("Error");
    expect(screen.getByText("Division by zero is undefined.")).toBeInTheDocument();
  });

  it("enters a decimal number and prevents a second decimal point", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "Decimal point" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "Decimal point" }));
    expect(screen.getByLabelText("Current input and result")).toHaveTextContent("1.2");
  });
});