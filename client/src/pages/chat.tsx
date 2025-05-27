import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot, Sparkles, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "مرحباً! أنا مساعدك الذكي في WolfOmanAI. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "شكراً لرسالتك! أعمل على معالجة طلبك وسأقدم لك الحل الأمثل. في عالم البرمجة، كل مشكلة لها حل إبداعي ينتظر الاكتشاف.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
                <p className="text-sm text-gray-500">مساعدك الذكي في البرمجة والإبداع</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">متصل</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6 mb-32">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user" 
                    ? "bg-gray-900 text-white" 
                    : "bg-blue-500 text-white"
                }`}>
                  {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  message.type === "user"
                    ? "bg-gray-900 text-white rounded-br-md"
                    : "bg-gray-50 text-gray-900 rounded-bl-md"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.type === "user" ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString('ar-SA', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="min-h-[60px] max-h-32 resize-none pr-4 pl-12 py-4 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-2xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="absolute left-3 bottom-4 flex space-x-2">
                <Code className="w-4 h-4 text-gray-400" />
                <Lightbulb className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="h-[60px] px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "ساعدني في إنشاء مكون React",
              "اشرح لي مفهوم الخوارزميات",
              "أريد تحسين أداء التطبيق"
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(suggestion)}
                className="text-xs text-gray-600 border-gray-200 hover:border-blue-500 hover:text-blue-600"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}