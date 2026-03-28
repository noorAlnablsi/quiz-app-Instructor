import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { accessTypes, questionBanks } from '../mock-data/questionBanksData'

function QuestionBankFormPage({ mode }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const selectedBank = useMemo(
    () => questionBanks.find((bank) => bank.id === id) ?? questionBanks[0],
    [id],
  )
  const seed = mode === 'edit' ? selectedBank : null

  const [name, setName] = useState(seed?.name ?? '')
  const [description, setDescription] = useState(seed?.description ?? '')
  const [access, setAccess] = useState(seed?.access ?? 'public')
  const [topicInput, setTopicInput] = useState('')
  const [questionInput, setQuestionInput] = useState('')
  const [topics, setTopics] = useState(seed?.topics ?? [])
  const [questions, setQuestions] = useState(seed?.questions ?? [])

  const title = mode === 'edit' ? 'تعديل بنك الأسئلة' : 'إنشاء بنك أسئلة'

  const addTopic = () => {
    if (!topicInput.trim()) return
    setTopics((prev) => [...prev, topicInput.trim()])
    setTopicInput('')
  }

  const addQuestion = () => {
    if (!questionInput.trim()) return
    setQuestions((prev) => [...prev, questionInput.trim()])
    setQuestionInput('')
  }

  return (
    <section>
      <PageHeader
        title={title}
        description="نموذج واجهة فقط لإدارة بيانات بنك الأسئلة دون ربط Backend."
      />

      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">اسم البنك</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="مثال: بنك الرياضيات"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">نوع الوصول</span>
            <select
              value={access}
              onChange={(event) => setAccess(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
            >
              {accessTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">الوصف</span>
          <textarea
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="اكتب وصفًا مختصرًا للبنك..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:border-indigo-500 focus:ring"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-slate-900">المواضيع (Topics)</h3>
            <div className="flex gap-2">
              <input
                value={topicInput}
                onChange={(event) => setTopicInput(event.target.value)}
                placeholder="أضف موضوعًا جديدًا"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addTopic}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                إضافة
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span key={`${topic}-${index}`} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 text-sm font-bold text-slate-900">الأسئلة</h3>
            <div className="flex gap-2">
              <input
                value={questionInput}
                onChange={(event) => setQuestionInput(event.target.value)}
                placeholder="أدخل سؤالًا"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addQuestion}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                إضافة
              </button>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {questions.map((question, index) => (
                <li key={`${question}-${index}`} className="rounded-lg bg-slate-50 px-3 py-2">
                  {index + 1}. {question}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Link
            to="/question-banks"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            رجوع
          </Link>
          <button
            type="button"
            onClick={() => navigate('/question-banks')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {mode === 'edit' ? 'حفظ التعديلات' : 'إنشاء البنك'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default QuestionBankFormPage
