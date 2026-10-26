import React from 'react';
import { ScreenId } from '../types';
import { 
  Gamepad2, 
  BrainCircuit, 
  Layers, 
  Trophy, 
  Cpu, 
  User, 
  Sparkles,
  Search,
  Plus
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAddModal: () => void;
  onOpenQuickAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onOpenQuickAI,
}) => {
  const navItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'explore', label: 'Discover', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'ai-lab', label: 'AI Tactical Brain', icon: <BrainCircuit className="w-4 h-4 text-cyan-400" /> },
    { id: 'vault', label: 'Gamer Vault', icon: <Layers className="w-4 h-4" /> },
    { id: 'matches', label: 'Esports Live', icon: <Trophy className="w-4 h-4" /> },
    { id: 'rig', label: 'Rig & Benchmarks', icon: <Cpu className="w-4 h-4" /> },
    { id: 'profile', label: 'Gamer Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSelectScreen('explore')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-violet-700 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-base text-white">NEXUS</span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
                  GAMER COLL
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Gemini 4 Argon · High Thinking
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/[0.06]">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectScreen(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm shadow-black/40 border border-white/[0.08]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.id === 'ai-lab' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2.5">
            <div className="relative hidden lg:block w-48 xl:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search games, lore, builds..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/[0.08] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
              />
            </div>

            <button
              onClick={onOpenQuickAI}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-cyan-900/20 transition-all active:scale-[0.98]"
              title="Launch High-Thinking AI Tactics"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tactical AI</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-white/[0.08] transition-colors"
              title="Add Game to Vault"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Game</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-white/[0.06] overflow-x-auto gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 font-semibold border border-white/[0.08]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
