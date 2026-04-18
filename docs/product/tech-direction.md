# Ani Manager Technical Direction

## Architecture

- `apps/web`: Next.js 기반 사용자 앱과 API 라우트
- `packages/domain`: 도메인 타입과 상태 모델
- `packages/content-ingestion`: 외부 메타데이터 정규화
- `packages/ai-core`: 추천 계산과 설명 생성

## Initial implementation strategy

1. 규칙 기반 샘플 추천 엔진으로 제품 플로우를 먼저 검증한다.
2. 이후 태깅/설명 생성의 일부를 LLM으로 치환한다.
3. 외부 메타데이터는 정규화 계층을 거쳐 앱과 분리한다.
4. 배치 작업과 실시간 요청의 책임을 분리한다.

## Suggested next engineering milestones

- `packages/domain`에 온보딩/워치리스트 타입 추가
- `packages/ai-core`에 추천 요청/응답 계약과 평가 함수 확장
- `apps/web`에 온보딩 화면과 추천 피드 화면 추가
- 실제 DB 도입 전까지는 샘플 저장소 또는 파일 기반 fixture 사용

## Deployment direction

- 초기 배포는 Vercel 또는 동등한 Next.js 친화 플랫폼을 가정한다.
- 외부 수집과 다이제스트는 이후 별도 worker/job 환경으로 분리한다.
- OpenAI API 키와 외부 메타데이터 API 키는 서버 환경 변수로 관리한다.
