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
        eyebrow="Airing Selection"
        title="최근 방영작부터 먼저 보도록 정리한 개인화 추천 피드"
        description="현재 방영 중이거나 방영 직후 화제성이 남아 있는 작품 중 취향 일치율과 초반 진입감을 기준으로 정렬한 추천 피드입니다."
        align="compact"
      />

      <section className="recommendation-stack recommendation-editorial">
        {digest.picks.map((pick, index) => {
          const entry = lineup.entries.find((item) => item.metadata.id === pick.animeId);
          if (!entry) return null;

          return (
            <Panel
              key={pick.animeId}
              title={pick.title}
              kicker={index === 0 ? "Best match" : "Recommended"}
              className={`recommendation-panel${index === 0 ? " recommendation-panel-lead" : ""}`}
            >
              <div className="recommendation-topline">
                <div className="recommendation-index-wrap">
                  <div className="recommendation-index">0{index + 1}</div>
                  <span className="index-caption">{index === 0 ? "一推し" : "候補作"}</span>
                </div>
                <div className="list-header">
                  <StatusBadge status={pick.confidence} />
                  <span className="score-label">score {pick.score}</span>
                </div>
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
              <div className="meta-grid recommendation-meta-grid">
                <div>
                  <strong>최근성</strong>
                  <span>{entry.metadata.releaseWindowLabel}</span>
                </div>
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
