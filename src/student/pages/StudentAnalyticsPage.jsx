import { useStudentExperience } from '../../context/StudentExperienceContext'
import {
  studentPerformanceSummary,
  studentTopicMastery,
  studentWeeklyProgress,
} from '../../mock-data/studentPortalData'
import SimpleBarChart from '../components/charts/SimpleBarChart'
import { studentCardClass } from '../studentTheme'

function StudentAnalyticsPage() {
  const { audience, highContrast } = useStudentExperience()
  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-5'
    : `${studentCardClass(audience)} p-5`

  const barWeekly = highContrast
    ? 'bg-[var(--sp-accent)]'
    : audience === 'professional'
      ? 'bg-slate-700'
      : audience === 'children'
        ? 'bg-fuchsia-500'
        : 'bg-emerald-500'
  const barTopic = highContrast
    ? 'bg-[var(--sp-accent)]'
    : audience === 'children'
      ? 'bg-violet-500'
      : 'bg-teal-500'

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`font-bold ${audience === 'children' ? 'text-3xl' : 'text-2xl'}`}>التحليلات</h2>
        <p className={`mt-1 text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}>
          مؤشرات بسيطة لتقدمك دون تعقيد (واجهة فقط).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className={card}>
          <p className={`text-sm font-medium ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
            المتوسط التقريبي
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums">{studentPerformanceSummary.averagePercent}%</p>
        </div>
        <div className={card}>
          <p className={`text-sm font-medium ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
            إجمالي المكتمل
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums">{studentPerformanceSummary.completedCount}</p>
        </div>
        <div className={card}>
          <p className={`text-sm font-medium ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}>
            تسلسل الأيام
          </p>
          <p className="mt-2 text-3xl font-black tabular-nums">{studentPerformanceSummary.streakDays} أيام</p>
        </div>
      </div>

      <div className={`${card} space-y-8`}>
        <SimpleBarChart
          title="نشاط هذا الأسبوع (مؤشر نسبي)"
          data={studentWeeklyProgress}
          barClass={barWeekly}
          orientation="horizontal"
        />
        <SimpleBarChart
          title="إتقان حسب المادة (تقدير)"
          data={studentTopicMastery}
          maxValue={100}
          barClass={barTopic}
          orientation="vertical"
        />
      </div>
    </div>
  )
}

export default StudentAnalyticsPage
