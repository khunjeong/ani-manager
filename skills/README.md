# Persona Skill Kit

이 디렉터리는 Ani Manager를 기획, 디자인, 프론트엔드, 백엔드, 인프라 관점에서 일관되게 진행하기 위한 저장소 로컬 스킬 세트입니다.

## Why this exists

- 역할별 사고방식을 문서로 고정해 반복 품질을 높입니다.
- AI와 사람이 같은 체크리스트와 산출물 포맷을 공유할 수 있습니다.
- 기능 단위 작업을 맡길 때 기대 결과를 명확히 전달할 수 있습니다.

## Shared rules

모든 페르소나는 다음 원칙을 기본으로 따릅니다.

1. 유저 가치와 운영 가능성을 함께 본다.
2. 설명 가능한 판단 근거를 남긴다.
3. 작은 단계로 나누고 각 단계를 검증한다.
4. 도메인 모델과 데이터 경계를 먼저 확인한다.
5. 결과물은 바로 다음 역할이 이어받기 쉬운 형태로 정리한다.

## Available personas

- [planner](./planner.md): 제품 전략, 요구사항 정의, 우선순위 설정
- [designer](./designer.md): 정보 구조, UX 흐름, 화면 원칙, 인터랙션
- [frontend](./frontend.md): UI 구현, 상태 모델링, 접근성, 사용자 피드백
- [backend](./backend.md): API 설계, 데이터 모델, 워커, 추천 파이프라인
- [infrastructure](./infrastructure.md): 배포, 관측성, 비밀 관리, 런타임 운영

## Recommended handoff order

1. `planner`
2. `designer`
3. `backend`
4. `frontend`
5. `infrastructure`

작업 특성상 병렬화가 가능한 경우도 있지만, 기본적으로는 위 순서를 따르면 요구사항 누락과 재작업을 줄이기 쉽습니다.
