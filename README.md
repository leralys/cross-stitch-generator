# Cross-Stitch Generator

A web app for converting images into cross-stitch embroidery patterns. Upload an image, get a stitchable pattern.

## Stack

- **React Router 7** — full-stack framework with SSR
- **React 19 + TypeScript**
- **Vite + Tailwind CSS 4**
- **i18next** — EN/RU localization
- **vite-plugin-pwa** — PWA, installable on mobile & desktop
- **Sonner** — toast notifications
- **react-dropzone** — file upload

## Running locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Other commands

| Command             | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run build`     | Production build → `build/`          |
| `npm run start`     | Serve production build on port 3000  |
| `npm run typecheck` | TypeScript + React Router type check |

## Docker

```bash
docker build -t cross-stitch-generator .
docker run -p 3000:3000 cross-stitch-generator
```

## Project structure

```
app/
├── components/       # Shared UI components (Header, FileDropzone, ThemeToggle, ...)
├── pages/            # Page-level components
│   ├── welcome/      # Home page — hero + upload section
│   └── preview/      # Pattern preview page
├── routes/           # React Router route handlers
├── contexts/         # React Context (ThemeContext)
├── hooks/            # Custom hooks (useTheme, useClickOutside, ...)
├── i18n/             # i18next config + EN/RU translation strings
├── utils/            # Utility functions
└── root.tsx          # Root layout, providers, meta tags
```

## How the app works

1. User lands on the welcome page and uploads an image (JPEG/PNG/GIF/WebP, max 10 MB)
2. Image is passed to the preview page
3. Preview page shows the image and pattern metadata (colors, size, status)
4. Pattern generation logic is the next thing to build out

## Theme & i18n

- Light/dark mode — toggled via `ThemeToggle`, stored in `localStorage`, managed through `ThemeContext`
- Language — EN/RU, auto-detected from browser, switchable via `LanguageSelector`
- All user-facing strings live in [app/i18n/resources.ts](app/i18n/resources.ts)

## PWA

The app is installable as a PWA. See [PWA-SETUP.md](PWA-SETUP.md) for details on testing and customization.

## Code style

Formatting is enforced on commit via Husky + lint-staged + Prettier. To format manually:

```bash
npx prettier --write .
```
