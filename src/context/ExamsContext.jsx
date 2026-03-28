import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { exams as seedExams } from '../mock-data/examsData'

const STORAGE_KEY = 'quiz-app-exams'

const ExamsContext = createContext(null)

function readStoredExams() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    /* ignore */
  }
  return null
}

function writeStoredExams(exams) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exams))
  } catch {
    /* ignore */
  }
}

export function ExamsProvider({ children }) {
  const [exams, setExams] = useState(() => readStoredExams() ?? seedExams)

  const addExam = useCallback((exam) => {
    setExams((prev) => {
      const next = [exam, ...prev]
      writeStoredExams(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ exams, addExam }), [exams, addExam])

  return <ExamsContext.Provider value={value}>{children}</ExamsContext.Provider>
}

export function useExams() {
  const ctx = useContext(ExamsContext)
  if (!ctx) {
    throw new Error('useExams must be used within ExamsProvider')
  }
  return ctx
}
