function StatCard({ title, value, hint, icon }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900">{value}</p>
          {hint ? <p className="mt-2 text-xs font-medium text-blue-600">{hint}</p> : null}
        </div>
        {icon ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg text-slate-600">
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default StatCard
