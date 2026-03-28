/** فئات الجمهور: أطفال 👶 | طلاب 🎓 | موظفين 👨‍💼 */
export const audienceMeta = {
  children: {
    id: 'children',
    label: 'للأطفال',
    emoji: '👶',
    shortLabel: 'أطفال',
    description: 'نتائج فورية، ألوان مرحة، وعناصر تحفيز (نجوم ونقاط).',
    accent: 'playful',
  },
  student: {
    id: 'student',
    label: 'للطلاب',
    emoji: '🎓',
    shortLabel: 'طلاب',
    description: 'نتائج بعد الانتهاء، تحليل أداء، واقتراحات تحسين.',
    accent: 'study',
  },
  professional: {
    id: 'professional',
    label: 'للموظفين',
    emoji: '👨‍💼',
    shortLabel: 'موظفين',
    description: 'تقييم رسمي، تقارير PDF، وتتبع المحاولات.',
    accent: 'corporate',
  },
}

export const audienceIds = ['children', 'student', 'professional']

/** ثوانٍ لكل سؤال — تُضرب بعدد الأسئلة (مع حد أدنى للإجمالي) */
export const EXAM_SECONDS_PER_QUESTION = 75
export const EXAM_MIN_TOTAL_SECONDS = 90

export function getExamDurationSeconds(questionCount) {
  const n = Math.max(1, Number(questionCount) || 1)
  return Math.max(EXAM_MIN_TOTAL_SECONDS, n * EXAM_SECONDS_PER_QUESTION)
}

export function formatDurationAr(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  if (m === 0) return `${r} ثانية`
  if (r === 0) return `${m} دقيقة`
  return `${m} د و${r} ث`
}

export function getImprovementSuggestions(percent, wrongCount) {
  const tips = []
  if (percent < 60) {
    tips.push('راجع الوحدة الدراسية كاملة قبل المحاولة التالية.')
    tips.push('جرّب وضع «للأطفال» للتدريب بإجابات فورية دون ضغط.')
  } else if (percent < 80) {
    tips.push('ركّز على الأسئلة التي أخطأت فيها من القائمة أدناه.')
    tips.push('خصص 20 دقيقة يوميًا لمراجعة الموضوع الأضعف.')
  } else {
    tips.push('أداء جيد — ثبّت المستوى باختبارات موقوتة أسبوعيًا.')
  }
  if (wrongCount > 0) {
    tips.push(`لديك ${wrongCount} سؤال يحتاج مراجعة موجزة.`)
  }
  return tips
}

export const studentProfile = {
  name: 'سارة الطالبة',
  grade: 'الصف الثالث ثانوي',
}

export const studentRecentExams = [
  {
    id: 'r1',
    title: 'مراجعة الفيزياء — الحركة',
    finishedAt: 'اليوم 09:30',
    score: 17,
    maxScore: 20,
    audience: 'student',
  },
  {
    id: 'r2',
    title: 'اختبار نصف الفصل — رياضيات',
    finishedAt: 'أمس',
    score: 42,
    maxScore: 50,
    audience: 'professional',
  },
  {
    id: 'r3',
    title: 'نشاط قصير — لغة عربية',
    finishedAt: 'قبل يومين',
    score: 8,
    maxScore: 10,
    audience: 'children',
  },
]

export const studentPerformanceSummary = {
  averagePercent: 78,
  completedCount: 24,
  streakDays: 5,
  weakTopic: 'التفاضل والتكامل',
  strongTopic: 'القراءة والفهم',
}

export const studentExamHistory = [
  { id: 'h1', title: 'وحدة الكهرباء', date: '2026-03-20', percent: 82, audience: 'student' },
  { id: 'h2', title: 'الاختبار الشهري — أحياء', date: '2026-03-15', percent: 71, audience: 'professional' },
  { id: 'h3', title: 'مهارات القراءة', date: '2026-03-10', percent: 90, audience: 'children' },
  { id: 'h4', title: 'تدريب ذكاء اصطناعي', date: '2026-03-05', percent: 65, audience: 'student' },
]

export const studentWeeklyProgress = [
  { label: 'سبت', value: 45 },
  { label: 'أحد', value: 62 },
  { label: 'اثنين', value: 55 },
  { label: 'ثلاثاء', value: 70 },
  { label: 'أربعاء', value: 40 },
  { label: 'خميس', value: 88 },
  { label: 'جمعة', value: 52 },
]

export const studentTopicMastery = [
  { label: 'رياضيات', value: 72 },
  { label: 'فيزياء', value: 64 },
  { label: 'عربي', value: 85 },
  { label: 'إنجليزي', value: 58 },
]

export const studentPublicQuestionBanks = [
  {
    id: 'pub-1',
    name: 'بنك المراجعة السريعة — فيزياء',
    subject: 'فيزياء',
    questionsCount: 40,
    isOfficial: true,
  },
  {
    id: 'pub-2',
    name: 'تدريبات الجبر',
    subject: 'رياضيات',
    questionsCount: 120,
    isOfficial: false,
  },
  {
    id: 'pub-3',
    name: 'قواعد مبسّطة',
    subject: 'لغة عربية',
    questionsCount: 25,
    isOfficial: true,
  },
]

export const validStudentJoinCodes = ['DEMO', '1234', 'TEST', 'تجربة']

export const demoExamQuestions = [
  {
    id: 'q1',
    text: 'ما القيمة المقربة لـ √2؟',
    options: ['1.21', '1.41', '1.61', '1.81'],
    correctIndex: 1,
    topic: 'رياضيات',
  },
  {
    id: 'q2',
    text: 'أي مما يلي من الغازات يُستخدم في التنفس؟',
    options: ['ثاني أكسيد الكربون', 'النيتروجين فقط', 'الأكسجين', 'الهيليوم'],
    correctIndex: 2,
    topic: 'علوم',
  },
  {
    id: 'q3',
    text: 'مرادف كلمة «جَلِيل» في سياق المدح هو:',
    options: ['صغير', 'عظيم', 'بعيد', 'سريع'],
    correctIndex: 1,
    topic: 'عربي',
  },
]

export const demoExamMeta = {
  title: 'اختبار تجريبي — منصة الطالب',
}
