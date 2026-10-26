export type ScreenId = 'explore' | 'vault' | 'ai-lab' | 'matches' | 'rig' | 'profile';

export type GameStatus = 'playing' | 'backlog' | 'completed' | 'wishlist';

export interface GameItem {
  id: string;
  title: string;
  subtitle?: string;
  genre: string;
  platforms: ('PC' | 'PS5' | 'Xbox' | 'Switch' | 'VR')[];
  rating: number; // 0 - 100
  releaseYear: number;
  developer: string;
  publisher: string;
  status: GameStatus;
  hoursPlayed: number;
  totalEstimatedHours: number;
  coverUrl: string;
  bannerUrl: string;
  description: string;
  tacticalFocus: string; // Brief AI focus tip
  tags: string[];
  achievements: {
    unlocked: number;
    total: number;
  };
  metacritic: number;
  userScore: number;
  specs: {
    recommendedGpu: string;
    recommendedCpu: string;
    storage: string;
  };
}

export interface EsportsMatch {
  id: string;
  game: string;
  tournament: string;
  status: 'live' | 'upcoming' | 'completed';
  startTime: string;
  round: string;
  teamA: {
    name: string;
    tag: string;
    score: number;
    winRate: string;
    flag: string;
  };
  teamB: {
    name: string;
    tag: string;
    score: number;
    winRate: string;
    flag: string;
  };
  streamPlatform: string;
  viewerCount?: string;
  mapPicked?: string;
}

export interface HardwarePart {
  id: string;
  category: 'GPU' | 'CPU' | 'RAM' | 'Storage' | 'PSU';
  name: string;
  brand: string;
  wattage: number;
  tierScore: number;
  priceEstimate: number;
  specSummary: string;
}

export interface AIThinkingHistoryItem {
  id: string;
  query: string;
  gameTitle: string;
  scenarioType: string;
  difficulty: string;
  model: string;
  thinkingLevel: string;
  response: string;
  timestamp: string;
  durationMs?: number;
}
