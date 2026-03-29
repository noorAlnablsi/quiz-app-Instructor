/**
 * مخطط أعمدة SVG — توزيع أو مقارنة (مظهر Corporate)
 */
function OrgBarChart({ data, title, height = 240, barColor = '#2563eb' }) {
  const padding = { top: 16, right: 16, bottom: 44, left: 44 }
  const w = 520
  const h = height
  const innerW = w - padding.left - padding.right
  const innerH = h - padding.top - padding.bottom

  const max = Math.max(1, ...data.map((d) => d.value))
  const barCount = data.length
  const gap = 12
  const barW = (innerW - gap * (barCount - 1)) / barCount

  const gridLines = 4
  const grid = []
  for (let g = 0; g <= gridLines; g++) {
    const y = padding.top + (innerH / gridLines) * g
    const val = Math.round(max - (max / gridLines) * g)
    grid.push({ y, val })
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {title ? <h4 className="mb-3 text-sm font-semibold text-slate-800">{title}</h4> : null}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-full" role="img" aria-label={title}>
        {grid.map((row) => (
          <g key={row.y}>
            <line
              x1={padding.left}
              y1={row.y}
              x2={w - padding.right}
              y2={row.y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <text x={padding.left - 8} y={row.y + 4} textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="600">
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
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(barH, 2)}
                rx="4"
                fill={barColor}
                opacity="0.92"
              />
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="10"
                fontWeight="700"
              >
                {d.value}
              </text>
              <text
                x={x + barW / 2}
                y={h - 16}
                textAnchor="middle"
                fill="#64748b"
                fontSize="9"
                fontWeight="600"
              >
                {d.label.length > 10 ? `${d.label.slice(0, 9)}…` : d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default OrgBarChart
