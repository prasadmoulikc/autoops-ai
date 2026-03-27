import { useState } from "react";
import { Save, User, Shield, Bell, Moon, Sun, Key } from "lucide-react";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [apiKey, setApiKey] = useState("sk-neural-link-********************");

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            System <span className="text-gradient">Settings</span>
          </h1>
          <p className="subtext text-lg font-medium mt-1">Configure your autonomous AI environment.</p>
        </div>
        
        <button className="premium-button flex items-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm">
          <Save size={18} />
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-10">
            <div className="flex items-center gap-3 mb-8">
              <User size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold">Profile Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest subtext">Operator Name</label>
                <input 
                  type="text" 
                  defaultValue="Prasad Gowda" 
                  className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest subtext">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="prasadgowda908@gmail.com" 
                  className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-10">
            <div className="flex items-center gap-3 mb-8">
              <Shield size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold">Business Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest subtext">Business Name</label>
                <input 
                  type="text" 
                  defaultValue="Neural Link Solutions" 
                  className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest subtext">GST Number</label>
                <input 
                  type="text" 
                  defaultValue="29AAAAA0000A1Z5" 
                  className="w-full glass-card bg-white/5 border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-10">
            <div className="flex items-center gap-3 mb-8">
              <Key size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-bold">Security & API</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest subtext">Neural API Key</label>
                <div className="relative">
                  <Key size={18} className="absolute left-6 top-1/2 -translate-y-1/2 subtext" />
                  <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full glass-card bg-white/5 border-white/10 pl-14 pr-6 py-4 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-all font-mono"
                  />
                </div>
                <p className="text-[10px] subtext uppercase tracking-widest mt-2">Keep this key secret. Do not share it in public repositories.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-10">
            <div className="flex items-center gap-3 mb-8">
              <Bell size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-bold">Preferences</h2>
            </div>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">Notifications</p>
                  <p className="text-xs subtext">Real-time agent alerts</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-all relative ${notifications ? "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? "left-7" : "left-1"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">Dark Mode</p>
                  <p className="text-xs subtext">System appearance</p>
                </div>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? "left-7" : "left-1"}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 bg-indigo-500/5 border-indigo-500/10">
            <h3 className="text-xl font-bold mb-4">System Info</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="subtext">Version</span>
                <span className="font-bold">2.4.0-stable</span>
              </div>
              <div className="flex justify-between">
                <span className="subtext">Environment</span>
                <span className="font-bold">Production</span>
              </div>
              <div className="flex justify-between">
                <span className="subtext">Uptime</span>
                <span className="font-bold">99.99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
