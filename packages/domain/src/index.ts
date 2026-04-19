export type ViewingStatus = "watching" | "paused" | "completed" | "dropped" | "planned";

export type ToneTag =
  | "warm"
  | "bittersweet"
  | "chaotic"
  | "healing"
  | "melancholic"
  | "adrenaline";

export type RelationshipTag =
  | "found-family"
  | "rivalry"
  | "slow-burn"
  | "ensemble"
  | "mentor-student";

export type PacingTag = "meditative" | "steady" | "fast";

export type EmotionTag = "comfort" | "tension" | "catharsis" | "longing" | "wonder";

export interface AnimeTitle {
  romaji: string;
  english?: string;
  native?: string;
}

export interface AnimeMetadata {
  id: string;
  title: AnimeTitle;
  season: string;
  year: number;
  airingStatus: "currently-airing" | "recently-finished" | "upcoming";
  releaseWindowLabel: string;
  synopsis: string;
  studios: string[];
  genres: string[];
  themes: string[];
  episodesPlanned?: number;
  streamingProviders: string[];
  releaseSchedule: string;
}

export interface AnimeTasteSignature {
  tone: ToneTag[];
  relationships: RelationshipTag[];
  pacing: PacingTag[];
  emotions: EmotionTag[];
  hook: string;
}

export interface AnimeCatalogEntry {
  metadata: AnimeMetadata;
  tasteSignature: AnimeTasteSignature;
  onboardingVerdict: {
    firstThreeEpisodeFit: "high" | "medium" | "low";
    summary: string;
  };
}

export interface TasteSignal {
  source: "liked" | "disliked" | "favorite-character" | "direct-preference";
  note: string;
  weight: number;
  tags: string[];
}

export interface UserTasteProfile {
  id: string;
  displayName: string;
  favoriteWorks: string[];
  avoidWorks: string[];
  preferenceSignals: TasteSignal[];
  preferredTones: ToneTag[];
  preferredRelationships: RelationshipTag[];
  preferredPacing: PacingTag[];
  preferredEmotions: EmotionTag[];
}

export interface OnboardingSnapshot {
  likedTitles: string[];
  dislikedTitles: string[];
  favoriteCharacters: string[];
  preferredDirectingNotes: string[];
  freeformNotes: string;
}

export interface RecommendationPick {
  animeId: string;
  title: string;
  score: number;
  reason: string;
  confidence: "high" | "medium" | "low";
  continueWatchingHint: string;
}

export interface RecommendationDigest {
  generatedAt: string;
  summary: string;
  picks: RecommendationPick[];
  watchlistActions: Array<{
    animeId: string;
    action: "watch-now" | "sample-3-episodes" | "hold";
    note: string;
  }>;
}

export interface WatchlistItem {
  animeId: string;
  title: string;
  status: ViewingStatus;
  progressLabel: string;
  nextAction: string;
  reason: string;
}

export interface WeeklyDigestSection {
  title: string;
  summary: string;
  items: string[];
}

export interface WeeklyDigest {
  generatedAt: string;
  headline: string;
  sections: WeeklyDigestSection[];
}
