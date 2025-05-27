import { useEffect, useState } from 'react';
import EditorPreviewTabs from './EditorPreviewTabs';
import PreviewIframe from './PreviewIframe';
import AiChat from './AiChat';

export default function EditorPage() {
  const [code, setCode] = useState('// Start coding here...');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="border-r p-4 overflow-auto">
        <EditorPreviewTabs code={code} onChangeCode={setCode} />
      </div>
      <div className="p-4 flex flex-col gap-4 overflow-auto">
        <PreviewIframe code={code} />
        <AiChat codeContext={code} />
      </div>
    </div>
  );
}
