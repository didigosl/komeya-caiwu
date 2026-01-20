import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const list = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const body = await req.json()

  const row = await prisma.transaction.create({
    data: {
      amount: Number(body.amount),
      type: body.type,
      remark: body.remark ?? '',
      date: body.date ? new Date(body.date) : new Date(),
      category: body.category ?? '未分类',
    },
  })

  return NextResponse.json(row)
}
