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
import { ThemeProvider } from './contexts/ThemeContext';
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
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

        {/* Dynamic theme and language initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let isUpdating = false;

                function updateThemeColor() {
                  if (isUpdating) return;

                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

                  const themeColorMeta = document.getElementById('theme-color-meta');
                  if (themeColorMeta) {
                    const currentColor = themeColorMeta.getAttribute('content');
                    const newColor = isDark ? '#111827' : '#6b449a';

                    if (currentColor !== newColor) {
                      themeColorMeta.setAttribute('content', newColor);
                    }
                  }
                }

                function applyInitialTheme() {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

                  isUpdating = true;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  isUpdating = false;

                  updateThemeColor();
                }

                function applyInitialLanguage() {
                  // Set language attribute for better accessibility and SEO
                  const savedLang = localStorage.getItem('i18nextLng');
                  const browserLang = navigator.language.toLowerCase();
                  const lang = (savedLang && (savedLang === 'en' || savedLang === 'ru')) 
                    ? savedLang
                    : (browserLang.startsWith('ru') ? 'ru' : 'en');

                  document.documentElement.setAttribute('lang', lang);
                }

                // Apply both theme and language immediately to prevent flashes
                applyInitialTheme();
                applyInitialLanguage();

                // Listen for theme changes (only when not updating ourselves)
                const observer = new MutationObserver(function(mutations) {
                  if (!isUpdating) {
                    mutations.forEach(function(mutation) {
                      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        updateThemeColor();
                      }
                    });
                  }
                });

                observer.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ['class']
                });

                // Listen for system theme changes
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
                  if (!localStorage.getItem('theme')) {
                    applyInitialTheme();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <HydrationBoundary>
            <Header />
            <main className="container mx-auto px-4 py-6">{children}</main>
            <InstallPrompt />
          </HydrationBoundary>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
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
