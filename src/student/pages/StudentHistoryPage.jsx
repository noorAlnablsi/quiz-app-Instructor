import { useStudentExperience } from '../../context/StudentExperienceContext'
import { audienceMeta, studentExamHistory } from '../../mock-data/studentPortalData'
import { studentCardClass } from '../studentTheme'

function StudentHistoryPage() {
  const { audience, highContrast } = useStudentExperience()
  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-5'
    : `${studentCardClass(audience)} p-5`

  return (
    <div className="space-y-4">
      <div>
        <h2 className={`font-bold ${audience === 'children' ? 'text-3xl' : 'text-2xl'}`}>سجل الاختبارات</h2>
        <p className={`mt-1 text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}>
          قائمة بسيطة بآخر المحاولات (بيانات وهمية).
        </p>
      </div>

      <ul className="space-y-3">
        {studentExamHistory.map((row) => (
          <li key={row.id} className={card}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-bold">{row.title}</p>
                <p className={`mt-1 text-xs ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
                  {row.date} · {audienceMeta[row.audience]?.label ?? row.audience}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-bold tabular-nums ${
                  highContrast
                    ? 'bg-[var(--sp-accent)] text-[var(--sp-accent-text)]'
                    : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {row.percent}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentHistoryPage
