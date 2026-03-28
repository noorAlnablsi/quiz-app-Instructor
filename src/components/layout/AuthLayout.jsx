import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <p className="text-xs font-semibold text-indigo-600">بوابة الدخول</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">منصة الاختبارات التعليمية</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
