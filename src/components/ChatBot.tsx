import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  Bot, 
  User, 
  Maximize2, 
  Minimize2,
  Sparkles,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { searchAI } from "../services/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  stockData?: {
    symbol: string;
    price: number;
    change: number;
  };
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Financial Assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await searchAI(input);
      
      let aiText = "I'm sorry, I couldn't process that request.";
      let stockData = undefined;

      if (response) {
        if (typeof response === "string") {
          aiText = response;
        } else {
          if (response.type === "stock" && response.stockData) {
            stockData = {
              symbol: response.stockData.symbol,
              price: response.stockData.price,
              change: response.stockData.change
            };
            aiText = response.analysis || `Here is the latest data for ${response.company || response.stockData.symbol}.`;
          } else if (response.analysis && Array.isArray(response.analysis)) {
            aiText = response.analysis[0];
          } else if (response.analysis && typeof response.analysis === "string") {
            aiText = response.analysis;
          } else if (response.output) {
            aiText = response.output;
          } else if (response.message) {
            aiText = response.message;
          }
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: "ai",
        timestamp: new Date(),
        stockData
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat failed:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to my neural network. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? "80px" : "500px",
              width: "380px"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card mb-4 flex flex-col overflow-hidden shadow-2xl border-white/10 bg-[#020617]/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bot size={18} className="text-primary animate-pulse-soft" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">Neural Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[8px] font-bold text-success uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                  {messages.map((msg) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          msg.sender === "user" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                        }`}>
                          {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user" 
                            ? "bg-primary text-white rounded-tr-none" 
                            : "bg-white/5 text-white/80 border border-white/10 rounded-tl-none"
                        }`}>
                          {msg.text}
                          
                          {msg.stockData && (
                            <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{msg.stockData.symbol}</span>
                                <div className={`flex items-center gap-1 text-[10px] font-black ${msg.stockData.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                  {msg.stockData.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                  {Math.abs(msg.stockData.change)}%
                                </div>
                              </div>
                              <p className="text-sm font-black text-white">₹{msg.stockData.price.toLocaleString()}</p>
                            </div>
                          )}

                          <div className={`text-[8px] mt-1 opacity-40 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 items-center p-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none">
                        <Loader2 size={14} className="animate-spin text-primary" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest animate-pulse">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-all"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1.5 opacity-20">
                      <Sparkles size={10} />
                      <span className="text-[8px] font-black uppercase tracking-widest">AI Powered</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setMessages([messages[0]])}
                      className="flex items-center gap-1.5 opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <RefreshCw size={10} />
                      <span className="text-[8px] font-black uppercase tracking-widest">Clear Chat</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-danger rotate-90" : "bg-primary"
        } shadow-primary/20`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} className="text-white" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-[#020617] animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
