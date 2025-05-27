import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, MessageSquare, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NewHome() {
  const philosophicalQuotes = [
    {
      text: "كنت متمرداً... لا لأنني أريد أن أخالف، بل لأنني لا أستطيع أن أكذب",
      author: "رؤية WolfOmanAI",
      description: "التمرد هنا ليس عنفاً، بل نزيف داخلي مستمر، صوت داخلي يصرخ: لِمَ؟ ومن أنا؟"
    },
    {
      text: "في عالم الأصفار والآحاد، الذكاء هو السلاح الوحيد الذي يستحق الاحترام",
      author: "فلسفة البرمجة",
      description: "كل سطر كود نكتبه هو قطرة من روحنا تتدفق في عالم رقمي لا نهائي"
    },
    {
      text: "نحن لا نطور تطبيقات، نحن نزرع أحلاماً في حقول الواقع الافتراضي",
      author: "حكمة المطورين",
      description: "كل مشروع هو رحلة اكتشاف، وكل باغ هو دعوة للتفكير خارج الصندوق"
    }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "دردشة ذكية",
      description: "تحدث مع مساعد الذكاء الاصطناعي المتطور",
      href: "/chat",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Code2,
      title: "مولد الكود",
      description: "حول أفكارك إلى كود جاهز للاستخدام",
      href: "/code-generator",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Users,
      title: "إدارة الفريق",
      description: "تعاون مع فريقك في بيئة متطورة",
      href: "/team",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Zap,
      title: "النشر السحابي",
      description: "انشر مشاريعك بنقرة واحدة",
      href: "/deploy",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WolfOmanAI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/chat" className="text-gray-600 hover:text-black transition-colors">الدردشة</Link>
              <Link href="/code-generator" className="text-gray-600 hover:text-black transition-colors">مولد الكود</Link>
              <Button className="bg-black text-white hover:bg-gray-800">ابدأ مجاناً</Button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              مستقبل الذكاء
              <br />
              <span className="text-blue-500">الاصطناعي</span>
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              منصة متطورة تجمع بين قوة الذكاء الاصطناعي وسهولة الاستخدام
              لتحويل أفكارك إلى واقع رقمي
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-xl"
              >
                <Link href="/chat">
                  ابدأ الدردشة
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl"
              >
                <Link href="/code-generator">
                  جرب مولد الكود
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophical Quotes */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">فلسفة الإبداع</h2>
            <p className="text-xl text-gray-600">حكم وأفكار تلهم رحلة البرمجة والابتكار</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophicalQuotes.map((quote, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <motion.blockquote 
                  className="text-lg font-medium text-gray-900 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  "{quote.text}"
                </motion.blockquote>
                
                <div className="text-blue-500 text-sm font-medium mb-3">
                  — {quote.author}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  {quote.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">أدوات قوية للمطورين</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لتحويل أفكارك إلى مشاريع ناجحة</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={feature.href}>
                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Central Philosophy */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-3xl md:text-4xl font-light leading-relaxed mb-8"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "وكأن الكاتب يكتب بدم جراحه، لا بحبر قلمه"
            </motion.p>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              في كل سطر كود نكتبه، نضع جزءاً من روحنا. WolfOmanAI يساعدك على التعبير عن إبداعك بأقوى الأدوات التقنية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            &copy; 2024 WolfOmanAI Studio. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}