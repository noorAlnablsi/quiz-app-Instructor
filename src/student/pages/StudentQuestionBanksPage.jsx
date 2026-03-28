import { useEffect, useState } from 'react'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import { studentPublicQuestionBanks } from '../../mock-data/studentPortalData'
import { studentCardClass, studentPrimaryButtonClass } from '../studentTheme'

const PERSONAL_KEY = 'quiz-app-student-personal-banks'

function loadPersonal() {
  try {
    const raw = localStorage.getItem(PERSONAL_KEY)
    if (raw) {
      const p = JSON.parse(raw)
      if (Array.isArray(p)) return p
    }
  } catch {
    /* ignore */
  }
  return []
}

function StudentQuestionBanksPage() {
  const { audience, highContrast } = useStudentExperience()
  const [personal, setPersonal] = useState(loadPersonal)
  const [newName, setNewName] = useState('')
  const [newSubject, setNewSubject] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(PERSONAL_KEY, JSON.stringify(personal))
    } catch {
      /* ignore */
    }
  }, [personal])

  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-5'
    : `${studentCardClass(audience)} p-5`

  const addBank = (e) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    const subject = newSubject.trim() || 'عام'
    setPersonal((prev) => [
      {
        id: `my-${Date.now()}`,
        name,
        subject,
        questionsCount: 0,
        isMine: true,
      },
      ...prev,
    ])
    setNewName('')
    setNewSubject('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`font-bold ${audience === 'children' ? 'text-3xl' : 'text-2xl'}`}>بنوك الأسئلة</h2>
        <p className={`mt-1 text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}>
          بنوك عامة للاستعراض، وبنك شخصي تضيفه محليًا (بدون خادم).
        </p>
      </div>

      <section className={card} aria-labelledby="public-banks">
        <h3 id="public-banks" className="text-lg font-bold">
          بنوك عامة
        </h3>
        <ul className="mt-4 space-y-3">
          {studentPublicQuestionBanks.map((b) => (
            <li
              key={b.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                highContrast ? 'border-[var(--sp-border)]' : 'border-black/5 bg-white/60'
              }`}
            >
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className={`text-xs ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
                  {b.subject} · {b.questionsCount} سؤال
                  {b.isOfficial ? ' · رسمي' : ''}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-bold ${
                  highContrast ? 'bg-[var(--sp-accent)] text-[var(--sp-accent-text)]' : 'bg-slate-100 text-slate-700'
                }`}
              >
                للتصفح
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={card} aria-labelledby="create-bank">
        <h3 id="create-bank" className="text-lg font-bold">
          إنشاء بنك شخصي
        </h3>
        <form onSubmit={addBank} className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">اسم البنك</span>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                highContrast
                  ? 'border-[var(--sp-border)] bg-black text-[var(--sp-text)]'
                  : 'border-slate-300'
              } ${audience === 'children' ? 'min-h-12 text-lg' : ''}`}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">المادة (اختياري)</span>
            <input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="مثال: رياضيات"
              className={`w-full rounded-xl border px-3 py-2 text-sm ${
                highContrast
                  ? 'border-[var(--sp-border)] bg-black text-[var(--sp-text)]'
                  : 'border-slate-300'
              } ${audience === 'children' ? 'min-h-12 text-lg' : ''}`}
            />
          </label>
          <button type="submit" className={studentPrimaryButtonClass(audience)}>
            حفظ البنك محليًا
          </button>
        </form>
      </section>

      {personal.length > 0 ? (
        <section className={card} aria-labelledby="my-banks">
          <h3 id="my-banks" className="text-lg font-bold">
            بنوكي
          </h3>
          <ul className="mt-4 space-y-2">
            {personal.map((b) => (
              <li
                key={b.id}
                className={`rounded-xl border px-4 py-3 text-sm ${
                  highContrast ? 'border-[var(--sp-border)]' : 'border-emerald-100 bg-emerald-50/40'
                }`}
              >
                <span className="font-semibold">{b.name}</span>
                <span className={`ms-2 text-xs ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}>
                  ({b.subject})
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

export default StudentQuestionBanksPage
