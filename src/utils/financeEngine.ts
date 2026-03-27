import { UserData, Analysis } from "../types/finance";

export function analyzeFinance(data: UserData): Analysis {
  const totalExpenses = data.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = data.income;
  const profit = totalIncome - totalExpenses;

  let taxRate = 0;
  if (profit > 2000000) taxRate = 0.3;
  else if (profit > 1000000) taxRate = 0.2;
  else taxRate = 0.1;

  const estimatedTax = Math.max(0, profit * taxRate);

  return {
    totalIncome,
    totalExpenses,
    profit,
    estimatedTax,
  };
}

export function getTaxSuggestions(data: UserData, analysis: Analysis): string[] {
  const suggestions: string[] = [];

  if (analysis.profit > 500000) {
    suggestions.push(`Invest in Section 80C to save ₹${Math.round(analysis.estimatedTax * 0.2)}`);
  }

  if (analysis.totalExpenses < data.income * 0.3) {
    suggestions.push("You are under-claiming expenses. Add more business expenses.");
  }

  suggestions.push("Track GST inputs to reduce payable tax.");
  suggestions.push("Use depreciation on assets to reduce taxable income.");

  return suggestions;
}

export function getAlerts(analysis: Analysis): string[] {
  const alerts: string[] = [];

  if (analysis.totalExpenses > analysis.totalIncome * 0.8) {
    alerts.push("⚠️ High spending detected");
  }

  if (analysis.estimatedTax > 100000) {
    alerts.push("📅 Advance tax payment recommended");
  }

  alerts.push("📌 GST filing due in 10 days");

  return alerts;
}
