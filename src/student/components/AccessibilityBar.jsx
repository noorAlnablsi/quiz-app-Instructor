import { useStudentExperience } from '../../context/StudentExperienceContext'

const FONT_STEPS = [
  { label: 'صغير', value: 90 },
  { label: 'عادي', value: 100 },
  { label: 'كبير', value: 115 },
  { label: 'أكبر', value: 130 },
]

function AccessibilityBar() {
  const { audience, fontScalePercent, setFontScalePercent, highContrast, setHighContrast } =
    useStudentExperience()

  return (
    <div
      className={`flex flex-col gap-3 border-t pt-4 md:flex-row md:flex-wrap md:items-center md:justify-between ${
        highContrast ? 'border-[var(--sp-border)]' : 'border-black/10'
      }`}
      role="region"
      aria-label="إعدادات العرض وسهولة الوصول"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-sm font-semibold ${highContrast ? 'text-[var(--sp-text)]' : 'text-slate-700'}`}>
          حجم الخط:
        </span>
        <span
          className={`hidden text-xs sm:inline ${highContrast ? 'text-[var(--sp-muted)]' : 'text-slate-500'}`}
        >
          (يُكبّر كل النصوص والأزرار في الصفحة)
        </span>
        <div className="flex flex-wrap gap-1">
          {FONT_STEPS.map((step) => (
            <button
              key={step.value}
              type="button"
              onClick={() => setFontScalePercent(step.value)}
              aria-label={`حجم خط ${step.label}`}
              aria-pressed={fontScalePercent === step.value}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                highContrast
                  ? fontScalePercent === step.value
                    ? 'border-[var(--sp-accent)] bg-[var(--sp-accent)] text-[var(--sp-accent-text)]'
                    : 'border-[var(--sp-border)] text-[var(--sp-text)]'
                  : fontScalePercent === step.value
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              } ${audience === 'children' ? 'min-h-[44px] min-w-[72px] text-base' : ''}`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>
      <label
        className={`flex cursor-pointer items-center gap-2 text-sm font-medium ${
          highContrast ? 'text-[var(--sp-text)]' : 'text-slate-700'
        }`}
      >
        <input
          type="checkbox"
          checked={highContrast}
          onChange={(e) => setHighContrast(e.target.checked)}
          className="size-4 rounded border-slate-400"
        />
        تباين عالٍ
      </label>
    </div>
  )
}

export default AccessibilityBar
