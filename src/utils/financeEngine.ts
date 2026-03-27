import { UserData, Analysis } from "../types/finance";

export function calculateIndianTax(income: number): number {
  // New Tax Regime (FY 2024-25)
  // Up to 3,00,000: Nil
  // 3,00,001 - 6,00,000: 5%
  // 6,00,001 - 9,00,000: 10%
  // 9,00,001 - 12,00,000: 15%
  // 12,00,001 - 15,00,000: 20%
  // Above 15,00,000: 30%
  
  let tax = 0;
  const taxableIncome = Math.max(0, income - 75000); // Standard deduction of 75k in new regime

  if (taxableIncome <= 700000) return 0; // Tax rebate under 87A (up to 7L income)

  if (taxableIncome > 1500000) {
    tax += (taxableIncome - 1500000) * 0.30;
    tax += 300000 * 0.20; // 12-15L
    tax += 300000 * 0.15; // 9-12L
    tax += 300000 * 0.10; // 6-9L
    tax += 300000 * 0.05; // 3-6L
  } else if (taxableIncome > 1200000) {
    tax += (taxableIncome - 1200000) * 0.20;
    tax += 300000 * 0.15;
    tax += 300000 * 0.10;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 900000) {
    tax += (taxableIncome - 900000) * 0.15;
    tax += 300000 * 0.10;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 600000) {
    tax += (taxableIncome - 600000) * 0.10;
    tax += 300000 * 0.05;
  } else if (taxableIncome > 300000) {
    tax += (taxableIncome - 300000) * 0.05;
  }

  // Add 4% Health and Education Cess
  return tax * 1.04;
}

export function analyzeFinance(data: UserData): Analysis {
  const totalExpenses = data.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = data.income;
  const profit = totalIncome - totalExpenses;

  const estimatedTax = calculateIndianTax(profit);

  return {
    totalIncome,
    totalExpenses,
    profit,
    estimatedTax,
  };
}

export function getTaxSuggestions(data: UserData, analysis: Analysis): string[] {
  const suggestions: string[] = [];
  const profit = analysis.profit;

  if (profit > 700000) {
    suggestions.push("Invest ₹1.5L in ELSS/PPF (Section 80C) to maximize deductions.");
    suggestions.push("Consider ₹50,000 in NPS (Section 80CCD(1B)) for extra tax saving.");
    suggestions.push("Health insurance for self and parents can save tax under Section 80D.");
  } else {
    suggestions.push("Your income is within the tax-free limit (₹7L) under the new regime.");
  }

  if (data.businessType === "Freelance" || data.businessType === "Consulting") {
    suggestions.push("Use Section 44ADA (Presumptive Taxation) to declare 50% of gross as profit.");
  }

  if (analysis.totalExpenses < data.income * 0.2) {
    suggestions.push("Expense ratio is low. Ensure all business-related costs (internet, rent, hardware) are tracked.");
  }

  suggestions.push("Claim GST Input Tax Credit (ITC) on business purchases to reduce liability.");

  return suggestions;
}

export function getAlerts(analysis: Analysis): string[] {
  const alerts: string[] = [];

  if (analysis.totalExpenses > analysis.totalIncome * 0.7) {
    alerts.push("⚠️ High Burn Rate: Expenses exceeding 70% of revenue.");
  }

  if (analysis.estimatedTax > 10000) {
    alerts.push("📅 Advance Tax: Pay 15% by June 15 to avoid interest.");
  }

  if (analysis.profit > 2000000) {
    alerts.push("🚨 Audit Risk: High profit margin might trigger tax scrutiny.");
  }

  alerts.push("📌 GST: Monthly filing deadline is the 20th of every month.");

  return alerts;
}
