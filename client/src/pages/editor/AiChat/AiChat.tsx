import { useState } from 'react';
import { runDeepSeek, runMistral, runGrok } from './useAI';

interface AiChatProps {
  codeContext: string;
}

export default function AiChat({ codeContext }: AiChatProps) {
  const [model, setModel] = useState<'deepseek' | 'mistral' | 'grok'>('deepseek');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    let result = '';
    const prompt = `Analyze this code:

${codeContext}`;
    try {
      if (model === 'deepseek') result = await runDeepSeek(prompt);
      else if (model === 'mistral') result = await runMistral(prompt);
      else result = await runGrok(prompt);
      setResponse(result);
    } catch (err: any) {
      setResponse('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-xl p-4 shadow-xl bg-white">
      <div className="flex gap-2 mb-2">
        <select value={model} onChange={(e) => setModel(e.target.value as any)} className="border p-1 rounded">
          <option value="deepseek">DeepSeek</option>
          <option value="mistral">Mistral</option>
          <option value="grok">Grok</option>
        </select>
        <button onClick={handleAsk} disabled={loading} className="bg-black text-white px-4 py-1 rounded">
          {loading ? 'Processing...' : 'Ask AI'}
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded max-h-60 overflow-auto">{response}</pre>
    </div>
  );
}
