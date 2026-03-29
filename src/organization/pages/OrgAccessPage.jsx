import { useState } from 'react'
import { orgAccessRules } from '../mock-data/orgMockData'

function OrgAccessPage() {
  const [rules, setRules] = useState(orgAccessRules)

  const updateRule = (id, patch) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">الصلاحيات والتحكم بالدخول</h2>
        <p className="mt-1 text-sm text-slate-600">
          ضبط مبسّط لمن يدخل الاختبارات وشروط الوصول — بيانات محلية للعرض فقط.
        </p>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">{rule.name}</h3>
            <p className="mt-2 text-xs text-slate-500">الأدوار المسموحة: {rule.roles.join('، ')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={rule.requireCode}
                  onChange={(e) => updateRule(rule.id, { requireCode: e.target.checked })}
                />
                رمز دخول
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={rule.requireIdCheck}
                  onChange={(e) => updateRule(rule.id, { requireIdCheck: e.target.checked })}
                />
                تحقق هوية
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={rule.ipRestriction}
                  onChange={(e) => updateRule(rule.id, { ipRestriction: e.target.checked })}
                />
                تقييد IP
              </label>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        التغييرات تبقى في الجلسة الحالية فقط حتى إعادة تحميل الصفحة (لا خادم).
      </p>
    </div>
  )
}

export default OrgAccessPage
