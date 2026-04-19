import { createSampleOnboardingSnapshot, createSampleProfile } from "@ani-manager/ai-core";
import { PageIntro, Panel } from "../components";

const onboarding = createSampleOnboardingSnapshot();
const profile = createSampleProfile();

export default function OnboardingPage() {
  return (
    <main className="page-shell page-stack">
      <PageIntro
        eyebrow="Onboarding"
        title="취향을 묻는 대신, 취향 대화를 시작하는 온보딩"
        description="좋아한 작품과 캐릭터, 선호 연출을 짧게 수집한 뒤 취향 프로파일을 만드는 흐름입니다."
      />
      <section className="content-grid">
        <Panel title="좋아한 작품">
          <ul className="chip-list">
            {onboarding.likedTitles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="피하고 싶은 작품">
          <ul className="chip-list">
            {onboarding.dislikedTitles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </Panel>
        <Panel title="최애 캐릭터">
          <ul className="chip-list">
            {onboarding.favoriteCharacters.map((character) => (
              <li key={character}>{character}</li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="content-grid two-column">
        <Panel title="선호 연출 메모" kicker="Directing notes">
          <ul className="plain-list">
            {onboarding.preferredDirectingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="support-copy">{onboarding.freeformNotes}</p>
        </Panel>

        <Panel title="생성된 취향 프로파일" kicker="Profile snapshot">
          <ul className="plain-list">
            <li>
              <strong>선호 톤</strong>
              <span>{profile.preferredTones.join(", ")}</span>
            </li>
            <li>
              <strong>선호 관계성</strong>
              <span>{profile.preferredRelationships.join(", ")}</span>
            </li>
            <li>
              <strong>선호 감정선</strong>
              <span>{profile.preferredEmotions.join(", ")}</span>
            </li>
          </ul>
        </Panel>
      </section>
    </main>
  );
}
