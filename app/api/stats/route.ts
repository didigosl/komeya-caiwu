import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // 按 type 统计总金额
  const data = await prisma.transaction.groupBy({
    by: ['type'],
    _sum: {
      amount: true,
    },
  })

  return NextResponse.json(data)
}
