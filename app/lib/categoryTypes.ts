// 一级类目（= 类型）
export type CategoryType = {
  id: string
  name: string
}

// 模拟来自「分类管理」的一级类目
export const categoryTypes: CategoryType[] = [
  { id: 'income', name: '收入' },
  { id: 'expense', name: '支出' },
]
