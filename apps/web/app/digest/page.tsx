import {
  buildRecommendationDigest,
  buildWatchlist,
  buildWeeklyDigest,
  createSampleProfile
} from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";
import { PageIntro, Panel } from "../components";

const profile = createSampleProfile();
const lineup = buildSeasonLineup();
const recommendation = buildRecommendationDigest({ profile, catalog: lineup });
const watchlist = buildWatchlist({ catalog: lineup, digest: recommendation });
const digest = buildWeeklyDigest({ profile, digest: recommendation, watchlist });

export default function DigestPage() {
  return (
    <main className="page-shell page-stack">
      <PageIntro
        eyebrow="Weekly Digest"
        title="이번 주에 시작할 작품과 계속 볼 작품을 한 번에 정리합니다"
        description="개인화 다이제스트는 추천 변화, 시청 유지 포인트, 보류작 재평가를 함께 보여주는 형식으로 설계했습니다."
      />

      <Panel title={digest.headline} kicker="Digest headline">
        <div className="digest-layout">
          {digest.sections.map((section) => (
            <section key={section.title} className="digest-block">
              <h2>{section.title}</h2>
              <p>{section.summary}</p>
              <ul className="plain-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Panel>
    </main>
  );
}
