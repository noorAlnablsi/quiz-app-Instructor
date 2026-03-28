import { Link, useLocation } from 'react-router-dom'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import { audienceMeta, getImprovementSuggestions } from '../../mock-data/studentPortalData'
import { studentCardClass, studentPrimaryButtonClass } from '../studentTheme'

function normalizeResultAudience(state, uiAudience) {
  if (state?.audience) return state.audience
  const m = state?.mode
  if (m === 'simple') return 'children'
  if (m === 'exam') return 'professional'
  if (m === 'practice') return 'student'
  return uiAudience
}

function buildTopicBreakdown(questions, answers) {
  if (!questions || !answers) return []
  const map = {}
  for (const q of questions) {
    const t = q.topic ?? 'عام'
    if (!map[t]) map[t] = { topic: t, correct: 0, total: 0 }
    map[t].total += 1
    if (answers[q.id] === q.correctIndex) map[t].correct += 1
  }
  return Object.values(map)
}

function StudentResultPage() {
  const { audience: uiAudience, highContrast } = useStudentExperience()
  const location = useLocation()
  const state = location.state

  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-6'
    : `${studentCardClass(uiAudience)} p-6`

  if (state == null || typeof state.score !== 'number' || typeof state.total !== 'number') {
    return (
      <div className={card}>
        <h2 className="text-xl font-bold">لا توجد نتيجة</h2>
        <p className="mt-2 text-sm text-slate-600">ابدأ اختبارًا من صفحة الدخول ثم سلّم الإجابات.</p>
        <Link to="/student/join" className={`mt-4 inline-block ${studentPrimaryButtonClass(uiAudience)}`}>
          دخول اختبار
        </Link>
      </div>
    )
  }

  const resultAudience = normalizeResultAudience(state, uiAudience)
  const percent = Math.round((state.score / state.total) * 100)
  const title = state.title ?? 'نتيجة الاختبار'
  const timedOut = Boolean(state.timedOut)
  const wrongCount = state.total - state.score
  const topicRows = buildTopicBreakdown(state.questions, state.answers)
  const suggestions = getImprovementSuggestions(percent, wrongCount)

  const timedOutBanner = timedOut ? (
    <div
      role="status"
      className={`mb-4 rounded-xl border-2 px-4 py-3 text-sm font-bold ${
        highContrast
          ? 'border-[var(--sp-accent)] bg-[var(--sp-surface)] text-[var(--sp-text)]'
          : 'border-amber-400 bg-amber-50 text-amber-950'
      }`}
    >
      انتهى الوقت المحدد وتم التسليم تلقائيًا مع حفظ الإجابات المُدخلة حتى تلك اللحظة.
    </div>
  ) : null

  const handlePdfMock = () => {
    window.alert('تصدير PDF: واجهة تجريبية فقط — يُربط بالخادم لاحقًا لتوليد التقرير الرسمي.')
  }

  /* ——— للأطفال: نتائج فورية + ألوان + gamification ——— */
  if (resultAudience === 'children') {
    const gp = state.gamePoints ?? percent * 10
    return (
      <div className="space-y-6">
        <div className={card}>
          {timedOutBanner}
          <div className="text-center">
            <p className="text-5xl" aria-hidden="true">
              🎮
            </p>
            <h2 className="mt-2 text-3xl font-black text-violet-900">يا للروعة!</h2>
            <p className="mt-2 text-5xl font-black tabular-nums text-fuchsia-600">{percent}%</p>
            <p className="mt-2 text-xl font-black text-fuchsia-900">
              {state.score} من {state.total} إجابات صحيحة
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-amber-200 px-4 py-2 text-lg font-black text-amber-950">
                ⭐ نقاط اللعبة: {gp}
              </span>
              {percent >= 80 ? (
                <span className="rounded-full bg-emerald-200 px-4 py-2 text-lg font-black text-emerald-900">
                  🏆 شارة البطل
                </span>
              ) : (
                <span className="rounded-full bg-sky-200 px-4 py-2 text-lg font-black text-sky-900">
                  🌟 استمر باللعب
                </span>
              )}
            </div>
          </div>
          {state.questions && state.answers ? (
            <ul className="mt-6 space-y-2 border-t border-fuchsia-100 pt-4">
              {state.questions.map((item) => {
                const ok = state.answers[item.id] === item.correctIndex
                return (
                  <li
                    key={item.id}
                    className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold ${
                      ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    <span>{ok ? '✅' : '💡'}</span>
                    {item.text.slice(0, 56)}
                    {item.text.length > 56 ? '…' : ''}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/student/dashboard" className={studentPrimaryButtonClass(uiAudience)}>
            الرئيسية
          </Link>
          <Link
            to="/student/join"
            className="rounded-2xl border-2 border-fuchsia-300 bg-white px-4 py-2 text-sm font-black text-violet-900"
          >
            جولة أخرى
          </Link>
        </div>
      </div>
    )
  }

  /* ——— للطلاب: تحليل + اقتراحات (بدون نتائج فورية أثناء الاختبار — عرض هنا) ——— */
  if (resultAudience === 'student') {
    return (
      <div className="space-y-6">
        <div className={card}>
          {timedOutBanner}
          <h2 className="text-2xl font-bold text-emerald-900">نتيجتك جاهزة</h2>
          <p className="mt-1 text-sm text-emerald-800">{title}</p>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div className="rounded-2xl bg-emerald-600 px-6 py-4 text-white shadow-lg">
              <p className="text-sm font-medium opacity-90">الدرجة</p>
              <p className="text-4xl font-black tabular-nums">
                {state.score}/{state.total}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3">
              <p className="text-xs font-semibold text-emerald-700">النسبة</p>
              <p className="text-2xl font-bold tabular-nums text-emerald-900">{percent}%</p>
            </div>
          </div>

          <h3 className="mt-8 border-b border-emerald-100 pb-2 text-lg font-bold text-emerald-900">
            تحليل الأداء حسب الموضوع
          </h3>
          <ul className="mt-3 space-y-2">
            {topicRows.map((row) => (
              <li
                key={row.topic}
                className="flex items-center justify-between rounded-xl bg-emerald-50/80 px-3 py-2 text-sm"
              >
                <span className="font-semibold text-emerald-900">{row.topic}</span>
                <span className="tabular-nums font-bold text-emerald-800">
                  {row.correct}/{row.total} صحيح
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 border-b border-emerald-100 pb-2 text-lg font-bold text-emerald-900">
            اقتراحات للتحسين
          </h3>
          <ul className="mt-3 list-disc space-y-2 pe-5 text-sm leading-relaxed text-emerald-900">
            {suggestions.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          {state.questions && state.answers ? (
            <ul className="mt-6 space-y-2 border-t border-emerald-100 pt-4">
              {state.questions.map((item) => {
                const ok = state.answers[item.id] === item.correctIndex
                return (
                  <li
                    key={item.id}
                    className={`rounded-lg px-3 py-2 text-sm ${ok ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}
                  >
                    {ok ? '✓' : '✗'} {item.text.slice(0, 48)}
                    {item.text.length > 48 ? '…' : ''}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/student/dashboard" className={studentPrimaryButtonClass(uiAudience)}>
            لوحة الطالب
          </Link>
          <Link to="/student/analytics" className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-900">
            التحليلات العامة
          </Link>
        </div>
      </div>
    )
  }

  /* ——— للموظفين: تقييم رسمي + PDF + tracking ——— */
  const startedAt = new Date(Date.now() - (state.allocatedSeconds ?? 0) * 1000).toLocaleString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const submittedAt = new Date().toLocaleString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  })

  return (
    <div className="space-y-6">
      <div className={card}>
        {timedOutBanner}
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">تقرير تقييم رسمي</p>
        <h2 className="mt-2 border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-xs text-slate-500">رقم الجلسة: {state.sessionId ?? '—'}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-medium text-slate-500">الدرجة المحصلة</dt>
            <dd className="mt-1 text-3xl font-bold tabular-nums text-slate-900">
              {state.score} / {state.total}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs font-medium text-slate-500">النسبة المئوية</dt>
            <dd className="mt-1 text-3xl font-bold tabular-nums text-slate-900">{percent}%</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePdfMock}
            className="rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
          >
            تصدير PDF
          </button>
          <span className="self-center text-xs text-slate-500">واجهة فقط — لا يُنشَر ملف حقيقي</span>
        </div>

        <h3 className="mt-8 text-sm font-bold text-slate-800">سجل التتبع (Tracking)</h3>
        <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full text-right text-sm">
            <thead className="bg-slate-100 text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-3 py-2">المحاولة</th>
                <th className="px-3 py-2">بداية تقريبية</th>
                <th className="px-3 py-2">التسليم</th>
                <th className="px-3 py-2">الزمن المخصص</th>
                <th className="px-3 py-2">الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100">
                <td className="px-3 py-2 font-mono text-xs">{state.sessionId ?? '—'}</td>
                <td className="px-3 py-2 text-slate-600">{startedAt}</td>
                <td className="px-3 py-2 text-slate-600">{submittedAt}</td>
                <td className="px-3 py-2 tabular-nums">{state.allocatedSeconds ? `${Math.round(state.allocatedSeconds / 60)} د` : '—'}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold">
                    {timedOut ? 'مكتمل — انتهاء وقت' : 'مكتمل — تسليم يدوي'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-600">
          يُستخدم هذا السجل لأغراض الموارد البشرية والامتثال. للربط بخادم حقيقي أضف معرّف الموظف وحفظًا
          دائمًا للمحاولات.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/student/dashboard" className={studentPrimaryButtonClass(uiAudience)}>
          لوحة الطالب
        </Link>
        <Link
          to="/student/history"
          className={
            highContrast
              ? 'rounded-xl border-2 border-[var(--sp-border)] px-4 py-2 text-sm font-bold'
              : 'rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800'
          }
        >
          السجل
        </Link>
      </div>

      <p className={`text-xs ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
        فئة العرض الحالية في الشريط: {audienceMeta[uiAudience].emoji} {audienceMeta[uiAudience].label} — نتيجة
        الاختبار بفئة: {audienceMeta[resultAudience]?.label ?? resultAudience}.
      </p>
    </div>
  )
}

export default StudentResultPage
