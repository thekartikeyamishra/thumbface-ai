import React from 'react';
import { Sparkles, Zap, Award } from 'lucide-react';

/**
 * Navbar Component
 * Displays the branding, user stats (gamification), and action buttons.
 * * @param {Object} userData - Contains user stats like credits, level, xp
 * @param {Function} setShowAdModal - Trigger to open the Ad reward modal
 * @param {Function} setShowPricing - Trigger to open the Pricing/Subscription modal
 */
export default function Navbar({ userData, setShowAdModal, setShowPricing }) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- BRANDING --- */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline text-white">
            Thumb<span className="text-indigo-400">Face</span>.ai
          </span>
        </div>

        {/* --- ACTIONS & STATS --- */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Gamification Stats (Clickable to earn credits) */}
          <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 hover:border-slate-700 transition-colors">
            
            {/* Credits Counter */}
            <button 
              onClick={() => setShowAdModal(true)} 
              className="flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 transition-colors group"
              title="Watch Ads to earn credits"
            >
              <Zap className="w-4 h-4 fill-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">{userData?.credits || 0}</span>
            </button>
            
            <div className="w-px h-4 bg-slate-700"></div>
            
            {/* Level Indicator */}
            <div className="flex items-center gap-1.5 text-emerald-400 cursor-help" title={`Level ${userData?.level || 1}`}>
              <Award className="w-4 h-4" />
              <span className="text-sm font-bold">Lvl {userData?.level || 1}</span>
            </div>
          </div>

          {/* Pro Upgrade Button */}
          <button 
            onClick={() => setShowPricing(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95"
          >
            Get Pro
          </button>
        </div>
      </div>
    </nav>
  );
}