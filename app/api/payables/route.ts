import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const list = await prisma.payable.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const body = await req.json()

  const row = await prisma.payable.create({
    data: {
      vendor: String(body.vendor),
      totalAmount: Number(body.totalAmount),
      paidAmount: Number(body.paidAmount || 0),
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      remark: body.remark ? String(body.remark) : null,
    },
  })

  return NextResponse.json(row)
}
