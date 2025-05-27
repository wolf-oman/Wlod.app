import { motion } from "framer-motion";
import { MessageSquare, Code, Eye, Users, Cloud, BarChart3, ArrowLeft } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "دردشة ذكية مع Gemini AI",
      description: "تفاعل مع نموذج لغوي متقدم لتوليد الأفكار والأكواد بذكاء اصطناعي متطور",
      color: "from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-green)_/_0.05)]",
      actionColor: "text-[hsl(var(--cyber-cyan))]",
      action: "اكتشف المزيد"
    },
    {
      icon: Code,
      title: "محرر أكواد متطور",
      description: "عرض وتعديل الأكواد المولدة مع syntax highlighting احترافي وذكي",
      color: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-blue))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-cyan)_/_0.05)]",
      actionColor: "text-[hsl(var(--cyber-green))]",
      action: "جرب الآن"
    },
    {
      icon: Eye,
      title: "معاينة حية",
      description: "شاهد كيف سيبدو مشروعك في الوقت الفعلي مع تحديثات فورية",
      color: "from-[hsl(var(--cyber-pink))] to-[hsl(var(--cyber-purple))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-pink)_/_0.05)]",
      actionColor: "text-[hsl(var(--cyber-purple))]",
      action: "ابدأ المعاينة"
    },
    {
      icon: Users,
      title: "إدارة الفريق",
      description: "تعاون مع فريقك بسهولة وإدارة المشاريع بكفاءة عالية",
      color: "from-[hsl(var(--cyber-purple))] to-[hsl(var(--cyber-pink))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-purple)_/_0.05)]",
      actionColor: "text-[hsl(var(--cyber-cyan))]",
      action: "إدارة الفريق"
    },
    {
      icon: Cloud,
      title: "نشر وتوزيع",
      description: "انشر تطبيقاتك على السحابة بنقرة واحدة وبأمان عالي",
      color: "from-[hsl(var(--cyber-gold))] to-[hsl(var(--cyber-green))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-gold)_/_0.05)]",
      actionColor: "text-[hsl(var(--cyber-green))]",
      action: "ابدأ النشر"
    },
    {
      icon: BarChart3,
      title: "تحليلات متقدمة",
      description: "راقب أداء مشاريعك واحصل على إحصائيات مفصلة",
      color: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-purple))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-cyan)_/_0.05)]",
      actionColor: "text-[hsl(var(--cyber-pink))]",
      action: "عرض التحليلات"
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono font-bold text-[hsl(var(--cyber-green))] text-glow mb-4">
            الميزات الرئيسية
          </h2>
          <p className="text-xl text-gray-300">أدوات متطورة لمطوري المستقبل</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`group glass rounded-xl p-6 ${feature.hoverColor} transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Feature Header */}
              <div className="flex items-center mb-4">
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center text-white mr-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>

              {/* Feature Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature Action */}
              <motion.div
                className={`flex items-center ${feature.actionColor} text-sm font-medium cursor-pointer`}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {feature.action}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
