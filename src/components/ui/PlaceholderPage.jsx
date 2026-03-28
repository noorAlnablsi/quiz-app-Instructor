import PageHeader from './PageHeader'

function PlaceholderPage({ title, description }) {
  return (
    <section>
      <PageHeader title={title} description={description} />
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-lg font-medium text-slate-700">الهيكل الأساسي للصفحة جاهز</p>
        <p className="mt-2 text-sm text-slate-500">الخطوة التالية: تنفيذ واجهة هذا القسم بشكل كامل.</p>
      </div>
    </section>
  )
}

export default PlaceholderPage
