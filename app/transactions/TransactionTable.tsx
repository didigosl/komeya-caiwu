'use client'

import { useState } from 'react'

type Transaction = {
  type: string
  subCategory?: string
  category?: string
  customer?: string
  amount: string | number
  paymentMethod?: string
  file?: File | string | null
  remark?: string
  date?: string
}

const TYPE_LABEL_MAP: Record<string, string> = {
  income: '收入',
  expense: '支出'
}

type Props = {
  data: Transaction[]
}

export default function TransactionTable({ data }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    null
  )

  return (
    <>
      {/* 图片放大遮罩层 */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="预览"
            className="max-h-[90%] max-w-[90%] rounded shadow-lg"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
        <table className="w-full text-sm text-white">
          <thead className="bg-black/40 text-white/80">
            <tr>
              <th className="px-4 py-2 text-left">类型</th>
              <th className="px-4 py-2 text-left">子类目</th>
              <th className="px-4 py-2 text-left">客户</th>
              <th className="px-4 py-2 text-left">金额</th>
              <th className="px-4 py-2 text-left">支付方式</th>
              <th className="px-4 py-2 text-left">文件</th>
              <th className="px-4 py-2 text-left">录入方式</th>
              <th className="px-4 py-2 text-left">备注</th>
              <th className="px-4 py-2 text-left">日期</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-6 text-center text-white/40"
                >
                  暂无流水记录
                </td>
              </tr>
            )}

            {data.map((item, index) => {
              const subCategory =
                item.subCategory ?? item.category ?? '-'

              let previewUrl: string | null = null
              if (item.file instanceof File) {
                previewUrl = URL.createObjectURL(item.file)
              } else if (typeof item.file === 'string') {
                previewUrl = item.file
              }

              const hasTime =
                typeof item.date === 'string' &&
                item.date.includes(':')

              const displayTime = hasTime
                ? item.date
                : new Date().toLocaleString()

              return (
                <tr
                  key={index}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="px-4 py-2">
                    {TYPE_LABEL_MAP[item.type] || item.type}
                  </td>

                  <td className="px-4 py-2">{subCategory}</td>

                  <td className="px-4 py-2">
                    {item.customer || '-'}
                  </td>

                  <td className="px-4 py-2">{item.amount}</td>

                  <td className="px-4 py-2">
                    {item.paymentMethod || '-'}
                  </td>

                  {/* 文件缩略图（无文字） */}
                  <td className="px-4 py-2">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="附件"
                        className="h-10 w-10 cursor-pointer rounded object-cover"
                        onClick={() =>
                          setPreviewImage(previewUrl!)
                        }
                      />
                    ) : (
                      '-'
                    )}
                  </td>

                  <td className="px-4 py-2">手动录入</td>

                  <td className="px-4 py-2">
                    {item.remark || '-'}
                  </td>

                  <td className="px-4 py-2">{displayTime}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
