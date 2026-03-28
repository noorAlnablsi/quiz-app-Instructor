export const accessTypes = [
  { value: 'public', label: 'عام' },
  { value: 'protected', label: 'محمي' },
  { value: 'private', label: 'خاص' },
]

export const questionBanks = [
  {
    id: 'bank-1',
    name: 'بنك الرياضيات - المستوى المتوسط',
    description: 'بنك شامل للجبر والهندسة للمرحلة المتوسطة.',
    questionsCount: 85,
    access: 'protected',
    topics: ['الجبر', 'الهندسة', 'الإحصاء'],
    questions: ['ما ناتج 12 × 9؟', 'احسب محيط الدائرة إذا كان نصف القطر 7 سم.'],
  },
  {
    id: 'bank-2',
    name: 'بنك العلوم - الصف التاسع',
    description: 'أسئلة في الفيزياء والكيمياء والأحياء.',
    questionsCount: 120,
    access: 'public',
    topics: ['فيزياء', 'كيمياء', 'أحياء'],
    questions: ['ما هو تعريف الطاقة الحركية؟', 'اذكر مراحل الانقسام المتساوي.'],
  },
  {
    id: 'bank-3',
    name: 'بنك اللغة العربية - القواعد',
    description: 'تمارين نحوية وصرفية متنوعة.',
    questionsCount: 64,
    access: 'private',
    topics: ['النحو', 'الصرف', 'الإملاء'],
    questions: ['استخرج الفاعل من الجملة التالية...', 'حوّل الجملة إلى صيغة المثنى.'],
  },
]
