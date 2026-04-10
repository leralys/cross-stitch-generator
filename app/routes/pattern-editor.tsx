import { useLocation } from 'react-router';
import { PatternEditor } from '../pages/patternEditor/patternEditor';

export function meta() {
  return [
    { title: 'Pattern Editor - Cross Stitch Pattern Generator' },
    {
      name: 'description',
      content: 'View and export your generated cross-stitch pattern',
    },
  ];
}

export default function PatternEditorRoute() {
  const location = useLocation();
  const { file, fileName, config, originalFile } = location.state || {};

  return (
    <PatternEditor
      file={file}
      fileName={fileName}
      config={config}
      originalFile={originalFile}
    />
  );
}
