'use client'

import { useState } from 'react'

type TabKey = 'customer' | 'vendor' | 'other'

const TABS = [
  { key: 'customer', label: '客户列表' },
  { key: 'vendor', label: '商家列表' },
  { key: 'other', label: '其它往来单位' }
]

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('customer')
  const [keyword, setKeyword] = useState('')

  return (
    <div className="p-6 text-white">
      {/* Tabs */}
      <div className="mb-6 flex gap-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabKey)}
            className={`rounded px-4 py-2 text-sm ${
              activeTab === tab.key
                ? 'bg-blue-600'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top Actions */}
      <div className="mb-4 flex items-center justify-between">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索"
          className="w-64 rounded border border-white/10 bg-black/40 px-3 py-2 text-sm"
        />

        <button className="rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-700">
          {activeTab === 'customer' && '添加新客户'}
          {activeTab === 'vendor' && '添加新商家'}
          {activeTab === 'other' && '添加新往来单位'}
        </button>
      </div>

      {/* Table */}
      <div className="rounded border border-white/10 bg-black/30">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 text-white/80">
            <tr>
              {activeTab === 'customer' && (
                <>
                  <th className="px-4 py-3">店名</th>
                  <th className="px-4 py-3">客户号</th>
                  <th className="px-4 py-3">客户类型</th>
                  <th className="px-4 py-3">电话</th>
                  <th className="px-4 py-3">总购买金额</th>
                  <th className="px-4 py-3">欠款金额</th>
                  <th className="px-4 py-3">备注</th>
                  <th className="px-4 py-3">创建时间</th>
                  <th className="px-4 py-3">操作</th>
                </>
              )}

              {activeTab === 'vendor' && (
                <>
                  <th className="px-4 py-3">名称</th>
                  <th className="px-4 py-3">商家号</th>
                  <th className="px-4 py-3">商家类型</th>
                  <th className="px-4 py-3">电话</th>
                  <th className="px-4 py-3">总采购金额</th>
                  <th className="px-4 py-3">欠款金额</th>
                  <th className="px-4 py-3">备注</th>
                  <th className="px-4 py-3">创建时间</th>
                  <th className="px-4 py-3">操作</th>
                </>
              )}

              {activeTab === 'other' && (
                <>
                  <th className="px-4 py-3">名称</th>
                  <th className="px-4 py-3">单位号</th>
                  <th className="px-4 py-3">单位类型</th>
                  <th className="px-4 py-3">电话</th>
                  <th className="px-4 py-3">总互动金额</th>
                  <th className="px-4 py-3">欠款金额</th>
                  <th className="px-4 py-3">备注</th>
                  <th className="px-4 py-3">创建时间</th>
                  <th className="px-4 py-3">操作</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-white/40"
              >
                暂无数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
