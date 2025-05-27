import { motion } from "framer-motion";
import { Eye, Settings, ExternalLink, FileText, Cloud, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function DeploymentSection() {
  const deployments = [
    {
      name: "Production - تطبيق إدارة المهام",
      version: "v2.1.0",
      time: "منذ ساعتين",
      status: "مباشر",
      statusColor: "text-green-400",
      borderColor: "border-[hsl(var(--cyber-green)_/_0.3)]",
      dotColor: "bg-green-400"
    },
    {
      name: "Staging - تطبيق الطقس",
      version: "v1.3.0-beta",
      time: "منذ يوم",
      status: "في التطوير",
      statusColor: "text-yellow-400",
      borderColor: "border-[hsl(var(--cyber-gold)_/_0.3)]",
      dotColor: "bg-yellow-400"
    }
  ];

  const cloudProviders = [
    { name: "AWS", icon: "☁️", color: "hover:bg-[hsl(var(--cyber-cyan)_/_0.1)]", border: "border-[hsl(var(--cyber-cyan)_/_0.3)]" },
    { name: "Azure", icon: "🌐", color: "hover:bg-[hsl(var(--cyber-blue)_/_0.1)]", border: "border-[hsl(var(--cyber-blue)_/_0.3)]" },
    { name: "GCP", icon: "🚀", color: "hover:bg-[hsl(var(--cyber-green)_/_0.1)]", border: "border-[hsl(var(--cyber-green)_/_0.3)]" },
    { name: "Docker", icon: "🐳", color: "hover:bg-[hsl(var(--cyber-purple)_/_0.1)]", border: "border-[hsl(var(--cyber-purple)_/_0.3)]" }
  ];

  const deploymentSettings = [
    { label: "النشر التلقائي", enabled: true },
    { label: "التحديث المتدرج", enabled: false },
    { label: "مراقبة الأداء", enabled: true }
  ];

  return (
    <section id="deploy" className="py-20 px-4 bg-gradient-to-br from-[hsl(var(--cyber-navy)_/_0.3)] to-[hsl(var(--cyber-slate)_/_0.3)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono font-bold text-[hsl(var(--cyber-cyan))] text-glow mb-4">
            النشر والتوزيع
          </h2>
          <p className="text-xl text-gray-300">انشر تطبيقاتك على السحابة بنقرة واحدة</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deployment Status */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[hsl(var(--cyber-cyan))] mb-6">حالة النشر</h3>

            <div className="space-y-4">
              {deployments.map((deployment, index) => (
                <motion.div
                  key={deployment.name}
                  className={`p-4 bg-[hsl(var(--cyber-dark)_/_0.3)] rounded-lg border ${deployment.borderColor}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{deployment.name}</h4>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <motion.div
                        className={`w-2 h-2 ${deployment.dotColor} rounded-full`}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className={`text-sm ${deployment.statusColor}`}>{deployment.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>الإصدار: {deployment.version}</span>
                    <span>آخر تحديث: {deployment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      className="bg-[hsl(var(--cyber-green))] text-[hsl(var(--cyber-dark))] hover:scale-105 transition-transform"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      عرض
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass border-[hsl(var(--cyber-green)_/_0.3)] text-[hsl(var(--cyber-green))] hover:bg-[hsl(var(--cyber-green)_/_0.2)]"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      السجلات
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deployment Options */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[hsl(var(--cyber-purple))] mb-6">خيارات النشر</h3>

            <div className="space-y-4">
              {/* Cloud Providers */}
              <div className="grid grid-cols-2 gap-4">
                {cloudProviders.map((provider, index) => (
                  <motion.button
                    key={provider.name}
                    className={`p-4 glass rounded-lg ${provider.color} transition-colors ${provider.border} group`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-2xl mb-2"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {provider.icon}
                      </motion.div>
                      <p className="text-sm font-semibold text-white">{provider.name}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Deployment Settings */}
              <div className="space-y-3 mt-6">
                {deploymentSettings.map((setting, index) => (
                  <motion.div
                    key={setting.label}
                    className="glass rounded-lg p-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-white">{setting.label}</span>
                      <Switch defaultChecked={setting.enabled} />
                    </label>
                  </motion.div>
                ))}
              </div>

              {/* Deploy Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  className="w-full mt-6 py-3 bg-gradient-to-r from-[hsl(var(--cyber-purple))] to-[hsl(var(--cyber-pink))] text-white font-bold hover:scale-105 transition-all duration-300 cyber-border"
                  size="lg"
                >
                  <Cloud className="w-5 h-5 mr-2" />
                  نشر المشروع الجديد
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
