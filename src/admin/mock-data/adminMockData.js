export const adminProfile = {
  name: 'م. فيصل المدير',
  title: 'مدير النظام',
}

export const adminDashboardStats = {
  usersCount: 12840,
  activitiesCount: 45290,
  marketplaceItemsCount: 186,
  usersDelta: '+3.2% هذا الشهر',
  activitiesDelta: '+12% عن الأسبوع الماضي',
  marketplaceDelta: '+8 عناصر قيد المراجعة',
}

/** نشاط المستخدمين (طلبات/جلسات يومية — تقدير) */
export const adminUserActivitySeries = [
  { label: 'سبت', value: 4200 },
  { label: 'أحد', value: 5100 },
  { label: 'اثنين', value: 4800 },
  { label: 'ثلاثاء', value: 6200 },
  { label: 'أربعاء', value: 5900 },
  { label: 'خميس', value: 5500 },
  { label: 'جمعة', value: 3100 },
]

/** نمو النظام — تراكمي (آلاف المستخدمين) */
export const adminSystemGrowthSeries = [
  { label: 'يناير', value: 8.2 },
  { label: 'فبراير', value: 9.1 },
  { label: 'مارس', value: 10.4 },
  { label: 'أبريل', value: 11.2 },
  { label: 'مايو', value: 11.9 },
  { label: 'يونيو', value: 12.8 },
]

export const adminRecentActivity = [
  { id: '1', text: 'تسجيل دخول مسؤول من IP جديد', time: 'منذ 5 دقائق', tone: 'info' },
  { id: '2', text: 'رفض عنصر في المتجر — مراجعة يدوية', time: 'منذ 22 دقيقة', tone: 'warning' },
  { id: '3', text: 'مزامنة نسخ احتياطي مكتملة', time: 'منذ ساعة', tone: 'success' },
  { id: '4', text: 'تعطيل حساب مؤقت — طلب دعم', time: 'اليوم 08:10', tone: 'neutral' },
]

export const adminUsers = [
  { id: 'u1', name: 'نورة الأحمد', email: 'n.alahmad@edu.sa', role: 'teacher', status: 'active' },
  { id: 'u2', name: 'خالد العتيبي', email: 'k.teacher@edu.sa', role: 'teacher', status: 'active' },
  { id: 'u3', name: 'سارة الطالبة', email: 's.student@edu.sa', role: 'student', status: 'active' },
  { id: 'u4', name: 'مدير فرع الشمال', email: 'branch.admin@edu.sa', role: 'admin', status: 'active' },
  { id: 'u5', name: 'عمر المشبوه', email: 'spam@temp.mail', role: 'student', status: 'disabled' },
  { id: 'u6', name: 'لينا حسن', email: 'l.student@edu.sa', role: 'student', status: 'active' },
]

export const adminRoleLabels = {
  admin: 'مدير',
  teacher: 'مدرس',
  student: 'طالب',
}

export const adminRoleFilterOptions = ['الكل', 'admin', 'teacher', 'student']

export const adminActivityLogs = [
  { id: 'l1', user: 'نورة الأحمد', action: 'تسجيل دخول', type: 'auth', time: '2026-03-27 09:12:04' },
  { id: 'l2', user: 'النظام', action: 'نسخ احتياطي تلقائي', type: 'system', time: '2026-03-27 08:00:00' },
  { id: 'l3', user: 'مدير فرع الشمال', action: 'تعديل صلاحيات مستخدم', type: 'admin', time: '2026-03-26 16:40:22' },
  { id: 'l4', user: 'خالد العتيبي', action: 'رفع بنك أسئلة', type: 'content', time: '2026-03-26 14:18:09' },
  { id: 'l5', user: 'النظام', action: 'تنبيه حمل عالٍ على الخادم', type: 'alert', time: '2026-03-26 11:05:33' },
  { id: 'l6', user: 'سارة الطالبة', action: 'إكمال اختبار', type: 'exam', time: '2026-03-25 19:22:11' },
]

export const adminLogTypeLabels = {
  all: 'الكل',
  auth: 'دخول',
  system: 'نظام',
  admin: 'إدارة',
  content: 'محتوى',
  alert: 'تنبيه',
  exam: 'اختبار',
}

export const adminMarketplaceItems = [
  {
    id: 'm1',
    title: 'بنك فيزياء متقدم — المرحلة الثانوية',
    owner: 'د. رامي السعيد',
    status: 'pending',
  },
  {
    id: 'm2',
    title: 'حزمة اختبارات عربي — البلاغة',
    owner: 'أ. هدى المنصور',
    status: 'pending',
  },
  {
    id: 'm3',
    title: 'تمارين برمجة — Python',
    owner: 'م. ياسر فهد',
    status: 'approved',
  },
  {
    id: 'm4',
    title: 'محتوى مكرر — قيد المراجعة',
    owner: 'حساب تجريبي',
    status: 'rejected',
  },
]

/** إحصائيات — مستخدمون عبر الزمن */
export const adminUsersOverTime = [
  { label: 'الأسبوع 1', value: 11800 },
  { label: 'الأسبوع 2', value: 12100 },
  { label: 'الأسبوع 3', value: 12450 },
  { label: 'الأسبوع 4', value: 12840 },
]

/** تفاعل داخل النظام */
export const adminEngagementSeries = [
  { label: 'محاضرات', value: 42 },
  { label: 'اختبارات', value: 68 },
  { label: 'متجر', value: 24 },
  { label: 'صلاحيات', value: 15 },
  { label: 'تقارير', value: 31 },
]

export const adminNavbarNotifications = [
  { id: 'n1', text: '3 طلبات متجر بانتظار الموافقة', time: 'الآن' },
  { id: 'n2', text: 'تحديث أمني متوفر', time: 'منذ ساعتين' },
]
