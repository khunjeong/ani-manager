# Persona Skills

Ani Manager는 여러 역할의 판단이 섞여 만들어지는 제품이기 때문에, 역할별 페르소나를 저장소 안에서 문서화해 두는 편이 효율적입니다.

## Included personas

- Planner
- Designer
- Frontend
- Backend
- Infrastructure

## How to use

1. 작업을 시작하기 전에 가장 가까운 persona 문서를 고릅니다.
2. 해당 문서의 `Inputs`, `Outputs`, `Operating checklist`를 기준으로 초안을 만듭니다.
3. 다음 역할로 넘길 때는 `Default response shape`를 지켜 handoff 합니다.

## Example

새로운 "취향 온보딩" 기능을 정의할 때:

1. `planner`로 목표 유저와 최소 질문 수를 정합니다.
2. `designer`로 온보딩 흐름과 화면 구조를 정합니다.
3. `backend`로 취향 신호 저장 모델과 API 계약을 정의합니다.
4. `frontend`로 UI와 상태 흐름을 구현합니다.
5. `infrastructure`로 배포 환경, 로그, 알림 정책을 준비합니다.

## Future expansion

- data/research persona
- growth/marketing persona
- QA/release persona
- content operations persona
