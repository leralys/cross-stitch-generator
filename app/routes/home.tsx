import { Welcome } from '../welcome/welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Cross Stitch Generator' },
    {
      name: 'description',
      content: 'Generate beautiful cross stitch patterns from images',
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
