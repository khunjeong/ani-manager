# ani-manager

AI 애니 취향 매니저를 위한 범용 하네스 엔지니어링 구조입니다.

유저의 감상 기록을 학습해서 "이번 시즌에 네가 볼 만한 작품"을 자동으로 골라주기 위한 제품을, 기획/디자인/개발/배포까지 이어갈 수 있도록 모노레포 기반으로 시작합니다.

## What is included

- `apps/web`: 웹 프론트엔드와 API 진입점
- `packages/domain`: 작품, 유저 취향, 추천 결과의 핵심 타입
- `packages/content-ingestion`: 시즌 작품 카탈로그 수집/정규화 계층
- `packages/ai-core`: 취향 프로파일링, 추천 생성, 설명 생성의 오케스트레이션
- `docs/architecture.md`: 왜 이렇게 분리했는지에 대한 구조 문서

## Why this harness is reusable

- 특정 LLM, 특정 크롤러, 특정 DB에 바로 묶이지 않습니다.
- 추천 시스템이 규칙 기반에서 LLM 기반으로 발전해도 도메인 경계가 유지됩니다.
- 웹 앱 외에 배치 워커, 관리자 콘솔, 알림 잡을 추가하기 쉬운 구조입니다.
- "왜 추천했는지"를 남길 수 있는 설명 가능한 추천 흐름을 전제로 둡니다.

## Local setup

```bash
pnpm install
pnpm dev
```

기본 화면은 웹 랜딩과 샘플 추천 다이제스트를 보여주고, API는 `GET /api/recommendation`으로 샘플 추천 결과를 반환합니다.

## Suggested next steps

1. 실제 시즌 수집기와 DB 스키마를 추가합니다.
2. 유저 온보딩 설문과 감상 기록 저장 플로우를 붙입니다.
3. LLM 태깅 파이프라인을 `@ani-manager/ai-core`에 연결합니다.
4. 주간 다이제스트와 시청 유지/하차 보조 로직을 배치 잡으로 분리합니다.
