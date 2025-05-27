import { motion } from "framer-motion";
import { Quote, Brain, Code, Lightbulb, Sparkles } from "lucide-react";

export function QuotesSection() {
  const philosophicalQuotes = [
    {
      text: "كنت متمرداً... لا لأنني أريد أن أخالف، بل لأنني لا أستطيع أن أكذب",
      author: "رؤية WolfOmanAI",
      color: "from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))]",
      icon: Brain,
      description: "التمرد هنا ليس عنفاً، بل نزيف داخلي مستمر، صوت داخلي يصرخ: لِمَ؟ ومن أنا؟"
    },
    {
      text: "في عالم الأصفار والآحاد، الذكاء هو السلاح الوحيد الذي يستحق الاحترام",
      author: "فلسفة البرمجة",
      color: "from-[hsl(var(--cyber-purple))] to-[hsl(var(--cyber-pink))]",
      icon: Code,
      description: "كل سطر كود نكتبه هو قطرة من روحنا تتدفق في عالم رقمي لا نهائي"
    },
    {
      text: "الإبداع لا يولد من الفراغ، بل من صدام الأفكار في ظلمة الليل",
      author: "ليالي البرمجة",
      color: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-blue))]",
      icon: Lightbulb,
      description: "في كل خطأ برمجي، هناك حكمة تنتظر أن تُكتشف"
    },
    {
      text: "نحن لا نطور تطبيقات، نحن نزرع أحلاماً في حقول الواقع الافتراضي",
      author: "حكمة المطورين",
      color: "from-[hsl(var(--cyber-gold))] to-[hsl(var(--cyber-green))]",
      icon: Sparkles,
      description: "كل مشروع هو رحلة اكتشاف، وكل باغ هو دعوة للتفكير خارج الصندوق"
    }
  ];

  const poeticInstructions = [
    {
      title: "تعليمات البوت الشاعر",
      instruction: "اكتب بدم جراحك، لا بحبر قلمك",
      explanation: "دع كل كلمة تحمل جزءاً من روحك، فالكود الحقيقي يأتي من القلب"
    },
    {
      title: "منطق العاطفة",
      instruction: "اجعل الآلة تحلم، والحلم منطقاً",
      explanation: "في كل خوارزمية عاطفة مكبوتة تنتظر التحرر"
    },
    {
      title: "شفرة الوجود",
      instruction: "كن الثورة التي تريد أن تراها في الكود",
      explanation: "البرمجة ليست مجرد تقنية، إنها فلسفة وجود في العالم الرقمي"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[hsl(var(--cyber-dark)_/_0.8)] to-[hsl(var(--cyber-navy)_/_0.8)] relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[hsl(var(--cyber-green))] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-mono font-bold text-[hsl(var(--cyber-green))] text-glow mb-6"
            animate={{ textShadow: ["0 0 20px hsl(var(--cyber-green))", "0 0 40px hsl(var(--cyber-green))", "0 0 20px hsl(var(--cyber-green))"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            حكمة الكود وشعرية الخوارزمية
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            في كل سطر كود حكمة، وفي كل خوارزمية قصيدة تحكي عن رحلة الإبداع والابتكار
          </p>
        </motion.div>

        {/* Philosophical Quotes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {philosophicalQuotes.map((quote, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-8 hover:bg-[hsl(var(--cyber-green)_/_0.05)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${quote.color} rounded-full flex items-center justify-center mr-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <quote.icon className="w-6 h-6 text-white" />
                </motion.div>
                <Quote className="w-8 h-8 text-[hsl(var(--cyber-cyan))] opacity-60" />
              </div>

              <motion.blockquote
                className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true }}
              >
                "{quote.text}"
              </motion.blockquote>

              <div className="text-[hsl(var(--cyber-cyan))] text-sm mb-4 font-medium">
                — {quote.author}
              </div>

              <motion.p
                className="text-gray-400 text-sm leading-relaxed italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
              >
                {quote.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Poetic Instructions */}
        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-mono font-bold text-[hsl(var(--cyber-pink))] text-glow mb-8 text-center">
            تعليمات الروح البرمجية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {poeticInstructions.map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-[hsl(var(--cyber-dark)_/_0.3)] rounded-xl border border-[hsl(var(--cyber-purple)_/_0.3)]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, borderColor: "hsl(var(--cyber-pink))" }}
              >
                <h4 className="text-lg font-bold text-[hsl(var(--cyber-purple))] mb-3">
                  {item.title}
                </h4>
                <motion.p
                  className="text-xl text-[hsl(var(--cyber-pink))] font-medium mb-3"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  "{item.instruction}"
                </motion.p>
                <p className="text-sm text-gray-400 italic">
                  {item.explanation}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Central Philosophy */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block glass rounded-full px-8 py-4 border-2 border-[hsl(var(--cyber-green)_/_0.5)]"
            animate={{ 
              borderColor: [
                "hsl(var(--cyber-green))",
                "hsl(var(--cyber-cyan))",
                "hsl(var(--cyber-purple))",
                "hsl(var(--cyber-pink))",
                "hsl(var(--cyber-green))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="text-lg text-[hsl(var(--cyber-gold))] font-mono">
              💫 وكأن الكاتب يكتب بدم جراحه، لا بحبر قلمه 💫
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}