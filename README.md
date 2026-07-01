# Wobb Frontend Assignment

A starter influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project is intentionally left in a rough-but-working state for candidates to improve.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What's Included

- **Search / Dashboard** — filter influencers by platform (Instagram, YouTube, TikTok) and search by username or full name
- **Profile Details** — click a profile to view extended data loaded from individual JSON files
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)

```
vibe-coder-assignment-main
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ data
│  │  │  ├─ profiles
│  │  │  │  ├─ cristiano.json
│  │  │  │  ├─ instagram.json
│  │  │  │  ├─ khaby.lame.json
│  │  │  │  ├─ mrbeast.json
│  │  │  │  └─ tseries.json
│  │  │  └─ search
│  │  │     ├─ instagram.json
│  │  │     ├─ tiktok.json
│  │  │     └─ youtube.json
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ features
│  │  ├─ compare
│  │  │  ├─ components
│  │  │  │  ├─ CompareProfileCard.tsx
│  │  │  │  ├─ CompareStats.tsx
│  │  │  │  ├─ CompareTable.tsx
│  │  │  │  └─ EmptyCompare.tsx
│  │  │  └─ pages
│  │  │     └─ ComparePage.tsx
│  │  ├─ profile
│  │  │  ├─ components
│  │  │  │  └─ VerifiedBadge.tsx
│  │  │  └─ pages
│  │  │     └─ ProfileDetailPage.tsx
│  │  └─ search
│  │     ├─ components
│  │     │  ├─ PlatformFilter.tsx
│  │     │  ├─ ProfileCard.tsx
│  │     │  ├─ ProfileList.tsx
│  │     │  ├─ SearchBar.tsx
│  │     │  ├─ SelectedSideBar.tsx
│  │     │  └─ VerifiedBadge.tsx
│  │     └─ pages
│  │        └─ SearchPage.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ ComparePage.tsx
│  │  ├─ ProfileDetailPage.tsx
│  │  └─ SearchPage.tsx
│  ├─ shared
│  │  └─ components
│  │     ├─ Layout.tsx
│  │     └─ navBar.tsx
│  ├─ store
│  │  └─ useSelectedStore.ts
│  ├─ types
│  │  └─ index.ts
│  ├─ utils
│  │  ├─ dataHelpers.ts
│  │  ├─ formatters.ts
│  │  └─ profileLoader.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
```
vibe-coder-assignment-main
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ data
│  │  │  ├─ profiles
│  │  │  │  ├─ cristiano.json
│  │  │  │  ├─ instagram.json
│  │  │  │  ├─ khaby.lame.json
│  │  │  │  ├─ mrbeast.json
│  │  │  │  ├─ MrBeast6000.json
│  │  │  │  └─ tseries.json
│  │  │  └─ search
│  │  │     ├─ instagram.json
│  │  │     ├─ tiktok.json
│  │  │     └─ youtube.json
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ compare
│  │  │  ├─ CompareProfileCard.tsx
│  │  │  ├─ CompareStats.tsx
│  │  │  ├─ CompareTable.tsx
│  │  │  └─ EmptyCompare.tsx
│  │  ├─ Layout.tsx
│  │  ├─ navBar.tsx
│  │  ├─ PlatformFilter.tsx
│  │  ├─ ProfileCard.tsx
│  │  ├─ ProfileList.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ SelectedSideBar.tsx
│  │  └─ VerifiedBadge.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ ComparePage.tsx
│  │  ├─ ProfileDetailPage.tsx
│  │  └─ SearchPage.tsx
│  ├─ store
│  │  └─ useSelectedStore.ts
│  ├─ types
│  │  └─ index.ts
│  ├─ utils
│  │  ├─ dataHelpers.ts
│  │  ├─ formatters.ts
│  │  └─ profileLoader.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```