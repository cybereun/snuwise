# 🏛️ SNU-Wise (서울대 정시 종합 입시 컨설팅 플랫폼)

<p align="left">
  <img src="https://img.shields.io/badge/Version-v1.0.0-0052cc?style=for-the-badge&logo=semver&logoColor=white" alt="Version">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/Status-Active_Maintenance-success?style=for-the-badge" alt="Status">
</p>

---

## 📌 프로젝트 소개 (About SNU-Wise)

**SNU-Wise**는 서울대학교 정시 모집에 지원하는 수험생, 학부모, 진학지도 교사 및 입시 컨설턴트를 위해 제작된 **서울대 정시 입시 분석 종합 플랫폼**입니다.

대학정보포털 **어디가(adiga.kr)** 의 공식 전형결과 데이터를 바탕으로, 서울대 수능 환산식, 과탐Ⅱ 가산점(+3점/+5점), 교과평가(A·A ~ C·C) 정밀 계산 및 6개년(2021학년도 ~ 2026학년도) 입결 변동 궤적을 직관적인 데이터 시각화로 제공합니다.

> 📢 **지속 업데이트 안내:**  
> - **현재 버전 (v1.0.0):** 서울대학교 **자연계열 39개 학과** 6개년 데이터 집중 분석
> - **업데이트 플랜:** 앞으로 매년 대학정보포털 어디가 공식 데이터 발표 시 지속 업데이트되며, 추후 **인문계열 학과 분석까지 대폭 확장**될 예정입니다.

---

## ✨ 핵심 기능 (Key Features)

1. **📊 자연계 6개년 입결 트렌드 분석 & 붉은선 자동 감지**
   - 2021학년도 ~ 2026학년도 39개 학과의 70% Cut 순위 변동 궤적을 반응형 SVG 범프 차트로 시각화
   - [의약학 / 기초자연 / 공학 / 농생대 / 사범대] 계열 필터 선택 시, 해당 그룹에서 **최고 변동폭 학과(Hot Spot) 붉은선(`🔴`) 자동 하이라이트**
   - 🔍 전체 화면 확대 뷰 제공

2. **🧮 2026 서울대 정시 점수 진단 & 교과평가 계산기**
   - 국/수/탐 표준점수 및 영/한 등급 입력 시 서울대 정시 환산 총점 0.1점 단위 정밀 집계
   - 과탐 Ⅰ+Ⅱ (+3.0점) / Ⅱ+Ⅱ (+5.0점) 가산점 및 교과평가 (A·A ~ C·C) 조합별 실질 점수 자동 산출
   - [안정 🟢 / 적정 🟡 / 소신 ⚡] 3단계 정밀 입시 진단 리포트 제공

3. **🔄 의대 이탈 추가합격 회전율(충원률 %) & 백분위 밸런스**
   - 타 의대 복수합격 이탈에 따른 학과별 실제 추가합격 회전율(충원률 탑 랭킹) 분석
   - 국어, 수학, 탐구 영역별 70% Cut 백분위 스파이더 프로필 제공

4. **⚖️ 일반전형 vs 지역균형전형 1:1 입결 대조**
   - 동일 모집단위의 일반전형 vs 지균 70% Cut 환산점수 및 경쟁률 1:1 대조 분석

5. **📑 성적 자동 분석 A4 컨설팅 보고서 인쇄 & PDF 저장**
   - 입력된 성적 및 진단 결과를 앱이 실시간으로 종합 분석하여 **스마트 입시 총평 소견 자동 작성**
   - 브라우저 머릿글/바닥글이 제거된 정갈한 A4 1장 규격 공식 진학 지도 리포트 즉시 출력/PDF 저장

6. **📱 스마트폰 모바일 반응형 UI & 실시간 방문자 카운터**
   - 데스크톱과 모바일(스마트폰 하단 고정 네비게이션 & 슬라이드 드로어) 전용 반응형 UX
   - 실시간 누적/오늘 방문자 집계 카운터 뱃지 탑재

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 / 라이브러리 |
| :--- | :--- |
| **Core Architecture** | HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3 |
| **Data Engine** | 2021학년도 ~ 2026학년도 어디가(adiga.kr) 공식 70% Cut 데이터셋 & 서울대 정시 환산식 알고리즘 |
| **Visualization** | Dynamic SVG Path & Interpolation Engine (Vanilla SVG) |
| **Deployment** | GitHub Repository, Cloudflare Pages |

---

## 🚀 시작하기 (Quick Start)

본 프로젝트는 별도의 라이브러리 설치나 빌드 과정(npm/yarn) 없이 표준 브라우저에서 즉시 실행됩니다.

```bash
# 1. 리포지토리 클론
git clone https://github.com/cybereun/snuwise.git

# 2. 프로젝트 디렉토리 이동
cd snuwise

# 3. 로컬 웹 서버 실행 (Python 3 예시)
python -m http.server 8080
```
브라우저에서 `http://localhost:8080/` 으로 접속하시면 즉시 확인하실 수 있습니다.

---

## 📜 저작권 및 권리 고지 (Copyright & License Notice)

> ⚠️ **본 프로젝트는 MIT 오픈소스 라이선스가 적용되지 않습니다. (NOT MIT License)**

- **Copyright (c) 2026 CYBEREUN (SNU-Wise Team). All Rights Reserved.**
- 본 소프트웨어의 소스코드, 데이터 구조, 디자인 시스템 및 수집·가공된 입시 데이터셋에 대한 모든 지적 재산권은 **CYBEREUN (SNU-Wise)** 에 있습니다.
- **허용 범위:** 수험생, 학부모, 진학 지도 교사의 비상업적·개인적 입시 상담 및 참고 용도로의 사용만 허가됩니다.
- **금지 사항:** 작성자의 사전 서면 동의 없는 무단 상업적 재배포, 유료 서비스 전환, 소스코드의 무단 복제 및 재판매, 데이터 무단 크롤링/가공 행위는 법적으로 엄격히 금지됩니다.

---

<p align="center">
  <b>SNU-Wise (서울대 정시 종합 입시 컨설팅 플랫폼)</b><br>
  Developed with ❤️ for SNU Admissions Candidates
</p>
