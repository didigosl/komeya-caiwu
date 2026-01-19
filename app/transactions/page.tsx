'use client'

import { useEffect, useState } from 'react'

type Row = {
  id: string
  date: string
  type: string
  amount: number
  category: string
  remark?: string
}

export default function TransactionsPage() {
  const [list, setList] = useState<Row[]>([])
  const [date, setDate] = useState('')
  const [type, setType] = useState('income')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [remark, setRemark] = useState('')

  const load = async () => {
    const res = await fetch('/api/transactions')
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    load()
  }, [])

  const add = async () => {
    if (!date || !amount || !category) return

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        type,
        amount,
        category,
        remark,
      }),
    })

    setDate('')
    setAmount('')
    setCategory('')
    setRemark('')
    load()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">记账</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input className="border p-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <select className="border p-2" value={type} onChange={e => setType(e.target.value)}>
          <option value="income">收入</option>
          <option value="expense">支出</option>
        </select>
        <input className="border p-2" placeholder="金额" value={amount} onChange={e => setAmount(e.target.value)} />
        <input className="border p-2" placeholder="分类" value={category} onChange={e => setCategory(e.target.value)} />
        <input className="border p-2 md:col-span-4" placeholder="备注" value={remark} onChange={e => setRemark(e.target.value)} />
        <button onClick={add} className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-1">
          新增
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">日期</th>
            <th className="border p-2">类型</th>
            <th className="border p-2">金额</th>
            <th className="border p-2">分类</th>
            <th className="border p-2">备注</th>
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r.id}>
              <td className="border p-2">{r.date.slice(0, 10)}</td>
              <td className="border p-2">{r.type}</td>
              <td className="border p-2">{r.amount}</td>
              <td className="border p-2">{r.category}</td>
              <td className="border p-2">{r.remark || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
