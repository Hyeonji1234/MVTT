This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

배포주소: https://mvtt.vercel.app/

기존 홈페이지 대신 새로 구현한 이유
초기에는 기존에 제작한 영화 리뷰 홈페이지를 기반으로
실시간 스포일러 기능을 확장하여 배포를 진행하고자 하였다.
그러나 기존 프로젝트 구조상 배포 환경(Vercel)에서
백엔드 연동 및 환경 변수 관리에 제약이 발생하여
안정적인 배포가 어려운 문제가 확인되었다.

이에 기능 구현의 완성도와 안정성을 우선으로 고려하여,
실시간 스포일러 기능을 중심으로 한 새로운 구조의 홈페이지를 재구성하여 개발 및 배포를 진행하였다.
이를 통해 백엔드 API 연동, DB 캐시 구조, 실시간 스포일러 페이지를 보다 명확하고 안정적인 구조로 구현할 수 있었다.
