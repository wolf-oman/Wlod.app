import { motion } from "framer-motion";
import { UserPlus, MoreVertical, Upload, GitBranch, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TeamManagement() {
  const teamMembers = [
    {
      name: "أحمد محمد",
      role: "مطور Full Stack",
      status: "متصل",
      statusColor: "bg-green-400",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      borderColor: "border-[hsl(var(--cyber-pink))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-pink)_/_0.05)]"
    },
    {
      name: "سارة أحمد",
      role: "مصممة UI/UX",
      status: "مشغول",
      statusColor: "bg-yellow-400",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      borderColor: "border-[hsl(var(--cyber-cyan))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-cyan)_/_0.05)]"
    },
    {
      name: "خالد عبدالله",
      role: "مطور Backend",
      status: "غير متصل",
      statusColor: "bg-gray-400",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      borderColor: "border-[hsl(var(--cyber-green))]",
      hoverColor: "hover:bg-[hsl(var(--cyber-green)_/_0.05)]"
    }
  ];

  const tasks = [
    {
      title: "تطوير API المصادقة",
      assignee: "أحمد محمد",
      priority: "عالي",
      progress: 75,
      color: "border-[hsl(var(--cyber-green))]",
      progressColor: "bg-[hsl(var(--cyber-green))]"
    },
    {
      title: "تصميم واجهة لوحة التحكم",
      assignee: "سارة أحمد",
      priority: "متوسط",
      progress: 50,
      color: "border-[hsl(var(--cyber-cyan))]",
      progressColor: "bg-[hsl(var(--cyber-cyan))]"
    },
    {
      title: "اختبار وحدات النظام",
      assignee: "خالد عبدالله",
      priority: "منخفض",
      progress: 25,
      color: "border-[hsl(var(--cyber-gold))]",
      progressColor: "bg-[hsl(var(--cyber-gold))]"
    }
  ];

  const activities = [
    {
      user: "أحمد محمد",
      action: "أكمل مهمة \"تطوير API المستخدمين\"",
      time: "منذ ساعتين",
      icon: Check,
      iconColor: "bg-[hsl(var(--cyber-green))]"
    },
    {
      user: "سارة أحمد",
      action: "رفعت تصاميم جديدة للمراجعة",
      time: "منذ 3 ساعات",
      icon: Upload,
      iconColor: "bg-[hsl(var(--cyber-cyan))]"
    },
    {
      user: "خالد عبدالله",
      action: "دمج تحديثات قاعدة البيانات",
      time: "منذ 5 ساعات",
      icon: GitBranch,
      iconColor: "bg-[hsl(var(--cyber-purple))]"
    }
  ];

  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-mono font-bold text-[hsl(var(--cyber-pink))] text-glow mb-4">
            إدارة الفريق والتعاون
          </h2>
          <p className="text-xl text-gray-300">تعاون مع فريقك وأدر المشاريع بكفاءة</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Members */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[hsl(var(--cyber-pink))]">أعضاء الفريق</h3>
                <Button className="px-4 py-2 bg-gradient-to-r from-[hsl(var(--cyber-pink))] to-[hsl(var(--cyber-purple))] text-white font-bold hover:scale-105 transition-transform">
                  <UserPlus className="w-4 h-4 mr-2" />
                  إضافة عضو
                </Button>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className={`flex items-center justify-between p-4 glass rounded-lg ${member.hoverColor} transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <motion.img
                        src={member.avatar}
                        alt={`صورة شخصية لـ ${member.name}`}
                        className={`w-12 h-12 rounded-full border-2 ${member.borderColor}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div>
                        <h4 className="font-semibold text-white">{member.name}</h4>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <motion.div
                          className={`w-2 h-2 ${member.statusColor} rounded-full`}
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-gray-400">{member.status}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="glass hover:bg-[hsl(var(--cyber-pink)_/_0.2)] transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-[hsl(var(--cyber-pink))]" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tasks & Activity */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Current Tasks */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[hsl(var(--cyber-cyan))] mb-4">المهام الحالية</h3>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.title}
                    className={`p-3 bg-[hsl(var(--cyber-dark)_/_0.3)] rounded-lg border-l-4 ${task.color}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                      <span className="text-xs text-[hsl(var(--cyber-cyan))]">{task.priority}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">مكلف: {task.assignee}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`${task.progressColor} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Team Activity */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[hsl(var(--cyber-purple))] mb-4">النشاطات الأخيرة</h3>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 rtl:space-x-reverse"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div
                      className={`w-8 h-8 ${activity.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <activity.icon className="w-3 h-3 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
