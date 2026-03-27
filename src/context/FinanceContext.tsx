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
  // Auth
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  // Watchlist
  watchlist: { symbol: string; price: number; change: number }[];
  addToWatchlist: (stock: { symbol: string; price: number; change: number }) => void;
  removeFromWatchlist: (symbol: string) => void;
  clearWatchlist: () => void;
  // Search History
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const DEMO_DATA: UserData = {
  income: 1200000,
  businessType: "Freelance",
  businessName: "Nexus Digital",
  transactions: [
    { id: "1", amount: 200000, type: "expense", category: "Cloud Servers", date: new Date().toISOString(), description: "AWS Monthly Billing" },
    { id: "2", amount: 150000, type: "expense", category: "Marketing", date: new Date().toISOString(), description: "Google Ads Campaign" },
    { id: "3", amount: 50000, type: "expense", category: "Consulting", date: new Date().toISOString(), description: "Strategy Session" },
  ],
  notifications: true,
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const saved = localStorage.getItem("userData");
      if (!saved) return DEMO_DATA;
      const parsed = JSON.parse(saved);
      return { ...DEMO_DATA, ...parsed };
    } catch (error) {
      console.error("Failed to parse userData from localStorage:", error);
      return DEMO_DATA;
    }
  });

  const [isFirstTime, setIsFirstTime] = useState(() => !localStorage.getItem("userData"));

  // Auth State
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Watchlist State
  const [watchlist, setWatchlist] = useState<{ symbol: string; price: number; change: number }[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [
      { symbol: "RELIANCE", price: 2450, change: 1.2 },
      { symbol: "TCS", price: 3200, change: -0.5 },
      { symbol: "INFY", price: 1500, change: 0.8 }
    ];
  });

  // Search History State
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const login = (name: string, email: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addToWatchlist = (stock: { symbol: string; price: number; change: number }) => {
    if (!watchlist.some(s => s.symbol === stock.symbol)) {
      const newWatchlist = [...watchlist, stock];
      setWatchlist(newWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    const newWatchlist = watchlist.filter(s => s.symbol !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.setItem("watchlist", JSON.stringify([]));
  };

  const addToHistory = (query: string) => {
    const filtered = searchHistory.filter(h => h !== query);
    const newHistory = [query, ...filtered].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.setItem("searchHistory", JSON.stringify([]));
  };

  const activeData = useMemo(() => {
    const base = userData || DEMO_DATA;
    return {
      ...DEMO_DATA,
      ...base,
      transactions: base.transactions || []
    };
  }, [userData]);

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
        user,
        login,
        logout,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        clearWatchlist,
        searchHistory,
        addToHistory,
        clearHistory,
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
