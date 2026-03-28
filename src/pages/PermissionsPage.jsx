import { useMemo, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { accessRequests as initialRequests } from '../mock-data/permissionsData'

function PermissionsPage() {
  const [requests, setRequests] = useState(initialRequests)

  const pendingCount = useMemo(
    () => requests.filter((request) => request.status === 'pending').length,
    [requests],
  )

  const updateRequestStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status } : request)),
    )
  }

  const statusLabel = (status) => {
    if (status === 'approved') return 'مقبول'
    if (status === 'rejected') return 'مرفوض'
    return 'قيد الانتظار'
  }

  const statusClass = (status) => {
    if (status === 'approved') return 'bg-emerald-50 text-emerald-700'
    if (status === 'rejected') return 'bg-rose-50 text-rose-700'
    return 'bg-amber-50 text-amber-700'
  }

  return (
    <section>
      <PageHeader
        title="طلبات الصلاحيات"
        description={`إدارة طلبات الوصول إلى بنوك الأسئلة. الطلبات المعلّقة: ${pendingCount}`}
      />

      <div className="space-y-4">
        {requests.map((request) => (
          <article
            key={request.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">{request.bankName}</h3>
                <p className="text-sm text-slate-600">
                  مقدم الطلب: <span className="font-semibold text-slate-800">{request.instructorName}</span>
                </p>
                <p className="text-sm text-slate-600">
                  وقت الطلب: <span className="font-semibold text-slate-800">{request.requestedAt}</span>
                </p>
                <p className="text-sm text-slate-600">
                  السبب: <span className="text-slate-800">{request.reason}</span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(request.status)}`}>
                  {statusLabel(request.status)}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={request.status !== 'pending'}
                    onClick={() => updateRequestStatus(request.id, 'approved')}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white enabled:hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    قبول
                  </button>
                  <button
                    type="button"
                    disabled={request.status !== 'pending'}
                    onClick={() => updateRequestStatus(request.id, 'rejected')}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white enabled:hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    رفض
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PermissionsPage
