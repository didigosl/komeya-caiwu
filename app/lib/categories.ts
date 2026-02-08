export type CategoryConfig = {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
  }[];
};

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    id: "income",
    name: "收入",
    children: [
      { id: "i1", name: "股东入资（现金）" },
      { id: "i2", name: "股东投资（银行）" },
      { id: "i3", name: "银行借贷" },
      { id: "i4", name: "现金借贷" },
      { id: "i5", name: "订单收入" },
      { id: "i6", name: "其它收入" },
    ],
  },
  {
    id: "expense",
    name: "开支",
    children: [
      { id: "e1", name: "现金开支" },
      { id: "e2", name: "员工工资" },
      { id: "e3", name: "出差补助" },
      { id: "e4", name: "人工开支" },
      { id: "e5", name: "其它开支" },
    ],
  },
];
