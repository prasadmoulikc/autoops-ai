export const analyzeFinance = async (data: any) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  
  // If URL is not configured, return a simulated AI response to keep the app functional
  if (!webhookUrl || webhookUrl === "YOUR_N8N_WEBHOOK_URL") {
    console.warn("AI Webhook not configured. Using simulated AI response.");
    return {
      totalIncome: data.income,
      totalExpenses: data.expenses.reduce((sum: number, e: any) => sum + e.amount, 0),
      profit: data.income - data.expenses.reduce((sum: number, e: any) => sum + e.amount, 0),
      tax: data.income * 0.15, // Simulated 15% tax logic
      insights: [
        "Your current expense ratio is healthy for a " + data.businessType + " business.",
        "Consider allocating 20% of your profit to a tax-saving mutual fund.",
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

  if (!webhookUrl || webhookUrl === "YOUR_N8N_WEBHOOK_URL") {
    console.warn("AI Webhook not configured. Using simulated AI search.");
    return {
      insights: [
        "Based on your query '" + query + "', AI suggests reviewing Section 80C for tax savings.",
        "Market trends indicate a bullish sentiment in the tech sector for the next quarter.",
        "Financial advice: Maintain an emergency fund equal to 6 months of operating expenses."
      ]
    };
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
    return null;
  }
};
