import { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import { studentProfile } from '../../mock-data/studentPortalData'
import { studentNavLinkClass, studentShellClass } from '../studentTheme'
import AccessibilityBar from './AccessibilityBar'
import ModeSwitcher from './ModeSwitcher'

const navItems = [
  { to: '/student/dashboard', label: 'الرئيسية' },
  { to: '/student/join', label: 'دخول اختبار' },
  { to: '/student/history', label: 'السجل' },
  { to: '/student/analytics', label: 'التحليلات' },
  { to: '/student/banks', label: 'بنوك الأسئلة' },
]

/** حجم الجذر الافتراضي بالبكسل (1rem في Tailwind) */
const ROOT_FONT_BASE_PX = 16

function StudentLayout() {
  const { audience, fontScalePercent, highContrast } = useStudentExperience()
  const htmlFontBaselineRef = useRef(null)

  /* عند دخول بوابة الطالب: حفظ حجم html السابق؛ عند الخروج استعادته */
  useEffect(() => {
    const html = document.documentElement
    if (htmlFontBaselineRef.current === null) {
      htmlFontBaselineRef.current = html.style.fontSize
    }
    return () => {
      html.style.fontSize = htmlFontBaselineRef.current ?? ''
    }
  }, [])

  /* تكبير/تصغير فعلي: كل قيم rem في Tailwind تتبع حجم جذر الصفحة */
  useEffect(() => {
    const html = document.documentElement
    const scale = fontScalePercent / 100
    html.style.fontSize = `${ROOT_FONT_BASE_PX * scale}px`
  }, [fontScalePercent])

  const shell = highContrast
    ? 'student-portal-high-contrast min-h-screen bg-[var(--sp-bg)] text-[var(--sp-text)]'
    : `${studentShellClass(audience)} min-h-screen`

  return (
    <div dir="rtl" className={shell}>
      <header
        className={
          highContrast
            ? 'border-b-2 border-[var(--sp-border)] bg-[var(--sp-surface)]'
            : audience === 'professional'
              ? 'border-b border-slate-300 bg-white/95 shadow-sm'
              : audience === 'children'
                ? 'border-b-2 border-fuchsia-200 bg-white/85 backdrop-blur'
                : 'border-b border-emerald-200/60 bg-white/80 backdrop-blur'
        }
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p
              className={`text-xs font-semibold tracking-wide ${
                highContrast
                  ? 'text-[var(--sp-accent)]'
                  : audience === 'children'
                    ? 'text-violet-700'
                    : audience === 'professional'
                      ? 'text-slate-600'
                      : 'text-emerald-700'
              }`}
            >
              بوابة الطالب
            </p>
            <h1 className={`font-bold ${audience === 'children' ? 'text-2xl' : 'text-xl md:text-2xl'}`}>
              مرحبًا، {studentProfile.name}
            </h1>
            <p
              className={`mt-0.5 text-sm ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-600'}`}
            >
              {studentProfile.grade}
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-2" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/student/dashboard'}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition md:px-4 ${
                    highContrast
                      ? isActive
                        ? 'bg-[var(--sp-accent)] text-[var(--sp-accent-text)]'
                        : 'text-[var(--sp-text)] ring-1 ring-[var(--sp-border)] hover:bg-[var(--sp-surface)]'
                      : studentNavLinkClass(audience, isActive)
                  } ${audience === 'children' ? 'min-h-[48px] text-base' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              className={
                highContrast
                  ? 'rounded-xl px-3 py-2 text-sm font-medium text-[var(--sp-accent)] underline'
                  : `rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-black/5 ${audience === 'children' ? 'text-base' : ''}`
              }
            >
              خروج
            </NavLink>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6 md:py-6">
        <div className="mb-6">
          <ModeSwitcher />
        </div>
        <AccessibilityBar />
        <main className="mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout
