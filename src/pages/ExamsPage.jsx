import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { exams } from '../mock-data/examsData'

function ExamsPage() {
  return (
    <section>
      <PageHeader
        title="الاختبارات"
        description="عرض الاختبارات الحالية مع عدد الأسئلة وإعداد الوقت."
        action={
          <Link
            to="/exams/new"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + إنشاء اختبار
          </Link>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">اسم الاختبار</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">عدد الأسئلة</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">الوقت</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-t border-slate-100">
                <td className="px-5 py-4 text-sm font-semibold text-slate-900">{exam.name}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{exam.questionsCount}</td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  {exam.durationMode === 'total'
                    ? `${exam.durationValue} دقيقة (إجمالي)`
                    : `${exam.durationValue} دقيقة لكل سؤال`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ExamsPage
