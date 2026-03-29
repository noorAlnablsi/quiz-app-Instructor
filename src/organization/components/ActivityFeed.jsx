const toneStyles = {
  success: 'border-emerald-200 bg-emerald-50/80 text-emerald-900',
  info: 'border-blue-200 bg-blue-50/80 text-blue-900',
  warning: 'border-amber-200 bg-amber-50/80 text-amber-900',
  neutral: 'border-slate-200 bg-slate-50 text-slate-800',
}

function ActivityFeed({ items }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">آخر النشاطات</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={`rounded-lg border px-4 py-3 text-sm ${toneStyles[item.tone] ?? toneStyles.neutral}`}
          >
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 text-xs opacity-80">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityFeed
