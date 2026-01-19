'use client'

import { useEffect, useState } from 'react'

type Dashboard = {
  monthIncome: number
  monthExpense: number
  netCashflow: number
  arTotal: number
  arReceived: number
  arRemaining: number
  apTotal: number
  apPaid: number
  apRemaining: number
  monthStart: string
}

export default function Home() {
  const [data, setData] = useState<Dashboard | null>(null)
  const [error, setError] = useState('')

  const load = async () => {
    setError('')
    const res = await fetch('/api/dashboard')
    if (!res.ok) {
      setError(await res.text())
      return
    }
    setData(await res.json())
  }

  useEffect(() => {
    load()
  }, [])

  const cards = data
    ? [
        { title: '本月收入', value: data.monthIncome },
        { title: '本月支出', value: data.monthExpense },
        { title: '净现金流', value: data.netCashflow },
        { title: '应收剩余', value: data.arRemaining },
        { title: '应付剩余', value: data.apRemaining },
      ]
    : []

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">财务总览</h1>
          <p className="text-sm text-gray-600 mt-1">
            自动汇总：记账 + 应收 + 应付（数据库实时统计）
          </p>
        </div>
        <button
          onClick={load}
          className="border rounded px-3 py-2 text-sm hover:bg-gray-50"
        >
          刷新数据
        </button>
      </div>

      {error && (
        <div className="border border-red-300 bg-red-50 text-red-700 p-3 rounded mb-6">
          {error}
        </div>
      )}

      {!data ? (
        <div className="text-gray-500">加载中...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {cards.map((c) => (
              <div key={c.title} className="border rounded-lg p-4">
                <div className="text-sm text-gray-500">{c.title}</div>
                <div className="text-3xl font-semibold mt-2">{c.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border rounded-lg p-5">
              <div className="font-semibold mb-2">应收汇总</div>
              <div className="text-sm text-gray-700">
                应收合计：{data.arTotal}；已收：{data.arReceived}；剩余：{data.arRemaining}
              </div>
            </div>

            <div className="border rounded-lg p-5">
              <div className="font-semibold mb-2">应付汇总</div>
              <div className="text-sm text-gray-700">
                应付合计：{data.apTotal}；已付：{data.apPaid}；剩余：{data.apRemaining}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a className="border rounded-lg p-5 hover:bg-gray-50" href="/transactions">
          <div className="text-lg font-semibold">记账</div>
          <div className="text-sm text-gray-600 mt-1">收入 / 支出流水</div>
          <div className="text-sm text-blue-600 mt-3">进入 →</div>
        </a>
        <a className="border rounded-lg p-5 hover:bg-gray-50" href="/receivables">
          <div className="text-lg font-semibold">应收账款</div>
          <div className="text-sm text-gray-600 mt-1">客户欠款与回款</div>
          <div className="text-sm text-blue-600 mt-3">进入 →</div>
        </a>
        <a className="border rounded-lg p-5 hover:bg-gray-50" href="/payables">
          <div className="text-lg font-semibold">应付账款</div>
          <div className="text-sm text-gray-600 mt-1">供应商欠款与付款</div>
          <div className="text-sm text-blue-600 mt-3">进入 →</div>
        </a>
      </div>
    </div>
  )
}
