import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Bell, User, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "#dashboard", label: "لوحة التحكم" },
    { href: "#chat", label: "الدردشة الذكية" },
    { href: "#editor", label: "محرر الأكواد" },
    { href: "#team", label: "إدارة الفريق" },
    { href: "#deploy", label: "النشر" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-[hsl(var(--cyber-green)_/_0.3)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 rtl:space-x-reverse"
            whileHover={{ scale: 1.05 }}
          >
            <Bot className="w-8 h-8 text-[hsl(var(--cyber-green))] animate-pulse" />
            <span className="text-xl font-mono font-bold text-[hsl(var(--cyber-green))] text-glow">
              WolfOmanAI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="nav-link text-[hsl(var(--cyber-cyan))] hover:text-[hsl(var(--cyber-green))] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              className="glass hover:bg-[hsl(var(--cyber-green)_/_0.2)] transition-colors"
            >
              <Bell className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="glass hover:bg-[hsl(var(--cyber-green)_/_0.2)] transition-colors"
            >
              <User className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass hover:bg-[hsl(var(--cyber-green)_/_0.2)] transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-[hsl(var(--cyber-gold))]" />
              ) : (
                <Moon className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass hover:bg-[hsl(var(--cyber-green)_/_0.2)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
              ) : (
                <Menu className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[hsl(var(--cyber-green)_/_0.3)]"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-[hsl(var(--cyber-cyan))] hover:text-[hsl(var(--cyber-green))] transition-colors text-right"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
