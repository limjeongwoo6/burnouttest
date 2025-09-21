# 번아웃 1차·2차 통합 테스트 - HaruBurnoutTest

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06b6d4.svg)

번아웃 위험도 선별과 유형 진단을 통한 종합적인 번아웃 평가 웹 애플리케이션입니다.

## ✨ 주요 기능

- **1차 진단**: 번아웃 위험도 선별 (Likert 1~5 척도, 총 12문항)
- **2차 진단**: 유형 진단 (5지 선다, 총 10문항)
- **종합 결과**: 1차 등급 + 2차 유형 분포(%) + 대표 유형 판정
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원
- **애니메이션**: 부드러운 전환 효과와 인터랙션
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 🎯 진단 유형

### 1차 진단 결과 (3등급)
- **번아웃 위험 낮음** (12-24점)
- **경도 번아웃 가능성** (25-40점)  
- **번아웃 위험 (상담 필요)** (41-60점)

### 2차 진단 유형
- **과부하형**: 끊임없는 압박과 과로
- **방치형**: 무기력과 체념
- **좌절형**: 의미 상실과 동기 저하

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 또는 yarn 사용시
yarn install
```

### 개발 서버 실행
```bash
# 개발 모드로 실행 (포트 3000)
npm run dev

# 또는 yarn 사용시
yarn dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🛠️ 기술 스택

- **Frontend**: React 18.2.0 + TypeScript
- **Styling**: Tailwind CSS 3.3.3
- **Animation**: Framer Motion 10.16.4
- **Icons**: Lucide React 0.263.1
- **Build Tool**: Vite 4.4.5

## 📱 반응형 디자인

- **모바일**: 320px 이상
- **태블릿**: 768px 이상
- **데스크톱**: 1024px 이상

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: 파란색 계열 (#3b82f6)
- **Success**: 초록색 계열 (#16a34a)
- **Warning**: 노란색 계열 (#f59e0b)
- **Danger**: 빨간색 계열 (#dc2626)

### 타이포그래피
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800

## 📋 사용법

1. **테스트 시작**: "번아웃 통합 테스트 시작" 버튼 클릭
2. **1차 진단**: 12개 문항에 1-5점 척도로 응답
3. **2차 진단**: 10개 문항에 5지 선다로 응답
4. **결과 확인**: 1차 등급, 2차 유형 분포, 대표 판정 확인
5. **재시작**: "다시 시작" 버튼으로 언제든지 재시작 가능

## ⚠️ 주의사항

- 이 검사는 **의학적 진단 도구가 아닙니다**
- **정보 제공을 위한 선별 도구**입니다
- 정확한 진단과 치료는 **자격을 갖춘 의료 전문가**와 상담하세요

## 📞 연락처

- **이메일**: ljw88718@gmail.com
- **프로젝트**: HaruBurnoutTest

## 📄 라이선스

MIT License

## 🙏 참고 자료

- Maslach Burnout Inventory (MBI), Christina Maslach & Susan E. Jackson, 1981
- 한국 상황에 맞춰 재구성된 문항들

---

**건강한 마음으로 더 나은 하루를 만들어가는 것을 목표로 합니다.** 💙
