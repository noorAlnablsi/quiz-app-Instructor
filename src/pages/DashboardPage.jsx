import PageHeader from '../components/ui/PageHeader'
import StatCard from '../components/ui/StatCard'
import { dashboardStats, recentActivities } from '../mock-data/dashboardData'

function DashboardPage() {
  return (
    <section>
      <PageHeader
        title="لوحة التحكم"
        description="نظرة عامة على بنوك الأسئلة والاختبارات وآخر نشاطات المدرسين."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} delta={stat.delta} tone={stat.tone} />
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">آخر النشاطات</h3>
          <button className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
            عرض الكل
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-right">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">الإجراء</th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">المستهدف</th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">المدرس</th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">الوقت</th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{item.action}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{item.target}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{item.actor}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{item.time}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
