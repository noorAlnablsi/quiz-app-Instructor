import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { adminNavbarNotifications, adminProfile } from '../mock-data/adminMockData'

const nav = [
  { to: '/admin/dashboard', label: 'لوحة التحكم', end: true },
  { to: '/admin/users', label: 'المستخدمون' },
  { to: '/admin/monitoring', label: 'مراقبة النظام' },
  { to: '/admin/marketplace', label: 'المتجر' },
  { to: '/admin/statistics', label: 'إحصائيات النظام' },
]

function AdminLayout() {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 flex-col border-l border-slate-200 bg-white shadow-sm lg:flex xl:w-60">
          <div className="border-b border-slate-100 px-4 py-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600">Admin Console</p>
            <h1 className="mt-1 text-base font-bold text-slate-900">لوحة مدير النظام</h1>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="القائمة الرئيسية">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-slate-100 p-2">
            <NavLink
              to="/login"
              className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            >
              خروج
            </NavLink>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3 lg:hidden">
                <p className="truncate text-sm font-bold text-slate-800">مدير النظام</p>
                <div className="flex flex-wrap gap-1">
                  {nav.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `rounded-md px-2 py-1 text-[10px] font-semibold ${
                          isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="hidden items-center gap-4 lg:flex">
                <div>
                  <p className="text-xs text-slate-500">{adminProfile.title}</p>
                  <p className="text-sm font-bold text-slate-900">{adminProfile.name}</p>
                </div>
              </div>

              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
                  aria-expanded={notifOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">الإشعارات</span>
                  🔔
                  <span className="absolute -left-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {adminNavbarNotifications.length}
                  </span>
                </button>
                {notifOpen ? (
                  <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    <p className="border-b border-slate-100 px-2 py-2 text-xs font-bold text-slate-700">إشعارات</p>
                    <ul className="max-h-64 overflow-y-auto">
                      {adminNavbarNotifications.map((n) => (
                        <li key={n.id} className="border-b border-slate-50 px-2 py-2 text-xs last:border-0">
                          <p className="font-medium text-slate-800">{n.text}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500">{n.time}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="lg:hidden">
                <p className="text-xs font-semibold text-slate-800">{adminProfile.name}</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
