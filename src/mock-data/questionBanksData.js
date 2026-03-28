export const accessTypes = [
  { value: 'public', label: 'عام' },
  { value: 'protected', label: 'محمي' },
  { value: 'private', label: 'خاص' },
]

export const questionBanks = [
  {
    id: 'bank-1',
    subject: 'الرياضيات',
    name: 'بنك الرياضيات - المستوى المتوسط',
    description: 'بنك لمرحلة متوسطة يغطي عدة توبيكات داخل مادة الرياضيات.',
    questionsCount: 85,
    access: 'protected',
    topics: ['احتمالات', 'التكامل', 'الجبر', 'الهندسة'],
    questions: ['ما ناتج 12 × 9؟', 'احسب محيط الدائرة إذا كان نصف القطر 7 سم.'],
  },
  {
    id: 'bank-2',
    subject: 'العلوم',
    name: 'بنك العلوم - الصف التاسع',
    description: 'أسئلة في الفيزياء والكيمياء والأحياء ضمن مادة العلوم.',
    questionsCount: 120,
    access: 'public',
    topics: ['فيزياء', 'كيمياء', 'أحياء'],
    questions: ['ما هو تعريف الطاقة الحركية؟', 'اذكر مراحل الانقسام المتساوي.'],
  },
  {
    id: 'bank-3',
    subject: 'اللغة العربية',
    name: 'بنك اللغة العربية - القواعد',
    description: 'تمارين نحوية وصرفية متنوعة تحت مادة اللغة العربية.',
    questionsCount: 64,
    access: 'private',
    topics: ['النحو', 'الصرف', 'الإملاء'],
    questions: ['استخرج الفاعل من الجملة التالية...', 'حوّل الجملة إلى صيغة المثنى.'],
  },
]
