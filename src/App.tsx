import React, { useState } from 'react';
import { ScreenId, GameItem, GameStatus, EsportsMatch } from './types';
import { INITIAL_GAMES, INITIAL_MATCHES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { ExploreScreen } from './screens/ExploreScreen';
import { HighThinkingLab } from './screens/HighThinkingLab';
import { VaultScreen } from './screens/VaultScreen';
import { EsportsMatchesScreen } from './screens/EsportsMatchesScreen';
import { RigDiagnosticScreen } from './screens/RigDiagnosticScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { GameDetailModal } from './components/GameDetailModal';
import { AddGameModal } from './components/AddGameModal';
import { BrainCircuit, ShieldCheck, Gamepad2, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('explore');
  const [games, setGames] = useState<GameItem[]>(INITIAL_GAMES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Active selections
  const [selectedGameForModal, setSelectedGameForModal] = useState<GameItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
  // AI lab active target game & prompt
  const [aiTargetGame, setAiTargetGame] = useState<GameItem | null>(null);
  const [aiCustomPrompt, setAiCustomPrompt] = useState<string | undefined>(undefined);

  // Search filter
  const displayedGames = searchQuery.trim()
    ? games.filter((g) =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : games;

  // Handlers
  const handleLaunchAI = (game: GameItem, initialPrompt?: string) => {
    setAiTargetGame(game);
    setAiCustomPrompt(
      initialPrompt ||
        `Provide an exhaustive high-thinking tactical breakdown for ${game.title}. Focus on: ${game.tacticalFocus}. Give exact mathematical stat thresholds, optimal rotations, and common failure points.`
    );
    setCurrentScreen('ai-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchAIWithMatch = (match: EsportsMatch) => {
    setAiTargetGame(null);
    setAiCustomPrompt(
      `Analyze the competitive matchup between ${match.teamA.name} (${match.teamA.winRate} win rate) and ${match.teamB.name} (${match.teamB.winRate} win rate) in ${match.tournament} for ${match.game}. Map: ${match.mapPicked || 'Decider Map'}. Provide high-thinking counter-strategies, key player tendencies to neutralize, and post-plant utility sequencing.`
    );
    setCurrentScreen('ai-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchAIWithRig = (rigSummary: string) => {
    setAiTargetGame(null);
    setAiCustomPrompt(
      `Analyze hardware performance, thermal efficiency, and bottleneck thresholds for this battlestation configuration: ${rigSummary}. Provide targeted game setting tweaks, DLSS/FSR frame-gen configurations, and memory timing recommendations for zero 1% low stutter.`
    );
    setCurrentScreen('ai-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = (gameId: string, status: GameStatus) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, status } : g))
    );
  };

  const handleUpdateGameHours = (gameId: string, delta: number) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === gameId ? { ...g, hoursPlayed: Math.max(0, g.hoursPlayed + delta) } : g
      )
    );
  };

  const handleDeleteGame = (gameId: string) => {
    setGames((prev) => prev.filter((g) => g.id !== gameId));
  };

  const handleAddGame = (newGame: GameItem) => {
    setGames((prev) => [newGame, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* Primary Navigation Bar */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenQuickAI={() => {
          setAiTargetGame(games[0]);
          setCurrentScreen('ai-lab');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentScreen === 'explore' && (
          <ExploreScreen
            games={displayedGames}
            onSelectGame={setSelectedGameForModal}
            onLaunchAI={handleLaunchAI}
            onStatusChange={handleStatusChange}
          />
        )}

        {currentScreen === 'ai-lab' && (
          <HighThinkingLab
            games={games}
            activeGame={aiTargetGame}
            initialPrompt={aiCustomPrompt}
            onClearActiveGame={() => {
              setAiTargetGame(null);
              setAiCustomPrompt(undefined);
            }}
          />
        )}

        {currentScreen === 'vault' && (
          <VaultScreen
            games={displayedGames}
            onSelectGame={setSelectedGameForModal}
            onLaunchAI={handleLaunchAI}
            onUpdateGameHours={handleUpdateGameHours}
            onStatusChange={handleStatusChange}
            onDeleteGame={handleDeleteGame}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {currentScreen === 'matches' && (
          <EsportsMatchesScreen
            matches={INITIAL_MATCHES}
            onLaunchAIWithMatch={handleLaunchAIWithMatch}
          />
        )}

        {currentScreen === 'rig' && (
          <RigDiagnosticScreen
            onLaunchAIWithRig={handleLaunchAIWithRig}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            games={games}
            onSelectGame={setSelectedGameForModal}
            onLaunchAI={handleLaunchAI}
          />
        )}
      </main>

      {/* Modals */}
      <GameDetailModal
        game={selectedGameForModal}
        onClose={() => setSelectedGameForModal(null)}
        onLaunchAI={handleLaunchAI}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      {/* Global Sleek Footer */}
      <footer className="border-t border-white/[0.08] bg-[#07090E] py-8 text-xs text-slate-500 font-mono mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white tracking-wider">NEXUS // GAMER COLL</span>
            <span className="text-slate-600">·</span>
            <span>Gemini 4 Argon Thinking Engine (ThinkingLevel.HIGH)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentScreen('ai-lab')}>Tactical AI</span>
            <span className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentScreen('vault')}>Vault Ledger</span>
            <span className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentScreen('matches')}>Live Esports</span>
            <span className="hover:text-cyan-400 cursor-pointer" onClick={() => setCurrentScreen('rig')}>Rig Diagnostic</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
