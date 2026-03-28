import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { useQuestionBanks } from '../context/QuestionBanksContext'
import { accessTypes } from '../mock-data/questionBanksData'

function QuestionBanksPage() {
  const { banks, removeBank } = useQuestionBanks()
  const [bankToDelete, setBankToDelete] = useState(null)

  const accessTypeMap = useMemo(
    () => accessTypes.reduce((acc, item) => ({ ...acc, [item.value]: item.label }), {}),
    [],
  )

  const handleDeleteRequest = (bank) => {
    setBankToDelete(bank)
  }

  const confirmDelete = () => {
    if (!bankToDelete) return
    removeBank(bankToDelete.id)
    setBankToDelete(null)
  }

  return (
    <section>
      <PageHeader
        title="بنوك الأسئلة"
        description="إدارة بنوك الأسئلة مع إنشاء وتعديل وحذف؛ تُحفظ القائمة في المتصفح."
        action={
          <Link
            to="/question-banks/new"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + إنشاء بنك أسئلة
          </Link>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">اسم البنك</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">المادة</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">عدد الأسئلة</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">نوع الوصول</th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank) => (
              <tr key={bank.id} className="border-t border-slate-100">
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">{bank.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{bank.description}</p>
                  {bank.topics?.length ? (
                    <p className="mt-1.5 text-xs text-slate-400">
                      التوبيكات: {bank.topics.slice(0, 4).join('، ')}
                      {bank.topics.length > 4 ? '…' : ''}
                    </p>
                  ) : null}
                </td>
                <td className="px-5 py-4 text-sm font-medium text-slate-800">{bank.subject ?? '—'}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{bank.questionsCount}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    {accessTypeMap[bank.access]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      to={`/question-banks/${bank.id}/edit`}
                      className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-200"
                    >
                      تعديل
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(bank)}
                      className="rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-800 transition hover:bg-rose-200"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bankToDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">تأكيد الحذف</h3>
            <p className="mt-2 text-sm text-slate-600">
              هل أنت متأكد من حذف البنك؟
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{bankToDelete.name}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setBankToDelete(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                لا
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                نعم
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default QuestionBanksPage
