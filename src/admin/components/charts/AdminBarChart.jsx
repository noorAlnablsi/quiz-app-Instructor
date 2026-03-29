/** أعمدة عمودية */
function AdminBarChart({ data, title, height = 220, barColor = '#0369a1' }) {
  const padding = { top: 12, right: 12, bottom: 40, left: 40 }
  const w = 480
  const h = height
  const innerW = w - padding.left - padding.right
  const innerH = h - padding.top - padding.bottom
  const max = Math.max(1, ...data.map((d) => d.value))
  const n = data.length
  const gap = 10
  const barW = (innerW - gap * (n - 1)) / n

  const grid = []
  for (let g = 0; g <= 4; g++) {
    const y = padding.top + (innerH / 4) * g
    grid.push({ y, val: Math.round(max - (max / 4) * g) })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {title ? <h4 className="mb-3 text-sm font-semibold text-slate-800">{title}</h4> : null}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={title}>
        {grid.map((row) => (
          <g key={row.y}>
            <line x1={padding.left} y1={row.y} x2={w - padding.right} y2={row.y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={padding.left - 6} y={row.y + 3} textAnchor="end" fill="#94a3b8" fontSize="9" fontWeight="600">
              {row.val}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = padding.left + i * (barW + gap)
          const barH = (d.value / max) * innerH
          const y = padding.top + innerH - barH
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barW} height={Math.max(barH, 2)} rx="3" fill={barColor} opacity="0.9" />
              <text x={x + barW / 2} y={y - 4} textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700">
                {typeof d.value === 'number' && d.value < 100 && d.value % 1 !== 0 ? d.value.toFixed(1) : d.value}
              </text>
              <text x={x + barW / 2} y={h - 12} textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
                {d.label.length > 8 ? `${d.label.slice(0, 7)}…` : d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default AdminBarChart
