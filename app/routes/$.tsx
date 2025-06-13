import type { Route } from './+types/$';

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  // Handle Chrome DevTools specific requests
  if (url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    // Return an empty JSON response for DevTools
    return new Response('{}', {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // For other unmatched routes, return 404
  throw new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  });
}

export default function SplatRoute() {
  // This component should never render since we're throwing responses in the loader
  return null;
}
