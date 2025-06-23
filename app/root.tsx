import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import Header from './components/Header';
import HydrationBoundary from './components/HydrationBoundary';
import InstallPrompt from './components/InstallPrompt';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import './i18n'; // Initialize i18n

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  // Apple Touch Icons
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  {
    rel: 'apple-touch-icon-precomposed',
    href: '/apple-touch-icon-precomposed.png',
  },
  // PWA Manifest
  { rel: 'manifest', href: '/manifest.webmanifest' },
];

function LayoutInner({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();

  // Apply theme class based on current theme state
  // Use suppressHydrationWarning to prevent mismatch warnings during initial hydration
  const htmlClassName = theme === 'dark' ? 'dark' : '';

  return (
    <html lang="en" className={htmlClassName} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#6b449a" id="theme-color-meta" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CrossStitch" />
        <meta
          name="description"
          content="Generate beautiful cross stitch patterns from images"
        />

        <Meta />
        <Links />

        {/* Minimal script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Only handle theme color updates and language, not theme class
                function updateThemeColor() {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

                  const themeColorMeta = document.getElementById('theme-color-meta');
                  if (themeColorMeta) {
                    const newColor = isDark ? '#111827' : '#6b449a';
                    themeColorMeta.setAttribute('content', newColor);
                  }
                }

                function applyInitialLanguage() {
                  const savedLang = localStorage.getItem('i18nextLng');
                  const browserLang = navigator.language.toLowerCase();
                  const lang = (savedLang && (savedLang === 'en' || savedLang === 'ru')) 
                    ? savedLang
                    : (browserLang.startsWith('ru') ? 'ru' : 'en');

                  document.documentElement.setAttribute('lang', lang);
                }

                // Apply initial language and theme color
                applyInitialLanguage();
                updateThemeColor();

                // Listen for system theme changes for theme color updates
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <HydrationBoundary>
          <Header />
          <main className="container mx-auto px-4 py-6">{children}</main>
          <InstallPrompt />
        </HydrationBoundary>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutInner>{children}</LayoutInner>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
