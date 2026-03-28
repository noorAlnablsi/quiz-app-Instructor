import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const roles = [
  { value: 'student', label: 'طالب' },
  { value: 'instructor', label: 'مدرس' },
  { value: 'organization', label: 'جهة تعليمية' },
  { value: 'admin', label: 'مدير النظام' },
]

function RegisterPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('instructor')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('يرجى تعبئة جميع الحقول المطلوبة.')
      return
    }

    if (password !== confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين.')
      return
    }

    setError('')

    try {
      localStorage.setItem('quiz-app-demo-role', role)
    } catch {
      /* ignore */
    }

    if (role === 'student') {
      navigate('/student/dashboard')
      return
    }

    if (role === 'instructor') {
      navigate('/dashboard')
      return
    }

    navigate(`/role/${role}`)
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">إنشاء حساب</h2>
      <p className="mt-1 text-sm text-slate-500">أنشئ حسابًا جديدًا واختر دور المستخدم.</p>

      <form onSubmit={(event) => event.preventDefault()} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">الدور</span>
          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value)
              setError('')
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
          >
            {roles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">الاسم الكامل</span>
          <input
            type="text"
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value)
              setError('')
            }}
            placeholder="مثال: محمد أحمد"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">البريد الإلكتروني</span>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
            placeholder="name@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">كلمة المرور</span>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            placeholder="********"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">تأكيد كلمة المرور</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value)
              setError('')
            }}
            placeholder="********"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
          />
        </label>

        <button
          type="button"
          onClick={handleRegister}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          إنشاء الحساب
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800">{error}</p>
      ) : null}

      <p className="mt-5 text-center text-sm text-slate-600">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="font-semibold text-indigo-700 hover:text-indigo-800">
          تسجيل الدخول
        </Link>
      </p>
    </section>
  )
}

export default RegisterPage
