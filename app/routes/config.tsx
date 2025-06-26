import { useLocation } from 'react-router';
import { PatternConfig } from '../pages/patternConfig/patternConfig';

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

  return <PatternConfig file={file} fileName={fileName} />;
}
