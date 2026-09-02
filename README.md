# LDRG

Date-night games for people in a long-distance relationship. Static site (Vite + React) so it runs on your laptop and, later, GitHub Pages.

**Theme:** bento grid minimalism — cream, beige, cyber pink. Light mode only.

This README is enough to run the app locally. Browse with the swipe deck, open a game stub, then **Start a night** so two browsers can connect with a code.

## Two devices

1. On laptop A open the app and click **Start a night** (header) → **Create a night**.
2. Copy the 6-character code.
3. On laptop B or your phone, open the same URL, **Start a night** → paste the code → **Join night**.
4. Both should show **Connected**. Keep the host tab open.

Rooms use PeerJS (WebRTC) through the public PeerJS broker — no server of yours. A firewall that blocks WebRTC can prevent the handshake.

## Run locally

You need **Node 18 or newer** (Node 22 is recorded in `.nvmrc`).

If this machine still has an old system Node, load nvm first:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
```

Then:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). On a computer, drag the card or use the arrow keys. On a phone, swipe. Hash routes look like `#/c/cozy` and `#/play/tic-tac-toe`.

## Phone on the same Wi-Fi (WSL)

`localhost` and WSL’s `172.x` address are not reachable from your phone. Bind Vite to the LAN, then use your **Windows Wi-Fi IP**.

1. In WSL, from this repo:

```bash
nvm use
npm run dev:lan
```

   Use `npm run dev -- --host` if you prefer. You need the extra `--` so Vite gets `--host`. Plain `npm run dev --host` does nothing extra.

2. Leave that process running. In **Windows PowerShell**, find the laptop’s Wi-Fi address:

```powershell
ipconfig
```

   Under **Wireless LAN adapter Wi-Fi**, copy **IPv4 Address** (something like `192.168.1.23`).

3. WSL2 NAT (typical): forward port 5173 from Windows into WSL. In **PowerShell as Administrator**:

```powershell
wsl hostname -I
```

   Copy the first IPv4 (yours is currently `172.29.193.7`; it can change after a reboot). Then:

```powershell
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=5173 connectaddress=172.29.193.7 connectport=5173
New-NetFirewallRule -DisplayName "LDRG Vite" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
```

   If `wsl hostname -I` already shows the same `192.168.x` as Windows (mirrored networking), skip the `portproxy` line.

4. On the **phone** (same Wi-Fi, not mobile data), open:

   `http://192.168.x.x:5173/#/night`

   Use the IPv4 from step 2. `http`, not `https`.

5. On the **laptop** browser: `http://localhost:5173/#/night` → **Create a night** → copy the code. On the **phone**: paste → **Join night**. Both should show **Connected**. Keep the laptop tab open.

If the phone cannot load the page: laptop and phone on the same SSID, Windows Firewall allowing 5173, and the `connectaddress` still matching `wsl hostname -I`. If the WSL IP changed, run the `portproxy` command again with the new address.

Both devices still need internet so PeerJS signaling (`0.peerjs.com`) can run; the game traffic then goes over the LAN when it can.

Production-style local build:

```bash
npm run build
npm run preview
```

## GitHub Pages

Yes: this is a static Vite app (HashRouter), so GitHub’s free hosting can serve the browse UI, game stubs, and night screen. You do **not** upload the source folder as-is — Pages needs the **build** (`dist/`), with assets under `/LDRG/`.

Do not worry about two-device rooms for this. “Start a night” may still appear; you can ignore it.

1. Create a GitHub repo named **`LDRG`** (the folder name matters for the URL).
2. Push this project to `main` (or `master`).
3. Repo **Settings → Pages → Source: GitHub Actions**.
4. After the **GitHub Pages** workflow is green, open:

   `https://<your-username>.github.io/LDRG/`

Routes look like `https://<your-username>.github.io/LDRG/#/c/classic`.

If the repo is **not** named `LDRG`, change `base` in `vite.config.ts` to `'/<that-repo-name>/'`. A user/org site (`username.github.io`) should use `base: '/'` instead.
