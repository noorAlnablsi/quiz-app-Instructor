/**
 * أصناف Tailwind حسب فئة الجمهور (أطفال / طلاب / موظفين)
 * @param {'children' | 'student' | 'professional'} audience
 */
export function studentShellClass(audience) {
  switch (audience) {
    case 'children':
      return 'bg-gradient-to-br from-violet-100/90 via-fuchsia-50 to-amber-100/80 text-slate-900'
    case 'student':
      return 'bg-gradient-to-b from-emerald-50/95 via-teal-50/50 to-slate-50 text-slate-900'
    case 'professional':
      return 'bg-slate-200/90 text-slate-900'
    default:
      return 'bg-slate-50 text-slate-900'
  }
}

export function studentCardClass(audience) {
  switch (audience) {
    case 'children':
      return 'rounded-3xl border-2 border-fuchsia-200 bg-white/90 shadow-lg shadow-fuchsia-200/30'
    case 'student':
      return 'rounded-2xl border border-emerald-200/80 bg-white/90 shadow-sm shadow-emerald-900/5'
    case 'professional':
      return 'rounded-lg border border-slate-300 bg-white shadow-sm'
    default:
      return 'rounded-xl border border-slate-200 bg-white shadow-sm'
  }
}

export function studentPrimaryButtonClass(audience) {
  switch (audience) {
    case 'children':
      return 'min-h-[52px] rounded-2xl bg-gradient-to-l from-violet-600 to-fuchsia-500 px-6 py-3 text-lg font-black text-white shadow-md transition hover:brightness-110'
    case 'student':
      return 'rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700'
    case 'professional':
      return 'rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900'
    default:
      return 'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white'
  }
}

export function studentNavLinkClass(audience, isActive) {
  if (isActive) {
    switch (audience) {
      case 'children':
        return 'bg-gradient-to-l from-violet-600 to-fuchsia-500 text-white shadow-md'
      case 'student':
        return 'bg-emerald-600 text-white shadow-sm'
      case 'professional':
        return 'bg-slate-800 text-white ring-1 ring-slate-600'
      default:
        return 'bg-indigo-600 text-white'
    }
  }
  switch (audience) {
    case 'children':
      return 'text-violet-900 hover:bg-fuchsia-100/60 text-lg font-bold'
    case 'student':
      return 'text-emerald-900 hover:bg-emerald-100/80'
    case 'professional':
      return 'text-slate-700 hover:bg-slate-200'
    default:
      return 'text-slate-600 hover:bg-slate-100'
  }
}

export function audienceIsLargeTouch(audience) {
  return audience === 'children'
}
