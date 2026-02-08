'use client'

import { useState } from 'react'
import FilterBar from './FilterBar'
import TransactionTable from './TransactionTable'
import CreateForm from './CreateForm'

/**
 * 单条流水结构（前端假数据）
 * 不影响你后面接真实数据库
 */
export type TransactionRecord = {
  id: number
  type: string
  category: string
  customer?: string
  amount: number
  paymentMethod: string
  file?: string
  entryMethod: string
  remark?: string
  date: string
}

export default function TransactionsPage() {
  /** 左侧表格数据（前端假数据） */
  const [records, setRecords] = useState<TransactionRecord[]>([])

  return (
    <div className="flex flex-col gap-4">
      {/* 顶部筛选栏（保持你现在的样子） */}
      <FilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 左侧：流水表格 */}
        <div className="lg:col-span-2">
          <TransactionTable data={records} />
        </div>

        {/* 右侧：录入流水 */}
        <div>
          <CreateForm
            /**
             * ⚠️ 核心：只在“提交成功”时，往表格里塞一条假数据
             * 不改 CreateForm UI
             */
            onSuccess={(formData: any) => {
              const newRecord: TransactionRecord = {
                id: Date.now(),
                type: formData.type || '未分类',
                category: formData.subCategory || formData.category || '-',
                customer: formData.customer || '',
                amount: Number(formData.amount || 0),
                paymentMethod: formData.paymentMethod || '-',
                file: formData.file?.name || '-',
                entryMethod: '手动录入',
                remark: formData.remark || '',
                date: new Date().toLocaleDateString(),
              }

              setRecords((prev) => [newRecord, ...prev])
            }}
          />
        </div>
      </div>
    </div>
  )
}
