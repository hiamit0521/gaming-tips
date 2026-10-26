import React from 'react';
import { GameItem } from '../types';
import { 
  X, 
  BrainCircuit, 
  Star, 
  Clock, 
  Trophy, 
  Cpu, 
  HardDrive, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface GameDetailModalProps {
  game: GameItem | null;
  onClose: () => void;
  onLaunchAI: (game: GameItem) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onLaunchAI,
}) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0F131C] rounded-3xl border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner backdrop */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={game.bannerUrl}
            alt={game.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F131C] via-[#0F131C]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>{game.genre}</span>
                <span className="text-slate-500">·</span>
                <span>{game.releaseYear}</span>
                <span className="text-slate-500">·</span>
                <span>{game.platforms.join(', ')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {game.title}
              </h2>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {game.developer} · Published by {game.publisher}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-center font-mono">
                <div className="text-lg font-bold text-amber-400 flex items-center gap-1 justify-center">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {game.rating}
                </div>
                <div className="text-[10px] text-slate-400">Metacritic {game.metacritic}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Tactical Intelligence Highlight */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
            <BrainCircuit className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                High-Thinking Tactical Directive
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{game.tacticalFocus}"
              </p>
            </div>
          </div>

          {/* Synopsis & Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Mission Overview & Lore Synopsis
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>
            
            {/* Zero-pill tags: clean inline text */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-slate-500">Tags:</span>
              {game.tags.map((t, idx) => (
                <React.Fragment key={idx}>
                  <span>{t}</span>
                  {idx < game.tags.length - 1 && <span className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Specs & Hardware Recommendations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 font-semibold font-sans">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Recommended System Spec</span>
              </div>
              <div className="text-slate-400">
                GPU: <span className="text-white">{game.specs.recommendedGpu}</span>
              </div>
              <div className="text-slate-400">
                CPU: <span className="text-white">{game.specs.recommendedCpu}</span>
              </div>
              <div className="text-slate-400">
                Storage: <span className="text-white">{game.specs.storage}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 font-semibold font-sans">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Trophies & Playtime Progress</span>
              </div>
              <div className="text-slate-400">
                Playtime Logged: <span className="text-white font-bold">{game.hoursPlayed}h</span> / {game.totalEstimatedHours}h est.
              </div>
              <div className="text-slate-400">
                Achievements: <span className="text-emerald-400 font-bold">{game.achievements.unlocked}</span> / {game.achievements.total} Unlocked
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-400 h-full"
                  style={{ width: `${Math.round((game.achievements.unlocked / (game.achievements.total || 1)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
            >
              Close Dossier
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchAI(game);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-900/30 transition-all"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch High-Thinking AI Tactics</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
