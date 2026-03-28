import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور.')
      return
    }

    setError('')
    try {
      const lastRole = localStorage.getItem('quiz-app-demo-role')
      navigate(lastRole === 'student' ? '/student/dashboard' : '/dashboard')
    } catch {
      navigate('/dashboard')
    }
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">تسجيل الدخول</h2>
      <p className="mt-1 text-sm text-slate-500">أدخل بياناتك للوصول إلى حسابك.</p>

      <form onSubmit={(event) => event.preventDefault()} className="mt-5 space-y-4">
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" />
            تذكرني
          </label>
          <Link to="/forgot-password" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            نسيت كلمة المرور؟
          </Link>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          دخول
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800">{error}</p>
      ) : null}

      <p className="mt-5 text-center text-sm text-slate-600">
        ليس لديك حساب؟{' '}
        <Link to="/register" className="font-semibold text-indigo-700 hover:text-indigo-800">
          إنشاء حساب جديد
        </Link>
      </p>
    </section>
  )
}

export default LoginPage
