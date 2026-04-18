import {
  buildRecommendationDigest,
  createSampleProfile
} from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";

const profile = createSampleProfile();
const lineup = buildSeasonLineup();
const digest = buildRecommendationDigest({
  profile,
  catalog: lineup
});

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="eyebrow">AI Anime Taste Manager</div>
        <h1>
          감상 기록을 학습해서 이번 시즌에 볼 만한 작품을 자동으로 골라주는
          개인 취향 매니저
        </h1>
        <p className="hero-copy">
          이 하네스는 도메인 모델, 메타데이터 수집, AI 프로파일링, 추천 설명,
          상태 관리까지 확장 가능한 구조를 먼저 고정합니다.
        </p>
        <div className="hero-grid">
          <article className="stat-card">
            <span>온보딩 신호</span>
            <strong>{profile.preferenceSignals.length}개</strong>
            <p>좋아한 작품, 싫어한 작품, 최애 캐릭터, 연출 선호를 구조화</p>
          </article>
          <article className="stat-card">
            <span>이번 시즌 후보</span>
            <strong>{lineup.entries.length}개</strong>
            <p>수집 파이프라인에서 통합한 시즌성 작품 카탈로그 샘플</p>
          </article>
          <article className="stat-card">
            <span>추천 결과</span>
            <strong>{digest.picks.length}개</strong>
            <p>설명 가능한 추천과 입문 포인트, 주간 다이제스트 초안</p>
          </article>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-title">Architecture Pillars</div>
          <ul className="plain-list">
            <li>도메인 패키지: 작품, 유저, 감상 상태, 추천 근거 타입 고정</li>
            <li>수집 패키지: AniList/Jikan/OTT 소스 정규화 계층 분리</li>
            <li>AI 패키지: 태깅, 프로파일링, 추천, 다이제스트 오케스트레이션</li>
            <li>웹 앱: 온보딩, 추천 피드, 감상 상태 관리 UI의 시작점</li>
          </ul>
        </article>

        <article className="panel">
          <div className="panel-title">Sample Weekly Digest</div>
          <p className="digest-summary">{digest.summary}</p>
          <ul className="plain-list">
            {digest.picks.map((pick) => (
              <li key={pick.animeId}>
                <strong>{pick.title}</strong>
                <span>{pick.reason}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-title">Next Build Steps</div>
          <ul className="plain-list">
            <li>실제 시즌 수집기와 배치 작업 추가</li>
            <li>LLM 기반 분위기/관계성/전개 속도 태깅 연결</li>
            <li>온보딩 설문과 감상 로그 저장소 설계</li>
            <li>알림, OTT 제공 여부, 하차 판단 보조 로직 추가</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
