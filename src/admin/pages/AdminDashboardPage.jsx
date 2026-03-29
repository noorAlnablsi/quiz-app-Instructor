import AdminStatCard from '../components/AdminStatCard'
import AdminLineChart from '../components/charts/AdminLineChart'
import {
  adminDashboardStats,
  adminRecentActivity,
  adminSystemGrowthSeries,
  adminUserActivitySeries,
} from '../mock-data/adminMockData'

const toneStyles = {
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  neutral: 'border-slate-200 bg-slate-50 text-slate-800',
}

function AdminDashboardPage() {
  const s = adminDashboardStats

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم</h1>
        <p className="mt-1 text-sm text-slate-600">نظرة عامة على المستخدمين والأنشطة والمتجر.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          title="المستخدمون"
          value={s.usersCount.toLocaleString('ar-SA')}
          hint={s.usersDelta}
          icon="👥"
        />
        <AdminStatCard
          title="الأنشطة"
          value={s.activitiesCount.toLocaleString('ar-SA')}
          hint={s.activitiesDelta}
          icon="📊"
        />
        <AdminStatCard
          title="عناصر المتجر"
          value={s.marketplaceItemsCount.toLocaleString('ar-SA')}
          hint={s.marketplaceDelta}
          icon="🛒"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminLineChart data={adminUserActivitySeries} title="نشاط المستخدمين (تقدير أسبوعي)" color="#0284c7" />
        <AdminLineChart data={adminSystemGrowthSeries} title="نمو النظام — آلاف المستخدمين (تراكمي)" color="#0369a1" />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">آخر النشاطات</h2>
        <ul className="mt-4 divide-y divide-slate-100">
          {adminRecentActivity.map((item) => (
            <li key={item.id} className="flex flex-wrap items-start justify-between gap-2 py-3 first:pt-0 last:pb-0">
              <span
                className={`inline-flex max-w-full rounded-lg border px-3 py-2 text-sm font-medium ${toneStyles[item.tone] ?? toneStyles.neutral}`}
              >
                {item.text}
              </span>
              <span className="shrink-0 text-xs font-semibold text-slate-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AdminDashboardPage
