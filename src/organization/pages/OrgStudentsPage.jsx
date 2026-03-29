import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { orgStudentLevels, orgStudents } from '../mock-data/orgMockData'

function OrgStudentsPage() {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('الكل')

  const filtered = useMemo(() => {
    return orgStudents.filter((row) => {
      const q = search.trim().toLowerCase()
      const matchSearch =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q)
      const matchLevel = level === 'الكل' || row.level === level
      return matchSearch && matchLevel
    })
  }, [search, level])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">إدارة الطلاب</h2>
        <p className="mt-1 text-sm text-slate-600">بحث، فلترة بالمستوى، وعرض تفاصيل كل طالب.</p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[200px] flex-1">
          <span className="mb-1 block text-xs font-semibold text-slate-600">بحث</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="الاسم أو البريد..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:border-blue-500 focus:ring-2"
          />
        </label>
        <label className="block min-w-[180px]">
          <span className="mb-1 block text-xs font-semibold text-slate-600">المستوى</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            {orgStudentLevels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-slate-500">
          النتائج: <span className="font-bold text-slate-800">{filtered.length}</span>
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">الاسم</th>
                <th className="px-4 py-3">البريد الإلكتروني</th>
                <th className="px-4 py-3">المستوى</th>
                <th className="px-4 py-3">الأداء</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600" dir="ltr">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{row.level}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex min-w-[3rem] justify-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-800 tabular-nums">
                      {row.performance}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-600">{row.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/org/students/${row.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      التفاصيل
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">لا توجد نتائج مطابقة للبحث.</p>
        ) : null}
      </div>
    </div>
  )
}

export default OrgStudentsPage
