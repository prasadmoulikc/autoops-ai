export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
}

export interface UserData {
  income: number;
  businessType: string;
  businessName?: string;
  transactions: Transaction[];
  apiKey?: string;
  notifications?: boolean;
}

export interface Analysis {
  totalIncome: number;
  totalExpenses: number;
  profit: number;
  estimatedTax: number;
}
