import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories
export async function GET() {
  const list = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(list)
}

// POST /api/categories
export async function POST(req: Request) {
  const body = await req.json()
  const name = String(body.name || '').trim()

  if (!name) {
    return new NextResponse('分类名不能为空', { status: 400 })
  }

  const row = await prisma.category.create({
    data: { name },
  })

  return NextResponse.json(row)
}

// PUT /api/categories  ✅【编辑分类】
export async function PUT(req: Request) {
  const body = await req.json()
  const id = body.id
  const name = String(body.name || '').trim()

  if (!id || !name) {
    return new NextResponse('参数错误', { status: 400 })
  }

  const row = await prisma.category.update({
    where: { id },
    data: { name },
  })

  return NextResponse.json(row)
}

// DELETE /api/categories?id=xxx
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return new NextResponse('缺少 id', { status: 400 })
  }

  // 默认分类不允许删除
  const c = await prisma.category.findUnique({ where: { id } })
  if (c?.name === '默认') {
    return new NextResponse('默认分类不可删除', { status: 400 })
  }

  await prisma.category.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
