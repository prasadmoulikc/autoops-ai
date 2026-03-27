export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface UserData {
  income: number;
  businessType: string;
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
