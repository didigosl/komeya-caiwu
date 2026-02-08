'use client'

import { useEffect, useState } from 'react'

type Filters = {
  type: string
  keyword: string
  startDate: string
  endDate: string
}

export default function FilterBar() {
  // ✅ 永远保证是一个完整对象
  const [localFilters, setLocalFilters] = useState<Filters>({
    type: '',
    keyword: '',
    startDate: '',
    endDate: '',
  })

  return (
    <div className="flex flex-wrap gap-3 bg-white/5 p-4 rounded-lg">
      {/* 类型 */}
      <select
        className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        value={localFilters.type}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, type: e.target.value })
        }
      >
        <option value="">全部类型</option>
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>

      {/* 关键词 */}
      <input
        className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        placeholder="搜索关键词"
        value={localFilters.keyword}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, keyword: e.target.value })
        }
      />

      {/* 开始日期 */}
      <input
        type="date"
        className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        value={localFilters.startDate}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, startDate: e.target.value })
        }
      />

      {/* 结束日期 */}
      <input
        type="date"
        className="rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        value={localFilters.endDate}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, endDate: e.target.value })
        }
      />

      <button className="ml-auto rounded bg-blue-600 px-4 py-2 text-sm text-white">
        确认搜索
      </button>
    </div>
  )
}
