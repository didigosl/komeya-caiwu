import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * 获取交易列表
 */
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("GET /api/transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

/**
 * 新增交易（最小安全字段版本）
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transaction = await prisma.transaction.create({
      data: {
        amount: body.amount,
        type: body.type,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("POST /api/transactions error:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
