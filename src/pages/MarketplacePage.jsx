import { useEffect, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { useQuestionBanks } from '../context/QuestionBanksContext'
import { marketplaceBanks as initialMarketplaceBanks } from '../mock-data/marketplaceData'

function MarketplacePage() {
  const { banks } = useQuestionBanks()
  const [marketBanks, setMarketBanks] = useState(initialMarketplaceBanks)
  const [selectedBankId, setSelectedBankId] = useState('')

  useEffect(() => {
    if (banks.length === 0) return
    setSelectedBankId((prev) => (prev && banks.some((b) => b.id === prev) ? prev : banks[0].id))
  }, [banks])
  const [price, setPrice] = useState(49)

  const publishBank = () => {
    const bank = banks.find((item) => item.id === selectedBankId)
    if (!bank) return

    const newItem = {
      id: `pub-${Date.now()}`,
      name: bank.name,
      category: 'عام',
      questionsCount: bank.questionsCount,
      price,
      rating: 0,
      listed: true,
    }

    setMarketBanks((prev) => [newItem, ...prev])
    setPrice(49)
  }

  const toggleListing = (id) => {
    setMarketBanks((prev) =>
      prev.map((bank) => (bank.id === id ? { ...bank, listed: !bank.listed } : bank)),
    )
  }

  return (
    <section>
      <PageHeader
        title="المتجر"
        description="استعراض بنوك الأسئلة المتاحة للبيع مع خيار نشر بنك جديد."
      />

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-base font-bold text-slate-900">نشر بنك للبيع</h3>
        <div className="grid gap-3 md:grid-cols-[1fr_160px_auto]">
          <select
            value={selectedBankId}
            onChange={(event) => setSelectedBankId(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="السعر"
          />
          <button
            type="button"
            onClick={publishBank}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            نشر البنك للبيع
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {marketBanks.map((bank) => (
          <article key={bank.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-slate-900">{bank.name}</h3>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  bank.listed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {bank.listed ? 'منشور' : 'غير منشور'}
              </span>
            </div>
            <div className="space-y-1 text-sm text-slate-600">
              <p>التصنيف: {bank.category}</p>
              <p>عدد الأسئلة: {bank.questionsCount}</p>
              <p>السعر: {bank.price} ريال</p>
              <p>التقييم: {bank.rating > 0 ? `${bank.rating} / 5` : 'جديد'}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleListing(bank.id)}
              className="mt-4 w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              {bank.listed ? 'إيقاف النشر' : 'إعادة النشر'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MarketplacePage
