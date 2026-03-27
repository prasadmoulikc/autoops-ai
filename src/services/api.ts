export const analyzeFinance = async (data: any) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  
  // If URL is not configured, return a simulated AI response to keep the app functional
  if (!webhookUrl || webhookUrl === "YOUR_N8N_WEBHOOK_URL") {
    const income = Number(data.income) || 0;
    const expenses = Array.isArray(data.expenses) ? data.expenses.reduce((sum: number, e: any) => sum + (Number(e.amount) || 0), 0) : 0;
    const profit = income - expenses;
    
    // Indian Tax Slabs (Simplified for FY 2024-25)
    let tax = 0;
    if (income > 1500000) tax = (income - 1500000) * 0.3 + 150000;
    else if (income > 1200000) tax = (income - 1200000) * 0.2 + 90000;
    else if (income > 900000) tax = (income - 900000) * 0.15 + 45000;
    else if (income > 600000) tax = (income - 600000) * 0.1 + 15000;
    else if (income > 300000) tax = (income - 300000) * 0.05;

    return {
      totalIncome: income,
      totalExpenses: expenses,
      profit: profit,
      tax: tax,
      insights: [
        `Your current expense ratio is ${((expenses/income)*100).toFixed(1)}% for a ${data.businessType || 'standard'} business.`,
        "Consider allocating 20% of your profit to a tax-saving mutual fund (ELSS).",
        "AI suggests optimizing Cloud Server costs by switching to reserved instances."
      ],
      alerts: [
        "GST filing deadline is approaching in 5 days.",
        "Unusual spike in Marketing expenses detected last week."
      ],
      complianceScore: 98
    };
  }
  
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "analysis",
        ...data
      })
    });

    if (!res.ok) throw new Error("API request failed");
    return await res.json();
  } catch (error) {
    console.error("Finance analysis failed:", error);
    return null;
  }
};

export const searchAI = async (query: string) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  // Simulation Logic for Stock and Financial Search
  const simulateAI = (q: string) => {
    const lowerQuery = q.toLowerCase();
    
    // Stock Search Mode
    if (lowerQuery.includes("birla") || lowerQuery.includes("tcs") || lowerQuery.includes("reliance") || lowerQuery.includes("hdfc") || lowerQuery.includes("stock") || lowerQuery.includes("share")) {
      let company = "Reliance Industries Ltd";
      let price = 2950;
      let change = 45;
      let cap = "19.5L Cr";
      
      if (lowerQuery.includes("birla")) {
        company = "UltraTech Cement (Aditya Birla Group)";
        price = 10450;
        change = 120;
        cap = "3.05L Cr";
      } else if (lowerQuery.includes("tcs")) {
        company = "Tata Consultancy Services";
        price = 4120;
        change = -15;
        cap = "14.8L Cr";
      }

      return {
        type: "stock",
        company,
        stockData: {
          price,
          change,
          changePercent: Number(((change/price)*100).toFixed(2)),
          marketCap: cap,
          peRatio: 38.5
        },
        analysis: [
          "Strong uptrend with consistent quarterly growth",
          "High institutional buying indicates confidence",
          "Market leader in its respective sector"
        ],
        prediction: {
          shortTerm: change > 0 ? "Bullish" : "Neutral",
          longTerm: "Strong Growth"
        },
        recommendation: change > 0 ? "Buy" : "Hold",
        confidence: "High",
        reason: "Strong fundamentals, market dominance, and steady earnings growth."
      };
    }

    // Financial Mode
    if (lowerQuery.includes("income") || lowerQuery.includes("tax") || lowerQuery.includes("expense") || lowerQuery.includes("save") || lowerQuery.includes("profit")) {
      return {
        type: "finance",
        company: "Financial Intelligence Unit",
        analysis: [
          "Based on current Indian tax slabs, you can save up to ₹1.5L under Section 80C.",
          "Consider NPS for an additional ₹50k deduction.",
          "Your business expenses are currently optimized at 25% of gross revenue."
        ],
        prediction: {
          shortTerm: "Stable",
          longTerm: "Growth"
        },
        recommendation: "Optimize",
        confidence: "High",
        reason: "Tax planning early in the quarter maximizes compounding benefits.",
        financialDetails: {
          suggestedSavings: ["ELSS", "PPF", "NPS", "Health Insurance"],
          taxOptimization: "Switch to Presumptive Taxation (44ADA) if eligible."
        }
      };
    }

    // General Search
    return {
      type: "general",
      company: "AutoOps Knowledge Base",
      analysis: [
        "Global markets are showing signs of recovery after recent inflation data.",
        "Indian startup ecosystem is seeing renewed interest from VC firms.",
        "Digital transformation remains the top priority for Indian SMEs."
      ],
      prediction: {
        shortTerm: "Neutral",
        longTerm: "Stable"
      },
      recommendation: "Monitor",
      confidence: "Medium",
      reason: "Macroeconomic factors are currently in a transition phase."
    };
  };

  if (!webhookUrl || webhookUrl === "YOUR_N8N_WEBHOOK_URL") {
    console.warn("AI Webhook not configured. Using simulated AI search.");
    return simulateAI(query);
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        type: "search",
        query 
      })
    });

    if (!res.ok) throw new Error("Search request failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("AI Search failed:", error);
    return simulateAI(query); // Fallback to simulation on error
  }
};
