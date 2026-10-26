import React, { useState, useEffect } from 'react';
import { GameItem, AIThinkingHistoryItem } from '../types';
import { PRESET_THINKING_PROMPTS, INITIAL_PRESET_HISTORY } from '../data/mockData';
import { 
  BrainCircuit, 
  Sparkles, 
  Send, 
  RotateCcw, 
  Copy, 
  Check, 
  Clock, 
  Cpu, 
  Flame, 
  History, 
  AlertCircle,
  FileText,
  Sliders,
  ChevronDown
} from 'lucide-react';

interface HighThinkingLabProps {
  games: GameItem[];
  activeGame?: GameItem | null;
  initialPrompt?: string;
  onClearActiveGame?: () => void;
}

export const HighThinkingLab: React.FC<HighThinkingLabProps> = ({
  games,
  activeGame,
  initialPrompt,
  onClearActiveGame,
}) => {
  const [selectedGameTitle, setSelectedGameTitle] = useState<string>(
    activeGame ? activeGame.title : games[0]?.title || 'Elden Ring: Shadow of the Erdtree'
  );
  const [scenarioType, setScenarioType] = useState<string>('Boss Raid & Stat Scaling');
  const [difficulty, setDifficulty] = useState<string>('Level 125 Meta PvP/PvE');
  const [rigSpecs, setRigSpecs] = useState<string>('RTX 4080 Super / Ryzen 7 7800X3D / 32GB RAM');
  const [prompt, setPrompt] = useState<string>(
    initialPrompt || PRESET_THINKING_PROMPTS[0].prompt
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [currentResult, setCurrentResult] = useState<AIThinkingHistoryItem | null>(
    INITIAL_PRESET_HISTORY[0]
  );
  const [history, setHistory] = useState<AIThinkingHistoryItem[]>(INITIAL_PRESET_HISTORY);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If activeGame prop changes from external screen selection
  useEffect(() => {
    if (activeGame) {
      setSelectedGameTitle(activeGame.title);
      if (initialPrompt) {
        setPrompt(initialPrompt);
      } else {
        setPrompt(`Provide an exhaustive high-thinking tactical breakdown for ${activeGame.title}. Focus on: ${activeGame.tacticalFocus}. Give exact mathematical stat thresholds, optimal rotations, and common failure points.`);
      }
    }
  }, [activeGame, initialPrompt]);

  // Animated reasoning progression steps during thinking mode
  useEffect(() => {
    let timer: any;
    if (isLoading) {
      setLoadingStep(0);
      const stepsInterval = [1200, 2400, 3800, 5200];
      stepsInterval.forEach((delay, idx) => {
        setTimeout(() => {
          if (isLoading) setLoadingStep(idx + 1);
        }, delay);
      });
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const thinkingSteps = [
    'Parsing query topology & competitive game mechanics...',
    'Consulting Gemini 4 Argon deep reasoning graph (ThinkingLevel.HIGH)...',
    'Simulating stat scaling curves, frame advantages & hitboxes...',
    'Synthesizing quantitative trade-off matrix & playbook...',
    'Finalizing authoritative execution guidelines...',
  ];

  const handleRunThinking = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setErrorMsg(null);
    const startTime = Date.now();

    try {
      const res = await fetch('/api/gemini/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          gameTitle: selectedGameTitle,
          scenarioType,
          difficulty,
          rigSpecs,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'High thinking request failed.');
      }

      const duration = Date.now() - startTime;
      const newHistoryItem: AIThinkingHistoryItem = {
        id: `hist-${Date.now()}`,
        query: prompt,
        gameTitle: selectedGameTitle,
        scenarioType,
        difficulty,
        model: `${data.model} (ThinkingLevel.HIGH)`,
        thinkingLevel: 'HIGH',
        response: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationMs: duration,
      };

      setCurrentResult(newHistoryItem);
      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (err: any) {
      console.error('High thinking error:', err);
      setErrorMsg(err.message || 'Unable to connect to thinking server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_THINKING_PROMPTS[0]) => {
    setSelectedGameTitle(preset.game);
    setScenarioType(preset.scenario);
    setDifficulty(preset.difficulty);
    setPrompt(preset.prompt);
  };

  const handleCopy = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(currentResult.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner / Thinking Engine Specs */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Deep Reasoning Engine Activated</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Model: gemini-4-argon</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">ThinkingLevel.HIGH</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Tactical Brain & Deep Strategy Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Designed for mathematically complex gaming queries: stat scaling softcaps, raid phase scripts, frame data optimization, and competitive game theory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 bg-slate-950/70 rounded-xl border border-white/[0.08] text-xs font-mono">
              <span className="text-slate-400">Mode: </span>
              <span className="text-cyan-400 font-bold">High Thinking</span>
            </div>
            <div className="px-3.5 py-2 bg-slate-950/70 rounded-xl border border-white/[0.08] text-xs font-mono">
              <span className="text-slate-400">MaxOutputTokens: </span>
              <span className="text-emerald-400 font-bold">Uncapped</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Scenarios Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Preset Complex Queries (Test High Thinking)
          </span>
          <span className="text-[11px] text-slate-500">1-Click load complex scenarios</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_THINKING_PROMPTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/[0.06] hover:border-cyan-500/40 transition-all group"
            >
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 line-clamp-1">
                {preset.title}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                <span>{preset.game.split(':')[0]}</span>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400/80">{preset.difficulty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls vs Reasoning Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Query Configurator (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/70 rounded-2xl p-5 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Query Parameters & Tactical Context
              </h2>
              {activeGame && onClearActiveGame && (
                <button
                  onClick={onClearActiveGame}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Clear target game
                </button>
              )}
            </div>

            {/* Target Game Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Game Title
              </label>
              <select
                value={selectedGameTitle}
                onChange={(e) => setSelectedGameTitle(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/70 transition-colors"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.title}>
                    {g.title} ({g.genre.split('/')[0]})
                  </option>
                ))}
                <option value="Custom Gaming Title">Other / Custom Title</option>
              </select>
            </div>

            {/* Scenario Type */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Scenario Domain
                </label>
                <select
                  value={scenarioType}
                  onChange={(e) => setScenarioType(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/70"
                >
                  <option value="Boss Raid & Stat Scaling">Boss Raid & Stat Scaling</option>
                  <option value="Competitive Meta & Frame Data">Competitive Meta & Frames</option>
                  <option value="Build Min-Maxing & Synergy">Build Min-Maxing</option>
                  <option value="Speedrun Route Calculus">Speedrun Route Calculus</option>
                  <option value="Hardware Bottleneck & Settings">Hardware Optimization</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tier / Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/70"
                >
                  <option value="Master / Radiant Tier">Radiant / Master Tier</option>
                  <option value="Single Save Honor Mode">Honor Mode (Permadeath)</option>
                  <option value="Level 125 Meta PvP/PvE">RL 125 Meta Bracket</option>
                  <option value="Very Hard / Nightmare">Nightmare / Very Hard</option>
                  <option value="Casual / Exploration">Standard Campaign</option>
                </select>
              </div>
            </div>

            {/* Rig / Platform Specs Context */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Player Hardware Specs (Optional)</span>
                <span className="text-[10px] text-slate-500 font-mono">For latency & FPS context</span>
              </label>
              <input
                type="text"
                value={rigSpecs}
                onChange={(e) => setRigSpecs(e.target.value)}
                placeholder="e.g. RTX 4080 Super / Ryzen 7 7800X3D"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70"
              />
            </div>

            {/* Prompt Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Strategic Query / Dilemma
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                placeholder="Ask for exact frame data, damage formulas, weapon scaling trade-offs, or raid execution protocols..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 leading-relaxed font-mono"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl flex items-start gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleRunThinking}
              disabled={isLoading || !prompt.trim()}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                isLoading
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-white/10'
                  : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white shadow-cyan-900/30 active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <BrainCircuit className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>Deep Reasoning in Progress...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Execute High-Thinking Analysis (Argon)</span>
                </>
              )}
            </button>
          </div>

          {/* Reasoning History in Session */}
          {history.length > 0 && (
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/[0.06] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Lab Reasoning Archive ({history.length})</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setCurrentResult(item)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      currentResult?.id === item.id
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                        : 'bg-slate-950/60 border-white/[0.04] text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="font-semibold line-clamp-1">{item.query}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>{item.gameTitle.split(':')[0]}</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Reasoning Output & Live Visualizer (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/70 rounded-2xl border border-white/[0.08] min-h-[580px] flex flex-col overflow-hidden shadow-xl">
            
            {/* Header bar */}
            <div className="p-4 bg-slate-950/80 border-b border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Tactical Synthesis Output
                </span>
                {currentResult && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                    {currentResult.model}
                  </span>
                )}
              </div>

              {currentResult && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-white/[0.06] transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 overflow-y-auto">
              
              {/* If Loading: Multi-stage thinking visualizer */}
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center p-8 space-y-6 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/50">
                      <BrainCircuit className="w-10 h-10 text-cyan-400 animate-pulse" />
                    </div>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur-md animate-pulse" />
                  </div>

                  <div className="max-w-md space-y-2">
                    <div className="text-sm font-bold text-white">
                      Gemini 4 Argon Thinking Engine Active
                    </div>
                    <div className="text-xs text-cyan-300 font-mono transition-all duration-300">
                      {thinkingSteps[loadingStep] || 'Synthesizing tactical breakdown...'}
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-white/10 mt-3">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full transition-all duration-700" 
                        style={{ width: `${Math.min(100, (loadingStep + 1) * 22)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 max-w-sm">
                    ThinkingLevel.HIGH computes deep branch evaluations to formulate verified optimal playbooks.
                  </p>
                </div>
              ) : currentResult ? (
                <div className="space-y-6">
                  {/* Query Dossier Header */}
                  <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/[0.04] text-xs font-mono space-y-1">
                    <div className="text-slate-400 flex items-center gap-2">
                      <span className="text-cyan-400 font-semibold">TARGET:</span>
                      <span>{currentResult.gameTitle}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-amber-400">{currentResult.scenarioType}</span>
                    </div>
                    <div className="text-slate-300 italic pt-1">
                      "{currentResult.query}"
                    </div>
                  </div>

                  {/* Rendered Markdown Response */}
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 font-sans whitespace-pre-wrap">
                    {currentResult.response}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
                  <BrainCircuit className="w-12 h-12 text-slate-700" />
                  <p className="text-xs">Select a preset or input your gaming dilemma on the left to activate high-thinking mode.</p>
                </div>
              )}

            </div>

            {/* Footer metrics */}
            {currentResult && !isLoading && (
              <div className="p-3 bg-slate-950/90 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono px-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Latency: {currentResult.durationMs ? `${(currentResult.durationMs / 1000).toFixed(2)}s` : '3.8s'}</span>
                </div>
                <div>
                  Thinking Mode: <span className="text-cyan-400 font-semibold">HIGH</span> · Tokens: <span className="text-emerald-400">Adaptive</span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
