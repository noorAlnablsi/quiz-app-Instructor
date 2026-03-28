import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { useExams } from '../context/ExamsContext'
import { useQuestionBanks } from '../context/QuestionBanksContext'
import { creationMethods } from '../mock-data/examsData'

function CreateExamPage() {
  const navigate = useNavigate()
  const { addExam } = useExams()
  const { banks } = useQuestionBanks()
  const [method, setMethod] = useState('manual')
  const [durationMode, setDurationMode] = useState('total')
  const [durationValue, setDurationValue] = useState(60)
  const [allowNavigation, setAllowNavigation] = useState(true)
  const [showResults, setShowResults] = useState(true)
  const [selectedBank, setSelectedBank] = useState('')

  useEffect(() => {
    if (banks.length === 0) return
    setSelectedBank((prev) => (prev && banks.some((b) => b.id === prev) ? prev : banks[0].id))
  }, [banks])
  const [title, setTitle] = useState('')

  const handleCreate = () => {
    const name = title.trim()
    if (!name) return
    if (method === 'bank' && banks.length === 0) return

    const bank = method === 'bank' ? banks.find((b) => b.id === selectedBank) : null
    const questionsCount = bank ? bank.questionsCount : 0

    addExam({
      id: `exam-${Date.now()}`,
      name,
      questionsCount,
      durationMode,
      durationValue,
      creationMethod: method,
      bankId: bank?.id ?? null,
      allowNavigation,
      showResults,
    })

    navigate('/exams')
  }

  return (
    <section>
      <PageHeader
        title="إنشاء اختبار"
        description="إعداد اختبار جديد مع خيارات الإنشاء والوقت والتحكم بالتنقل وعرض النتائج."
      />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleCreate()
        }}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">اسم الاختبار</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="مثال: اختبار نهاية الوحدة الأولى"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
          />
        </label>

        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-900">طريقة الإنشاء</h3>
          <div className="flex flex-wrap gap-2">
            {creationMethods.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setMethod(item.value)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  method === item.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {method === 'bank' ? (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">اختر بنك الأسئلة</span>
            <select
              value={selectedBank}
              onChange={(event) => setSelectedBank(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
            >
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-slate-900">إعداد الوقت</h3>
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDurationMode('total')}
                className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                  durationMode === 'total' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                وقت إجمالي
              </button>
              <button
                type="button"
                onClick={() => setDurationMode('per-question')}
                className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                  durationMode === 'per-question' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                وقت لكل سؤال
              </button>
            </div>
            <input
              type="number"
              min={1}
              value={durationValue}
              onChange={(event) => setDurationValue(Number(event.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <p className="mt-2 text-xs text-slate-500">
              {durationMode === 'total' ? 'بالدقائق للاختبار كاملًا' : 'بالدقائق لكل سؤال'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-slate-900">إعدادات الاختبار</h3>
            <label className="mb-3 flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={allowNavigation}
                onChange={(event) => setAllowNavigation(event.target.checked)}
              />
              السماح بالتنقل بين الأسئلة
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showResults}
                onChange={(event) => setShowResults(event.target.checked)}
              />
              عرض النتائج بعد التسليم
            </label>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Link
            to="/exams"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            رجوع
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            إنشاء الاختبار
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateExamPage
