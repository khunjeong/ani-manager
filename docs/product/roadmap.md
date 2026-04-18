# Ani Manager Delivery Roadmap

## Phase 1: Planning and design foundation

- 제품 브리프 정리
- MVP 범위 고정
- 정보 구조와 핵심 화면 정의
- 기술 아키텍처 정리

## Phase 2: Core product slice

- 온보딩 플로우 구현
- 시즌 추천 피드 구현
- 추천 API와 샘플 데이터 파이프라인 구현
- 감상 상태 보드 구현

## Phase 3: Intelligence layer

- AI 태깅 파이프라인 연결
- 개인화 프로파일 업데이트
- 추천 이유 고도화
- 하차 판단 보조 로직 추가

## Phase 4: Operations and launch

- 배포 파이프라인 구성
- 환경 변수와 시크릿 관리
- 관측성 추가
- 첫 사용자 테스트 및 피드백 반영

## Release criteria for first launch

- 온보딩부터 추천 확인까지 주요 플로우가 끊기지 않아야 한다.
- 감상 상태 변경이 정상 반영되어야 한다.
- 추천 이유가 최소한 도메인 관점에서 읽을 만해야 한다.
- 배포 후 장애와 외부 API 실패를 확인할 기본 로그가 있어야 한다.
