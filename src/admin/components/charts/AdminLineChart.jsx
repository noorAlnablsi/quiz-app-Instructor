import { useId } from 'react'

/** مخطط خطي — نشاط / سلاسل زمنية */
function AdminLineChart({ data, title, height = 200, color = '#0284c7' }) {
  const gradId = useId().replace(/:/g, '')
  const padding = { top: 14, right: 10, bottom: 32, left: 36 }
  const w = 520
  const h = height
  const innerW = w - padding.left - padding.right
  const innerH = h - padding.top - padding.bottom

  const values = data.map((d) => d.value)
  const max = Math.max(...values, 1) * 1.08
  const min = Math.min(0, Math.min(...values) * 0.92)

  const xStep = innerW / Math.max(1, data.length - 1)
  const scaleY = (v) => padding.top + innerH - ((v - min) / (max - min)) * innerH

  const pathD = `M ${data.map((d, i) => `${padding.left + i * xStep},${scaleY(d.value)}`).join(' L ')}`
  const lastX = padding.left + (data.length - 1) * xStep
  const areaD = `${pathD} L ${lastX},${padding.top + innerH} L ${padding.left},${padding.top + innerH} Z`

  const gridLines = 4
  const grid = []
  for (let g = 0; g <= gridLines; g++) {
    const y = padding.top + (innerH / gridLines) * g
    const val = Math.round(max - ((max - min) / gridLines) * g)
    grid.push({ y, val })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {title ? <h4 className="mb-3 text-sm font-semibold text-slate-800">{title}</h4> : null}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {grid.map((row) => (
          <g key={row.y}>
            <line x1={padding.left} y1={row.y} x2={w - padding.right} y2={row.y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={padding.left - 6} y={row.y + 3} textAnchor="end" fill="#94a3b8" fontSize="9" fontWeight="600">
              {row.val}
            </text>
          </g>
        ))}
        <path d={areaD} fill={`url(#${gradId})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={padding.left + i * xStep}
            cy={scaleY(d.value)}
            r="4"
            fill="#fff"
            stroke={color}
            strokeWidth="2"
          />
        ))}
        {data.map((d, i) => (
          <text
            key={`t-${d.label}`}
            x={padding.left + i * xStep}
            y={h - 8}
            textAnchor="middle"
            fill="#64748b"
            fontSize="9"
            fontWeight="600"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

export default AdminLineChart
