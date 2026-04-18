# Ani Manager Architecture

## Goal

초기 제품이 특정 추천 모델이나 특정 데이터 소스에 과도하게 묶이지 않도록, 다음 네 가지 축을 분리합니다.

1. Domain: 서비스 핵심 언어와 상태 모델
2. Ingestion: 외부 메타데이터 수집 및 정규화
3. AI Core: 태깅, 취향 프로파일링, 추천 설명 생성
4. App Surface: 웹/모바일/배치/알림 채널

## Suggested growth path

### Phase 1

- 웹 온보딩과 추천 피드
- 시즌 카탈로그 수집 배치
- 수동 태깅 + 규칙 기반 추천

### Phase 2

- LLM 기반 분위기/관계성/전개 속도 태깅
- 시청 로그 기반 취향 벡터 업데이트
- 추천 이유와 하차 판단 보조 생성

### Phase 3

- 주간 개인화 다이제스트 자동 발송
- OTT 제공 여부와 방영 일정 알림
- 팀용 운영 어드민 및 품질 모니터링

## Package responsibilities

### `@ani-manager/domain`

- 작품 메타데이터 타입
- 취향 신호와 유저 프로파일 타입
- 추천 결과와 감상 상태 타입

### `@ani-manager/content-ingestion`

- AniList, Jikan, OTT 소스별 클라이언트
- 정규화 로직
- 시즌 카탈로그 빌더

### `@ani-manager/ai-core`

- 태깅 파이프라인 인터페이스
- 취향 프로파일 생성/업데이트
- 추천 점수화
- 추천 이유와 다이제스트 생성

### `@ani-manager/web`

- 온보딩 UX
- 추천 피드와 설명 UI
- 감상 상태 관리
- 알림/일정 노출

## Harness principles

- 외부 API 응답은 곧바로 UI로 보내지 않고 domain 타입으로 정규화합니다.
- AI 출력도 바로 저장하지 않고 schema 검증 가능한 중간 타입으로 먼저 받습니다.
- 추천 근거를 남겨 설명 가능성을 유지합니다.
- 수집, 추론, 서빙을 분리해 배치 처리와 실시간 응답을 함께 운영할 수 있게 합니다.
