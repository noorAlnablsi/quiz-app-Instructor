import { useId } from 'react'

/**
 * مخطط خطي SVG — مظهر Enterprise (شبكة + نقاط + تدرج)
 */
function OrgLineChart({ data, title, height = 220 }) {
  const gradId = useId().replace(/:/g, '')
  const padding = { top: 16, right: 12, bottom: 36, left: 40 }
  const w = 560
  const h = height
  const innerW = w - padding.left - padding.right
  const innerH = h - padding.top - padding.bottom

  const values = data.map((d) => d.value)
  const max = Math.max(100, ...values, 1)
  const min = Math.min(0, Math.min(...values) - 5)

  const xStep = innerW / Math.max(1, data.length - 1)
  const scaleY = (v) => padding.top + innerH - ((v - min) / (max - min)) * innerH

  const points = data.map((d, i) => {
    const x = padding.left + i * xStep
    const y = scaleY(d.value)
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const areaD = `${pathD} L ${padding.left + (data.length - 1) * xStep},${padding.top + innerH} L ${padding.left},${padding.top + innerH} Z`

  const gridLines = 5
  const grid = []
  for (let g = 0; g <= gridLines; g++) {
    const y = padding.top + (innerH / gridLines) * g
    const val = max - ((max - min) / gridLines) * g
    grid.push({ y, val: Math.round(val) })
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {title ? <h4 className="mb-3 text-sm font-semibold text-slate-800">{title}</h4> : null}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
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
        <path d={areaD} fill={`url(#${gradId})`} />
        <path
          d={pathD}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const x = padding.left + i * xStep
          const y = scaleY(d.value)
          return <circle key={d.label} cx={x} cy={y} r="5" fill="#fff" stroke="#2563eb" strokeWidth="2" />
        })}
        {data.map((d, i) => {
          const x = padding.left + i * xStep
          return (
            <text key={`t-${d.label}`} x={x} y={h - 10} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export default OrgLineChart
