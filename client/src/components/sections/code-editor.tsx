import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Play, Save, Smartphone, Tablet, Monitor, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CodeEditor() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);

  const codeLines = [
    { number: 1, content: [
      { text: "import", className: "syntax-keyword" },
      { text: " React ", className: "syntax-variable" },
      { text: "from", className: "syntax-keyword" },
      { text: " 'react'", className: "syntax-string" }
    ]},
    { number: 2, content: [
      { text: "import", className: "syntax-keyword" },
      { text: " { useState } ", className: "syntax-variable" },
      { text: "from", className: "syntax-keyword" },
      { text: " 'react'", className: "syntax-string" }
    ]},
    { number: 3, content: [] },
    { number: 4, content: [
      { text: "function", className: "syntax-keyword" },
      { text: " App", className: "syntax-function" },
      { text: "() {", className: "syntax-variable" }
    ]},
    { number: 5, content: [
      { text: "  ", className: "" },
      { text: "const", className: "syntax-keyword" },
      { text: " [count, setCount] = ", className: "syntax-variable" },
      { text: "useState", className: "syntax-function" },
      { text: "(", className: "syntax-variable" },
      { text: "0", className: "syntax-number" },
      { text: ")", className: "syntax-variable" }
    ]},
    { number: 6, content: [] },
    { number: 7, content: [
      { text: "  ", className: "" },
      { text: "return", className: "syntax-keyword" },
      { text: " (", className: "syntax-variable" }
    ]},
    { number: 8, content: [
      { text: "    <", className: "syntax-variable" },
      { text: "div", className: "syntax-tag" },
      { text: " className", className: "syntax-attribute" },
      { text: "=", className: "syntax-variable" },
      { text: '"cyberpunk-app"', className: "syntax-string" },
      { text: ">", className: "syntax-variable" }
    ]},
    { number: 9, content: [
      { text: "      <", className: "syntax-variable" },
      { text: "h1", className: "syntax-tag" },
      { text: ">WolfOmanAI Studio</", className: "syntax-variable" },
      { text: "h1", className: "syntax-tag" },
      { text: ">", className: "syntax-variable" }
    ]},
    { number: 10, content: [
      { text: "    </", className: "syntax-variable" },
      { text: "div", className: "syntax-tag" },
      { text: ">", className: "syntax-variable" }
    ]},
    { number: 11, content: [
      { text: "  )", className: "syntax-variable" }
    ]},
    { number: 12, content: [
      { text: "}", className: "syntax-variable" }
    ]}
  ];

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <section id="editor" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono font-bold text-[hsl(var(--cyber-purple))] text-glow mb-4">
            محرر الأكواد المتطور
          </h2>
          <p className="text-xl text-gray-300">محرر احترافي مع دعم كامل للغات البرمجة</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <motion.div
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--cyber-green)_/_0.3)]">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-400">main.jsx</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32 bg-transparent text-[hsl(var(--cyber-cyan))] text-sm border-[hsl(var(--cyber-cyan)_/_0.3)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[hsl(var(--cyber-green)_/_0.2)]"
                >
                  <Copy className="w-4 h-4 text-[hsl(var(--cyber-green))]" />
                </Button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 bg-[hsl(var(--cyber-dark)_/_0.5)] font-mono text-sm">
              <div className="space-y-1">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={line.number}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-gray-500 w-8 select-none">{line.number}</span>
                    <div className="flex-1">
                      {line.content.map((token, tokenIndex) => (
                        <span key={tokenIndex} className={token.className}>
                          {token.text}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Editor Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[hsl(var(--cyber-green)_/_0.3)]">
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-400">
                <span>Lines: 12</span>
                <span>Characters: 234</span>
                <span>JavaScript</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="px-3 py-1 bg-[hsl(var(--cyber-green))] text-[hsl(var(--cyber-dark))] text-sm font-bold hover:scale-105 transition-transform"
                >
                  {isRunning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[hsl(var(--cyber-dark))] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      تشغيل
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="px-3 py-1 glass border-[hsl(var(--cyber-cyan)_/_0.3)] text-[hsl(var(--cyber-cyan))] text-sm hover:bg-[hsl(var(--cyber-cyan)_/_0.2)]"
                >
                  <Save className="w-3 h-3 mr-1" />
                  حفظ
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--cyber-cyan)_/_0.3)]">
              <h3 className="text-lg font-bold text-[hsl(var(--cyber-cyan))]">المعاينة المباشرة</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="icon" className="hover:bg-[hsl(var(--cyber-cyan)_/_0.2)]">
                  <Smartphone className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[hsl(var(--cyber-cyan)_/_0.2)]">
                  <Tablet className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[hsl(var(--cyber-cyan)_/_0.2)]">
                  <Monitor className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[hsl(var(--cyber-cyan)_/_0.2)]">
                  <ExternalLink className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-8 bg-gradient-to-br from-[hsl(var(--cyber-dark))] to-[hsl(var(--cyber-navy))] min-h-80 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.h1
                  className="text-3xl font-bold text-[hsl(var(--cyber-green))] text-glow mb-4"
                  animate={{ textShadow: ["0 0 10px hsl(var(--cyber-green))", "0 0 20px hsl(var(--cyber-green))", "0 0 10px hsl(var(--cyber-green))"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  WolfOmanAI Studio
                </motion.h1>
                <motion.div
                  className="inline-block bg-gradient-to-r from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] rounded-lg p-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-[hsl(var(--cyber-dark))] font-bold text-xl">0</div>
                </motion.div>
                <div className="mt-4">
                  <Button
                    className="px-6 py-2 bg-[hsl(var(--cyber-green))] text-[hsl(var(--cyber-dark))] font-bold hover:scale-105 transition-transform"
                    onClick={() => {}}
                  >
                    زيادة العداد
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Preview Footer */}
            <div className="p-4 border-t border-[hsl(var(--cyber-cyan)_/_0.3)]">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-400">
                  <span className="flex items-center">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full mr-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    متصل
                  </span>
                  <span>تحديث تلقائي</span>
                </div>
                <div className="text-[hsl(var(--cyber-cyan))]">
                  آخر تحديث: الآن
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
