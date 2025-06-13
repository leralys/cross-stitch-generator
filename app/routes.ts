import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  // Splat route for Chrome DevTools and other unmatched requests
  route('*', 'routes/$.tsx'),
] satisfies RouteConfig;
