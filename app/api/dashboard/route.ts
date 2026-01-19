import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const startOfMonth = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0)
}

export async function GET() {
  const monthStart = startOfMonth()

  const [incomeAgg, expenseAgg, receivables, payables] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'income', date: { gte: monthStart } },
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'expense', date: { gte: monthStart } },
    }),
    prisma.receivable.aggregate({
      _sum: { totalAmount: true, receivedAmount: true },
    }),
    prisma.payable.aggregate({
      _sum: { totalAmount: true, paidAmount: true },
    }),
  ])

  const monthIncome = incomeAgg._sum.amount || 0
  const monthExpense = expenseAgg._sum.amount || 0

  const arTotal = receivables._sum.totalAmount || 0
  const arReceived = receivables._sum.receivedAmount || 0
  const arRemaining = arTotal - arReceived

  const apTotal = payables._sum.totalAmount || 0
  const apPaid = payables._sum.paidAmount || 0
  const apRemaining = apTotal - apPaid

  const netCashflow = monthIncome - monthExpense

  return NextResponse.json({
    monthIncome,
    monthExpense,
    netCashflow,
    arTotal,
    arReceived,
    arRemaining,
    apTotal,
    apPaid,
    apRemaining,
    monthStart: monthStart.toISOString(),
  })
}
