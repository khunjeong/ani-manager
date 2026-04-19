import Link from "next/link";
import {
  buildRecommendationDigest,
  buildWatchlist,
  buildWeeklyDigest,
  createSampleProfile
} from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";
import { PageIntro, Panel, StatusBadge } from "./components";

const profile = createSampleProfile();
const lineup = buildSeasonLineup();
const digest = buildRecommendationDigest({
  profile,
  catalog: lineup
});
const watchlist = buildWatchlist({ catalog: lineup, digest });
const weeklyDigest = buildWeeklyDigest({ profile, digest, watchlist });

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <PageIntro
          eyebrow="AI Anime Taste Manager"
          title="최근 방영 중인 애니 위주로 지금 볼 만한 작품을 이유와 함께 골라주는 개인 취향 매니저"
          description="온보딩에서 취향 신호를 수집하고, 최근 방영작과 직전 분기 화제작을 정규화한 뒤, 추천 이유와 계속 볼지 판단할 포인트까지 한 흐름으로 묶었습니다."
          actions={
            <>
              <Link href="/onboarding" className="primary-link">
                취향 온보딩 보기
              </Link>
              <Link href="/recommendations" className="secondary-link">
                추천 피드 보기
              </Link>
            </>
          }
        />
        <div className="hero-grid">
          <article className="stat-card">
            <span>온보딩 신호</span>
            <strong>{profile.preferenceSignals.length}개</strong>
            <p>작품, 캐릭터, 연출, 감정선 선호를 구조화</p>
          </article>
          <article className="stat-card">
            <span>최근 방영 후보</span>
            <strong>{lineup.entries.length}개</strong>
            <p>현재 방영작과 직전 분기 주목작 중심으로 정리한 추천 후보</p>
          </article>
          <article className="stat-card">
            <span>즉시 액션</span>
            <strong>{digest.watchlistActions.length}개</strong>
            <p>바로 보기, 3화까지 보기, 보류까지 추천 후 행동 제안</p>
          </article>
        </div>
      </section>

      <section className="content-grid">
        <Panel title="최근 방영작 추천" kicker="Top picks">
          <ul className="plain-list">
            {digest.picks.map((pick) => (
              <li key={pick.animeId}>
                <div className="list-header">
                  <strong>{pick.title}</strong>
                  <StatusBadge status={pick.confidence} />
                </div>
                <span>{pick.reason}</span>
                <span className="support-copy">
                  {
                    lineup.entries.find((entry) => entry.metadata.id === pick.animeId)?.metadata
                      .releaseWindowLabel
                  }
                </span>
                <Link href={`/titles/${pick.animeId}`} className="inline-link">
                  작품 상세 보기
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="워치보드 미리보기" kicker="Watch status">
          <ul className="plain-list">
            {watchlist.map((item) => (
              <li key={item.animeId}>
                <div className="list-header">
                  <strong>{item.title}</strong>
                  <StatusBadge status={item.status} />
                </div>
                <span>{item.progressLabel}</span>
                <span>{item.nextAction}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="주간 다이제스트" kicker="Weekly digest">
          <p className="digest-summary">{weeklyDigest.headline}</p>
          <ul className="plain-list">
            {weeklyDigest.sections.map((section) => (
              <li key={section.title}>
                <strong>{section.title}</strong>
                <span>{section.summary}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </main>
  );
}
