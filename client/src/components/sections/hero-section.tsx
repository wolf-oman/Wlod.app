import { motion } from "framer-motion";
import { Play, Zap, Users, Code, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const stats = [
    { value: "50K+", label: "مشروع منجز", icon: Code, color: "text-[hsl(var(--cyber-green))]" },
    { value: "100K+", label: "مطور نشط", icon: Users, color: "text-[hsl(var(--cyber-cyan))]" },
    { value: "1M+", label: "كود مولد بالذكاء الاصطناعي", icon: Zap, color: "text-[hsl(var(--cyber-pink))]" },
    { value: "99.9%", label: "وقت التشغيل", icon: Cloud, color: "text-[hsl(var(--cyber-purple))]" },
  ];

  const backgroundElements = [
    { size: "w-2 h-2", position: "top-1/4 left-1/4", color: "bg-[hsl(var(--cyber-green))]", animation: "animate-ping" },
    { size: "w-1 h-1", position: "top-1/3 right-1/3", color: "bg-[hsl(var(--cyber-cyan))]", animation: "animate-pulse" },
    { size: "w-3 h-3", position: "bottom-1/4 left-1/3", color: "bg-[hsl(var(--cyber-pink))]", animation: "animate-bounce" },
    { size: "w-2 h-2", position: "top-1/2 right-1/4", color: "bg-[hsl(var(--cyber-purple))]", animation: "animate-ping" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--cyber-dark)_/_0.5)] via-transparent to-[hsl(var(--cyber-navy)_/_0.5)]" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {backgroundElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} ${element.position} ${element.color} rounded-full ${element.animation}`}
            style={{ animationDelay: `${index * 0.5}s` }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-mono font-bold mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className="text-[hsl(var(--cyber-green))] text-glow">استوديو</span>
            <br />
            <span className="text-[hsl(var(--cyber-cyan))] text-glow">WolfOmanAI</span>
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl text-[hsl(var(--cyber-pink))] font-bold mb-4 text-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀 Cyberpunk Edition 🐺
          </motion.div>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          منصتك السيبرانية المتكاملة لتطوير تطبيقات الجيل القادم
          <br className="hidden md:block" />
          بالاستعانة بالذكاء الاصطناعي المتقدم
        </motion.p>

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.p
            className="text-lg text-[hsl(var(--cyber-gold))] font-mono italic px-6 py-3 glass rounded-full inline-block border border-[hsl(var(--cyber-gold)_/_0.3)]"
            animate={{ 
              textShadow: ["0 0 10px hsl(var(--cyber-gold))", "0 0 20px hsl(var(--cyber-gold))", "0 0 10px hsl(var(--cyber-gold))"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            "نحن لا نطور تطبيقات، نحن نزرع أحلاماً في حقول الواقع الافتراضي"
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="group relative px-8 py-4 bg-gradient-to-r from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] text-[hsl(var(--cyber-dark))] font-bold hover:scale-105 transition-all duration-300 cyber-border overflow-hidden"
          >
            <span className="relative z-10">ابدأ الآن</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-green))] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.05 }}
            />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group px-8 py-4 glass border-[hsl(var(--cyber-green)_/_0.5)] hover:border-[hsl(var(--cyber-green))] text-[hsl(var(--cyber-green))] hover:bg-[hsl(var(--cyber-green)_/_0.2)] transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2" />
            شاهد العرض التوضيحي
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-lg p-4 hover:bg-[hsl(var(--cyber-green)_/_0.1)] transition-colors"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <motion.div
                className={`text-2xl font-bold ${stat.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
