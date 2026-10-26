import React from 'react';
import { GameItem } from '../types';
import { BrainCircuit, Star, Clock, Sparkles } from 'lucide-react';

interface GameCardProps {
  game: GameItem;
  onSelect: (game: GameItem) => void;
  onAnalyze: (game: GameItem) => void;
  onStatusChange?: (gameId: string, status: GameItem['status']) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  onAnalyze,
  onStatusChange,
}) => {
  const statusColors = {
    playing: 'text-cyan-400',
    backlog: 'text-amber-400',
    completed: 'text-emerald-400',
    wishlist: 'text-purple-400',
  };

  const statusLabels = {
    playing: 'Playing',
    backlog: 'Backlog',
    completed: '100% Completed',
    wishlist: 'Wishlist',
  };

  return (
    <div className="group relative bg-slate-900/70 rounded-2xl border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-cyan-950/20">
      
      {/* Cover Image with hotlinked high-res art */}
      <div 
        className="relative h-56 w-full overflow-hidden cursor-pointer bg-slate-950"
        onClick={() => onSelect(game)}
      >
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Rating Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs font-mono font-semibold text-white">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{game.rating}</span>
        </div>

        {/* Status text (Zero-pill compliant) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs font-medium">
          <span className={`w-2 h-2 rounded-full ${game.status === 'playing' ? 'bg-cyan-400 animate-pulse' : game.status === 'completed' ? 'bg-emerald-400' : game.status === 'backlog' ? 'bg-amber-400' : 'bg-purple-400'}`} />
          <span className={statusColors[game.status]}>{statusLabels[game.status]}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Metadata line: zero-pill compliant */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>{game.genre}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.releaseYear}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-slate-300">{game.platforms.join(', ')}</span>
          </div>

          <h3 
            className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
            onClick={() => onSelect(game)}
          >
            {game.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Tactical intelligence sneak-peek */}
        <div className="p-2.5 bg-slate-950/60 rounded-xl border border-white/[0.04] text-xs">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide uppercase text-[10px] font-mono">Tactical Note</span>
          </div>
          <p className="text-slate-300 text-[11px] line-clamp-1 italic">
            "{game.tacticalFocus}"
          </p>
        </div>

        {/* Hours & Footer Actions */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{game.hoursPlayed}h</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">{game.totalEstimatedHours}h</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onAnalyze(game)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-100 rounded-lg text-xs font-semibold border border-cyan-700/40 transition-colors"
              title="Launch High-Thinking AI Tactics with Gemini 4 Argon"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Tactics</span>
            </button>

            {onStatusChange && (
              <select
                value={game.status}
                onChange={(e) => onStatusChange(game.id, e.target.value as GameItem['status'])}
                className="bg-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1.5 border border-white/[0.08] focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="playing">Playing</option>
                <option value="backlog">Backlog</option>
                <option value="completed">Completed</option>
                <option value="wishlist">Wishlist</option>
              </select>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
