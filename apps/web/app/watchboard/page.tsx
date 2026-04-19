import { buildRecommendationDigest, buildWatchlist, createSampleProfile } from "@ani-manager/ai-core";
import type { ViewingStatus } from "@ani-manager/domain";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";
import { PageIntro, Panel, StatusBadge } from "../components";

const profile = createSampleProfile();
const lineup = buildSeasonLineup();
const digest = buildRecommendationDigest({ profile, catalog: lineup });
const watchlist = buildWatchlist({ catalog: lineup, digest });

const statusOrder: ViewingStatus[] = ["watching", "paused", "completed", "dropped", "planned"];

export default function WatchboardPage() {
  return (
    <main className="page-shell page-stack">
      <PageIntro
        eyebrow="Watchboard"
        title="보는 중, 보류, 완주, 하차 상태를 한눈에 정리하는 보드"
        description="추천 결과를 감상 상태와 이어서 관리할 수 있도록 만든 첫 워치보드 화면입니다."
      />

      <section className="board-grid">
        {statusOrder.map((status) => {
          const items = watchlist.filter((item) => item.status === status);
          return (
            <Panel key={status} title={status.toUpperCase()} className="board-column">
              <ul className="plain-list">
                {items.length > 0 ? (
                  items.map((item) => (
                    <li key={item.animeId}>
                      <div className="list-header">
                        <strong>{item.title}</strong>
                        <StatusBadge status={item.status} />
                      </div>
                      <span>{item.progressLabel}</span>
                      <span>{item.reason}</span>
                    </li>
                  ))
                ) : (
                  <li>아직 항목이 없습니다.</li>
                )}
              </ul>
            </Panel>
          );
        })}
      </section>
    </main>
  );
}
