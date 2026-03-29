/** إحصائيات رئيسية — لوحة الجهة */
export const orgDashboardStats = {
  studentsCount: 1842,
  examsCount: 96,
  successRate: 87.4,
  studentsDelta: '+124 هذا الفصل',
  examsDelta: '+12 هذا الشهر',
  successDelta: '+2.1% عن الفصل الماضي',
}

/** أداء الطلاب عبر الزمن (متوسط الدرجة %) — للخط */
export const orgPerformanceOverTime = [
  { label: 'يناير', value: 72 },
  { label: 'فبراير', value: 75 },
  { label: 'مارس', value: 78 },
  { label: 'أبريل', value: 81 },
  { label: 'مايو', value: 84 },
  { label: 'يونيو', value: 86 },
]

/** توزيع الدرجات — للأعمدة */
export const orgGradeDistribution = [
  { label: '90–100', value: 420 },
  { label: '80–89', value: 580 },
  { label: '70–79', value: 410 },
  { label: '60–69', value: 280 },
  { label: 'أقل من 60', value: 152 },
]

export const orgRecentActivities = [
  {
    id: 'a1',
    type: 'exam',
    title: 'اكتمال اختبار نهاية الوحدة — الصف الثالث',
    time: 'منذ 25 دقيقة',
    tone: 'info',
  },
  {
    id: 'a2',
    type: 'result',
    title: 'رفع نتائج الدفعة أ — رياضيات',
    time: 'منذ ساعتين',
    tone: 'success',
  },
  {
    id: 'a3',
    type: 'alert',
    title: 'تنبيه: تأخر 14 طالبًا عن موعد التسليم',
    time: 'اليوم 09:15',
    tone: 'warning',
  },
  {
    id: 'a4',
    type: 'access',
    title: 'تحديث سياسة الدخول — قاعة الامتحانات المركزية',
    time: 'أمس',
    tone: 'neutral',
  },
]

export const orgStudents = [
  {
    id: 's1',
    name: 'نورة عبد الرحمن',
    email: 'n.abdulrahman@school.edu',
    level: 'الصف الثالث ثانوي',
    performance: 92,
    group: 'أ',
    status: 'نشط',
  },
  {
    id: 's2',
    name: 'خالد سالم المطيري',
    email: 'k.almutairi@school.edu',
    level: 'الصف الثاني ثانوي',
    performance: 78,
    group: 'ب',
    status: 'نشط',
  },
  {
    id: 's3',
    name: 'لينا حسن العتيبي',
    email: 'l.alotaibi@school.edu',
    level: 'الصف الأول ثانوي',
    performance: 65,
    group: 'أ',
    status: 'مراقبة',
  },
  {
    id: 's4',
    name: 'عمر فهد الدوسري',
    email: 'o.aldosari@school.edu',
    level: 'الصف الثالث ثانوي',
    performance: 88,
    group: 'ج',
    status: 'نشط',
  },
  {
    id: 's5',
    name: 'سارة ماجد القحطاني',
    email: 's.alqahtani@school.edu',
    level: 'الصف الثاني ثانوي',
    performance: 71,
    group: 'أ',
    status: 'نشط',
  },
  {
    id: 's6',
    name: 'فهد وليد الشهري',
    email: 'f.alshahri@school.edu',
    level: 'الصف الأول ثانوي',
    performance: 54,
    group: 'ب',
    status: 'دعم أكاديمي',
  },
]

export const orgStudentLevels = ['الكل', 'الصف الأول ثانوي', 'الصف الثاني ثانوي', 'الصف الثالث ثانوي']

/** تفاصيل إضافية لكل طالب (سجل اختبارات + منحنى) */
export const orgStudentDetails = {
  s1: {
    trend: [
      { label: 'سبت', value: 88 },
      { label: 'أحد', value: 90 },
      { label: 'اثنين', value: 89 },
      { label: 'ثلاثاء', value: 93 },
      { label: 'أربعاء', value: 91 },
      { label: 'خميس', value: 92 },
    ],
    exams: [
      { id: 'e1', title: 'رياضيات — الوحدة 3', date: '2026-03-10', score: 94, max: 100 },
      { id: 'e2', title: 'فيزياء — مراجعة', date: '2026-03-05', score: 88, max: 100 },
      { id: 'e3', title: 'لغة عربية', date: '2026-02-28', score: 91, max: 100 },
    ],
  },
  s2: {
    trend: [
      { label: 'سبت', value: 72 },
      { label: 'أحد', value: 76 },
      { label: 'اثنين', value: 74 },
      { label: 'ثلاثاء', value: 80 },
      { label: 'أربعاء', value: 79 },
      { label: 'خميس', value: 78 },
    ],
    exams: [
      { id: 'e1', title: 'أحياء — نصف الفصل', date: '2026-03-08', score: 76, max: 100 },
      { id: 'e2', title: 'كيمياء', date: '2026-02-20', score: 80, max: 100 },
    ],
  },
  s3: {
    trend: [
      { label: 'سبت', value: 58 },
      { label: 'أحد', value: 62 },
      { label: 'اثنين', value: 60 },
      { label: 'ثلاثاء', value: 65 },
      { label: 'أربعاء', value: 67 },
      { label: 'خميس', value: 65 },
    ],
    exams: [
      { id: 'e1', title: 'لغة إنجليزية', date: '2026-03-01', score: 62, max: 100 },
      { id: 'e2', title: 'رياضيات', date: '2026-02-15', score: 68, max: 100 },
    ],
  },
  s4: {
    trend: [
      { label: 'سبت', value: 85 },
      { label: 'أحد', value: 87 },
      { label: 'اثنين', value: 86 },
      { label: 'ثلاثاء', value: 89 },
      { label: 'أربعاء', value: 88 },
      { label: 'خميس', value: 88 },
    ],
    exams: [
      { id: 'e1', title: 'تاريخ', date: '2026-03-12', score: 90, max: 100 },
    ],
  },
  s5: {
    trend: [
      { label: 'سبت', value: 68 },
      { label: 'أحد', value: 70 },
      { label: 'اثنين', value: 72 },
      { label: 'ثلاثاء', value: 71 },
      { label: 'أربعاء', value: 73 },
      { label: 'خميس', value: 71 },
    ],
    exams: [{ id: 'e1', title: 'جغرافيا', date: '2026-03-06', score: 71, max: 100 }],
  },
  s6: {
    trend: [
      { label: 'سبت', value: 48 },
      { label: 'أحد', value: 52 },
      { label: 'اثنين', value: 50 },
      { label: 'ثلاثاء', value: 55 },
      { label: 'أربعاء', value: 54 },
      { label: 'خميس', value: 54 },
    ],
    exams: [{ id: 'e1', title: 'علوم', date: '2026-03-03', score: 52, max: 100 }],
  },
}

export const orgOfficialExams = [
  {
    id: 'ox1',
    title: 'الاختبار التحريري الموحد — الفصل الدراسي الثاني',
    subject: 'متعدد المواد',
    scheduledAt: '2026-04-15 08:00',
    durationMin: 180,
    assignedGroups: ['الثالث — أ', 'الثالث — ب'],
    access: 'رمز + تحقق هوية',
    status: 'مجدول',
  },
  {
    id: 'ox2',
    title: 'تقييم مهارات القراءة — المرحلة الثانوية',
    subject: 'لغة عربية',
    scheduledAt: '2026-03-28 10:30',
    durationMin: 90,
    assignedGroups: ['الأول — أ'],
    access: 'دعوة بريدية',
    status: 'قيد التحضير',
  },
  {
    id: 'ox3',
    title: 'اختبار تحصيلي تجريبي',
    subject: 'رياضيات',
    scheduledAt: '2026-03-22 14:00',
    durationMin: 120,
    assignedGroups: ['الثاني — أ', 'الثاني — ب', 'الثاني — ج'],
    access: 'قائمة مسموح بها',
    status: 'مغلق',
  },
]

export const orgStudentGroups = ['الأول — أ', 'الأول — ب', 'الثاني — أ', 'الثاني — ب', 'الثاني — ج', 'الثالث — أ', 'الثالث — ب', 'الثالث — ج']

export const orgReportSummaries = [
  { id: 'r1', title: 'تقرير أداء الفصل الدراسي الثاني', period: '2026-01 — 2026-03', passRate: 87.4 },
  { id: 'r2', title: 'تحليل الفجوات — مادة الرياضيات', period: '2026-02', passRate: 79.2 },
  { id: 'r3', title: 'مقارنة الشُعب — نفس المستوى', period: '2026-03', passRate: 82.0 },
]

export const orgAccessRules = [
  {
    id: 'ac1',
    name: 'الاختبارات الرسمية — المركز الرئيسي',
    roles: ['مشرف قاعة', 'مراقب', 'طالب مسجل'],
    requireCode: true,
    requireIdCheck: true,
    ipRestriction: false,
  },
  {
    id: 'ac2',
    name: 'الاختبارات التجريبية عبر المنصة',
    roles: ['طالب', 'معلم مرافق'],
    requireCode: true,
    requireIdCheck: false,
    ipRestriction: true,
  },
]

export const orgNotifications = [
  { id: 'n1', title: 'صدرت نتائج الدفعة ب — فيزياء', time: 'منذ 30 دقيقة', type: 'result' },
  { id: 'n2', title: 'اختبار جديد مُجدول للأسبوع القادم', time: 'منذ 3 ساعات', type: 'exam' },
  { id: 'n3', title: 'تعذر مزامنة 3 سجلات — راجع التقارير', time: 'أمس', type: 'issue' },
  { id: 'n4', title: 'تذكير: إغلاق باب التسجيل غدًا', time: 'أمس', type: 'info' },
]
