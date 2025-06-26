import { useLocation } from 'react-router';
import { Preview } from '../pages/preview/preview';

export function meta() {
  return [
    { title: 'Pattern Preview - Cross Stitch Pattern Generator' },
    {
      name: 'description',
      content: 'Preview your uploaded image and generate cross stitch patterns',
    },
  ];
}

export default function PreviewRoute() {
  const location = useLocation();
  const { file, fileName } = location.state || {};

  return <Preview file={file} fileName={fileName} />;
}
