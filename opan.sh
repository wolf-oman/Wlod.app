#!/bin/bash

# سكربت التدمير وإعادة النشر لنظام WLODx
# تحذير: سيعيد تهيئة كل شيء، تأكد أنك مستعد

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

divider() {
    echo -e "${CYAN}==========================================${NC}"
}

ascii_logo() {
echo -e "${RED}"
echo "██╗    ██╗██╗     ██████╗  ██████╗ ██████╗ "
echo "██║    ██║██║     ██╔══██╗██╔═══██╗██╔══██╗"
echo "██║ █╗ ██║██║     ██████╔╝██║   ██║██████╔╝"
echo "██║███╗██║██║     ██╔═══╝ ██║   ██║██╔═══╝ "
echo "╚███╔███╔╝███████╗██║     ╚██████╔╝██║     "
echo " ╚══╝╚══╝ ╚══════╝╚═╝      ╚═════╝ ╚═╝     "
echo -e "${NC}"
}

ascii_logo
divider
echo -e "${RED}[!!] تهيئة تدميرية تبدأ الآن...${NC}"

# حذف العقد القديمة
rm -rf node_modules dist .vite .git
echo -e "${GREEN}✓ تم حذف النظام القديم${NC}"

# إعادة تهيئة Git
git init
echo -e "${GREEN}✓ تم إعادة تهيئة Git${NC}"

# إعادة تثبيت التبعيات
npm install
echo -e "${GREEN}✓ تم تثبيت npm من جديد${NC}"

# اختبار AstraDB (وهمي)
echo -e "${CYAN}[~] اختبار اتصال AstraDB...${NC}"
echo "✓ [mock] AstraDB responded with 200 OK"

# اختبار الذكاء الصناعي
echo -e "${CYAN}[~] اختبار ذكاء صناعي (DeepSeek)...${NC}"
echo "✓ [mock] AI responded: 'Welcome back, WLODx'"

# ختم الطرفية
divider
ascii_logo
echo -e "${RED}>>> تمت إعادة بناء النظام بالكامل بنجاح.${NC}"
echo -e "${CYAN}نفذ الآن: ${GREEN}npm run dev ${CYAN}أو ${GREEN}wrangler dev${NC}"
divider

# إنشاء alias دائم
echo "alias wlod='bash ~/wlod-destroy-and-redeploy.sh'" >> ~/.zshrc
echo -e "${YELLOW}✔ تم تفعيل alias باسم wlod داخل zsh${NC}"
