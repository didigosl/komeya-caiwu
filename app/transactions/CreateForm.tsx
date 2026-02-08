'use client'

import { useState } from 'react'

type FormState = {
  type: string
  subCategory: string
  customer: string
  amount: string
  paymentMethod: string
  remark: string
  file?: File | null
}

type Props = {
  /** 提交成功后的回调（用于父组件接收数据） */
  onSuccess?: (data: FormState) => void
}

/**
 * 一级类目（类型） → 子类目
 * 与「分类管理」结构一致（当前写死，后续可接数据）
 */
const CATEGORY_TREE = [
  {
    id: 'income',
    name: '收入',
    children: [
      '股东投入（现金）',
      '股东投入（银行）',
      '订单收入',
      '其它收入'
    ]
  },
  {
    id: 'expense',
    name: '支出',
    children: [
      '现金开支',
      '员工工资',
      '出差补助',
      '其它开支'
    ]
  }
]

export default function CreateForm({ onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({
    type: '',
    subCategory: '',
    customer: '',
    amount: '',
    paymentMethod: '',
    remark: '',
    file: null
  })

  const currentType = CATEGORY_TREE.find(
    (item) => item.id === form.type
  )

  const handleSubmit = () => {
    // 👉 核心：把当前表单数据抛给父组件
    onSuccess?.(form)

    // 可选：提交后清空表单（不影响你现有 UI 结构）
    setForm({
      type: '',
      subCategory: '',
      customer: '',
      amount: '',
      paymentMethod: '',
      remark: '',
      file: null
    })
  }

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">录入流水</h2>

      {/* 类型（一级类目） */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-white/70">类型</label>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              subCategory: ''
            })
          }
          className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-white"
        >
          <option value="">请选择类型</option>
          {CATEGORY_TREE.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* 子类目 */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-white/70">子类目</label>
        <select
          value={form.subCategory}
          onChange={(e) =>
            setForm({ ...form, subCategory: e.target.value })
          }
          className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-white"
        >
          <option value="">
            {form.type ? '请选择子类目' : '请先选择类型'}
          </option>

          {currentType?.children.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* 客户 */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-white/70">
          客户 / 对象
        </label>
        <input
          value={form.customer}
          onChange={(e) =>
            setForm({ ...form, customer: e.target.value })
          }
          placeholder="可选"
          className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-white"
        />
      </div>

      {/* 金额 */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-white/70">金额</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-white"
        />
      </div>

      {/* 支付方式 */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-white/70">
          支付方式
        </label>
        <input
          value={form.paymentMethod}
          onChange={(e) =>
            setForm({ ...form, paymentMethod: e.target.value })
          }
          placeholder="现金 / 银行卡 / 微信"
          className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-white"
        />
      </div>

      {/* 附件 */}
      <div className="mb-4">
        <label className="mb-1 block text-sm text-white/70">附件</label>
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, file: e.target.files?.[0] || null })
          }
          className="block w-full text-sm text-white/70"
        />
        <p className="mt-1 text-xs text-white/40">
          支持图片、PDF 文件
        </p>
      </div>

      {/* 备注 */}
      <div className="mb-6">
        <label className="mb-1 block text-sm text-white/70">备注</label>
        <textarea
          value={form.remark}
          onChange={(e) =>
            setForm({ ...form, remark: e.target.value })
          }
          rows={3}
          className="w-full rounded border border-white/10 bg-black/40 px-3 py-2 text-white"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        提交
      </button>
    </div>
  )
}
