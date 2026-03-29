import { useMemo, useState } from 'react'
import AdminModal from '../components/AdminModal'
import {
  adminRoleFilterOptions,
  adminRoleLabels,
  adminUsers as initialUsers,
} from '../mock-data/adminMockData'

const statusLabels = { active: 'نشط', disabled: 'معطّل' }

function AdminUsersPage() {
  const [users, setUsers] = useState(() => [...initialUsers])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('الكل')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'student', status: 'active' })

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      const matchRole = roleFilter === 'الكل' || u.role === roleFilter
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (adminRoleLabels[u.role] ?? u.role).toLowerCase().includes(q)
      return matchRole && matchSearch
    })
  }, [users, search, roleFilter])

  const openEdit = (user) => {
    setEditing(user)
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setModalOpen(true)
  }

  const saveEdit = () => {
    if (!editing) return
    setUsers((list) =>
      list.map((u) => (u.id === editing.id ? { ...u, ...form } : u)),
    )
    setModalOpen(false)
    setEditing(null)
  }

  const removeUser = (id) => {
    if (!window.confirm('حذف المستخدم من القائمة؟ (واجهة فقط)')) return
    setUsers((list) => list.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">إدارة المستخدمين</h1>
        <p className="mt-1 text-sm text-slate-600">بحث، فلترة، وتعديل (بدون خادم).</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[200px] flex-1">
          <span className="mb-1 block text-xs font-semibold text-slate-600">بحث</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="اسم أو بريد..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
        </label>
        <label className="block w-full sm:w-44">
          <span className="mb-1 block text-xs font-semibold text-slate-600">الدور</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          >
            {adminRoleFilterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'الكل' ? 'الكل' : adminRoleLabels[opt] ?? opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">الاسم</th>
                <th className="px-4 py-3 font-semibold text-slate-700">البريد</th>
                <th className="px-4 py-3 font-semibold text-slate-700">الدور</th>
                <th className="px-4 py-3 font-semibold text-slate-700">الحالة</th>
                <th className="px-4 py-3 font-semibold text-slate-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
                      {adminRoleLabels[u.role] ?? u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {statusLabels[u.status] ?? u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(u)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => removeUser(u.id)}
                        className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800 hover:bg-rose-100"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">لا نتائج مطابقة.</p>
        ) : null}
      </div>

      <AdminModal
        open={modalOpen}
        title="تعديل المستخدم"
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        footer={
          <>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false)
                setEditing(null)
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              حفظ
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">الاسم</span>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">البريد</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">الدور</span>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="admin">{adminRoleLabels.admin}</option>
              <option value="teacher">{adminRoleLabels.teacher}</option>
              <option value="student">{adminRoleLabels.student}</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">الحالة</span>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="active">{statusLabels.active}</option>
              <option value="disabled">{statusLabels.disabled}</option>
            </select>
          </label>
        </div>
      </AdminModal>
    </div>
  )
}

export default AdminUsersPage
