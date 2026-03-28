import { audienceIds, audienceMeta } from '../../mock-data/studentPortalData'
import { useStudentExperience } from '../../context/StudentExperienceContext'
import { studentCardClass } from '../studentTheme'

function ModeSwitcher() {
  const { audience, setAudience, highContrast } = useStudentExperience()

  return (
    <div
      className={`p-4 ${highContrast ? 'rounded-lg border-2 border-[var(--sp-border)] bg-[var(--sp-surface)]' : studentCardClass(audience)}`}
      role="group"
      aria-label="اختيار فئة الواجهة"
    >
      <p className="mb-3 text-sm font-bold">فئة التجربة</p>
      <div className={`flex flex-wrap gap-2 ${audience === 'children' ? 'gap-3' : ''}`}>
        {audienceIds.map((id) => {
          const meta = audienceMeta[id]
          const active = audience === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setAudience(id)}
              aria-pressed={active}
              className={`min-w-[120px] flex-1 rounded-xl border-2 px-3 py-2.5 text-center transition ${
                highContrast
                  ? active
                    ? 'border-[var(--sp-accent)] bg-[var(--sp-accent)] text-[var(--sp-accent-text)]'
                    : 'border-[var(--sp-border)] bg-transparent text-[var(--sp-text)]'
                  : active
                    ? id === 'children'
                      ? 'border-fuchsia-500 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg'
                      : id === 'student'
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                        : 'border-slate-800 bg-slate-800 text-white shadow-md'
                    : 'border-slate-200 bg-white/70 text-slate-700 hover:border-slate-300'
              } ${audience === 'children' ? 'min-h-[56px] text-base font-black' : 'text-sm font-semibold'}`}
            >
              <span className="me-1" aria-hidden="true">
                {meta.emoji}
              </span>
              {meta.label}
            </button>
          )
        })}
      </div>
      <p
        className={`mt-3 text-xs leading-relaxed ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}
      >
        {audienceMeta[audience].description}
      </p>
    </div>
  )
}

export default ModeSwitcher
