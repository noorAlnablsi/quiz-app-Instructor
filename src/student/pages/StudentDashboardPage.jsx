import { Link } from 'react-router-dom'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import {
  audienceMeta,
  studentPerformanceSummary,
  studentRecentExams,
} from '../../mock-data/studentPortalData'
import { studentCardClass, studentPrimaryButtonClass } from '../studentTheme'

function StudentDashboardPage() {
  const { audience, highContrast } = useStudentExperience()
  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-5'
    : `${studentCardClass(audience)} p-5`

  return (
    <div className="space-y-6">
      <header>
        <h2 className={`font-bold ${audience === 'children' ? 'text-3xl' : 'text-2xl'}`}>لوحة الطالب</h2>
        <p
          className={`mt-1 text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}
        >
          الفئة الحالية:{' '}
          <strong>
            {audienceMeta[audience].emoji} {audienceMeta[audience].label}
          </strong>{' '}
          — الواجهة والاختبار يتبعان نفس الفئة.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className={card} aria-labelledby="summary-heading">
          <h3 id="summary-heading" className="text-lg font-bold">
            ملخص الأداء
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between gap-2">
              <span className={highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}>
                متوسط النسبة
              </span>
              <span className="font-bold tabular-nums">{studentPerformanceSummary.averagePercent}%</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className={highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}>
                اختبارات مكتملة
              </span>
              <span className="font-bold tabular-nums">{studentPerformanceSummary.completedCount}</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className={highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}>
                أيام متتالية
              </span>
              <span className="font-bold tabular-nums">{studentPerformanceSummary.streakDays}</span>
            </li>
            <li className="border-t border-black/10 pt-3">
              <p className={highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}>نقطة قوة</p>
              <p className="font-semibold">{studentPerformanceSummary.strongTopic}</p>
            </li>
            <li>
              <p className={highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}>يحتاج دعمًا</p>
              <p className="font-semibold">{studentPerformanceSummary.weakTopic}</p>
            </li>
          </ul>
        </section>

        <section className={card} aria-labelledby="recent-heading">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id="recent-heading" className="text-lg font-bold">
              آخر الاختبارات
            </h3>
            <Link
              to="/student/history"
              className={`text-sm font-semibold underline ${highContrast ? 'text-[var(--sp-accent)]' : 'text-emerald-700'}`}
            >
              عرض الكل
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {studentRecentExams.map((exam) => (
              <li
                key={exam.id}
                className={`rounded-xl border p-3 text-sm ${
                  highContrast
                    ? 'border-[var(--sp-border)] bg-black/30'
                    : 'border-black/5 bg-white/50'
                }`}
              >
                <p className="font-semibold">{exam.title}</p>
                <p className={`mt-1 text-xs ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
                  {exam.finishedAt} · {audienceMeta[exam.audience]?.label ?? exam.audience}
                </p>
                <p className="mt-2 font-bold tabular-nums">
                  {exam.score} / {exam.maxScore}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/student/join" className={studentPrimaryButtonClass(audience)}>
          دخول اختبار جديد
        </Link>
        <Link
          to="/student/analytics"
          className={
            highContrast
              ? 'rounded-xl border-2 border-[var(--sp-border)] px-4 py-2.5 text-sm font-bold text-[var(--sp-text)]'
              : `rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 ${audience === 'children' ? 'min-h-[52px] text-lg' : ''}`
          }
        >
          التحليلات
        </Link>
      </div>
    </div>
  )
}

export default StudentDashboardPage
