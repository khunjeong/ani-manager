# Ani Manager MVP Specification

## Functional Scope

### 1. Taste onboarding

- 좋아한 작품 입력
- 싫어한 작품 입력
- 최애 캐릭터 입력
- 선호하는 분위기/연출/관계성 선택
- 직접 입력 메모 수집

### 2. Seasonal recommendation feed

- 이번 시즌 작품 리스트 제공
- 취향 적합도 기반 추천 순위 계산
- 추천 이유 문장 생성
- 입문 평가 요약 제공

### 3. Watch state management

- 보는 중
- 보류
- 완주
- 하차
- 나중에 볼 예정

### 4. Title detail

- 작품 요약
- 장르/태그
- OTT 제공 여부
- 방영 일정
- 추천 근거
- 계속 볼지 판단 보조 문구

### 5. Weekly digest

- 이번 주 추천 변화 요약
- 새로 시작할 작품 제안
- 계속 볼 작품 점검
- 보류 중 작품 재평가

## Non-functional Scope

- 추천 결과는 2초 안에 반환되는 것을 목표로 한다.
- 외부 메타데이터 실패 시에도 기본 추천 피드는 동작해야 한다.
- AI 생성 결과는 저장 전 구조 검증을 거친다.
- 모바일 우선 UI를 전제로 한다.

## Data Entities

- User
- TasteProfile
- ViewingLog
- AnimeCatalogEntry
- AnimeTasteSignature
- RecommendationDigest
- WatchlistItem

## API Surface for MVP

- `POST /api/onboarding/profile`
- `GET /api/catalog/seasonal`
- `POST /api/recommendation/generate`
- `PATCH /api/watchlist/:id/status`
- `GET /api/digest/weekly`

## Open Questions

- 로그인 없이 로컬 세션으로 먼저 시작할지 여부
- OTT 데이터 소스 통합 범위
- 추천 이유의 실시간 생성 vs 사전 생성
- 주간 다이제스트를 웹 인박스만으로 시작할지 여부
