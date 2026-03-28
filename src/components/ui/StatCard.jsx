function StatCard({ title, value, delta, tone = 'indigo' }) {
  const toneClass = {
    indigo: 'bg-indigo-100 text-indigo-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    sky: 'bg-sky-100 text-sky-700',
  }[tone]

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${toneClass}`}>{delta}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </article>
  )
}

export default StatCard
