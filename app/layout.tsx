import './globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
  title: '资金管理系统',
  description: 'Finance System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#111827] text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-[#111827] p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
