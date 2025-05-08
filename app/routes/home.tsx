import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Cross Stitch Generator' },
    { name: 'description', content: 'A cross stitch pattern generator app' },
  ];
}

export default function Home() {
  return <Welcome />;
}
