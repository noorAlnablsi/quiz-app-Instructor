import { useMemo, useState } from 'react'
import { adminActivityLogs, adminLogTypeLabels } from '../mock-data/adminMockData'

const typeColors = {
  auth: 'bg-sky-100 text-sky-800 border-sky-200',
  system: 'bg-slate-100 text-slate-800 border-slate-200',
  admin: 'bg-violet-100 text-violet-800 border-violet-200',
  content: 'bg-amber-100 text-amber-900 border-amber-200',
  alert: 'bg-rose-100 text-rose-800 border-rose-200',
  exam: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

function parseLogDate(timeStr) {
  const t = timeStr.replace(' ', 'T')
  const d = new Date(t)
  return Number.isNaN(d.getTime()) ? null : d
}

function AdminMonitoringPage() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = useMemo(() => {
    const from = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null
    const to = dateTo ? new Date(`${dateTo}T23:59:59`) : null

    return adminActivityLogs.filter((log) => {
      if (typeFilter !== 'all' && log.type !== typeFilter) return false
      const logDate = parseLogDate(log.time)
      if (from && logDate && logDate < from) return false
      if (to && logDate && logDate > to) return false
      return true
    })
  }, [typeFilter, dateFrom, dateTo])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">مراقبة النظام</h1>
        <p className="mt-1 text-sm text-slate-600">سجل النشاطات — فلترة حسب النوع والتاريخ.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block w-full sm:w-48">
          <span className="mb-1 block text-xs font-semibold text-slate-600">نوع العملية</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            {Object.entries(adminLogTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="block w-full sm:w-44">
          <span className="mb-1 block text-xs font-semibold text-slate-600">من تاريخ</span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
        </label>
        <label className="block w-full sm:w-44">
          <span className="mb-1 block text-xs font-semibold text-slate-600">إلى تاريخ</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
        </label>
      </div>

      <div className="relative space-y-0 border-s border-sky-200 pr-6">
        {filtered.map((log, index) => (
          <div key={log.id} className="relative pb-8 last:pb-0">
            <span
              className="absolute -right-[5px] top-1.5 size-2.5 rounded-full border-2 border-white bg-sky-500 shadow ring-2 ring-sky-100"
              aria-hidden
            />
            {index < filtered.length - 1 ? (
              <span className="absolute right-0 top-3 h-[calc(100%-0.25rem)] w-px bg-slate-200" aria-hidden />
            ) : null}
            <div className="mr-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{log.user}</p>
                <time className="text-xs font-medium text-slate-500" dateTime={log.time.replace(' ', 'T')}>
                  {log.time}
                </time>
              </div>
              <p className="mt-2 text-sm text-slate-700">{log.action}</p>
              <span
                className={`mt-3 inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${typeColors[log.type] ?? typeColors.system}`}
              >
                {adminLogTypeLabels[log.type] ?? log.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
          لا سجلات مطابقة للفلتر.
        </p>
      ) : null}
    </div>
  )
}

export default AdminMonitoringPage
