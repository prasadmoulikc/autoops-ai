import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const MODEL_NAME = "gemini-3-flash-preview";

export interface AgentPlan {
  steps: string[];
  rationale: string;
}

export interface ExecutionResult {
  action: string;
  toolUsed: string;
  result: string;
  status: 'success' | 'failure';
}

export const plannerAgent = async (userInput: string, context: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `User Goal: ${userInput}\nContext: ${context}`,
    config: {
      systemInstruction: `You are an Autonomous Business Agent Planner. 
      Break the user goal into a step-by-step plan. 
      Identify which steps can be automated.
      Think like a CA (Chartered Accountant) + Operations Manager.
      Return JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          rationale: { type: Type.STRING }
        },
        required: ["steps", "rationale"]
      }
    }
  });
  return JSON.parse(response.text) as AgentPlan;
};

export const executionAgent = async (task: string, tools: string[]) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Task: ${task}\nAvailable Tools: ${tools.join(", ")}`,
    config: {
      systemInstruction: `You are an Execution Agent. 
      Decide which tool to use, simulate the action, and return the result.
      Return JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          action: { type: Type.STRING },
          toolUsed: { type: Type.STRING },
          result: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["success", "failure"] }
        },
        required: ["action", "toolUsed", "result", "status"]
      }
    }
  });
  return JSON.parse(response.text) as ExecutionResult;
};

export const criticAgent = async (execution: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Execution Details: ${execution}`,
    config: {
      systemInstruction: `You are a strict reviewer. 
      Evaluate the execution: Was it correct? Was it efficient? Was anything missed?
      Give a score (1-10) and suggest improvements.
      Return JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          improvements: { type: Type.STRING }
        },
        required: ["score", "feedback", "improvements"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const learningAgent = async (task: string, result: string, feedback: string) => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Task: ${task}\nResult: ${result}\nFeedback: ${feedback}`,
    config: {
      systemInstruction: `You are a Self-Improving AI Agent. 
      Analyze the task and feedback to extract reusable knowledge or skills.
      Return JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insight: { type: Type.STRING },
          skillUpdate: { type: Type.STRING },
          confidence: { type: Type.NUMBER }
        },
        required: ["insight", "skillUpdate", "confidence"]
      }
    }
  });
  return JSON.parse(response.text);
};
