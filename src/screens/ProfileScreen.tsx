import React from 'react';
import { GameItem } from '../types';
import { 
  User, 
  Trophy, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Gamepad2, 
  BrainCircuit, 
  Award, 
  Star, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ProfileScreenProps {
  games: GameItem[];
  onSelectGame: (game: GameItem) => void;
  onLaunchAI: (game: GameItem) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  games,
  onSelectGame,
  onLaunchAI,
}) => {
  const totalHours = games.reduce((acc, g) => acc + g.hoursPlayed, 0);
  const totalTrophies = games.reduce((acc, g) => acc + g.achievements.unlocked, 0);
  const completedGames = games.filter((g) => g.status === 'completed');

  const badges = [
    { title: 'Erdtree Ascendant', game: 'Elden Ring', desc: 'Defeated Messmer & Radahn solo without summons', color: 'from-amber-500 to-yellow-600' },
    { title: 'Dogtown Specter', game: 'Cyberpunk 2077', desc: '100% Phantom Liberty espionage endings cleared', color: 'from-cyan-500 to-blue-600' },
    { title: 'Honor Mode Survivor', game: "Baldur's Gate 3", desc: 'Single save Honor Mode completed without dying', color: 'from-purple-500 to-indigo-600' },
    { title: 'Radiant Strategist', game: 'Valorant', desc: 'Top 500 tactical retake utility efficiency rate', color: 'from-rose-500 to-red-600' },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Profile Hero Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 border border-white/[0.08] shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar and Handle */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-950/50 bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=256&q=80"
                  alt="gamercoll avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 text-[10px] font-mono font-black shadow">
                LVL 78
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">gamercoll999</h1>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50 text-[10px] font-mono font-semibold">
                  PRO PRESTIGE
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                gamercoll999@gmail.com · Member since 2021
              </div>
              <div className="text-xs text-slate-300 italic pt-0.5">
                "Min-maxing every damage frame and theorycrafting high-level raid strategies."
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-white/[0.06] self-start sm:self-auto font-mono">
            <div className="text-center px-2">
              <div className="text-xl font-bold text-white">{totalHours.toLocaleString()}h</div>
              <div className="text-[10px] uppercase text-slate-400">Playtime</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center px-2">
              <div className="text-xl font-bold text-amber-400">{totalTrophies}</div>
              <div className="text-[10px] uppercase text-slate-400">Trophies</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center px-2">
              <div className="text-xl font-bold text-emerald-400">{completedGames.length}</div>
              <div className="text-[10px] uppercase text-slate-400">100% Cleared</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gamer DNA & Trophy Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Badges & Gamer DNA (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Prestige Badges Cabinet */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Featured Prestige Badges & Feats
              </h2>
              <span className="text-xs text-slate-500 font-mono">4 of 24 Unlocked</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-950/60 rounded-xl border border-white/[0.04] space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${b.color}`} />
                    <span className="text-xs font-bold text-white">{b.title}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono">{b.game}</div>
                  <div className="text-[11px] text-slate-400 leading-snug">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamer DNA Breakdown */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                Gamer DNA & Genre Affinity
              </h2>
              <span className="text-xs text-slate-500 font-mono">Calculated across 1,515 hrs</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Action RPG & Souls-like</span>
                  <span className="text-cyan-400 font-bold">38% (575 hrs)</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full" style={{ width: '38%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Tactical Shooters & Esports</span>
                  <span className="text-rose-400 font-bold">30% (454 hrs)</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full" style={{ width: '30%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Tactical CRPG & Turn-Based</span>
                  <span className="text-indigo-400 font-bold">22% (333 hrs)</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Racing & High Performance Sim</span>
                  <span className="text-amber-400 font-bold">10% (153 hrs)</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 100% Cleared Titles & Rig Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Hall of Fame / Completed titles */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" />
                100% Platinum Completed
              </h2>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {completedGames.length} Titles
              </span>
            </div>

            <div className="space-y-3">
              {completedGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => onSelectGame(game)}
                  className="p-3 bg-slate-950/60 hover:bg-slate-800/60 rounded-xl border border-white/[0.04] flex items-center gap-3 cursor-pointer group transition-colors"
                >
                  <img
                    src={game.coverUrl}
                    alt={game.title}
                    className="w-12 h-14 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                      {game.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {game.hoursPlayed}h logged · {game.achievements.unlocked}/{game.achievements.total} Trophies
                    </div>
                  </div>
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Verified Battlestation Rig */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-3 font-mono text-xs">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/[0.06] font-sans">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Verified Battlestation Rig
            </h2>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">GPU:</span>
                <span className="text-white font-semibold">RTX 4090 24GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CPU:</span>
                <span className="text-white font-semibold">Ryzen 7 7800X3D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">RAM:</span>
                <span className="text-white font-semibold">64GB DDR5-6000 CL30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Storage:</span>
                <span className="text-white font-semibold">4TB Samsung 990 Pro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Display:</span>
                <span className="text-white font-semibold">4K 144Hz OLED + 360Hz 1080p</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
