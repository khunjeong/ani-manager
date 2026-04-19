# Ani Manager Deployment Guide

## Deployment target

초기 배포는 Next.js 친화적인 플랫폼을 우선합니다.

- 1순위: Vercel
- 대안: Docker 기반 컨테이너 플랫폼

## Required environment variables

- `OPENAI_API_KEY`
- `ANILIST_API_URL`
- `JIKAN_API_URL`
- `NEXT_PUBLIC_APP_NAME`

## Pre-deploy checklist

1. `pnpm install`
2. `pnpm typecheck`
3. `pnpm build`
4. `/api/health` 응답 확인

## CI

GitHub Actions는 다음 항목을 검증합니다.

- 의존성 설치
- 타입 체크
- 프로덕션 빌드

## Runtime checks

- `GET /api/health` 가 정상 응답해야 합니다.
- 추천 API와 시즌 카탈로그 API가 200을 반환해야 합니다.
- 홈, 온보딩, 추천, 워치보드, 다이제스트 화면이 모두 렌더링되어야 합니다.

## Suggested production topology

- Web app: Next.js app
- External metadata fetch: 추후 scheduler/worker 분리
- Weekly digest generation: 추후 batch job 분리

## First launch notes

- 현재 구현은 샘플 데이터 기반이므로, 실제 서비스 전환 시 DB와 인증을 연결해야 합니다.
- 외부 메타데이터 소스 실패를 대비한 캐시 전략을 다음 단계에 추가하는 것이 좋습니다.
