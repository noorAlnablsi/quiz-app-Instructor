import { Link, useParams } from 'react-router-dom'
import OrgBarChart from '../components/charts/OrgBarChart'
import OrgLineChart from '../components/charts/OrgLineChart'
import { orgStudentDetails, orgStudents } from '../mock-data/orgMockData'

function OrgStudentDetailPage() {
  const { id } = useParams()
  const student = orgStudents.find((s) => s.id === id)
  const extra = orgStudentDetails[id] ?? {
    trend: [
      { label: '١', value: 60 },
      { label: '٢', value: 62 },
      { label: '٣', value: 61 },
    ],
    exams: [],
  }

  if (!student) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-semibold text-slate-800">الطالب غير موجود.</p>
        <Link to="/org/students" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
          العودة للقائمة
        </Link>
      </div>
    )
  }

  const examBars = extra.exams.map((e) => ({
    label: e.title.length > 12 ? `${e.title.slice(0, 11)}…` : e.title,
    value: Math.round((e.score / e.max) * 100),
  }))

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to="/org/students" className="text-sm font-semibold text-blue-600 hover:underline">
            ← الطلاب
          </Link>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{student.name}</h2>
          <p className="mt-1 text-sm text-slate-600" dir="ltr">
            {student.email}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <p className="text-xs font-semibold text-slate-500">الأداء العام</p>
          <p className="text-3xl font-bold tabular-nums text-blue-700">{student.performance}%</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">المستوى</p>
          <p className="mt-1 font-bold text-slate-900">{student.level}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">المجموعة</p>
          <p className="mt-1 font-bold text-slate-900">{student.group}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">الحالة</p>
          <p className="mt-1 font-bold text-slate-900">{student.status}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrgLineChart data={extra.trend} title="مؤشر الأداء الأسبوعي (تقدير)" height={200} />
        {examBars.length > 0 ? (
          <OrgBarChart data={examBars} title="الاختبارات الأخيرة (% من الدرجة)" barColor="#0ea5e9" />
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500">
            لا يوجد سجل اختبارات في البيانات التجريبية.
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="font-bold text-slate-900">سجل الاختبارات</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3">الاختبار</th>
                <th className="px-5 py-3">التاريخ</th>
                <th className="px-5 py-3">الدرجة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {extra.exams.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-6 text-center text-slate-500">
                    لا توجد بيانات.
                  </td>
                </tr>
              ) : (
                extra.exams.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-medium text-slate-800">{e.title}</td>
                    <td className="px-5 py-3 text-slate-600">{e.date}</td>
                    <td className="px-5 py-3 font-semibold tabular-nums text-slate-900">
                      {e.score} / {e.max}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrgStudentDetailPage
