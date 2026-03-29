function AdminStatCard({ title, value, hint, icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl">{value}</p>
          {hint ? <p className="mt-2 text-xs font-medium text-sky-600">{hint}</p> : null}
        </div>
        {icon ? (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-600">
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default AdminStatCard
