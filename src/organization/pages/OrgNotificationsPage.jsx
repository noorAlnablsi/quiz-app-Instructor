import { orgNotifications } from '../mock-data/orgMockData'

const typeMeta = {
  result: { label: 'نتيجة', className: 'bg-emerald-100 text-emerald-800' },
  exam: { label: 'اختبار', className: 'bg-blue-100 text-blue-800' },
  issue: { label: 'مشكلة', className: 'bg-rose-100 text-rose-800' },
  info: { label: 'معلومة', className: 'bg-slate-200 text-slate-800' },
}

function OrgNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">الإشعارات</h2>
        <p className="mt-1 text-sm text-slate-600">نتائج، اختبارات جديدة، وتنبيهات — بيانات وهمية.</p>
      </div>

      <ul className="space-y-3">
        {orgNotifications.map((n) => {
          const meta = typeMeta[n.type] ?? typeMeta.info
          return (
            <li
              key={n.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div>
                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${meta.className}`}>
                  {meta.label}
                </span>
                <p className="mt-2 font-semibold text-slate-900">{n.title}</p>
                <p className="mt-1 text-xs text-slate-500">{n.time}</p>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:underline"
                onClick={() => window.alert('تمييز كمقروء — واجهة فقط.')}
              >
                تعيين كمقروء
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default OrgNotificationsPage
