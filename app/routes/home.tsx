import { Welcome } from '../pages/welcome/welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Cross Stitch Pattern Generator' },
    {
      name: 'description',
      content: 'Generate beautiful cross stitch patterns from images',
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
