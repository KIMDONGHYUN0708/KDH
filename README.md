# 김동현 포트폴리오 웹사이트

PDF 포트폴리오와 추가 프로젝트 설명을 바탕으로 구성한 정적 웹 포트폴리오입니다. 서비스 기획, O2O 경험, 전시 운영, 데이터 기반 의사결정, AI 기반 도구 제작 역량이 함께 보이도록 설계했습니다.

## 로컬 실행

현재 폴더에서 아래 명령으로 실행할 수 있습니다.

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:4173/`을 열면 됩니다.

## 구성

- `index.html`: 홈, 대표 프로젝트, AI Builds, 역량, 소개
- `script.js`: 스크롤 진행 바, 리빌 애니메이션, 호버 틸트 인터랙션
- `projects/another-saigon.html`: LG전자 어나더사이공
- `projects/ces-ai-docent.html`: LG CES 2025 AI 도슨트
- `projects/casper-studio.html`: 현대자동차 캐스퍼 스튜디오
- `projects/school-road-app.html`: 현대모비스 학교 가는 길 APP
- `projects/geumseong.html`: LG전자 금성전파사
- `projects/robotics-aa.html`: 현대자동차그룹 로보틱스랩 A+A
- `projects/ai-drum-simulator.html`: ROS2 양팔 로봇 드럼 시뮬레이터
- `projects/ai-qa-tracker.html`: DX팀 트러블슈터 솔루션
- `projects/ai-estimate-automation.html`: 견적서 자동화 솔루션
- `styles.css`: 공통 스타일

## 디자인 방향

- Pretendard를 기본 폰트로 사용합니다.
- Vercel 디자인 문서를 참고하되, 무지개 컬러를 메인 장식으로 쓰지 않고 흑백, 헤어라인, 얇은 그림자 중심으로 정리했습니다.
- 카드, 이미지, 캡션은 같은 반경과 같은 선 두께를 사용해 라인이 깨끗하게 맞도록 구성했습니다.
- A+A 상세페이지의 갤러리는 단일 장면 이미지 위주로 구성하고, 3열 동일 비율 카드로 정렬했습니다.

## 인터랙션 방향

- 스크롤에 따라 섹션과 증거물이 순차적으로 드러납니다.
- 프로젝트 카드와 AI 카드에는 과하지 않은 확대/틸트 호버가 적용됩니다.
- 상세페이지는 프로젝트별 핵심 시스템을 먼저 보여준 뒤 문제, 가설, 해결, 결과로 이어집니다.
- 실제 이미지가 없는 영역은 필요한 자료를 명시하는 플레이스홀더로 유지했습니다.

## PPT 전환 방향

- 상세페이지의 주요 섹션에는 `.slide-section` 클래스를 붙였습니다.
- 웹에서는 자연 스크롤을 유지하고, PPT 전환 시에는 `.slide-section` 단위로 캡처하거나 HTML-to-PPT 변환 기준으로 사용할 수 있습니다.
- 강제 스크롤 스냅은 적용하지 않았습니다. 웹 사용성은 유지하면서 발표자료 전환만 쉽게 하기 위한 구조입니다.

## 배포 방향

정적 사이트라 GitHub Pages에 바로 배포할 수 있습니다. 이후 프로젝트 이미지가 준비되면 `assets/` 폴더에 추가하고 각 상세페이지의 플레이스홀더를 실제 이미지로 교체하면 됩니다.
