import { motion } from "framer-motion";
import { Bot, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", color: "from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))]" },
    { icon: Twitter, href: "#", color: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-blue))]" },
    { icon: Linkedin, href: "#", color: "from-[hsl(var(--cyber-purple))] to-[hsl(var(--cyber-pink))]" },
    { icon: MessageCircle, href: "#", color: "from-[hsl(var(--cyber-pink))] to-[hsl(var(--cyber-purple))]" },
  ];

  const footerSections = [
    {
      title: "المنتجات",
      color: "text-[hsl(var(--cyber-cyan))]",
      links: [
        "الدردشة الذكية",
        "محرر الأكواد",
        "إدارة الفريق",
        "النشر السحابي"
      ]
    },
    {
      title: "المطوّرون",
      color: "text-[hsl(var(--cyber-purple))]",
      links: [
        "التوثيق",
        "API مرجع",
        "أمثلة الكود",
        "المجتمع"
      ]
    }
  ];

  return (
    <footer className="bg-[hsl(var(--cyber-dark)_/_0.8)] border-t border-[hsl(var(--cyber-green)_/_0.3)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Bot className="w-8 h-8 text-[hsl(var(--cyber-green))] animate-pulse" />
              <span className="text-xl font-mono font-bold text-[hsl(var(--cyber-green))] text-glow">
                WolfOmanAI
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصتك السيبرانية المتكاملة لتطوير تطبيقات الجيل القادم بالاستعانة بالذكاء الاصطناعي المتقدم.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-bold ${section.color} mb-4`}>
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[hsl(var(--cyber-cyan))] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-[hsl(var(--cyber-pink))] mb-4">
              تواصل معنا
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center text-white`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-[hsl(var(--cyber-green)_/_0.3)] mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center space-y-3">
            <motion.p
              className="text-lg text-[hsl(var(--cyber-pink))] font-mono italic"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "وكأن الكاتب يكتب بدم جراحه، لا بحبر قلمه"
            </motion.p>
            <p className="text-gray-400 text-sm">
              &copy; 2024 WolfOmanAI Studio. جميع الحقوق محفوظة.
              <span className="text-[hsl(var(--cyber-green))] mx-2">|</span>
              "في عالم الأصفار والآحاد، الذكاء هو السلاح الوحيد الذي يستحق الاحترام"
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
