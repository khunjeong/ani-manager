# Ani Manager UX Blueprint

## UX Intent

Ani Manager의 UX는 "추천을 보여주는 서비스"보다 "시청 결정을 돕는 개인 비서"에 가깝게 느껴져야 합니다.

유저는 다음 세 가지 질문에 빠르게 답을 얻어야 합니다.

1. 지금 뭘 보면 좋지?
2. 왜 이 작품이 나한테 맞지?
3. 계속 볼지, 여기서 멈출지 어떻게 판단하지?

## Information Architecture

### 1. Home

- 오늘의 추천 요약
- 이번 시즌 추천 카드
- 감상 상태 보드 요약
- 다음 방영 일정

### 2. Onboarding

- 좋아한 작품
- 싫어한 작품
- 최애 캐릭터
- 선호 태그
- 자유 메모

### 3. Recommendation feed

- 추천 순위
- 추천 이유
- 입문 평가
- OTT/방영 정보
- 액션 버튼

### 4. Title detail

- 작품 메타데이터
- 취향 적합 포인트
- 감정선/관계성/전개 속도 요약
- 계속 볼지 판단 보조
- 감상 상태 변경

### 5. Watchboard

- 보는 중
- 보류
- 완주
- 하차
- 예정

### 6. Weekly digest

- 이번 주 새 추천
- 계속 볼 작품
- 놓친 방영작
- 보류작 재평가

## Key Screens

### Landing / dashboard

- 개인화된 인사
- 추천 핵심 3작품
- 바로 볼 작품 1개 강조
- 상태 보드 빠른 이동

### Onboarding flow

- 한 페이지에 질문을 다 몰지 않는다.
- 1단계 작품 기반 질문
- 2단계 캐릭터/연출 기반 질문
- 3단계 선호 톤 조정

### Recommendation card

- 작품명
- 핵심 이유 1문장
- 태그 칩
- OTT와 방영 시간
- `바로 보기`, `3화까지 보기`, `보류` 액션

### Title detail page

- 헤더 요약
- 왜 추천하는지
- 1~3화 입문 가이드
- 감상 상태 선택
- 비슷한 취향 축

## Core Components

- `HeroDigest`
- `RecommendationCard`
- `ReasonPillGroup`
- `OnboardingChoiceChip`
- `WatchStatusBoard`
- `ScheduleTicker`
- `EpisodeTrialSummary`

## Interaction Notes

- 상태 변경은 드래그보다 탭/클릭이 우선이다.
- 추천 이유는 펼치기 없이도 핵심 문장이 먼저 보여야 한다.
- 감상 상태 변경 직후에는 추천 사유 또는 다이제스트가 미세하게 갱신되는 피드백이 있으면 좋다.
- 모바일에서는 카드 스와이프보다 세로 스택을 우선한다.

## Content Priority

1. 추천 이유
2. 감상 결정 액션
3. 입문 평가
4. OTT/방영 정보
5. 부가 메타데이터
