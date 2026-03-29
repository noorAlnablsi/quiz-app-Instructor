import { useState } from 'react'
import { orgOfficialExams, orgStudentGroups } from '../mock-data/orgMockData'

function OrgExamsPage() {
  const [selectedExam, setSelectedExam] = useState(orgOfficialExams[0]?.id ?? '')
  const [groups, setGroups] = useState([])
  const [duration, setDuration] = useState(120)
  const [requireCode, setRequireCode] = useState(true)
  const [requireId, setRequireId] = useState(true)
  const [savedMsg, setSavedMsg] = useState('')

  const exam = orgOfficialExams.find((e) => e.id === selectedExam)

  const toggleGroup = (g) => {
    setGroups((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
  }

  const handleSave = () => {
    setSavedMsg('تم حفظ الإعدادات محليًا (واجهة فقط — بدون خادم).')
    setTimeout(() => setSavedMsg(''), 3500)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">الاختبارات الرسمية</h2>
        <p className="mt-1 text-sm text-slate-600">قائمة الاختبارات، التعيين للمجموعات، وشروط الدخول.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-right text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">الاختبار</th>
              <th className="px-4 py-3">الموعد</th>
              <th className="px-4 py-3">المدة</th>
              <th className="px-4 py-3">المجموعات</th>
              <th className="px-4 py-3">الدخول</th>
              <th className="px-4 py-3">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orgOfficialExams.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setSelectedExam(row.id)}
                    className={`text-right font-semibold hover:text-blue-700 ${selectedExam === row.id ? 'text-blue-700' : 'text-slate-900'}`}
                  >
                    {row.title}
                  </button>
                  <p className="text-xs text-slate-500">{row.subject}</p>
                </td>
                <td className="px-4 py-3 text-slate-600 tabular-nums">{row.scheduledAt}</td>
                <td className="px-4 py-3 tabular-nums">{row.durationMin} د</td>
                <td className="px-4 py-3 text-xs text-slate-600">{row.assignedGroups.join('، ')}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{row.access}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">تعيين وضبط الدخول</h3>
        <p className="mt-1 text-sm text-slate-600">
          {exam ? `المحدد: ${exam.title}` : 'اختر اختبارًا من الجدول.'}
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">تعيين لمجموعات طلاب</p>
            <div className="flex flex-wrap gap-2">
              {orgStudentGroups.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGroup(g)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    groups.includes(g)
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <label className="block max-w-xs">
            <span className="mb-1 block text-sm font-semibold text-slate-700">مدة الاختبار (دقيقة)</span>
            <input
              type="number"
              min={15}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </label>

          <div className="space-y-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">شروط الدخول (واجهة فقط)</p>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={requireCode} onChange={(e) => setRequireCode(e.target.checked)} />
              اشتراط رمز دخول
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={requireId} onChange={(e) => setRequireId(e.target.checked)} />
              التحقق من الهوية قبل البدء
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              حفظ الإعدادات
            </button>
            <button
              type="button"
              onClick={() => window.alert('قائمة المسموح لهم: واجهة تجريبية — يُربط بالخادم لاحقًا.')}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              إدارة قائمة الدخول
            </button>
          </div>
          {savedMsg ? <p className="text-sm font-medium text-emerald-700">{savedMsg}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default OrgExamsPage
