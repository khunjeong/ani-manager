import Link from "next/link";
import { buildRecommendationDigest, createSampleProfile } from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";
import { PageIntro, Panel, StatusBadge } from "../components";

const profile = createSampleProfile();
const lineup = buildSeasonLineup();
const digest = buildRecommendationDigest({ profile, catalog: lineup });

export default function RecommendationsPage() {
  return (
    <main className="page-shell page-stack">
      <PageIntro
        eyebrow="Recommendations"
        title="추천은 점수보다 이유가 먼저 보이도록 정리합니다"
        description="이번 시즌 후보 중 취향 일치율과 초반 진입감을 기준으로 정렬한 추천 피드입니다."
      />

      <section className="recommendation-stack">
        {digest.picks.map((pick, index) => {
          const entry = lineup.entries.find((item) => item.metadata.id === pick.animeId);
          if (!entry) return null;

          return (
            <Panel
              key={pick.animeId}
              title={pick.title}
              kicker={index === 0 ? "Best match" : "Recommended"}
              className="recommendation-panel"
            >
              <div className="list-header">
                <StatusBadge status={pick.confidence} />
                <span className="score-label">score {pick.score}</span>
              </div>
              <p className="digest-summary">{pick.reason}</p>
              <ul className="chip-list">
                {entry.tasteSignature.tone.map((tone) => (
                  <li key={tone}>{tone}</li>
                ))}
                {entry.tasteSignature.relationships.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="meta-grid">
                <div>
                  <strong>입문 평가</strong>
                  <span>{entry.onboardingVerdict.summary}</span>
                </div>
                <div>
                  <strong>OTT / 편성</strong>
                  <span>
                    {entry.metadata.streamingProviders.join(", ")} / {entry.metadata.releaseSchedule}
                  </span>
                </div>
              </div>
              <div className="hero-actions">
                <Link href={`/titles/${pick.animeId}`} className="primary-link">
                  상세 보기
                </Link>
                <span className="support-copy">{pick.continueWatchingHint}</span>
              </div>
            </Panel>
          );
        })}
      </section>
    </main>
  );
}
