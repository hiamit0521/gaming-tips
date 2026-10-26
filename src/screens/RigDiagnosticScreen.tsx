import React, { useState } from 'react';
import { HardwarePart } from '../types';
import { INITIAL_RIG_PARTS } from '../data/mockData';
import { 
  Cpu, 
  Zap, 
  Gauge, 
  ShieldCheck, 
  Sparkles, 
  BrainCircuit, 
  Monitor, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface RigDiagnosticScreenProps {
  onLaunchAIWithRig: (rigSummary: string) => void;
}

export const RigDiagnosticScreen: React.FC<RigDiagnosticScreenProps> = ({
  onLaunchAIWithRig,
}) => {
  const gpus = INITIAL_RIG_PARTS.filter((p) => p.category === 'GPU');
  const cpus = INITIAL_RIG_PARTS.filter((p) => p.category === 'CPU');
  const rams = INITIAL_RIG_PARTS.filter((p) => p.category === 'RAM');
  const psus = INITIAL_RIG_PARTS.filter((p) => p.category === 'PSU');

  const [selectedGpu, setSelectedGpu] = useState<HardwarePart>(gpus[0]);
  const [selectedCpu, setSelectedCpu] = useState<HardwarePart>(cpus[0]);
  const [selectedRam, setSelectedRam] = useState<HardwarePart>(rams[0]);
  const [selectedPsu, setSelectedPsu] = useState<HardwarePart>(psus[0]);

  // Calculations
  const systemWattage = selectedGpu.wattage + selectedCpu.wattage + selectedRam.wattage + 65; // 65W for mobo/fans/pump
  const psuCapacity = selectedPsu.wattage;
  const headroomPercentage = Math.round(((psuCapacity - systemWattage) / psuCapacity) * 100);
  const isPsuSafe = headroomPercentage >= 20;

  // Performance simulation metrics
  const combinedTier = (selectedGpu.tierScore * 0.7) + (selectedCpu.tierScore * 0.3);
  
  const fps1080p = Math.round(combinedTier * 3.4);
  const fps1440p = Math.round(combinedTier * 2.1);
  const fps4k = Math.round(combinedTier * 1.15);

  const rigSummary = `${selectedGpu.name} + ${selectedCpu.name} + ${selectedRam.name} with ${selectedPsu.name} (Estimated Peak: ${systemWattage}W)`;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 p-6 sm:p-8 border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Hardware Architecture & Telemetry Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Battlestation Rig & Benchmark Diagnostic
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Simulate framerates, analyze power supply headroom, calculate bottlenecks, and generate AI overclocking guides.
            </p>
          </div>

          <button
            onClick={() => onLaunchAIWithRig(rigSummary)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-950/30 transition-all self-start sm:self-auto"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Rig Optimization Guide</span>
          </button>
        </div>
      </div>

      {/* Interactive Rig Configurator vs Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Hardware Selector Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Active Hardware Component Selection
            </h2>

            {/* GPU Picker */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Graphics Processing Unit (GPU)
              </label>
              <div className="space-y-2">
                {gpus.map((gpu) => (
                  <button
                    key={gpu.id}
                    onClick={() => setSelectedGpu(gpu)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-4 ${
                      selectedGpu.id === gpu.id
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-sm'
                        : 'bg-slate-950/60 border-white/[0.04] text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{gpu.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{gpu.specSummary}</div>
                    </div>
                    <div className="text-right shrink-0 font-mono text-xs">
                      <div className="text-cyan-400 font-bold">{gpu.wattage}W TDP</div>
                      <div className="text-[10px] text-slate-500">Tier: {gpu.tierScore}/100</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CPU Picker */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Central Processor (CPU)
              </label>
              <div className="space-y-2">
                {cpus.map((cpu) => (
                  <button
                    key={cpu.id}
                    onClick={() => setSelectedCpu(cpu)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-4 ${
                      selectedCpu.id === cpu.id
                        ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-sm'
                        : 'bg-slate-950/60 border-white/[0.04] text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{cpu.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{cpu.specSummary}</div>
                    </div>
                    <div className="text-right shrink-0 font-mono text-xs">
                      <div className="text-indigo-400 font-bold">{cpu.wattage}W</div>
                      <div className="text-[10px] text-slate-500">Tier: {cpu.tierScore}/100</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RAM & PSU Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  System Memory (RAM)
                </label>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.04] text-xs">
                  <div className="font-bold text-white">{selectedRam.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{selectedRam.specSummary}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Power Supply (PSU)
                </label>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.04] text-xs">
                  <div className="font-bold text-white">{selectedPsu.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{selectedPsu.wattage}W Continuous Rated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry & Benchmarks (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Power Draw & Headroom Card */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Power Telemetry & Thermal Load
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isPsuSafe ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {isPsuSafe ? 'OPTIMAL HEADROOM' : 'WARNING: HIGH LOAD'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Total Peak System Draw:</span>
                <span className="text-xl font-mono font-black text-white">{systemWattage}W</span>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">PSU Rated Capacity:</span>
                <span className="text-sm font-mono font-semibold text-slate-300">{psuCapacity}W</span>
              </div>

              {/* Headroom Gauge Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Capacity Utilization</span>
                  <span className="text-cyan-400 font-bold">{Math.round((systemWattage / psuCapacity) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isPsuSafe ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-gradient-to-r from-amber-400 to-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((systemWattage / psuCapacity) * 100))}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono text-right">
                  {headroomPercentage}% Safety Margin Buffer
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Resolution FPS Benchmarks */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/[0.08] space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Simulated Frametime & FPS Targets
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Ultra Preset</span>
            </div>

            <div className="space-y-4">
              {/* 1080p */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">1080p Competitive E-Sports</div>
                  <div className="text-[11px] text-slate-400">Valorant / CS2 / Apex Legends</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-black text-cyan-400">{fps1080p}+ FPS</div>
                  <div className="text-[10px] text-slate-500">frametime &lt; 2.8ms</div>
                </div>
              </div>

              {/* 1440p */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">1440p QHD Ultra Settings</div>
                  <div className="text-[11px] text-slate-400">Cyberpunk 2077 / Elden Ring</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-black text-emerald-400">{fps1440p} FPS</div>
                  <div className="text-[10px] text-slate-500">frametime ~ 4.9ms</div>
                </div>
              </div>

              {/* 4K */}
              <div className="p-3 bg-slate-950/70 rounded-xl border border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">4K UHD Ray Tracing Overdrive</div>
                  <div className="text-[11px] text-slate-400">Black Myth Wukong / Starfield</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-lg font-black text-amber-400">{fps4k} FPS</div>
                  <div className="text-[10px] text-slate-500">DLSS 3.5 / FSR Enabled</div>
                </div>
              </div>
            </div>

            {/* Quick AI Trigger */}
            <button
              onClick={() => onLaunchAIWithRig(rigSummary)}
              className="w-full py-2.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 font-semibold rounded-xl text-xs border border-cyan-800/40 flex items-center justify-center gap-2 transition-colors"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Gemini 4 Argon for Custom Settings & Overclock Curve</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
