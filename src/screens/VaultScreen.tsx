import React, { useState } from 'react';
import { GameItem, GameStatus } from '../types';
import { 
  Layers, 
  Plus, 
  Clock, 
  Star, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  BrainCircuit, 
  Trash2,
  Filter,
  ArrowUpDown
} from 'lucide-react';

interface VaultScreenProps {
  games: GameItem[];
  onSelectGame: (game: GameItem) => void;
  onLaunchAI: (game: GameItem) => void;
  onUpdateGameHours: (gameId: string, delta: number) => void;
  onStatusChange: (gameId: string, status: GameStatus) => void;
  onDeleteGame: (gameId: string) => void;
  onOpenAddModal: () => void;
}

export const VaultScreen: React.FC<VaultScreenProps> = ({
  games,
  onSelectGame,
  onLaunchAI,
  onUpdateGameHours,
  onStatusChange,
  onDeleteGame,
  onOpenAddModal,
}) => {
  const [activeTab, setActiveTab] = useState<GameStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'hours' | 'rating' | 'title'>('hours');

  const filteredGames = games
    .filter((g) => activeTab === 'all' || g.status === activeTab)
    .sort((a, b) => {
      if (sortBy === 'hours') return b.hoursPlayed - a.hoursPlayed;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });

  const totalHours = games.reduce((acc, g) => acc + g.hoursPlayed, 0);
  const completedCount = games.filter((g) => g.status === 'completed').length;
  const playingCount = games.filter((g) => g.status === 'playing').length;
  const backlogCount = games.filter((g) => g.status === 'backlog').length;
  const avgRating = Math.round(games.reduce((acc, g) => acc + g.rating, 0) / (games.length || 1));

  const tabs: { id: GameStatus | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Vault Titles', count: games.length },
    { id: 'playing', label: 'Active Play', count: playingCount },
    { id: 'backlog', label: 'Backlog Queue', count: backlogCount },
    { id: 'completed', label: '100% Cleared', count: completedCount },
    { id: 'wishlist', label: 'Wishlist', count: games.filter((g) => g.status === 'wishlist').length },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Vault Summary Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Gamer Collection Master Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personal Vault & Backlog Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Track hours, completion progress, trophy milestones, and launch instantaneous AI tactics for any registered game.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-cyan-950/30 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Game to Vault</span>
          </button>
        </div>

        {/* Aggregate Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase text-slate-400">Total Playtime</div>
            <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
              {totalHours.toLocaleString()}
              <span className="text-xs text-slate-500 font-normal">hrs</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase text-slate-400">Completion Velocity</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {Math.round((completedCount / (games.length || 1)) * 100)}%
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase text-slate-400">Mean Quality Score</div>
            <div className="text-2xl font-black text-amber-400 font-mono flex items-baseline gap-1">
              {avgRating}
              <span className="text-xs text-slate-500 font-normal">/100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase text-slate-400">Active Campaign</div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {playingCount} <span className="text-xs text-slate-500 font-normal">in progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Segmented Tab Controls (zero-pill buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white font-semibold border border-white/[0.1] shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="hours">Hours Played</option>
            <option value="rating">Rating</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Vault Game List Table / Cards */}
      <div className="space-y-3">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            {/* Left: Thumbnail & Core info */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => onSelectGame(game)}>
              <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-white/10 relative">
                <img
                  src={game.coverUrl}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>{game.genre}</span>
                  <span className="text-slate-600">·</span>
                  <span>{game.platforms.join(', ')}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {game.rating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {game.title}
                </h3>

                <div className="text-xs text-slate-400 line-clamp-1 max-w-md">
                  {game.description}
                </div>
              </div>
            </div>

            {/* Right: Playtime Controls, Status, and Actions */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
              
              {/* Playtime logger */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-white/[0.06]">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-mono font-bold text-white">{game.hoursPlayed}h</span>
                <span className="text-xs text-slate-500 font-mono">/ {game.totalEstimatedHours}h</span>
                
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => onUpdateGameHours(game.id, 1)}
                    className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono rounded transition-colors"
                    title="Add 1 hour"
                  >
                    +1h
                  </button>
                  <button
                    onClick={() => onUpdateGameHours(game.id, 5)}
                    className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono rounded transition-colors"
                    title="Add 5 hours"
                  >
                    +5h
                  </button>
                </div>
              </div>

              {/* Status Selector */}
              <select
                value={game.status}
                onChange={(e) => onStatusChange(game.id, e.target.value as GameStatus)}
                className="bg-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-2 border border-white/[0.08] focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="playing">Playing</option>
                <option value="backlog">Backlog</option>
                <option value="completed">Completed</option>
                <option value="wishlist">Wishlist</option>
              </select>

              {/* Launch AI */}
              <button
                onClick={() => onLaunchAI(game)}
                className="flex items-center gap-1.5 px-3 py-2 bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 rounded-xl text-xs font-semibold border border-cyan-700/40 transition-colors"
                title="Open AI High-Thinking tactics for this game"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Tactics</span>
              </button>

              {/* Delete button */}
              <button
                onClick={() => onDeleteGame(game.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-xl transition-colors"
                title="Remove game from vault"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredGames.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/30 border border-white/[0.06]">
            <p className="text-xs text-slate-400">No titles found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};
