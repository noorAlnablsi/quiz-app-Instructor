import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { questionBanks as seedBanks } from '../mock-data/questionBanksData'

const STORAGE_KEY = 'quiz-app-question-banks'

const QuestionBanksContext = createContext(null)

function readStoredBanks() {
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

function writeStoredBanks(banks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banks))
  } catch {
    /* ignore */
  }
}

export function QuestionBanksProvider({ children }) {
  const [banks, setBanks] = useState(() => readStoredBanks() ?? seedBanks)

  const addBank = useCallback((bank) => {
    setBanks((prev) => {
      const next = [bank, ...prev]
      writeStoredBanks(next)
      return next
    })
  }, [])

  const updateBank = useCallback((bankId, patch) => {
    setBanks((prev) => {
      const next = prev.map((b) => (b.id === bankId ? { ...b, ...patch } : b))
      writeStoredBanks(next)
      return next
    })
  }, [])

  const removeBank = useCallback((bankId) => {
    setBanks((prev) => {
      const next = prev.filter((b) => b.id !== bankId)
      writeStoredBanks(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ banks, addBank, updateBank, removeBank }),
    [banks, addBank, updateBank, removeBank],
  )

  return <QuestionBanksContext.Provider value={value}>{children}</QuestionBanksContext.Provider>
}

export function useQuestionBanks() {
  const ctx = useContext(QuestionBanksContext)
  if (!ctx) {
    throw new Error('useQuestionBanks must be used within QuestionBanksProvider')
  }
  return ctx
}
