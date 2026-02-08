import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * 查询流水
 */
export async function GET() {
  const list = await prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    include: {
      category: true,
      include: {
  category: true,
}
    },
  })

  return Response.json(list)
}

/**
 * 新增记账
 */
export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    type,        // 'income' | 'expense'
    amount,
    date,
    categoryId,
    paymentMethodId,
    note,
  } = body

  if (!type || !amount || !date) {
    return new Response('参数不完整', { status: 400 })
  }

  const record = await prisma.transaction.create({
    data: {
      type,
      amount: Number(amount),
      date: new Date(date),
      categoryId: categoryId || null,
      paymentMethodId: paymentMethodId || null,
      note: note || '',
    },
  })

  return Response.json(record)
}
