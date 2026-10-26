import React, { useState } from 'react';
import { EsportsMatch } from '../types';
import { 
  Trophy, 
  Radio, 
  Tv, 
  Users, 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  Play, 
  Clock, 
  Flame,
  CheckCircle2
} from 'lucide-react';

interface EsportsMatchesScreenProps {
  matches: EsportsMatch[];
  onLaunchAIWithMatch: (match: EsportsMatch) => void;
}

export const EsportsMatchesScreen: React.FC<EsportsMatchesScreenProps> = ({
  matches,
  onLaunchAIWithMatch,
}) => {
  const [filterGame, setFilterGame] = useState<string>('all');
  const [liveMatches, setLiveMatches] = useState<EsportsMatch[]>(matches);

  const gamesList = ['all', 'Valorant', 'Counter-Strike 2', 'League of Legends', 'Dota 2', 'Apex Legends'];

  const filteredMatches = liveMatches.filter(
    (m) => filterGame === 'all' || m.game.toLowerCase() === filterGame.toLowerCase()
  );

  // Simulation feature: simulate point increment for live match
  const handleSimulateRound = (matchId: string) => {
    setLiveMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId && m.status === 'live') {
          const coin = Math.random() > 0.5;
          return {
            ...m,
            teamA: { ...m.teamA, score: coin ? m.teamA.score + 1 : m.teamA.score },
            teamB: { ...m.teamB, score: !coin ? m.teamB.score + 1 : m.teamB.score },
          };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 p-6 sm:p-8 border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Global Esports Intelligence Feeds</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pro Arena Matches & Meta Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Real-time scores, tournament brackets, and AI tactical simulations powered by Gemini 4 Argon with high reasoning.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs px-3.5 py-2 bg-slate-950/80 rounded-xl border border-white/[0.08] self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Live Scraper: </span>
            <span className="text-emerald-400 font-bold">Synched (14ms)</span>
          </div>
        </div>
      </div>

      {/* Game Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {gamesList.map((g) => (
          <button
            key={g}
            onClick={() => setFilterGame(g)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              filterGame === g
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'bg-slate-900/60 text-slate-400 border border-white/[0.06] hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            {g === 'all' ? 'All Pro Circuits' : g}
          </button>
        ))}
      </div>

      {/* Match Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredMatches.map((match) => {
          const isLive = match.status === 'live';
          return (
            <div
              key={match.id}
              className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between gap-4 ${
                isLive
                  ? 'bg-slate-900/80 border-rose-500/40 shadow-lg shadow-rose-950/20'
                  : 'bg-slate-900/50 border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              {/* Match Header */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{match.game}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 truncate max-w-[200px]">{match.tournament}</span>
                </div>

                {isLive ? (
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px] animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>LIVE</span>
                  </div>
                ) : match.status === 'upcoming' ? (
                  <div className="flex items-center gap-1 text-cyan-400 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{match.startTime}</span>
                  </div>
                ) : (
                  <div className="text-slate-500 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Final</span>
                  </div>
                )}
              </div>

              {/* Match Scoreboard */}
              <div className="grid grid-cols-7 items-center gap-2 py-2">
                {/* Team A */}
                <div className="col-span-3 flex items-center gap-3">
                  <span className="text-2xl">{match.teamA.flag}</span>
                  <div>
                    <div className="text-sm font-bold text-white line-clamp-1">{match.teamA.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Win rate: {match.teamA.winRate}</div>
                  </div>
                </div>

                {/* Scores / VS */}
                <div className="col-span-1 text-center font-mono">
                  {isLive || match.status === 'completed' ? (
                    <div className="flex items-center justify-center gap-2 text-xl font-black text-white">
                      <span>{match.teamA.score}</span>
                      <span className="text-slate-600">:</span>
                      <span>{match.teamB.score}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-500">VS</span>
                  )}
                  {match.mapPicked && (
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{match.mapPicked}</div>
                  )}
                </div>

                {/* Team B */}
                <div className="col-span-3 flex items-center justify-end gap-3 text-right">
                  <div>
                    <div className="text-sm font-bold text-white line-clamp-1">{match.teamB.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Win rate: {match.teamB.winRate}</div>
                  </div>
                  <span className="text-2xl">{match.teamB.flag}</span>
                </div>
              </div>

              {/* Footer info & Tactical Predictor */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Tv className="w-3.5 h-3.5 text-slate-500" />
                    {match.streamPlatform}
                  </span>
                  {match.viewerCount && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      {match.viewerCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isLive && (
                    <button
                      onClick={() => handleSimulateRound(match.id)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition-colors"
                      title="Simulate Next Round"
                    >
                      +Sim Round
                    </button>
                  )}

                  <button
                    onClick={() => onLaunchAIWithMatch(match)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 rounded-lg font-semibold border border-cyan-700/40 transition-colors"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI Predict & Retake Strat</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
