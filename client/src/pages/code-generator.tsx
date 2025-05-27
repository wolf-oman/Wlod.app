import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Play, Copy, Download, Sparkles, Wand2, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("react");
  const [selectedModel, setSelectedModel] = useState<"gpt-4" | "mistral">("mistral");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState({ configured: false, availableModels: [] });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          language,
          model: selectedModel
        })
      });

      if (!response.ok) {
        throw new Error('فشل في إنشاء الكود');
      }

      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error('Error generating code:', error);
      // Fallback to local generation if API fails
      const mockCode = generateMockCode(prompt, language);
      setGeneratedCode(mockCode);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockCode = (userPrompt: string, lang: string): string => {
    const templates = {
      react: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Component = () => {
  const [state, setState] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        ${userPrompt}
      </h2>
      <p className="text-gray-600">
        مكون React تم إنشاؤه بناءً على طلبك
      </p>
    </motion.div>
  );
};

export default Component;`,
      
      javascript: `// ${userPrompt}
function createSolution() {
  const result = {
    success: true,
    message: 'تم إنشاء الحل بنجاح',
    data: []
  };
  
  // منطق العمل هنا
  console.log('Solution created for: ${userPrompt}');
  
  return result;
}

// استخدام الدالة
const solution = createSolution();
console.log(solution);`,

      python: `# ${userPrompt}
def create_solution():
    """
    حل مخصص بناءً على طلبك
    """
    result = {
        'success': True,
        'message': 'تم إنشاء الحل بنجاح',
        'data': []
    }
    
    # منطق العمل هنا
    print(f'Solution created for: ${userPrompt}')
    
    return result

# استخدام الدالة
if __name__ == "__main__":
    solution = create_solution()
    print(solution)`
    };

    return templates[lang as keyof typeof templates] || templates.javascript;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">مولد الكود الذكي</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            حول أفكارك إلى كود جاهز للاستخدام بالذكاء الاصطناعي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">وصف المشروع</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اختر لغة البرمجة
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر اللغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="vue">Vue.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اختر نموذج الذكاء الاصطناعي
                  </label>
                  <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value as "gpt-4" | "mistral")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر النموذج" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mistral">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>Mistral Codestral (للكود)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="gpt-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>GPT-4o (متطور)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Mistral أفضل للبرمجة، GPT-4 أفضل للمفاهيم العامة
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف ما تريد إنشاؤه
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="مثال: أريد مكون React لعرض قائمة المهام مع إمكانية الإضافة والحذف..."
                    className="min-h-[200px] resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      جاري الإنشاء...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      إنشاء الكود
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">قوالب سريعة</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "مكون تسجيل دخول بتصميم حديث",
                  "قائمة مهام تفاعلية",
                  "نموذج اتصال مع التحقق",
                  "شريط تنقل متجاوب"
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => setPrompt(template)}
                    className="justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <FileCode className="w-4 h-4 mr-2" />
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Code className="w-5 h-5 text-gray-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">الكود المُنشأ</h2>
                </div>
                
                {generatedCode && (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-0">
                {generatedCode ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed font-mono">
                      <code>{generatedCode}</code>
                    </pre>
                  </motion.div>
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <Code className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">سيظهر الكود المُنشأ هنا</p>
                    <p className="text-sm">اكتب وصفاً لما تريد إنشاؤه واضغط على "إنشاء الكود"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Code Stats */}
            {generatedCode && (
              <motion.div
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الكود</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">
                      {generatedCode.split('\n').length}
                    </div>
                    <div className="text-sm text-gray-600">سطر</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {generatedCode.length}
                    </div>
                    <div className="text-sm text-gray-600">حرف</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-500">
                      {language.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600">اللغة</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}