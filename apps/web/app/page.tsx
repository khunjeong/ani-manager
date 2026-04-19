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
  const featuredPick = digest.picks[0];
  const featuredEntry = lineup.entries.find((entry) => entry.metadata.id === featuredPick?.animeId);
  const watchNowCount = digest.watchlistActions.filter((action) => action.action === "watch-now").length;

  return (
    <main className="page-shell home-shell">
      <section className="hero hero-editorial">
        <div className="hero-kanji-rail" aria-hidden="true">
          <span>放送中</span>
          <span>新作選</span>
        </div>
        <div className="hero-main">
          <PageIntro
            eyebrow="Shinban Curator"
            title="지금 방영 중인 애니 중에서 네 취향에 맞는 작품만 먼저 고릅니다"
            description="최근 방영작과 직전 분기 화제작을 한 보드에 묶고, 무드 일치도와 초반 진입감, 계속 볼 만한 이유까지 함께 정리하는 개인 큐레이션 화면입니다."
            actions={
              <>
                <Link href="/recommendations" className="primary-link">
                  오늘의 큐레이션 보기
                </Link>
                <Link href="/onboarding" className="secondary-link">
                  취향 다시 조정하기
                </Link>
              </>
            }
          />

          <div className="hero-marquee">
            <span>Currently airing</span>
            <span>{featuredEntry?.metadata.releaseWindowLabel}</span>
            <span>{featuredEntry?.metadata.releaseSchedule}</span>
            <span>{featuredEntry?.metadata.streamingProviders.join(" / ")}</span>
          </div>
        </div>

        <aside className="featured-spotlight">
          <div className="featured-label">
            <span className="stamp-badge">推し</span>
            Editor&apos;s pick for you
          </div>
          <h2>{featuredPick?.title}</h2>
          <p>{featuredPick?.reason}</p>
          <div className="spotlight-meta">
            <div>
              <span>최근성</span>
              <strong>{featuredEntry?.metadata.releaseWindowLabel}</strong>
            </div>
            <div>
              <span>입문감</span>
              <strong>{featuredEntry?.onboardingVerdict.firstThreeEpisodeFit}</strong>
            </div>
          </div>
          <Link href={featuredPick ? `/titles/${featuredPick.animeId}` : "/recommendations"} className="primary-link">
            이 작품 자세히 보기
          </Link>
        </aside>
      </section>

      <section className="dashboard-ribbon">
        <article className="ribbon-card">
          <span>온보딩 신호</span>
          <strong>{profile.preferenceSignals.length}개</strong>
          <p>캐릭터, 무드, 연출 취향을 압축해 사용합니다.</p>
        </article>
        <article className="ribbon-card">
          <span>최근 방영 후보</span>
          <strong>{lineup.entries.length}개</strong>
          <p>방영 중 작품과 직전 분기 화제작을 함께 큐레이션합니다.</p>
        </article>
        <article className="ribbon-card ribbon-card-accent">
          <span>오늘 바로 볼 작품</span>
          <strong>{watchNowCount}개</strong>
          <p>지금 시작해도 좋은 작품만 따로 골라둡니다.</p>
        </article>
      </section>

      <section className="home-columns">
        <div className="home-primary">
          <Panel title="오늘의 큐레이션" kicker="Recent picks" className="panel-featured">
            <div className="curation-stack">
              {digest.picks.map((pick, index) => {
                const entry = lineup.entries.find((item) => item.metadata.id === pick.animeId);
                return (
                  <article key={pick.animeId} className={`curation-card${index === 0 ? " curation-card-lead" : ""}`}>
                    <div className="curation-head">
                      <div>
                        <div className="curation-rank">0{index + 1}</div>
                        <h3>{pick.title}</h3>
                      </div>
                      <div className="curation-side">
                        <span className="mini-seal">{index === 0 ? "本命" : "注目"}</span>
                        <StatusBadge status={pick.confidence} />
                      </div>
                    </div>
                    <p>{pick.reason}</p>
                    <div className="curation-footer">
                      <span>{entry?.metadata.releaseWindowLabel}</span>
                      <span>{entry?.metadata.releaseSchedule}</span>
                    </div>
                    <Link href={`/titles/${pick.animeId}`} className="inline-link">
                      작품 상세 보기
                    </Link>
                  </article>
                );
              })}
            </div>
          </Panel>

          <Panel title="이번 주 다이제스트" kicker="Digest" className="panel-digest">
            <div className="digest-grid">
              <div className="digest-lead">
                <p className="digest-summary">{weeklyDigest.headline}</p>
              </div>
              {weeklyDigest.sections.map((section) => (
                <div key={section.title} className="digest-mini-card">
                  <strong>{section.title}</strong>
                  <span>{section.summary}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="home-secondary">
          <Panel title="워치보드 미리보기" kicker="Now tracking" className="panel-compact">
            <ul className="plain-list">
              {watchlist.map((item) => (
                <li key={item.animeId}>
                  <div className="list-header">
                    <strong>{item.title}</strong>
                    <div className="watch-status-wrap">
                      <span className="watch-tag">
                        {item.status === "watching"
                          ? "視聴中"
                          : item.status === "planned"
                            ? "候補"
                            : "保留"}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                  <span>{item.progressLabel}</span>
                  <span>{item.nextAction}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="추천 엔진 기준" kicker="How it thinks" className="panel-compact">
            <ul className="plain-list">
              <li>
                <strong>최근 방영 우선</strong>
                <span>지금 바로 볼 수 있는 작품을 먼저 올립니다.</span>
              </li>
              <li>
                <strong>초반 진입감</strong>
                <span>1~3화 안에 취향이 맞는지 판단 가능한 작품을 우대합니다.</span>
              </li>
              <li>
                <strong>설명 가능한 추천</strong>
                <span>무드, 관계성, 감정선 기준을 문장으로 보여줍니다.</span>
              </li>
            </ul>
          </Panel>
        </aside>
      </section>
    </main>
  );
}
