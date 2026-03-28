import { Link, Navigate, useParams } from 'react-router-dom'

const roleLabels = {
  organization: 'جهة تعليمية',
  admin: 'مدير النظام',
}

function RolePendingPage() {
  const { role } = useParams()

  if (role === 'student') {
    return <Navigate to="/student/dashboard" replace />
  }

  const roleLabel = roleLabels[role] ?? 'هذا الدور'

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">واجهة غير جاهزة حاليًا</h2>
      <p className="mt-2 text-sm text-slate-600">
        تم اختيار دور <span className="font-semibold text-slate-800">{roleLabel}</span> بنجاح، لكن واجهته
        لم يتم تنفيذها بعد.
      </p>

      <div className="mt-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        المتاح حاليًا بشكل كامل هما دور المدرس وواجهة الطالب (عند اختيار «طالب» في إنشاء الحساب).
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/register"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          العودة لإنشاء الحساب
        </Link>
        <Link
          to="/login"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          الذهاب لتسجيل الدخول
        </Link>
      </div>
    </section>
  )
}

export default RolePendingPage
