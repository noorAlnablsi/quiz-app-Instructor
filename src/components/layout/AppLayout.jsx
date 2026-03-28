import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'لوحة التحكم', path: '/dashboard' },
  { label: 'بنوك الأسئلة', path: '/question-banks' },
  { label: 'الاختبارات', path: '/exams' },
  { label: 'الصلاحيات', path: '/permissions' },
  { label: 'المتجر', path: '/marketplace' },
]

function AppLayout() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-indigo-600">بوابة المدرس</p>
            <h1 className="text-2xl font-bold text-slate-900">منصة الاختبارات التعليمية</h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              تسجيل الخروج
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
