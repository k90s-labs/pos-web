# 🧾 POS Web Frontend

웹 기반 POS 시스템 프론트엔드 프로젝트입니다.  
React + TypeScript + Vite 기반으로 구성되어 있습니다.

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- React Query
- Tailwind CSS
- shadcn/ui

---

## 📁 Project Structure

```bash
src
│
├─ app
│   ├─ App.tsx              # Router + Provider 연결
│   ├─ routes/              # URL → 페이지 매핑
│   ├─ providers/           # React Query 등 전역 설정
│   └─ styles/              # 전역 CSS
│
├─ features                 # 도메인(기능) 단위 모듈
│   └─ {feature-name}
│       ├─ pages/           # 해당 기능의 화면
│       ├─ components/      # 해당 기능 전용 컴포넌트
│       ├─ api/             # 해당 기능 API 로직
│       ├─ store/           # 해당 기능 상태관리
│       └─ types.ts         # 해당 기능 타입 정의
│
├─ shared                   # 공용 모듈
│   ├─ ui/                  # 버튼, 모달 등 디자인 컴포넌트
│   ├─ components/          # 여러 기능에서 사용하는 공용 컴포넌트
│   ├─ hooks/               # 공용 훅
│   └─ lib/
│       ├─ http/            # axios 설정
│       ├─ constants/       # 전역 상수
│       ├─ types/           # 공통 타입
│       └─ utils/           # 공용 유틸 함수
│
└─ assets
```

---