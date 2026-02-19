# 💀 CyberPath Hacker Academy

> **High-Performance Cybersecurity Training Platform (v1.0)**

CyberPath is a gamified, high-performance cybersecurity training platform inspired by the Kali Linux aesthetic. Built for 2026 standards, it delivers a sub-1.3s load time (LCP) and a fully immersive "hacker HUD" experience.

![Dashboard Preview](file:///Users/dias/.gemini/antigravity/brain/f205923f-14e1-45ca-b749-ad2ccc3e7058/dashboard_initial_view_1771526573395.png)

## 🚀 Key Features

-   **Rigorous Exam Simulator (v2)**: 130+ questions spanning Security+, eJPT, CySA+, and OSCP with PBQ (Performance-Based Questions) and lab integration.
-   **Practical Lab Hub**: Integrated `xterm.js` terminal simulator with mocked toolsets (`nmap`, `msfconsole`, `gobuster`) and CTF challenges.
-   **Elite Performance**: 95+ Lighthouse scores, Dynamic Imports, and Holographic Skeleton loaders.
-   **Progressive Web App (PWA)**: Installable on mobile/desktop with offline caching capabilities.
-   **Career Hub**: Interactive CV Builder and real-time market analytics for cybersecurity professionals.

## 🛠 Tech Stack

-   **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS.
-   **Animations**: Framer Motion & CSS Shimmer Effects.
-   **Backend**: Supabase (Auth, DB, Realtime).
-   **Terminal**: `xterm.js` with custom interpreters.
-   **Optimization**: `next-pwa`, `next/font`, and manual Webpack/Turbopack tuning.

## 🏁 Getting Started

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

### Production Build (PWA Support)

```bash
npm run build --webpack
```

## 🌐 Deployment (Vercel)

To host this project on Vercel:
1.  **Framework**: Next.js.
2.  **Environment Variables**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3.  **Build Command**: `next build --webpack`.

## 📖 Documentation
For a detailed breakdown of the development phases and technical decisions, see the [Project Walkthrough](file:///Users/dias/.gemini/antigravity/brain/f205923f-14e1-45ca-b749-ad2ccc3e7058/walkthrough.md).

---
*Created by Antigravity AI for CyberPath Academy.*
