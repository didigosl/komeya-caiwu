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
      date: new Date(body.date),
      type: body.type,
      amount: Number(body.amount),
      category: body.category,
      remark: body.remark || null,
    },
  })

  return NextResponse.json(row)
}
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const list = await prisma.receivable.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const body = await req.json()

  const row = await prisma.receivable.create({
    data: {
      client: body.client,
      totalAmount: Number(body.totalAmount),
      receivedAmount: Number(body.receivedAmount || 0),
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      remark: body.remark || null,
    },
  })

  return NextResponse.json(row)
}
