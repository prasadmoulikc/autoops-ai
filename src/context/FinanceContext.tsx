import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { UserData, Analysis, Transaction } from "../types/finance";
import { analyzeFinance, getTaxSuggestions, getAlerts } from "../utils/financeEngine";

interface FinanceContextType {
  userData: UserData;
  analysis: Analysis;
  suggestions: string[];
  alerts: string[];
  updateUserData: (data: Partial<UserData>) => void;
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  isFirstTime: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const DEMO_DATA: UserData = {
  income: 1200000,
  businessType: "Freelance",
  transactions: [
    { id: "1", amount: 200000, type: "expense", category: "Cloud Servers", date: new Date().toISOString() },
    { id: "2", amount: 150000, type: "expense", category: "Marketing", date: new Date().toISOString() },
    { id: "3", amount: 50000, type: "expense", category: "Consulting", date: new Date().toISOString() },
  ],
  notifications: true,
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  const [isFirstTime, setIsFirstTime] = useState(!userData);

  const activeData = userData || DEMO_DATA;

  const analysis = useMemo(() => analyzeFinance(activeData), [activeData]);
  const suggestions = useMemo(() => getTaxSuggestions(activeData, analysis), [activeData, analysis]);
  const alerts = useMemo(() => getAlerts(analysis), [analysis]);

  const updateUserData = (data: Partial<UserData>) => {
    const newData = { ...activeData, ...data };
    setUserData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
    setIsFirstTime(false);
  };

  const addTransaction = (t: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    const newData = {
      ...activeData,
      transactions: [newTransaction, ...activeData.transactions],
    };
    setUserData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  return (
    <FinanceContext.Provider
      value={{
        userData: activeData,
        analysis,
        suggestions,
        alerts,
        updateUserData,
        addTransaction,
        isFirstTime,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within a FinanceProvider");
  return context;
};
