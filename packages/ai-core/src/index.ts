import type {
  AnimeCatalogEntry,
  EmotionTag,
  RecommendationDigest,
  RecommendationPick,
  RelationshipTag,
  ToneTag,
  UserTasteProfile
} from "@ani-manager/domain";

const toneWeight: Record<ToneTag, number> = {
  warm: 1.2,
  bittersweet: 0.95,
  chaotic: 0.7,
  healing: 1.25,
  melancholic: 0.9,
  adrenaline: 0.8
};

const relationshipWeight: Record<RelationshipTag, number> = {
  "found-family": 1.2,
  rivalry: 0.8,
  "slow-burn": 1,
  ensemble: 0.95,
  "mentor-student": 0.9
};

const emotionWeight: Record<EmotionTag, number> = {
  comfort: 1.2,
  tension: 0.7,
  catharsis: 1.05,
  longing: 0.92,
  wonder: 1.15
};

export function createSampleProfile(): UserTasteProfile {
  return {
    id: "sample-user",
    displayName: "Mina",
    favoriteWorks: ["Sousou no Frieren", "Skip and Loafer", "Mob Psycho 100"],
    avoidWorks: ["edgelord battle royale"],
    preferenceSignals: [
      {
        source: "liked",
        note: "성장형 관계와 잔잔한 여운이 남는 작품을 오래 본다.",
        weight: 1,
        tags: ["healing", "found-family", "steady", "catharsis"]
      },
      {
        source: "favorite-character",
        note: "무심하지만 다정한 보호자 타입 캐릭터를 선호한다.",
        weight: 0.8,
        tags: ["mentor-student", "warm", "comfort"]
      },
      {
        source: "direct-preference",
        note: "1~3화에서 감정선과 관계성이 잡히는 전개를 좋아한다.",
        weight: 1,
        tags: ["slow-burn", "steady", "longing"]
      }
    ],
    preferredTones: ["warm", "healing", "bittersweet"],
    preferredRelationships: ["found-family", "slow-burn", "mentor-student"],
    preferredPacing: ["steady", "meditative"],
    preferredEmotions: ["comfort", "wonder", "catharsis"]
  };
}

function scoreEntry(profile: UserTasteProfile, entry: AnimeCatalogEntry): number {
  const toneScore = entry.tasteSignature.tone.reduce((total, tag) => {
    return total + (profile.preferredTones.includes(tag) ? toneWeight[tag] : 0.25);
  }, 0);

  const relationshipScore = entry.tasteSignature.relationships.reduce((total, tag) => {
    return total + (profile.preferredRelationships.includes(tag) ? relationshipWeight[tag] : 0.2);
  }, 0);

  const emotionScore = entry.tasteSignature.emotions.reduce((total, tag) => {
    return total + (profile.preferredEmotions.includes(tag) ? emotionWeight[tag] : 0.2);
  }, 0);

  const pacingScore = entry.tasteSignature.pacing.reduce((total, tag) => {
    return total + (profile.preferredPacing.includes(tag) ? 1.1 : 0.35);
  }, 0);

  const onboardingBonus =
    entry.onboardingVerdict.firstThreeEpisodeFit === "high"
      ? 1.25
      : entry.onboardingVerdict.firstThreeEpisodeFit === "medium"
        ? 0.7
        : 0.2;

  return Number(
    (toneScore + relationshipScore + emotionScore + pacingScore + onboardingBonus).toFixed(2)
  );
}

function buildReason(profile: UserTasteProfile, entry: AnimeCatalogEntry): string {
  const matchingTone = entry.tasteSignature.tone.find((tag) =>
    profile.preferredTones.includes(tag)
  );
  const matchingRelationship = entry.tasteSignature.relationships.find((tag) =>
    profile.preferredRelationships.includes(tag)
  );
  const onboarding = entry.onboardingVerdict.summary;

  return [
    matchingTone ? `${matchingTone} 톤이 취향 축과 맞고` : "전반적 결이 부담스럽지 않고",
    matchingRelationship
      ? `${matchingRelationship} 관계 구도가 강하게 살아 있으며`
      : "관계성 축이 빠르게 드러나며",
    onboarding
  ].join(" ");
}

function buildContinueWatchingHint(entry: AnimeCatalogEntry): string {
  if (entry.onboardingVerdict.firstThreeEpisodeFit === "high") {
    return "3화까지는 유지 추천. 감정선이 빠르게 회수되는 편입니다.";
  }

  if (entry.onboardingVerdict.firstThreeEpisodeFit === "medium") {
    return "2화까지 보고 관계 구도가 취향에 맞는지 확인해보는 편이 좋습니다.";
  }

  return "초반 후킹이 약할 수 있어 샘플 시청만 권장합니다.";
}

function toPick(profile: UserTasteProfile, entry: AnimeCatalogEntry): RecommendationPick {
  const score = scoreEntry(profile, entry);

  return {
    animeId: entry.metadata.id,
    title: entry.metadata.title.english ?? entry.metadata.title.romaji,
    score,
    reason: buildReason(profile, entry),
    confidence: score >= 6 ? "high" : score >= 4.2 ? "medium" : "low",
    continueWatchingHint: buildContinueWatchingHint(entry)
  };
}

export function buildRecommendationDigest(input: {
  profile: UserTasteProfile;
  catalog: { entries: AnimeCatalogEntry[] };
}): RecommendationDigest {
  const picks = input.catalog.entries
    .map((entry) => toPick(input.profile, entry))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  return {
    generatedAt: new Date().toISOString(),
    summary: `${input.profile.displayName}님은 감정선이 안정적으로 쌓이고 관계성이 선명한 작품에 강한 반응을 보입니다. 이번 시즌에는 무드 일치와 초반 진입감이 좋은 작품을 우선 추천합니다.`,
    picks,
    watchlistActions: picks.map((pick, index) => ({
      animeId: pick.animeId,
      action: index === 0 ? "watch-now" : index === 1 ? "sample-3-episodes" : "hold",
      note: pick.continueWatchingHint
    }))
  };
}
