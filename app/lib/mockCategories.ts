export type Category = {
  id: string
  name: string
  type: 'income' | 'expense'
  children: {
    id: string
    name: string
  }[]
}

export const categories: Category[] = [
  {
    id: 'income',
    name: '收入',
    type: 'income',
    children: [
      { id: 'salary', name: '工资收入' },
      { id: 'order', name: '订单收入' },
      { id: 'other-income', name: '其它收入' },
    ],
  },
  {
    id: 'expense',
    name: '支出',
    type: 'expense',
    children: [
      { id: 'rent', name: '房租' },
      { id: 'meal', name: '餐饮' },
      { id: 'traffic', name: '交通' },
      { id: 'other-expense', name: '其它支出' },
    ],
  },
]
