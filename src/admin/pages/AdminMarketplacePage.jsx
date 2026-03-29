import { useState } from 'react'
import { adminMarketplaceItems as initialItems } from '../mock-data/adminMockData'

const statusLabels = {
  pending: 'قيد المراجعة',
  approved: 'موافَق',
  rejected: 'مرفوض',
}

const statusStyles = {
  pending: 'bg-amber-100 text-amber-900',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800',
}

function AdminMarketplacePage() {
  const [items, setItems] = useState(() =>
    initialItems.map((i) => ({ ...i })),
  )

  const approve = (id) => {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: 'approved' } : i)))
  }

  const reject = (id) => {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: 'rejected' } : i)))
  }

  const pending = items.filter((i) => i.status === 'pending')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">إدارة المتجر</h1>
        <p className="mt-1 text-sm text-slate-600">عناصر معلقة وموافقة/رفض (واجهة فقط).</p>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">عناصر بانتظار المراجعة</h2>
        {pending.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">لا توجد عناصر معلقة حاليًا.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pending.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">صاحب الطلب: {item.owner}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => approve(item.id)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    موافقة
                  </button>
                  <button
                    type="button"
                    onClick={() => reject(item.id)}
                    className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-50"
                  >
                    رفض
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-base font-bold text-slate-900">جميع العناصر</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">العنصر</th>
                <th className="px-4 py-3 font-semibold text-slate-700">صاحب الطلب</th>
                <th className="px-4 py-3 font-semibold text-slate-700">الحالة</th>
                <th className="px-4 py-3 font-semibold text-slate-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                  <td className="px-4 py-3 text-slate-600">{item.owner}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${statusStyles[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {item.status === 'pending' ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => approve(item.id)}
                          className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                        >
                          موافقة
                        </button>
                        <button
                          type="button"
                          onClick={() => reject(item.id)}
                          className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800 hover:bg-rose-100"
                        >
                          رفض
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default AdminMarketplacePage
