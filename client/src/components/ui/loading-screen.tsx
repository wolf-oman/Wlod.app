import { motion } from "framer-motion";
import { Bot } from "lucide-react";

interface LoadingScreenProps {
  isVisible: boolean;
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--cyber-dark))] via-[hsl(var(--cyber-navy))] to-[hsl(var(--cyber-slate))]"
    >
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-32 h-32 border-4 border-[hsl(var(--cyber-green))] rounded-full border-t-transparent"></div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bot className="w-12 h-12 text-[hsl(var(--cyber-green))]" />
          </motion.div>
        </motion.div>
        
        <motion.h2
          className="text-2xl font-mono text-[hsl(var(--cyber-green))] text-glow mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          WolfOmanAI
        </motion.h2>
        
        <div className="w-64 h-2 bg-[hsl(var(--cyber-slate))] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] loading-bar"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
