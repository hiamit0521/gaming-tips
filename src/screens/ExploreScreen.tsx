import React, { useState } from 'react';
import { GameItem } from '../types';
import { GameCard } from '../components/GameCard';
import { 
  Sparkles, 
  BrainCircuit, 
  Flame, 
  Gamepad2, 
  Trophy, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ExploreScreenProps {
  games: GameItem[];
  onSelectGame: (game: GameItem) => void;
  onLaunchAI: (game: GameItem, initialPrompt?: string) => void;
  onStatusChange: (gameId: string, status: GameItem['status']) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  games,
  onSelectGame,
  onLaunchAI,
  onStatusChange,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [heroIndex, setHeroIndex] = useState<number>(0);

  const heroGames = games.slice(0, 3);
  const featured = heroGames[heroIndex] || games[0];

  const genres = [
    { id: 'all', label: 'All Titles' },
    { id: 'Action RPG', label: 'Action RPG' },
    { id: 'Tactical CRPG', label: 'Tactical CRPG' },
    { id: 'Tactical Hero Shooter', label: 'Tactical FPS' },
    { id: 'Sci-Fi RPG / Action', label: 'Cyberpunk & Sci-Fi' },
    { id: 'Open World Racing / Simcade', label: 'Racing & Sim' },
  ];

  const platforms = ['all', 'PC', 'PS5', 'Xbox'];

  const filteredGames = games.filter((game) => {
    const matchesGenre = selectedGenre === 'all' || game.genre.includes(selectedGenre);
    const matchesPlatform = selectedPlatform === 'all' || game.platforms.includes(selectedPlatform as any);
    return matchesGenre && matchesPlatform;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Cinematic Hero Showcase */}
      {featured && (
        <section className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-2xl">
          <div className="absolute inset-0">
            <img
              src={featured.bannerUrl}
              alt={featured.title}
              className="w-full h-full object-cover object-top filter brightness-60 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-black/40" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
            {/* Meta indicator */}
            <div className="flex items-center gap-3 text-xs text-slate-300 mb-4 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider uppercase">
                <Flame className="w-4 h-4 text-cyan-400" />
                Featured Intelligence Spotlight
              </span>
              <span className="text-slate-500">·</span>
              <span>Metacritic {featured.metacritic}</span>
              <span className="text-slate-500">·</span>
              <span>{featured.releaseYear}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
              {featured.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
              {featured.description}
            </p>

            {/* Tactical intelligence highlight */}
            <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 max-w-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
                <BrainCircuit className="w-4 h-4" />
                High-Thinking Tactical Directive
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                "{featured.tacticalFocus}"
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onLaunchAI(featured)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-950/40 transition-all active:scale-[0.98]"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Launch High-Thinking AI Tactics</span>
              </button>

              <button
                onClick={() => onSelectGame(featured)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium rounded-xl text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-colors"
              >
                <span>Full Game Dossier</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Slide indicators */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-4">
                {heroGames.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      heroIndex === i ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Show featured title ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform Live Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Thinking Engine</div>
            <div className="text-sm font-bold text-white">Gemini 4 Argon (High)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Curated Database</div>
            <div className="text-sm font-bold text-white">{games.length} Masterpiece Titles</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Esports Trackers</div>
            <div className="text-sm font-bold text-white">2 Live Grand Finals</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-violet-950/60 text-violet-400 border border-violet-800/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Rig Benchmark</div>
            <div className="text-sm font-bold text-white">Ultra 4K Ready (120+ FPS)</div>
          </div>
        </div>
      </section>

      {/* Interactive Filters & Library Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Titles & Tactical Archives
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Select any game to unlock frame data, min-max calculus, and deep build guides.
            </div>
          </div>

          {/* Platform Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-white/[0.06] self-start sm:self-auto">
            {platforms.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedPlatform === plat
                    ? 'bg-slate-800 text-white font-semibold border border-white/[0.08] shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {plat === 'all' ? 'All Platforms' : plat}
              </button>
            ))}
          </div>
        </div>

        {/* Genre Filter Segmented Control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedGenre === genre.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border border-white/[0.06] hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        {/* Game Cards Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onSelect={onSelectGame}
                onAnalyze={onLaunchAI}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/[0.06]">
            <Gamepad2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No games matched this filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the genre or platform filter.</p>
            <button
              onClick={() => { setSelectedGenre('all'); setSelectedPlatform('all'); }}
              className="mt-4 px-4 py-2 bg-slate-800 text-xs font-medium text-slate-200 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* AI Intelligence Lab Callout Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-indigo-950/60 p-6 sm:p-8 border border-cyan-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Layer Cognitive Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Have an impossible boss, complex build question, or raid dilemma?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Gemini 4 Argon with High Thinking processes full mathematical formulas, frame-delay cancel windows, and counter-play theories with high-depth reasoning.
            </p>
          </div>
          <button
            onClick={() => onLaunchAI(games[0])}
            className="flex items-center gap-2 px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shrink-0 transition-colors shadow-lg shadow-cyan-900/30"
          >
            <span>Open AI Tactical Brain</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
