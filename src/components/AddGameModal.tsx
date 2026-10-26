import React, { useState } from 'react';
import { GameItem, GameStatus } from '../types';
import { X, Plus, Image as ImageIcon, Sparkles } from 'lucide-react';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (newGame: GameItem) => void;
}

export const AddGameModal: React.FC<AddGameModalProps> = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Action RPG');
  const [platformStr, setPlatformStr] = useState('PC, PS5');
  const [status, setStatus] = useState<GameStatus>('backlog');
  const [hoursPlayed, setHoursPlayed] = useState(0);
  const [totalHours, setTotalHours] = useState(60);
  const [rating, setRating] = useState(90);
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');
  const [tacticalFocus, setTacticalFocus] = useState('');

  const sampleImages = [
    { label: 'Cyberpunk Neon', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dark Souls Ruins', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
    { label: 'Sci-Fi Cosmos', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
    { label: 'Esports Arena', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80' },
    { label: 'High Fantasy Realm', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const platforms = platformStr
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean) as ('PC' | 'PS5' | 'Xbox' | 'Switch' | 'VR')[];

    const newGame: GameItem = {
      id: `game-${Date.now()}`,
      title: title.trim(),
      subtitle: 'Registered in Personal Vault',
      genre,
      platforms: platforms.length > 0 ? platforms : ['PC'],
      rating: Number(rating) || 88,
      releaseYear: 2024,
      developer: 'Independent / Studio',
      publisher: 'Vault Catalog',
      status,
      hoursPlayed: Number(hoursPlayed) || 0,
      totalEstimatedHours: Number(totalHours) || 60,
      coverUrl: coverUrl.trim() || sampleImages[0].url,
      bannerUrl: coverUrl.trim() || sampleImages[0].url,
      description: description.trim() || 'A high-priority campaign awaiting strategic playthrough in the vault.',
      tacticalFocus: tacticalFocus.trim() || 'Consult Gemini 4 Argon for optimal early-game skill allocation.',
      tags: ['Custom Vault Entry', genre],
      achievements: { unlocked: 0, total: 30 },
      metacritic: Number(rating) || 88,
      userScore: Number(rating) || 88,
      specs: {
        recommendedGpu: 'RTX 4070 / RX 7800 XT',
        recommendedCpu: 'Core i7 / Ryzen 7',
        storage: '80 GB SSD',
      },
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0F131C] rounded-3xl border border-white/10 shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Add Game to Gamer Vault</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Game Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Armored Core VI: Fires of Rubicon"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500/70"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Genre</label>
              <input
                type="text"
                placeholder="e.g. Mech Action / Sci-Fi"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500/70"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Platforms (comma separated)</label>
              <input
                type="text"
                placeholder="PC, PS5, Xbox"
                value={platformStr}
                onChange={(e) => setPlatformStr(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as GameStatus)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500/70"
              >
                <option value="backlog">Backlog</option>
                <option value="playing">Playing</option>
                <option value="completed">Completed</option>
                <option value="wishlist">Wishlist</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Hours Played</label>
              <input
                type="number"
                min="0"
                value={hoursPlayed}
                onChange={(e) => setHoursPlayed(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500/70"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Quality Rating (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500/70"
              />
            </div>
          </div>

          {/* Hotlinked Cover Image URL */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
              <span>Cover Art Image URL (Hotlinked)</span>
              <span className="text-[10px] text-cyan-400 font-mono">Unsplash / CDN URLs supported</span>
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500/70"
            />
            {/* Quick hotlink preset picker */}
            <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
              <span className="text-[10px] text-slate-500 shrink-0 font-mono">Presets:</span>
              {sampleImages.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverUrl(s.url)}
                  className="px-2 py-1 rounded-md bg-slate-800 text-[10px] text-slate-300 hover:text-white shrink-0 border border-white/[0.04]"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Brief Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Synopsis of the campaign or gameplay loop..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/70"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Tactical AI Focus Tip</label>
            <input
              type="text"
              value={tacticalFocus}
              onChange={(e) => setTacticalFocus(e.target.value)}
              placeholder="e.g. Reverse-joint leg assembly for aerial missile evasion."
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500/70"
            />
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md shadow-cyan-900/30"
            >
              Register in Vault
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
