import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import {
  demoExamMeta,
  demoExamQuestions,
  formatDurationAr,
  getExamDurationSeconds,
} from '../../mock-data/studentPortalData'
import { studentCardClass, studentPrimaryButtonClass } from '../studentTheme'

function formatCountdown(totalSeconds) {
  const s = Math.max(0, totalSeconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}

function StudentExamPage() {
  const { audience, highContrast } = useStudentExperience()
  const navigate = useNavigate()
  const questions = demoExamQuestions

  const allocatedSeconds = useMemo(() => getExamDurationSeconds(questions.length), [questions.length])
  const allocatedRef = useRef(allocatedSeconds)

  const [secondsLeft, setSecondsLeft] = useState(allocatedSeconds)
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reveal, setReveal] = useState({})
  const [gamePoints, setGamePoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const finishedRef = useRef(false)
  const answersRef = useRef(answers)
  answersRef.current = answers

  const isChild = audience === 'children'
  const isStudent = audience === 'student'
  const isPro = audience === 'professional'

  const showImmediateFeedback = isChild
  const allowPrev = isChild || isStudent
  const lockNextUntilAnswered = isStudent || isPro
  const formalLayout = isPro

  const q = questions[currentIndex]
  const selected = answers[q.id]

  const setAnswer = useCallback(
    (optionIndex) => {
      setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }))
      if (showImmediateFeedback) {
        const correct = optionIndex === q.correctIndex
        setReveal((prev) => ({ ...prev, [q.id]: correct ? 'correct' : 'wrong' }))
        if (correct) {
          setStreak((s) => {
            setGamePoints((p) => p + 15 + s * 2)
            return s + 1
          })
        } else {
          setStreak(0)
        }
      }
    },
    [q, showImmediateFeedback],
  )

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1)
  }

  const goPrev = () => {
    if (allowPrev && currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const gamePointsRef = useRef(0)
  gamePointsRef.current = gamePoints

  const finishWrapped = useCallback(
    (opts) => {
      if (finishedRef.current) return
      finishedRef.current = true
      const ans = answersRef.current
      const score = questions.reduce((acc, item) => (ans[item.id] === item.correctIndex ? acc + 1 : acc), 0)
      navigate('/student/result/demo', {
        replace: false,
        state: {
          audience,
          score,
          total: questions.length,
          title: demoExamMeta.title,
          answers: ans,
          questions,
          timedOut: Boolean(opts?.timedOut),
          allocatedSeconds: allocatedRef.current,
          sessionId: `SESS-${Date.now()}`,
          gamePoints: isChild ? gamePointsRef.current : undefined,
        },
      })
    },
    [audience, isChild, navigate, questions],
  )

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (secondsLeft !== 0) return
    finishWrapped({ timedOut: true })
  }, [secondsLeft, finishWrapped])

  const urgentTime = secondsLeft > 0 && secondsLeft <= 120
  const examLockedNext = lockNextUntilAnswered && selected === undefined
  const isLast = currentIndex === questions.length - 1

  const card = highContrast
    ? 'rounded-xl border-2 border-[var(--sp-border)] bg-[var(--sp-surface)] p-5 md:p-8'
    : `${studentCardClass(audience)} p-5 md:p-8 ${formalLayout ? 'max-w-3xl mx-auto' : ''}`

  const optionBase = (idx) => {
    const isSel = selected === idx
    if (highContrast) {
      return `w-full rounded-xl border-2 px-4 py-3 text-right text-base font-medium transition ${
        isSel
          ? 'border-[var(--sp-accent)] bg-[var(--sp-accent)] text-[var(--sp-accent-text)]'
          : 'border-[var(--sp-border)] bg-black text-[var(--sp-text)] hover:border-[var(--sp-accent)]'
      }`
    }
    if (isChild) {
      const r = reveal[q.id]
      const correct = idx === q.correctIndex
      let extra = ''
      if (r && isSel) extra = r === 'correct' ? 'ring-4 ring-amber-300 border-fuchsia-400' : 'ring-4 ring-rose-300'
      else if (r && correct) extra = 'ring-2 ring-emerald-400 bg-emerald-50'
      return `w-full min-h-[56px] rounded-2xl border-2 border-fuchsia-200 px-4 py-4 text-right text-lg font-black transition ${
        isSel ? 'bg-fuchsia-50 border-fuchsia-500' : 'bg-white hover:bg-violet-50'
      } ${extra}`
    }
    if (isPro) {
      return `w-full rounded-md border px-4 py-3 text-right text-sm font-medium transition ${
        isSel ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-300 bg-white hover:border-slate-400'
      }`
    }
    /* student */
    return `w-full rounded-xl border-2 px-4 py-3 text-right text-sm font-medium transition ${
      isSel ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-100 bg-white hover:border-emerald-300'
    }`
  }

  const timerBadgeClass = highContrast
    ? `rounded-xl border-2 px-3 py-2 font-bold tabular-nums ${
        urgentTime ? 'border-red-400 bg-red-950 text-red-100' : 'border-[var(--sp-border)] bg-[var(--sp-surface)] text-[var(--sp-text)]'
      }`
    : isPro
      ? `rounded-md border px-3 py-2 text-sm font-bold tabular-nums ${
          urgentTime ? 'border-rose-600 bg-rose-50 text-rose-900' : 'border-slate-400 bg-white text-slate-800'
        }`
      : isChild
        ? `rounded-2xl border-2 px-4 py-3 text-2xl font-black tabular-nums ${
            urgentTime ? 'border-red-500 bg-red-100 text-red-900' : 'border-fuchsia-300 bg-white text-fuchsia-900'
          }`
        : `rounded-xl border-2 px-3 py-2 text-sm font-bold tabular-nums ${
            urgentTime ? 'border-rose-500 bg-rose-50 text-rose-900' : 'border-emerald-200 bg-white text-emerald-900'
          }`

  const durationLabel = formatDurationAr(allocatedSeconds)

  const headerPro = (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-3">
      <div>
        <h2 className="text-sm font-semibold tracking-wide text-slate-700">{demoExamMeta.title}</h2>
        <p className="mt-1 text-xs text-slate-500 tabular-nums">
          السؤال {currentIndex + 1} من {questions.length} · زمن مخصّص {durationLabel} ({questions.length} أسئلة ×{' '}
          {Math.round(allocatedSeconds / questions.length)} ث تقريبًا لكل سؤال)
        </p>
      </div>
      <div className={timerBadgeClass} role="timer" aria-live="polite" aria-label={`الوقت المتبقي ${formatCountdown(secondsLeft)}`}>
        <span className="block text-[10px] font-semibold uppercase opacity-80">متبقي</span>
        {formatCountdown(secondsLeft)}
      </div>
    </header>
  )

  const headerChild = (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-2xl font-black text-violet-900">سؤال {currentIndex + 1} من {questions.length}</h2>
        <p className="text-base font-bold text-fuchsia-800">اختر الإجابة — تظهر النتيجة فورًا</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm font-bold">
          <span className="rounded-full bg-amber-200 px-3 py-1 text-amber-950">⭐ نقاط: {gamePoints}</span>
          <span className="rounded-full bg-violet-200 px-3 py-1 text-violet-900">🔥 تتابع: {streak}</span>
        </div>
      </div>
      <div className={timerBadgeClass} role="timer" aria-live="polite">
        <span className="block text-sm font-bold text-fuchsia-800">⏱ الوقت</span>
        {formatCountdown(secondsLeft)}
      </div>
    </header>
  )

  const headerStudent = (
    <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-xl font-bold text-emerald-900">{demoExamMeta.title}</h2>
        <p className="text-sm text-emerald-800/90">
          للطلاب: لا تُعرض صحة الإجابة أثناء الاختبار — النتيجة والتحليل بعد التسليم. الزمن: {durationLabel}.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className={timerBadgeClass} role="timer" aria-live="polite">
          <span className="block text-[10px] font-semibold opacity-80">متبقي</span>
          {formatCountdown(secondsLeft)}
        </div>
        <p className="text-sm font-semibold text-emerald-700 tabular-nums">مجاب: {Object.keys(answers).length} / {questions.length}</p>
      </div>
    </header>
  )

  return (
    <div className="space-y-4">
      {isPro ? headerPro : isChild ? headerChild : headerStudent}

      {isChild ? (
        <nav className="flex flex-wrap gap-2" aria-label="تنقل بين الأسئلة">
          {questions.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`min-h-10 min-w-10 rounded-xl text-sm font-black tabular-nums ${
                i === currentIndex
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md'
                  : answers[item.id] !== undefined
                    ? 'bg-fuchsia-100 text-fuchsia-900'
                    : 'bg-white text-slate-600 ring-2 ring-fuchsia-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      ) : null}

      <section className={card} aria-live="polite">
        <p
          className={`font-semibold leading-relaxed ${
            isChild ? 'text-2xl' : isPro ? 'text-base' : 'text-lg'
          } ${highContrast ? 'text-[var(--sp-text)]' : ''}`}
        >
          {q.text}
        </p>

        <ul className="mt-6 space-y-3">
          {q.options.map((opt, idx) => (
            <li key={opt}>
              <button type="button" onClick={() => setAnswer(idx)} className={optionBase(idx)}>
                {opt}
              </button>
            </li>
          ))}
        </ul>

        {isChild && reveal[q.id] ? (
          <p
            className={`mt-4 animate-pulse rounded-2xl px-4 py-3 text-center text-lg font-black ${
              reveal[q.id] === 'correct' ? 'bg-amber-200 text-amber-950' : 'bg-rose-200 text-rose-900'
            }`}
            role="status"
          >
            {reveal[q.id] === 'correct' ? '🎉 أحسنت! +نقاط' : '😊 حاول مرة أخرى — الإجابة الصحيحة مظللة.'}
          </p>
        ) : null}

        {isPro ? (
          <p className="mt-6 text-xs text-slate-500">
            تقييم رسمي — النتيجة بعد التسليم. ينتهي الاختبار تلقائيًا عند انتهاء الوقت مع حفظ الإجابات.
          </p>
        ) : null}
        {isStudent ? (
          <p className="mt-6 text-xs text-emerald-700">التحليل واقتراحات التحسين تظهر في صفحة النتيجة بعد الانتهاء.</p>
        ) : null}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/student/dashboard"
          className={`text-sm font-semibold underline ${highContrast ? 'text-[var(--sp-accent)]' : 'text-slate-600'}`}
        >
          إلغاء والخروج
        </Link>
        <div className="flex flex-wrap gap-2">
          {allowPrev ? (
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-40 ${
                highContrast
                  ? 'border-[var(--sp-border)] text-[var(--sp-text)]'
                  : isChild
                    ? 'border-fuchsia-300 bg-white font-bold text-violet-900'
                    : 'border-slate-300 bg-white text-slate-800'
              } ${isChild ? 'min-h-12 min-w-[100px] text-lg' : ''}`}
            >
              السابق
            </button>
          ) : null}
          {!isLast ? (
            <button
              type="button"
              onClick={goNext}
              disabled={examLockedNext}
              className={`${studentPrimaryButtonClass(audience)} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              التالي
            </button>
          ) : (
            <button type="button" onClick={() => finishWrapped()} className={studentPrimaryButtonClass(audience)}>
              تسليم الاختبار
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentExamPage
