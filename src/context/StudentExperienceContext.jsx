import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'quiz-app-student-experience'

/** @typedef {'children' | 'student' | 'professional'} StudentAudience */

const defaultState = {
  /** @type {StudentAudience} */
  audience: 'student',
  fontScalePercent: 100,
  highContrast: false,
}

const StudentExperienceContext = createContext(null)

function migrateLegacyMode(parsed) {
  if (parsed?.audience) return parsed
  const m = parsed?.mode
  if (m === 'simple') return { ...parsed, audience: 'children' }
  if (m === 'exam') return { ...parsed, audience: 'professional' }
  if (m === 'practice') return { ...parsed, audience: 'student' }
  return parsed
}

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      const migrated = migrateLegacyMode(parsed)
      return { ...defaultState, ...migrated }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function StudentExperienceProvider({ children }) {
  const stored = loadStored()
  const [audience, setAudience] = useState(stored?.audience ?? defaultState.audience)
  const [fontScalePercent, setFontScalePercent] = useState(
    stored?.fontScalePercent ?? defaultState.fontScalePercent,
  )
  const [highContrast, setHighContrast] = useState(
    Boolean(stored?.highContrast ?? defaultState.highContrast),
  )

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ audience, fontScalePercent, highContrast }),
      )
    } catch {
      /* ignore */
    }
  }, [audience, fontScalePercent, highContrast])

  const value = useMemo(
    () => ({
      audience,
      setAudience,
      fontScalePercent,
      setFontScalePercent,
      highContrast,
      setHighContrast,
    }),
    [audience, fontScalePercent, highContrast],
  )

  return <StudentExperienceContext.Provider value={value}>{children}</StudentExperienceContext.Provider>
}

export function useStudentExperience() {
  const ctx = useContext(StudentExperienceContext)
  if (!ctx) {
    throw new Error('useStudentExperience must be used within StudentExperienceProvider')
  }
  return ctx
}
