import AdminStatCard from '../components/AdminStatCard'
import AdminBarChart from '../components/charts/AdminBarChart'
import AdminLineChart from '../components/charts/AdminLineChart'
import { adminDashboardStats, adminEngagementSeries, adminUsersOverTime } from '../mock-data/adminMockData'

function AdminStatisticsPage() {
  const s = adminDashboardStats

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">إحصائيات النظام</h1>
        <p className="mt-1 text-sm text-slate-600">مؤشرات إضافية وتفاعل داخل المنصة.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard title="متوسط الجلسات اليومية" value="4.2 ألف" hint="تقدير" icon="📈" />
        <AdminStatCard title="معدل إكمال الاختبارات" value="76%" hint="+2% عن الشهر الماضي" icon="✅" />
        <AdminStatCard title="عناصر المتجر النشطة" value={String(s.marketplaceItemsCount)} hint="يشمل المعتمد" icon="📦" />
        <AdminStatCard title="تنبيهات مفتوحة" value="3" hint="واجهة تجريبية" icon="⚠️" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminLineChart data={adminUsersOverTime} title="عدد المستخدمين عبر الزمن (أسابيع)" color="#0c4a6e" />
        <AdminBarChart data={adminEngagementSeries} title="التفاعل داخل النظام (% تقديري)" barColor="#0284c7" />
      </div>
    </div>
  )
}

export default AdminStatisticsPage
