

배포주소: https://mvtt.vercel.app/

기존 홈페이지 대신 새로 구현한 이유:
초기에는 기존에 제작한 영화 리뷰 홈페이지를 기반으로
실시간 스포일러 기능을 확장하여 배포를 진행하고자 하였다.
그러나 기존 프로젝트 구조상 배포 환경(Vercel)에서
백엔드 연동 및 환경 변수 관리에 제약이 발생하여
안정적인 배포가 어려운 문제가 확인되었다.
이에 기능 구현의 완성도와 안정성을 우선으로 고려하여,
실시간 스포일러 기능을 중심으로 한 새로운 구조의 홈페이지를 재구성하여 개발 및 배포를 진행하였다.
이를 통해 백엔드 API 연동, DB 캐시 구조, 실시간 스포일러 페이지를 보다 명확하고 안정적인 구조로 구현할 수 있었다.

실행 방법
Backend 실행
  cd backend
  npm install
  npm run dev

Frontend 실행
  npm install
  npm run dev

환경 변수 설정 (.env)
  TMDB_API_KEY=YOUR_TMDB_API_KEY
  JWT_SECRET=YOUR_SECRET_KEY

시스템 재구성 및 추가 기능:
기존 프로젝트를 확장하는 과정에서 배포 안정성과 기능 확장성을 고려하여
전체 시스템 구조를 재정비하였다.
이 과정에서 실시간 스포일러 기능을 중심으로
프론트엔드와 백엔드의 역할을 명확히 분리하고,
외부 API와 DB를 연동하는 구조를 새롭게 설계하였다.
특히 다음과 같은 시스템을 새롭게 추가 및 개선하였다.
  실시간 스포일러 페이지
    스포일러가 포함된 리뷰를 별도로 분리하여 제공
    -영화 제목, 스포일러 태그, 리뷰 내용을 한눈에 확인 가능
    -영화 정보 캐시 시스템
    -TMDB API 호출 시 영화 정보를 DB에 저장하여
    -이후 리뷰 및 스포일러 페이지에서는 DB Join을 통해 영화 제목 조회
  스포일러 태그 기반 분류
    -결말, 반전, 죽음 등 스포일러 유형을 태그로 구분하여
    -사용자가 스포일러 내용을 사전에 인지할 수 있도록 설계
  구조 분리를 통한 배포 안정성 확보
    -프론트엔드(Next.js)와 백엔드(Express)를 분리하여
    -배포 환경에서의 안정성과 유지보수성을 개선

프로젝트 폴더 구조 및 역할 설명:
전체 구조 개요
MVTT
├─ backend
│  ├─ src
│  │  ├─ routes
│  │  │  ├─ reviews.js
│  │  │  ├─ movies.js
│  │  ├─ db.js
│  │  └─ app.js
│  └─ package.json
│
└─ src
   ├─ components
   │  ├─ Header.jsx
   │  ├─ review
   │  │  ├─ ReviewSection.jsx
   │  │  ├─ ReviewList.jsx
   │  │  └─ ReviewCard.jsx
   │  └─ SpoilerWarningModal.jsx
   │
   ├─ pages
   │  ├─ movie
   │  │  └─ [id].js
   │  ├─ Spoilers
   │  │  ├─ SpoilerPage.jsx
   │  │  ├─ SpoilerList.jsx
   │  │  └─ SpoilerCard.jsx
   │  ├─ api
   │  │  └─ tmdb
   │  │     └─ detail.js
   │  ├─ login.js
   │  ├─ signup.js
   │  └─ index.js
   │
   └─ styles
      └─ globals.css
Frontend (Next.js)역할:
  사용자 화면(UI) 렌더링
  리뷰 작성 및 조회
  실시간 스포일러 페이지 제공
  영화 상세 페이지 표시
주요 폴더
  src/pages
  → 페이지 단위 라우팅 (영화 상세, 실시간 스포일러 등)
  src/components
  → 재사용 가능한 UI 컴포넌트 (Header, Review, Spoiler 관련 컴포넌트)
  src/pages/api
  → TMDB API 연동을 위한 서버리스 API

Backend (Express)역할:
  리뷰 및 스포일러 데이터 관리
  영화 정보 DB 캐시 저장
  프론트엔드 요청 처리 및 DB 연동
주요 폴더
  backend/src/routes
  → 리뷰, 영화 정보 관련 API 라우트
  backend/src/db.js
  → DB 연결 설정

backend/src/app.js
→ Express 서버 실행 및 라우터 등록

