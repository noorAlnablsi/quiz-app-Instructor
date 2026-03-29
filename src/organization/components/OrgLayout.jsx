import { NavLink, Outlet } from 'react-router-dom'

const nav = [
  { to: '/org/dashboard', label: 'لوحة التحكم' },
  { to: '/org/students', label: 'الطلاب' },
  { to: '/org/exams', label: 'الاختبارات الرسمية' },
  { to: '/org/reports', label: 'التقارير' },
  { to: '/org/access', label: 'الصلاحيات والدخول' },
  { to: '/org/notifications', label: 'الإشعارات' },
]

function OrgLayout() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 flex-col border-l border-slate-200 bg-slate-900 text-white lg:flex xl:w-64">
          <div className="border-b border-slate-700/80 px-5 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-300">Enterprise</p>
            <h1 className="mt-1 text-lg font-bold leading-tight">بوابة الجهة التعليمية</h1>
            <p className="mt-2 text-xs text-slate-400">إدارة الطلاب والاختبارات والتحليلات</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="التنقل الرئيسي">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/org/dashboard'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-slate-700/80 p-3">
            <NavLink
              to="/login"
              className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              تسجيل الخروج
            </NavLink>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
            <p className="text-xs font-semibold text-blue-600">الجهة التعليمية</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/org/dashboard'}
                  className={({ isActive }) =>
                    `rounded-md px-2 py-1 text-xs font-medium ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default OrgLayout
