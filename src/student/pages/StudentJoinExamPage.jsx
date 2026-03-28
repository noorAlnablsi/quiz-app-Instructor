import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import { validStudentJoinCodes } from '../../mock-data/studentPortalData'
import { studentCardClass, studentPrimaryButtonClass } from '../studentTheme'

function StudentJoinExamPage() {
  const navigate = useNavigate()
  const { audience, highContrast } = useStudentExperience()
  const [code, setCode] = useState('')
  const [link, setLink] = useState('')
  const [message, setMessage] = useState(null)

  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-6'
    : `${studentCardClass(audience)} p-6`

  const normalize = (s) => s.trim().toUpperCase()

  const handleJoin = (e) => {
    e.preventDefault()
    setMessage(null)

    const trimmedCode = code.trim()
    const trimmedLink = link.trim()

    if (!trimmedCode && !trimmedLink) {
      setMessage({ type: 'error', text: 'أدخل رمز الدعوة أو الصق رابط الاختبار.' })
      return
    }

    if (trimmedLink) {
      const looksLikeUrl = /^https?:\/\//i.test(trimmedLink) || trimmedLink.includes('student/exam')
      if (!looksLikeUrl) {
        setMessage({
          type: 'error',
          text: 'الرابط غير صالح. تأكد أنه يبدأ بـ http أو يحتوي على مسار الاختبار.',
        })
        return
      }
      setMessage({ type: 'success', text: 'تم التحقق من الرابط. جاري فتح الاختبار التجريبي…' })
      setTimeout(() => navigate('/student/exam/demo', { state: { fromLink: true, link: trimmedLink } }), 400)
      return
    }

    const ok = validStudentJoinCodes.some((c) => normalize(trimmedCode) === normalize(c))
    if (!ok) {
      setMessage({
        type: 'error',
        text: 'الرمز غير صحيح. للتجربة استخدم: DEMO أو 1234 أو TEST أو «تجربة».',
      })
      return
    }

    setMessage({ type: 'success', text: 'تم قبول الرمز. يمكنك البدء الآن.' })
    setTimeout(() => navigate('/student/exam/demo', { state: { code: trimmedCode } }), 400)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`font-bold ${audience === 'children' ? 'text-3xl' : 'text-2xl'}`}>دخول اختبار</h2>
        <p className={`mt-1 text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}>
          أدخل رمزًا من المعلم أو الصق رابط الدعوة. الواجهة وهمية بالكامل للعرض فقط.
        </p>
      </div>

      <form onSubmit={handleJoin} className={card} noValidate>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">رمز الاختبار</span>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setMessage(null)
            }}
            placeholder="مثال: DEMO"
            autoComplete="off"
            className={`w-full rounded-xl border px-4 py-3 text-base outline-none ring-2 ring-transparent focus:ring-offset-2 ${
              highContrast
                ? 'border-[var(--sp-border)] bg-black text-[var(--sp-text)] focus:ring-[var(--sp-accent)]'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-200'
            } ${audience === 'children' ? 'min-h-14 text-xl' : ''}`}
          />
        </label>

        <p className={`my-4 text-center text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
          أو
        </p>

        <label className="block">
          <span className="mb-2 block text-sm font-bold">رابط الدعوة</span>
          <input
            value={link}
            onChange={(e) => {
              setLink(e.target.value)
              setMessage(null)
            }}
            placeholder="https://..."
            dir="ltr"
            className={`w-full rounded-xl border px-4 py-3 text-left text-base outline-none ring-2 ring-transparent focus:ring-offset-2 ${
              highContrast
                ? 'border-[var(--sp-border)] bg-black text-[var(--sp-text)] focus:ring-[var(--sp-accent)]'
                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-200'
            } ${audience === 'children' ? 'min-h-14' : ''}`}
          />
        </label>

        {message ? (
          <div
            role="alert"
            className={`mt-4 rounded-xl border-2 px-4 py-3 text-sm font-medium ${
              message.type === 'error'
                ? highContrast
                  ? 'border-red-400 bg-red-950 text-red-100'
                  : 'border-rose-200 bg-rose-50 text-rose-900'
                : highContrast
                  ? 'border-[var(--sp-accent)] bg-[var(--sp-surface)] text-[var(--sp-text)]'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-900'
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <button type="submit" className={`mt-6 w-full ${studentPrimaryButtonClass(audience)}`}>
          دخول الاختبار
        </button>
      </form>
    </div>
  )
}

export default StudentJoinExamPage
