/**
 * رسم بياني شريطي بسيط بدون مكتبات خارجية
 * @param {'horizontal' | 'vertical'} orientation — أفقي: شريط يمتد يمينًا | عمودي: عمود يرتفع للأعلى
 */
function SimpleBarChart({ title, data, maxValue, barClass = 'bg-emerald-500', orientation = 'horizontal' }) {
  const max = maxValue ?? Math.max(1, ...data.map((d) => d.value))

  if (orientation === 'vertical') {
    return (
      <div className="w-full">
        {title ? <h4 className="mb-4 text-sm font-bold">{title}</h4> : null}
        <div
          className="flex items-end justify-between gap-1 border-b border-black/10 pb-2 sm:gap-2 md:gap-3"
          style={{ minHeight: '11rem' }}
          role="img"
          aria-label={title}
        >
          {data.map((item) => {
            const pct = Math.min(100, (item.value / max) * 100)
            return (
              <div key={item.label} className="flex min-w-0 flex-1 flex-col items-stretch gap-2">
                <div className="mx-auto flex h-36 w-full max-w-[2.75rem] flex-col justify-end rounded-t-md bg-black/[0.06] sm:max-w-12 sm:h-40">
                  <div
                    className={`w-full rounded-t-md transition-all ${barClass}`}
                    style={{ height: `${pct}%`, minHeight: pct > 0 ? 4 : 0 }}
                    title={`${item.label}: ${item.value}%`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold tabular-nums sm:text-xs">{item.value}%</p>
                  <p className="text-[10px] font-medium leading-tight opacity-80 sm:text-xs">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {title ? <h4 className="mb-3 text-sm font-bold">{title}</h4> : null}
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <span className="w-12 shrink-0 text-xs font-medium opacity-80 sm:w-14">{item.label}</span>
            <div className="h-8 flex-1 overflow-hidden rounded-lg bg-black/5">
              <div
                className={`h-full min-w-[4px] rounded-lg transition-all ${barClass}`}
                style={{ width: `${Math.min(100, (item.value / max) * 100)}%` }}
                title={`${item.value}%`}
              />
            </div>
            <span className="w-9 shrink-0 text-left text-xs font-semibold tabular-nums sm:w-10">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimpleBarChart
