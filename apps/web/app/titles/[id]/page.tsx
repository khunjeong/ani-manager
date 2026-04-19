import Link from "next/link";
import { buildRecommendationDigest, createSampleProfile } from "@ani-manager/ai-core";
import { buildSeasonLineup, getCatalogEntryById } from "@ani-manager/content-ingestion";
import { notFound } from "next/navigation";
import { PageIntro, Panel } from "../../components";

export default async function TitleDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const entry = getCatalogEntryById(resolvedParams.id);

  if (!entry) {
    notFound();
  }

  const profile = createSampleProfile();
  const digest = buildRecommendationDigest({ profile, catalog: buildSeasonLineup() });
  const pick = digest.picks.find((item) => item.animeId === entry.metadata.id);

  return (
    <main className="page-shell page-stack">
      <PageIntro
        eyebrow="Title Detail"
        title={entry.metadata.title.english ?? entry.metadata.title.romaji}
        description={entry.metadata.synopsis}
        actions={
          <Link href="/recommendations" className="secondary-link">
            추천 목록으로 돌아가기
          </Link>
        }
      />

      <section className="content-grid two-column">
        <Panel title="왜 추천하는지" kicker="Recommendation reason">
          <p className="digest-summary">{pick?.reason ?? entry.onboardingVerdict.summary}</p>
          <ul className="chip-list">
            {entry.tasteSignature.tone.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
            {entry.tasteSignature.relationships.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
            {entry.tasteSignature.emotions.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="입문 평가" kicker="Episode 1-3 guide">
          <ul className="plain-list">
            <li>
              <strong>초반 적합도</strong>
              <span>{entry.onboardingVerdict.firstThreeEpisodeFit}</span>
            </li>
            <li>
              <strong>요약</strong>
              <span>{entry.onboardingVerdict.summary}</span>
            </li>
            <li>
              <strong>계속 볼지 판단 포인트</strong>
              <span>{pick?.continueWatchingHint ?? "3화까지 보고 판단해보세요."}</span>
            </li>
          </ul>
        </Panel>
      </section>

      <section className="content-grid two-column">
        <Panel title="메타데이터" kicker="Metadata">
          <ul className="plain-list">
            <li>
              <strong>장르</strong>
              <span>{entry.metadata.genres.join(", ")}</span>
            </li>
            <li>
              <strong>테마</strong>
              <span>{entry.metadata.themes.join(", ")}</span>
            </li>
            <li>
              <strong>OTT</strong>
              <span>{entry.metadata.streamingProviders.join(", ")}</span>
            </li>
            <li>
              <strong>방영 일정</strong>
              <span>{entry.metadata.releaseSchedule}</span>
            </li>
          </ul>
        </Panel>

        <Panel title="취향 시그니처" kicker="Taste signature">
          <ul className="plain-list">
            <li>
              <strong>전개 속도</strong>
              <span>{entry.tasteSignature.pacing.join(", ")}</span>
            </li>
            <li>
              <strong>감정선</strong>
              <span>{entry.tasteSignature.emotions.join(", ")}</span>
            </li>
            <li>
              <strong>첫 인상 훅</strong>
              <span>{entry.tasteSignature.hook}</span>
            </li>
          </ul>
        </Panel>
      </section>
    </main>
  );
}
