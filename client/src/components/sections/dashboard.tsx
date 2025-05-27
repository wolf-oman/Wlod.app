import { motion } from "framer-motion";
import { FolderKanban, GitBranch, Users, Rocket, TrendingUp, Plus, Check, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Dashboard() {
  const stats = [
    {
      icon: FolderKanban,
      value: "24",
      label: "مشروع نشط",
      change: "+12% هذا الشهر",
      color: "from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))]",
      bg: "hover:bg-[hsl(var(--cyber-green)_/_0.05)]"
    },
    {
      icon: GitBranch,
      value: "156",
      label: "Commit هذا الأسبوع",
      change: "+8% من الأسبوع الماضي",
      color: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-blue))]",
      bg: "hover:bg-[hsl(var(--cyber-cyan)_/_0.05)]"
    },
    {
      icon: Users,
      value: "8",
      label: "عضو فريق",
      change: "عضو جديد الأسبوع",
      color: "from-[hsl(var(--cyber-pink))] to-[hsl(var(--cyber-purple))]",
      bg: "hover:bg-[hsl(var(--cyber-pink)_/_0.05)]"
    },
    {
      icon: Rocket,
      value: "42",
      label: "عملية نشر",
      change: "100% نجاح",
      color: "from-[hsl(var(--cyber-purple))] to-[hsl(var(--cyber-pink))]",
      bg: "hover:bg-[hsl(var(--cyber-purple)_/_0.05)]"
    }
  ];

  const chartData = [
    { day: "الإثنين", value: 60 },
    { day: "الثلاثاء", value: 80 },
    { day: "الأربعاء", value: 45 },
    { day: "الخميس", value: 90 },
    { day: "الجمعة", value: 70 },
    { day: "السبت", value: 35 },
    { day: "الأحد", value: 25 }
  ];

  const recentProjects = [
    {
      name: "تطبيق إدارة المهام",
      tech: "React + TypeScript",
      status: "نشط",
      time: "منذ ساعتين",
      icon: "💻",
      statusColor: "text-[hsl(var(--cyber-green))]",
      bg: "hover:bg-[hsl(var(--cyber-green)_/_0.05)]"
    },
    {
      name: "تطبيق الطقس",
      tech: "React Native",
      status: "في التطوير",
      time: "منذ يوم",
      icon: "📱",
      statusColor: "text-[hsl(var(--cyber-gold))]",
      bg: "hover:bg-[hsl(var(--cyber-cyan)_/_0.05)]"
    },
    {
      name: "API خدمات الويب",
      tech: "Node.js + Express",
      status: "مكتمل",
      time: "منذ 3 أيام",
      icon: "🖥️",
      statusColor: "text-[hsl(var(--cyber-cyan))]",
      bg: "hover:bg-[hsl(var(--cyber-purple)_/_0.05)]"
    }
  ];

  return (
    <section id="dashboard" className="py-20 px-4 bg-gradient-to-br from-[hsl(var(--cyber-slate)_/_0.3)] to-[hsl(var(--cyber-navy)_/_0.3)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono font-bold text-[hsl(var(--cyber-gold))] text-glow mb-4">
            لوحة التحكم والإحصائيات
          </h2>
          <p className="text-xl text-gray-300">راقب أداء مشاريعك واحصل على تحليلات مفصلة</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`glass rounded-xl p-6 ${stat.bg} transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-right">
                  <motion.div
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Chart */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[hsl(var(--cyber-green))]">نشاط التطوير</h3>
              <Select defaultValue="7days">
                <SelectTrigger className="w-32 bg-transparent text-[hsl(var(--cyber-cyan))] text-sm border-[hsl(var(--cyber-cyan)_/_0.3)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">آخر 7 أيام</SelectItem>
                  <SelectItem value="30days">آخر 30 يوم</SelectItem>
                  <SelectItem value="3months">آخر 3 أشهر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-64 relative">
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48 px-4">
                {chartData.map((item, index) => (
                  <motion.div
                    key={item.day}
                    className="flex flex-col items-center"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      className="w-8 bg-gradient-to-t from-[hsl(var(--cyber-green))] to-[hsl(var(--cyber-cyan))] rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${item.value}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <span className="text-xs text-gray-400 mt-2">{item.day}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[hsl(var(--cyber-cyan))]">المشاريع الأخيرة</h3>
              <button className="text-[hsl(var(--cyber-cyan))] hover:text-[hsl(var(--cyber-green))] transition-colors text-sm">
                <Eye className="w-4 h-4 inline mr-1" />
                عرض الكل
              </button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  className={`flex items-center justify-between p-3 glass rounded-lg ${project.bg} transition-colors`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <motion.div
                      className="text-2xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {project.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-white">{project.name}</h4>
                      <p className="text-sm text-gray-400">{project.tech}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${project.statusColor} font-medium`}>
                      {project.status}
                    </div>
                    <div className="text-xs text-gray-400">{project.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
