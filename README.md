# GameOn India — QR Landing Page

The page customers land on after scanning the QR code on their GameOn India
membership card. It detects the visitor's device, puts their store first, and
sends them to the app — or tells them honestly that it is launching soon.

This is a **pure static site**. No build step, no backend, no dependencies.

## Files

| File              | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `index.html`      | The whole page markup                                  |
| `styles.css`      | All styling and animation                              |
| `script.js`       | Launch switches + device detection + status copy        |
| `gameon-logo.png` | Logo, favicon and Open Graph image                     |

## Run it locally

Any static file server works. Pick whichever you have:

```bash
# Node
npx serve .

# or Python
python -m http.server 8000
```

Then open <http://localhost:8000>.

> Open `index.html` by double-clicking only for a quick look — `file://` breaks
> the Google Fonts preconnect and some device checks. Use a server instead.

To check the mobile layout, open DevTools (F12) and toggle device emulation —
the store ordering and the "For your Android / iPhone" tag only appear on a
real mobile user agent.

## Flip the app live

Everything on the page is driven by four values at the top of `script.js`.
Nothing below the `NO EDITING BELOW THIS LINE` marker ever needs touching.

```js
const ANDROID_LIVE = true;
const ANDROID_URL  = "https://play.google.com/store/apps/details?id=...";

const IOS_LIVE = true;
const IOS_URL  = "https://apps.apple.com/in/app/...";
```

A store only goes live when its flag is `true` **and** its URL is non-empty.
The status pill, the sub-headline and both store cards update automatically.

> ⚠️ The URLs currently point at **Clash of Clans** as temporary test links.
> Replace both with the real GameOn India store URLs before launch. The real
> Android URL is kept as a comment right above them.

## Deploy

Upload the four files to any static host — Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3, or a plain `public_html` folder. Keep all four in the same
directory; the paths in `index.html` are relative.

Point the QR code on the membership card at the deployed URL.
