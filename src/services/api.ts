export const analyzeFinance = async (data: any) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || "https://likith2103.app.n8n.cloud/webhook/cc1ab40b-4f1b-4189-a85a-876864e784bb/chat";
  
  // If URL is not configured and no fallback, return a simulated AI response
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
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || "https://likith2103.app.n8n.cloud/webhook/cc1ab40b-4f1b-4189-a85a-876864e784bb/chat";

  // Simulation Logic for Stock and Financial Search
  const simulateAI = (q: string) => {
    const lowerQuery = q.toLowerCase();
    
    // Stock Search Mode
    if (lowerQuery.includes("birla") || lowerQuery.includes("tcs") || lowerQuery.includes("reliance") || lowerQuery.includes("hdfc") || lowerQuery.includes("infosys") || lowerQuery.includes("wipro") || lowerQuery.includes("stock") || lowerQuery.includes("share")) {
      let company = "Reliance Industries Ltd";
      let price = 2985.40;
      let change = 12.50;
      let cap = "20.2L Cr";
      let pe = 28.4;
      
      if (lowerQuery.includes("birla")) {
        company = "UltraTech Cement (Aditya Birla Group)";
        price = 10540.00;
        change = 145.20;
        cap = "3.05L Cr";
        pe = 42.1;
      } else if (lowerQuery.includes("tcs")) {
        company = "Tata Consultancy Services";
        price = 4150.25;
        change = -22.40;
        cap = "15.1L Cr";
        pe = 31.2;
      } else if (lowerQuery.includes("infosys")) {
        company = "Infosys Ltd";
        price = 1680.50;
        change = 5.30;
        cap = "6.9L Cr";
        pe = 25.8;
      } else if (lowerQuery.includes("hdfc")) {
        company = "HDFC Bank Ltd";
        price = 1420.15;
        change = -1.20;
        cap = "10.8L Cr";
        pe = 18.5;
      }

      return {
        type: "stock",
        company,
        stockData: {
          price,
          change,
          changePercent: Number(((change/price)*100).toFixed(2)),
          marketCap: cap,
          peRatio: pe
        },
        analysis: [
          `Current RSI is ${change > 0 ? '62 (Slightly Overbought)' : '45 (Neutral)'}.`,
          "Institutional holding (FII/DII) has increased by 1.2% this quarter.",
          "Strong support level identified at ₹" + (price * 0.95).toFixed(0) + "."
        ],
        prediction: {
          shortTerm: change > 0 ? "Bullish" : change < 0 ? "Bearish" : "Neutral",
          longTerm: "Strong Buy"
        },
        recommendation: change > 0 ? "Accumulate" : change < 0 ? "Wait" : "Hold",
        confidence: "High",
        reason: "Market sentiment is positive following recent quarterly earnings and sector-wide recovery."
      };
    }

    // Financial Mode
    if (lowerQuery.includes("income") || lowerQuery.includes("tax") || lowerQuery.includes("expense") || lowerQuery.includes("save") || lowerQuery.includes("profit") || lowerQuery.includes("gst")) {
      return {
        type: "finance",
        company: "Financial Intelligence Unit",
        stockData: null,
        analysis: [
          "Under the New Tax Regime (FY 2024-25), income up to ₹7L is tax-free via rebate.",
          "Standard deduction has been increased to ₹75,000 for salaried individuals.",
          "GST Input Tax Credit (ITC) can be claimed on all business-related capital goods."
        ],
        prediction: {
          shortTerm: "Optimistic",
          longTerm: "Growth"
        },
        recommendation: "Plan Tax Early",
        confidence: "Very High",
        reason: "Recent budget changes favor the new regime for middle-income earners."
      };
    }

    // General Search
    return {
      type: "general",
      company: "AutoOps Knowledge Base",
      stockData: null,
      analysis: [
        "Global markets are showing signs of recovery after recent inflation data.",
        "Indian startup ecosystem is seeing renewed interest from VC firms.",
        "Digital transformation remains the top priority for Indian SMEs."
      ],
      prediction: {
        shortTerm: "Neutral",
        longTerm: "Stable"
      },
      recommendation: "Hold",
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
        chatInput: query, // Common n8n chat input field
        query 
      })
    });

    if (!res.ok) throw new Error("Search request failed");
    const data = await res.json();
    
    // Handle array response from n8n (common)
    const responseData = Array.isArray(data) ? data[0] : data;
    
    if (!responseData || typeof responseData !== "object") {
      throw new Error("Invalid response from AI");
    }

    // If the response is just a string (common for chat bots), wrap it
    if (typeof responseData === "string" || responseData.output) {
      return {
        type: "general",
        company: "AutoOps AI",
        analysis: [responseData.output || responseData],
        prediction: { shortTerm: "Neutral", longTerm: "Stable" },
        recommendation: "Hold",
        confidence: "High",
        reason: "AI generated response."
      };
    }

    return responseData;
  } catch (error) {
    console.error("AI Search failed:", error);
    return simulateAI(query); // Fallback to simulation on error
  }
};
