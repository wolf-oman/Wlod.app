import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User, Send, Mic, Settings, Maximize2, Code, Palette, Bug, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "مرحباً! أنا مساعدك الذكي. 🤖✨\n\n\"كنت متمرداً... لا لأنني أريد أن أخالف، بل لأنني لا أستطيع أن أكذب\"\n\nدعني أساعدك في رحلة الإبداع البرمجي، حيث كل سطر كود هو قطرة من روحك تتدفق في العالم الرقمي.",
      timestamp: new Date()
    },
    {
      id: "2",
      type: "user",
      content: "أريد إنشاء تطبيق ويب لإدارة المهام بتصميم cyberpunk",
      timestamp: new Date()
    },
    {
      id: "3",
      type: "ai",
      content: "فكرة ممتازة! 🌟💻\n\n\"الإبداع لا يولد من الفراغ، بل من صدام الأفكار في ظلمة الليل\"\n\nسأساعدك في إنشاء تطبيق إدارة المهام بتصميم cyberpunk. دعنا نزرع هذا الحلم معاً:\n\n• 🎨 تصميم واجهة مستخدم بألوان النيون الساحرة\n• ✨ إضافة تأثيرات بصرية متقدمة تأسر العين\n• ⚡ تطوير نظام إدارة المهام بذكاء وإبداع\n\nكل سطر كود سنكتبه سيكون قطرة من روحنا في هذا العالم الرقمي الجميل.",
      timestamp: new Date()
    }
  ]);

  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { icon: Code, label: "إنشاء كود", color: "hover:bg-[hsl(var(--cyber-green)_/_0.1)]" },
    { icon: Palette, label: "تصميم UI", color: "hover:bg-[hsl(var(--cyber-cyan)_/_0.1)]" },
    { icon: Bug, label: "إصلاح الأخطاء", color: "hover:bg-[hsl(var(--cyber-pink)_/_0.1)]" },
    { icon: Rocket, label: "تحسين الأداء", color: "hover:bg-[hsl(var(--cyber-purple)_/_0.1)]" }
  ];

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "شكراً لك على سؤالك! سأعمل على تحليل طلبك وتقديم المساعدة المناسبة.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <section id="chat" className="py-20 px-4 bg-gradient-to-br from-[hsl(var(--cyber-navy)_/_0.5)] to-[hsl(var(--cyber-slate)_/_0.5)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono font-bold text-[hsl(var(--cyber-cyan))] text-glow mb-4">
            الدردشة الذكية مع Gemini AI
          </h2>
          <p className="text-xl text-gray-300">تفاعل مع الذكاء الاصطناعي لتطوير مشاريعك</p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          className="glass rounded-2xl p-6 h-96 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[hsl(var(--cyber-green)_/_0.3)]">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-5 h-5 text-[hsl(var(--cyber-dark))]" />
              </motion.div>
              <div>
                <h3 className="font-bold text-[hsl(var(--cyber-green))]">Gemini AI Assistant</h3>
                <p className="text-sm text-gray-400">متصل ونشط</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="icon"
                className="glass hover:bg-[hsl(var(--cyber-green)_/_0.2)] transition-colors"
              >
                <Settings className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass hover:bg-[hsl(var(--cyber-green)_/_0.2)] transition-colors"
              >
                <Maximize2 className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="h-64 mb-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex items-start space-x-3 rtl:space-x-reverse ${
                    message.type === "user" ? "justify-end" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {message.type === "ai" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-[hsl(var(--cyber-dark))]" />
                    </div>
                  )}
                  
                  <div
                    className={`rounded-lg p-3 max-w-md ${
                      message.type === "ai"
                        ? "glass"
                        : "bg-gradient-to-br from-[hsl(var(--cyber-blue))] to-[hsl(var(--cyber-purple))]"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>

                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--cyber-blue))] to-[hsl(var(--cyber-purple))] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Input Area */}
        <motion.div
          className="flex space-x-4 rtl:space-x-reverse mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="اكتب رسالتك هنا..."
              className="glass border-[hsl(var(--cyber-green)_/_0.3)] focus:border-[hsl(var(--cyber-green))] text-white placeholder-gray-400"
            />
          </div>
          <Button
            onClick={sendMessage}
            className="px-6 py-3 bg-gradient-to-r from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] text-[hsl(var(--cyber-dark))] font-bold hover:scale-105 transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="px-4 py-3 glass border-[hsl(var(--cyber-cyan)_/_0.3)] hover:bg-[hsl(var(--cyber-cyan)_/_0.2)] transition-colors"
          >
            <Mic className="w-4 h-4 text-[hsl(var(--cyber-cyan))]" />
          </Button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              className={`glass rounded-lg p-4 ${action.color} transition-colors text-center`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <action.icon className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--cyber-cyan))]" />
              <p className="text-sm text-white">{action.label}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
