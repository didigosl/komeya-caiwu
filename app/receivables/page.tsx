'use client'

import { useEffect, useMemo, useState } from 'react'

type Row = {
  id: string
  createdAt: string
  client: string
  totalAmount: number
  receivedAmount: number
  dueDate: string | null
  remark: string | null
}

export default function ReceivablesPage() {
  const [client, setClient] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [receivedAmount, setReceivedAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [remark, setRemark] = useState('')
  const [list, setList] = useState<Row[]>([])

  const load = async () => {
    const res = await fetch('/api/receivables')
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    load()
  }, [])

  const addRow = async () => {
    const total = Number(totalAmount)
    const received = Number(receivedAmount || 0)
    if (!client || !totalAmount || Number.isNaN(total) || total <= 0) return
    if (Number.isNaN(received) || received < 0) return

    await fetch('/api/receivables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client,
        totalAmount: total,
        receivedAmount: received,
        dueDate: dueDate || null,
        remark,
      }),
    })

    setClient('')
    setTotalAmount('')
    setReceivedAmount('')
    setDueDate('')
    setRemark('')
    load()
  }

  const summary = useMemo(() => {
    const total = list.reduce((s, r) => s + r.totalAmount, 0)
    const received = list.reduce((s, r) => s + r.receivedAmount, 0)
    const remaining = total - received
    return { total, received, remaining }
  }, [list])

  const statusText = (r: Row) => {
    const remaining = r.totalAmount - r.receivedAmount
    if (remaining <= 0) return '已收'
    if (r.receivedAmount > 0) return '部分回款'
    return '未收'
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">应收账款</h1>
      <p className="text-sm text-gray-600 mb-6">数据已接入数据库，刷新不丢</p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input
          className="border p-2 w-full md:col-span-2"
          placeholder="客户名称"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="应收金额"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="已收金额（可空）"
          value={receivedAmount}
          onChange={(e) => setReceivedAmount(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          className="border p-2 w-full md:col-span-4"
          placeholder="备注"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <button
          onClick={addRow}
          className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-1"
        >
          新增应收
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">应收合计</div>
          <div className="text-2xl font-semibold">{summary.total}</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">已收合计</div>
          <div className="text-2xl font-semibold">{summary.received}</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">剩余应收</div>
          <div className="text-2xl font-semibold">{summary.remaining}</div>
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">录入时间</th>
            <th className="border p-2">客户</th>
            <th className="border p-2">应收</th>
            <th className="border p-2">已收</th>
            <th className="border p-2">剩余</th>
            <th className="border p-2">到期日</th>
            <th className="border p-2">状态</th>
            <th className="border p-2">备注</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => {
            const remaining = r.totalAmount - r.receivedAmount
            return (
              <tr key={r.id}>
                <td className="border p-2">{r.createdAt.slice(0, 19).replace('T', ' ')}</td>
                <td className="border p-2">{r.client}</td>
                <td className="border p-2">{r.totalAmount}</td>
                <td className="border p-2">{r.receivedAmount}</td>
                <td className="border p-2">{remaining}</td>
                <td className="border p-2">{r.dueDate ? r.dueDate.slice(0, 10) : '-'}</td>
                <td className="border p-2">{statusText(r)}</td>
                <td className="border p-2">{r.remark || '-'}</td>
              </tr>
            )
          })}
          {list.length === 0 && (
            <tr>
              <td className="border p-3 text-gray-500" colSpan={8}>
                暂无数据
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
