# 하루 번아웃 진단테스트

번아웃 위험도와 유형을 진단하는 1차·2차 통합 테스트 시스템입니다.

## 🎯 주요 기능

- **1차 진단**: 번아웃 위험도 측정 (12문항)
- **2차 진단**: 번아웃 유형 분석 (10문항)
- **결과 제공**: 상세한 분석 결과와 해석
- **상담 연결**: 1:1 무료 전화상담 신청

## 🌿 디자인 특징

- 부드러운 그린 컬러 시스템
- 고급스럽고 신뢰감 있는 UI/UX
- 반응형 디자인 (모바일 최적화)
- 접근성 고려

## 🚀 배포

이 프로젝트는 Vercel에서 호스팅됩니다.

### 로컬 실행

```bash
# Python HTTP 서버 사용
python -m http.server 8000

# 또는 간단한 파일 서버
npx serve .
```

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

## 📁 파일 구조

```
BurnoutTest/
├── burnout-test.html    # 메인 테스트 페이지
├── index.html          # 루트 페이지 (리다이렉트)
├── vercel.json         # Vercel 설정
├── package.json        # 프로젝트 설정
└── README.md          # 프로젝트 문서
```

## 🔗 링크

- **테스트 URL**: https://haru-burnout-test.vercel.app
- **상담 신청**: https://forms.gle/QFJMPVWV9nRq862j6

## 📝 라이선스

MIT License

---

💡 **문의사항이나 개선 제안이 있으시면 언제든 연락주세요!**