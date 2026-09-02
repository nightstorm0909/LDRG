# Evolution

Significant phases of LDRG. Newest at the bottom.

## Phase 1 — Scaffold and bento theme

**Date:** 2026-09-02

**What changed.** Created a Vite + React + TypeScript app. Visual language settled on **bento grid minimalism**: cream / beige tiles, cyber-pink accent, thin borders, line icons, Plus Jakarta Sans. Same-day earlier looks (starlit, Neon Pop, Midnight Lounge, brutalism) were replaced. Tokens live in `src/styles/theme.css`. Light mode only.

**Why.** Fast-scanning tiles beat a loud hero. One accent color keeps the dashboard calm.

**How to try it.** Need Node 18+ (22 is in `.nvmrc`). Then:

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Phase 2 — Swipe deck browse

**Date:** 2026-09-02

**What changed.** Browse is a **centered swipe deck** of large rectangular cards. Swipe or drag **left** (or press ←) to cycle. Swipe or drag **right** (or press → / click center) to enter. Click a side peek to bring that card to the center. Cover-flow layout: one large opaque card, neighbors peeking.

**Why.** Choosing with a swipe matches “pick this or skip to the next.”

**How to try it.** `npm run dev`. Home → category. Use Back to return.

## Phase 3 — Game stubs

**Date:** 2026-09-02

**What changed.** Opening a game lands on a **full stub screen**: title, player count, a static preview of the board or prompts, and numbered rules. All seven v1 games have a preview (Would You Rather, This or That, Two Truths, Never Have I Ever, Tic-Tac-Toe, Connect Four, Hangman). Nothing syncs yet — that is Phase 4.

**Why.** Couples should walk the whole browse path and see what each night game will look like before rooms exist.

**How to try it.** `npm run dev` → pick a category → pick a game. Confirm `#/play/tic-tac-toe` (and the others) show a preview plus “How it works”. Back returns to that category’s deck.

## Phase 4 — Rooms and PeerJS

**Date:** 2026-09-02

**What changed.** Added a **night** (`#/night`): create a 6-character code or join one. Host and guest connect over **PeerJS**. They exchange `hello` plus a ping/pong so both can see **Connected** and a latency. The header pill tracks waiting / connected. The Peer link stays up while you browse games. Synced boards are still later.

**Why.** Two people need a live pipe before any game can share a board.

**How to try it.** Run the app, open it in two browsers. Create on one, join with the code on the other. Both should say Connected. Then pick a game — the stub should mention you are live with your partner.

## GitHub Pages (static host)

**Date:** 2026-09-02

**What changed.** Vite `base` is `/LDRG/` when `GITHUB_PAGES=true`. A GitHub Actions workflow builds `dist/` and deploys to Pages. Local `npm run dev` still uses `/`.

**Why.** Project Pages is a subpath; without `base`, JS/CSS 404.

**How to try it.** Push to `main`, enable Pages from Actions, open `https://<user>.github.io/LDRG/`. Ignore “Start a night” if you are not testing two devices.
