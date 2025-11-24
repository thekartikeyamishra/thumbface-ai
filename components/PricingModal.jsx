import React from 'react';
import { X, Sparkles, Zap, ShieldCheck, Lock } from 'lucide-react';

// Pricing configuration embedded directly to avoid import resolution errors
const REGIONAL_PRICING = {
  'US': { 
    symbol: '$', 
    basic: 9.99, 
    pro: 19.99, 
    currency: 'USD', 
    country: 'United States' 
  },
  'IN': { 
    symbol: '₹', 
    basic: 299, 
    pro: 699, 
    currency: 'INR', 
    country: 'India' 
  },
  'UK': { 
    symbol: '£', 
    basic: 8.99, 
    pro: 15.99, 
    currency: 'GBP', 
    country: 'United Kingdom' 
  },
  'EU': { 
    symbol: '€', 
    basic: 9.99, 
    pro: 18.99, 
    currency: 'EUR', 
    country: 'Europe' 
  },
  'default': { 
    symbol: '$', 
    basic: 9.99, 
    pro: 19.99, 
    currency: 'USD', 
    country: 'Global' 
  }
};

const getPriceConfig = (regionCode) => {
  return REGIONAL_PRICING[regionCode] || REGIONAL_PRICING['default'];
};

/**
 * PricingModal Component
 * Displays the subscription plans with psychological triggers (Decoy Pricing).
 * * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Function to close the modal
 * @param {string} region - The detected user region code (e.g., 'US', 'IN')
 */
export default function PricingModal({ isOpen, onClose, region }) {
  // If modal is closed, do not render anything
  if (!isOpen) return null;

  // Get the specific pricing for the user's region (USD, INR, GBP, etc.)
  const priceConfig = getPriceConfig(region);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 md:p-10 relative flex flex-col md:flex-row gap-6 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* --- PLAN 1: STARTER (The Decoy) --- */}
        {/* Purpose: Makes the Pro plan look like better value by offering less for a similar price point */}
        <div className="flex-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 opacity-70 hover:opacity-100 transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-300 mb-2">Starter</h3>
          
          <div className="flex items-end gap-1 mb-4">
            <div className="text-3xl font-bold">{priceConfig.symbol}{priceConfig.basic}</div>
            <span className="text-slate-500 text-sm mb-1">/mo</span>
          </div>

          <ul className="space-y-4 mb-8 text-sm text-slate-400">
            <li className="flex gap-3 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              50 AI Generations
            </li>
            <li className="flex gap-3 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              Standard Server Speed
            </li>
            <li className="flex gap-3 items-center text-slate-600 line-through">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
              Commercial License
            </li>
          </ul>

          <button className="w-full py-3 border border-slate-600 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
            Select Basic
          </button>
        </div>

        {/* --- PLAN 2: PRO CREATOR (The Target) --- */}
        {/* Purpose: The main product we want to sell. Highlighted and scaled up. */}
        <div className="flex-1 bg-gradient-to-b from-indigo-900/40 to-slate-900 rounded-2xl p-6 border border-indigo-500 relative transform md:scale-105 shadow-2xl shadow-indigo-500/10">
          
          {/* "Recommended" Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
            Recommended
          </div>

          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            Pro Creator <Sparkles className="w-4 h-4 text-yellow-400" />
          </h3>
          
          <div className="flex items-end gap-1 mb-4">
            <span className="text-4xl font-bold text-white">{priceConfig.symbol}{priceConfig.pro}</span>
            <span className="text-slate-400 text-sm mb-1">/mo</span>
          </div>

          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-3 items-center text-slate-200">
              <div className="p-1 bg-indigo-500/20 rounded-full">
                <Sparkles className="w-3 h-3 text-indigo-400"/>
              </div>
              Unlimited Generations
            </li>
            <li className="flex gap-3 items-center text-slate-200">
              <div className="p-1 bg-indigo-500/20 rounded-full">
                <Zap className="w-3 h-3 text-indigo-400"/>
              </div>
              Fast GPU Mode (2x Speed)
            </li>
            <li className="flex gap-3 items-center text-slate-200">
              <div className="p-1 bg-indigo-500/20 rounded-full">
                <ShieldCheck className="w-3 h-3 text-indigo-400"/>
              </div>
              Commercial License Included
            </li>
            <li className="flex gap-3 items-center text-slate-200">
              <div className="p-1 bg-indigo-500/20 rounded-full">
                <Lock className="w-3 h-3 text-indigo-400"/>
              </div>
              Private Gallery Access
            </li>
          </ul>

          <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10 transform active:scale-95">
            Start 7-Day Free Trial
          </button>
          
          <p className="text-center text-xs text-slate-500 mt-3">
            Prices localized for {priceConfig.currency}. Cancel anytime.
          </p>
        </div>

      </div>
    </div>
  );
}