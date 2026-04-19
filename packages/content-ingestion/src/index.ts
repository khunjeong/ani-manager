import type { AnimeCatalogEntry } from "@ani-manager/domain";

export function buildSeasonLineup(): { season: string; entries: AnimeCatalogEntry[] } {
  return {
    season: "2026-SPRING",
    entries: [
      {
        metadata: {
          id: "quiet-sky-01",
          title: {
            romaji: "Ameagari Letter",
            english: "Letters After the Rain"
          },
          season: "SPRING",
          year: 2026,
          synopsis:
            "비를 계기로 다시 만나게 된 두 친구가 작은 섬 마을에서 서로의 시간을 복원해가는 드라마.",
          studios: ["Lantern Works"],
          genres: ["Drama", "Slice of Life"],
          themes: ["Healing", "Coming of Age"],
          episodesPlanned: 12,
          streamingProviders: ["Netflix", "Laftel"],
          releaseSchedule: "매주 화요일 23:00 KST"
        },
        tasteSignature: {
          tone: ["warm", "healing", "bittersweet"],
          relationships: ["slow-burn", "found-family"],
          pacing: ["steady", "meditative"],
          emotions: ["comfort", "longing", "catharsis"],
          hook: "1화에서 관계의 빈칸을 선명하게 제시한다."
        },
        onboardingVerdict: {
          firstThreeEpisodeFit: "high",
          summary: "초반 3화 안에 관계성과 정서적 보상이 분명하게 드러납니다."
        }
      },
      {
        metadata: {
          id: "orbit-family-02",
          title: {
            romaji: "Kiseki no Orbit",
            english: "Orbit of Us"
          },
          season: "SPRING",
          year: 2026,
          synopsis:
            "우주 정거장 실습생들이 팀을 이루며 서로의 결핍을 메워가는 청춘 앙상블.",
          studios: ["North Pier"],
          genres: ["Sci-Fi", "Drama"],
          themes: ["Teamwork", "Space"],
          episodesPlanned: 13,
          streamingProviders: ["Crunchyroll"],
          releaseSchedule: "매주 금요일 01:00 KST"
        },
        tasteSignature: {
          tone: ["warm", "adrenaline"],
          relationships: ["ensemble", "mentor-student", "found-family"],
          pacing: ["steady", "fast"],
          emotions: ["wonder", "comfort", "tension"],
          hook: "1화부터 팀 다이내믹이 강하게 들어옵니다."
        },
        onboardingVerdict: {
          firstThreeEpisodeFit: "high",
          summary: "캐릭터 조합과 성장 서사가 빠르게 잡혀 입문 만족도가 높습니다."
        }
      },
      {
        metadata: {
          id: "glass-rivals-03",
          title: {
            romaji: "Glass Rondo",
            english: "Glass Rondo"
          },
          season: "SPRING",
          year: 2026,
          synopsis:
            "천재 연주자 둘의 경쟁과 공명이 예민한 연출로 전개되는 음악 심리극.",
          studios: ["Blue Stage"],
          genres: ["Music", "Psychological"],
          themes: ["Competition", "Performance"],
          episodesPlanned: 11,
          streamingProviders: ["Wavve"],
          releaseSchedule: "매주 일요일 22:30 KST"
        },
        tasteSignature: {
          tone: ["melancholic", "bittersweet"],
          relationships: ["rivalry", "slow-burn"],
          pacing: ["steady"],
          emotions: ["longing", "tension", "catharsis"],
          hook: "감정선은 깊지만 초반 분위기가 다소 날카롭습니다."
        },
        onboardingVerdict: {
          firstThreeEpisodeFit: "medium",
          summary: "연출 밀도는 높지만 정서적 진입 난이도는 조금 있습니다."
        }
      }
    ]
  };
}

export function getCatalogEntryById(id: string): AnimeCatalogEntry | undefined {
  return buildSeasonLineup().entries.find((entry) => entry.metadata.id === id);
}
