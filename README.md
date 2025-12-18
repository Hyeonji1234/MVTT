# 🎬 SPO  
## 실시간 스포일러 기반 영화 리뷰 웹 서비스

SPO는 영화 리뷰와 스포일러를 효율적으로 관리하기 위해 제작된  
**실시간 스포일러 기반 영화 리뷰 웹 서비스**입니다.  

사용자가 스포일러 여부를 사전에 인지한 상태에서 리뷰를 확인할 수 있도록  
스포일러 태그, 블러 처리, 실시간 스포일러 페이지를 중심으로 설계되었습니다.

---

## 🔗 배포 주소 및 저장소

- 🌐 **배포 주소**  
  👉 (https://mvtt.vercel.app/)


---

## 📌 제작 배경

기존 영화 리뷰 서비스에서는 스포일러 여부가 명확히 구분되지 않아  
사용자가 원치 않는 스포일러를 접하게 되는 문제가 존재했습니다.  

본 프로젝트는 이러한 문제를 개선하기 위해  
리뷰 작성 시 스포일러 여부와 태그를 함께 관리하고,  
스포일러 리뷰를 별도의 실시간 페이지로 제공하는 것을 목표로 제작되었습니다.

---

## 🔄 시스템 재구성 배경

초기에는 기존에 제작한 영화 리뷰 홈페이지를 기반으로  
실시간 스포일러 기능을 확장하여 배포를 진행하고자 했습니다.  

그러나 기존 프로젝트 구조상 배포 환경에서  
백엔드 연동 및 환경 변수 관리에 제약이 발생하여  
안정적인 배포가 어렵다는 문제가 확인되었습니다.

이에 기능 구현의 완성도와 배포 안정성을 우선으로 고려하여,  
실시간 스포일러 기능 구현에 적합한 구조로  
홈페이지를 새롭게 구성하여 개발 및 배포를 진행하였습니다.

---

## ✨ 새로 구성하며 추가·개선한 시스템

- **실시간 스포일러 페이지**
  - 최근 작성된 스포일러 리뷰를 실시간으로 조회
  - 영화 제목, 스포일러 태그, 리뷰 내용 표시
  - 영화 제목 클릭 시 상세 페이지로 이동 가능

- **영화 정보 캐시 시스템**
  - TMDB API를 통해 영화 상세 정보를 조회
  - 최초 조회 시 영화 ID와 제목을 DB에 캐시 형태로 저장
  - 이후 리뷰 및 실시간 스포일러 페이지에서는 DB Join으로 영화 제목 조회

- **스포일러 태그 기반 분류**
  - 결말, 반전, 죽음 등 스포일러 유형을 태그로 구분
  - 사용자가 스포일러 내용을 사전에 인지할 수 있도록 설계

- **프론트엔드·백엔드 구조 분리**
  - 프론트엔드와 백엔드의 역할을 명확히 분리하여
    유지보수성과 배포 안정성 향상

---

## 🛠️ 기술 스택

### Frontend
- Next.js (React)
- JavaScript (ES6)
- CSS Module

### Backend
- Node.js
- Express
- MariaDB (MySQL)
- JWT 인증

### External API
- TMDB (The Movie Database) API

---

## 📂 프로젝트 폴더 구조 및 역할

```text
MVTT
├─ backend
│  ├─ src
│  │  ├─ routes
│  │  │  ├─ reviews.js
│  │  │  └─ movies.js
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
   │  ├─ index.js
   │  ├─ login.js
   │  └─ signup.js
   │
   └─ styles
      └─ globals.css

📊 시스템 흐름
TMDB API
   ↓
Next.js API (/api/tmdb/detail)
   ↓
Backend 서버 (/movies/upsert)
   ↓
MariaDB (movies 테이블 캐시)
   ↓
리뷰 페이지 / 실시간 스포일러 페이지

▶️ 실행 방법
Backend 실행
cd backend
npm install
npm run dev

Frontend 실행
npm install
npm run dev

환경 변수 설정
TMDB_API_KEY=YOUR_TMDB_API_KEY
JWT_SECRET=YOUR_SECRET_KEY
