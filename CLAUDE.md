# Cross-Stitch Generator

Web app that converts uploaded images into cross-stitch embroidery patterns.
Currently a frontend-only MVP — pattern generation logic is not yet implemented.

## Stack

React Router 7 (SSR), React 19, TypeScript, Vite, Tailwind CSS 4, i18next (EN/RU), vite-plugin-pwa, react-dropzone, Sonner.

## Commands

| Command             | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Dev server at http://localhost:5173  |
| `npm run build`     | Production build → `build/`          |
| `npm run start`     | Serve production build on port 3000  |
| `npm run typecheck` | TypeScript + React Router type check |

## Architecture

- `app/components/` — shared UI components
- `app/pages/` — page-level components (`welcome/`, `preview/`)
- `app/routes/` — React Router route handlers; keep thin, delegate to pages
- `app/contexts/` — React Context providers (currently only `ThemeContext`)
- `app/hooks/` — custom hooks
- `app/i18n/` — i18next config + all EN/RU strings in `resources.ts`
- `app/utils/` — pure utility functions

Larger components live in their own folder with subcomponents inside a `components/` subfolder — see `app/components/FileDropzone/` as the reference.

## Conventions

- TypeScript everywhere, no `any`
- Functional components only
- Tailwind for all styling; dark mode via `dark:` prefix; primary color `#6b449a`
- No hardcoded UI strings — every user-visible string goes through i18next
- All translation keys in `app/i18n/resources.ts`; always add both `en` and `ru` when adding a key
- Theme state via `useTheme` hook — do not read `localStorage` directly in components
- SSR: avoid `window`/`document` at module level; use `useIsomorphicLayoutEffect` instead of `useLayoutEffect`
