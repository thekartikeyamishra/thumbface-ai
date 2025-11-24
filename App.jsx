import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Sparkles, Zap, Award, Share2, Download, 
  Video, Globe, DollarSign, Menu, X, Camera, Lock
} from 'lucide-react';

// --- Mock Data & Constants ---
const REGIONAL_PRICING = {
  'US': { symbol: '$', rate: 19.99, currency: 'USD' },
  'IN': { symbol: '₹', rate: 499, currency: 'INR' }, // PPP adjustment
  'UK': { symbol: '£', rate: 15.99, currency: 'GBP' },
  'default': { symbol: '$', rate: 19.99, currency: 'USD' }
};

const MOODS = [
  { id: 'shock', label: 'Ultra Shock', icon: '😲', color: 'from-yellow-400 to-orange-500' },
  { id: 'anger', label: 'Rage Mode', icon: '😡', color: 'from-red-500 to-pink-600' },
  { id: 'laugh', label: 'Hysterical', icon: '😂', color: 'from-green-400 to-emerald-600' },
  { id: 'surprised', label: 'Pog Face', icon: '😱', color: 'from-blue-400 to-indigo-600' },
];

export default function App() {
  // --- State Management ---
  const [user, setUser] = useState({ credits: 5, streak: 3, xp: 450, level: 2 });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [region, setRegion] = useState('US'); // Mock location
  const [showPricing, setShowPricing] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(0);

  // --- Effects ---
  useEffect(() => {
    // Mock Geo-Location detection for Dynamic Pricing
    // In production, use an API like ipapi.co
    const mockDetectLocation = () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone.includes('Calcutta')) setRegion('IN');
      else if (timeZone.includes('London')) setRegion('UK');
      else setRegion('US');
    };
    mockDetectLocation();
  }, []);

  // --- Handlers ---
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
      setGeneratedImage(null);
    }
  };

  const handleGenerate = () => {
    if (user.credits < 1) {
      setShowPricing(true);
      return;
    }

    setIsGenerating(true);
    // Simulate AI Latency
    setTimeout(() => {
      setIsGenerating(false);
      // Mock Result: In real app, this comes from Stability AI / Midjourney API
      setGeneratedImage(`https://placehold.co/600x600/1a1a1a/FFF?text=${selectedMood.label}+Generated!`);
      
      // Gamification: Add XP and deduct credit
      setUser(prev => ({ 
        ...prev, 
        credits: prev.credits - 1,
        xp: prev.xp + 50 
      }));
    }, 2500);
  };

  const watchAd = () => {
    setAdTimer(5);
    const interval = setInterval(() => {
      setAdTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowAdModal(false);
          setUser(prevUser => ({ ...prevUser, credits: prevUser.credits + 2 }));
          alert("Reward Earned: +2 Credits!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const priceConfig = REGIONAL_PRICING[region] || REGIONAL_PRICING['default'];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- Navbar --- */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Thumb<span className="text-indigo-400">Face</span>.ai</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Gamification Stats */}
            <div className="hidden md:flex items-center gap-4 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800">
              <div className="flex items-center gap-2 text-yellow-400">
                <Zap className="w-4 h-4 fill-yellow-400" />
                <span className="font-bold">{user.credits} Credits</span>
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Lvl {user.level}</span>
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[75%]"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowPricing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              Get Pro
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Used by 10k+ YouTubers
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Stop Making <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Boring Thumbnails
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Upload one selfie. AI generates 
            <span className="text-white font-semibold"> hyper-expressive </span> 
            faces guaranteed to 2x your CTR.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT COLUMN: Controls --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Upload Area */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative group hover:border-indigo-500/50 transition-all">
              {!previewUrl ? (
                <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all">
                  <div className="p-4 bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-indigo-400" />
                  </div>
                  <p className="font-semibold text-slate-300">Click to upload face</p>
                  <p className="text-xs text-slate-500 mt-2">JPG, PNG up to 5MB</p>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
              ) : (
                <div className="relative h-64 rounded-xl overflow-hidden bg-black group">
                  <img src={previewUrl} alt="Original" className="w-full h-full object-cover opacity-80" />
                  <button 
                    onClick={() => { setFile(null); setPreviewUrl(null); setGeneratedImage(null); }}
                    className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-500/80 rounded-full text-white backdrop-blur-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/60 rounded-full text-xs font-medium backdrop-blur-md border border-white/10">
                    Original
                  </div>
                </div>
              )}
            </div>

            {/* Mood Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Select Expression</label>
              <div className="grid grid-cols-2 gap-3">
                {MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood)}
                    className={`relative p-4 rounded-xl border transition-all flex items-center gap-3 overflow-hidden
                      ${selectedMood.id === mood.id 
                        ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/10' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                  >
                    <div className={`text-2xl ${selectedMood.id === mood.id ? 'scale-125' : 'scale-100'} transition-transform duration-300`}>
                      {mood.icon}
                    </div>
                    <div className="text-left relative z-10">
                      <div className={`font-bold ${selectedMood.id === mood.id ? 'text-white' : 'text-slate-400'}`}>
                        {mood.label}
                      </div>
                    </div>
                    {selectedMood.id === mood.id && (
                      <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${mood.color}`}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!file || isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${!file 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : isGenerating 
                    ? 'bg-indigo-600/50 cursor-wait' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analysing Geometry...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Expression
                </>
              )}
            </button>

            {/* Ad Reward Nudge */}
            <div 
              onClick={() => setShowAdModal(true)}
              className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-200">Out of credits?</div>
                  <div className="text-xs text-slate-500">Watch a short ad to get +2 free credits</div>
                </div>
              </div>
              <div className="text-indigo-400 group-hover:translate-x-1 transition-transform">→</div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: Preview --- */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-2 min-h-[600px] flex flex-col relative overflow-hidden shadow-2xl">
              
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-20" 
                style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
              </div>

              {generatedImage ? (
                <div className="relative flex-1 rounded-2xl overflow-hidden group">
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <div className="flex gap-4">
                      <button className="flex-1 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                        <Download className="w-5 h-5" />
                        Download HD
                      </button>
                      <button className="px-4 py-3 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 animate-pulse">
                    <Camera className="w-10 h-10 opacity-50" />
                  </div>
                  <p className="text-xl font-medium">Your masterpiece will appear here</p>
                  <p className="text-sm mt-2 opacity-60">High Resolution • Background Removed</p>
                </div>
              )}

              {/* Fake UI Overlay for "Editor" Vibe */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-8 relative overflow-hidden">
            <button 
              onClick={() => setShowPricing(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                Pro Access
              </span>
              <h2 className="text-3xl font-bold mb-2">Unleash Your Creativity</h2>
              <p className="text-slate-400">Join top creators in {region === 'IN' ? 'India' : region === 'UK' ? 'the UK' : 'the US'}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative">
              <div className="absolute -top-3 right-6 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold">{priceConfig.symbol}{priceConfig.rate}</span>
                <span className="text-slate-400 mb-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-1 bg-green-500/20 rounded-full"><Sparkles className="w-3 h-3 text-green-400"/></div>
                  Unlimited Generations
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-1 bg-green-500/20 rounded-full"><Sparkles className="w-3 h-3 text-green-400"/></div>
                  4K Ultra-HD Downloads
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-1 bg-green-500/20 rounded-full"><Sparkles className="w-3 h-3 text-green-400"/></div>
                  Priority Server Access
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                Start Free Trial
              </button>
              <p className="text-center text-xs text-slate-500 mt-4">
                Prices localized for {priceConfig.currency}. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ad Reward Modal */}
      {showAdModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-8 text-center relative">
             <h3 className="text-xl font-bold mb-4">Watching Advertisement...</h3>
             <div className="w-full h-48 bg-slate-800 rounded-lg mb-6 flex items-center justify-center border border-slate-700">
               {adTimer > 0 ? (
                 <div className="text-center">
                   <p className="text-4xl font-bold text-indigo-400 mb-2">{adTimer}s</p>
                   <p className="text-slate-500 text-sm">Reward incoming</p>
                 </div>
               ) : (
                 <button 
                  onClick={watchAd}
                  className="bg-indigo-600 px-6 py-2 rounded-lg font-bold"
                 >
                   Start Video
                 </button>
               )}
             </div>
             <p className="text-slate-400 text-sm">
               Support us by watching this short sponsor message to earn free credits.
             </p>
             <button 
                onClick={() => setShowAdModal(false)}
                className="mt-6 text-slate-500 hover:text-white text-sm"
              >
                Close (Forfeit Reward)
              </button>
          </div>
        </div>
      )}

    </div>
  );
}