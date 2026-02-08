'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuItem = {
  label: string
  href: string
}

const groups: { title: string; items: MenuItem[] }[] = [
  {
    title: '导航',
    items: [
      { label: '首页', href: '/' },
      { label: '资金记录', href: '/transactions' },
      { label: '统计分析', href: '/stats' },
    ],
  },
  {
    title: '配置',
    items: [
      { label: '分类管理', href: '/categories' },
    ],
  },
  {
    title: '系统',
    items: [
      { label: '系统设置', href: '/settings' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-[#1f2933] text-gray-200 flex-shrink-0">
      <div className="px-4 py-4 text-lg font-bold border-b border-white/10">
        💰 资金管理系统
      </div>

      <nav className="px-2 py-4 space-y-6">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="px-3 mb-2 text-xs text-gray-400 uppercase">
              {group.title}
            </div>

            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded px-3 py-2 text-sm transition
                        ${
                          active
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-white/10'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
