export const exams = [
  {
    id: 'exam-1',
    name: 'اختبار الرياضيات الشهري',
    questionsCount: 25,
    durationMode: 'total',
    durationValue: 45,
  },
  {
    id: 'exam-2',
    name: 'اختبار العلوم النهائي',
    questionsCount: 40,
    durationMode: 'per-question',
    durationValue: 2,
  },
  {
    id: 'exam-3',
    name: 'اختبار اللغة العربية القصير',
    questionsCount: 15,
    durationMode: 'total',
    durationValue: 20,
  },
]

export const creationMethods = [
  { value: 'manual', label: 'إنشاء يدوي' },
  { value: 'bank', label: 'من بنك أسئلة' },
]
