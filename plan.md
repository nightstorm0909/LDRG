# LDRG — plan

A static webapp for long-distance couples who want to hang out and play together for the night. Hosted locally and on GitHub Pages. Couples join with a room code over PeerJS (WebRTC); there is no custom backend.

## Theme

**Bento grid minimalism** — Apple / Notion-like tiles: cream white, soft beige, one cyber-pink accent (`#ff2d95`). Thin 1px borders, generous radius, line icons, Plus Jakarta Sans. **Light mode only.**

## Stack

Vite + React + TypeScript, HashRouter (later), PeerJS, GitHub Actions for Pages.

## Phases

Each phase is a significant change from the previous one. Progress is recorded in [evolution.md](evolution.md).

1. **Scaffold and bento theme** — Vite React TS app, asymmetric bento home, light/dark toggle. *Significant:* the project exists and looks like a scannable date-night dashboard.
2. **Swipe deck browse** — centered rectangular cards; swipe left (or ←) to cycle, swipe right (or →) to enter a category or start a game stub. Mouse drag on desktop, touch on mobile. *Significant:* choosing is a deliberate swipe, not an auto-scrolling strip.
3. **Game stubs in the same deck** — per-category game cards (same swipe UI), stub play screens with name/rules. *Significant:* full browse path without multiplayer.
4. **Rooms and PeerJS** — create/join, connection status, ping/hello. *Significant:* two browsers can see “connected.”
5. **First synced games** — Tic-Tac-Toe + Would You Rather over DataConnection. *Significant:* a real shared night, not just a lobby.
6. **Rest of v1 games** — This or That, Two Truths, Never Have I Ever, Connect Four, Hangman. *Significant:* all advertised categories are playable.
7. **Pages, polish, docs** — GitHub Actions, `base` path, README, reduced-motion and mobile fixes. *Significant:* laptop + GitHub Pages both documented and working.
