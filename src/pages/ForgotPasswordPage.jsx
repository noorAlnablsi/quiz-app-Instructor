import { Link } from 'react-router-dom'

function ForgotPasswordPage() {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">استعادة كلمة المرور</h2>
      <p className="mt-1 text-sm text-slate-500">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.</p>

      <form onSubmit={(event) => event.preventDefault()} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">البريد الإلكتروني</span>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:border-indigo-500 focus:ring"
          />
        </label>

        <button
          type="button"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          إرسال رابط الاستعادة
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        تذكرت كلمة المرور؟{' '}
        <Link to="/login" className="font-semibold text-indigo-700 hover:text-indigo-800">
          العودة لتسجيل الدخول
        </Link>
      </p>
    </section>
  )
}

export default ForgotPasswordPage
