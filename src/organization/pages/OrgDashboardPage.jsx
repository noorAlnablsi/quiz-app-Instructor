import ActivityFeed from '../components/ActivityFeed'
import OrgBarChart from '../components/charts/OrgBarChart'
import OrgLineChart from '../components/charts/OrgLineChart'
import StatCard from '../components/StatCard'
import {
  orgDashboardStats,
  orgGradeDistribution,
  orgPerformanceOverTime,
  orgRecentActivities,
} from '../mock-data/orgMockData'

function OrgDashboardPage() {
  const s = orgDashboardStats

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">لوحة التحكم التحليلية</h2>
        <p className="mt-1 text-sm text-slate-600">
          نظرة شاملة على الطلاب والاختبارات ومؤشرات النجاح — بيانات تجريبية للعرض فقط.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="إجمالي الطلاب" value={s.studentsCount.toLocaleString('ar-SA')} hint={s.studentsDelta} icon="👥" />
        <StatCard title="الاختبارات النشطة" value={s.examsCount} hint={s.examsDelta} icon="📋" />
        <StatCard title="نسبة النجاح العامة" value={`${s.successRate}%`} hint={s.successDelta} icon="📈" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <OrgLineChart data={orgPerformanceOverTime} title="متوسط أداء الطلاب عبر الزمن (%)" />
        <OrgBarChart data={orgGradeDistribution} title="توزيع الدرجات (عدد الطلاب)" barColor="#1d4ed8" />
      </div>

      <div className="max-w-2xl">
        <ActivityFeed items={orgRecentActivities} />
      </div>
    </div>
  )
}

export default OrgDashboardPage
