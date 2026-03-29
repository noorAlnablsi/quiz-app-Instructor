import OrgBarChart from '../components/charts/OrgBarChart'
import { orgGradeDistribution, orgReportSummaries } from '../mock-data/orgMockData'

function OrgReportsPage() {
  const exportMock = (label) => {
    window.alert(`تصدير «${label}»: واجهة فقط — سيتم تنزيل CSV/PDF عند ربط الخادم.`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">التقارير</h2>
        <p className="mt-1 text-sm text-slate-600">ملخصات أداء الطلاب ونِسَب النجاح مع خيارات تصدير.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {orgReportSummaries.map((r) => (
          <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">{r.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{r.period}</p>
            <p className="mt-4 text-3xl font-bold tabular-nums text-blue-700">{r.passRate}%</p>
            <p className="text-xs font-medium text-slate-600">نسبة النجاح التقديرية</p>
            <button
              type="button"
              onClick={() => exportMock(r.title)}
              className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              تصدير البيانات
            </button>
          </div>
        ))}
      </div>

      <OrgBarChart data={orgGradeDistribution} title="توزيع الدرجات — نفس بيانات لوحة التحكم (للتقرير)" barColor="#334155" />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900">تصدير شامل</h3>
        <p className="mt-1 text-sm text-slate-600">اختر تنسيقًا للعرض التجريبي.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => exportMock('تقرير Excel')}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Excel (CSV)
          </button>
          <button
            type="button"
            onClick={() => exportMock('تقرير PDF')}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrgReportsPage
