"use client";

import { useState } from "react";

type SubCategory = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  children: SubCategory[];
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([
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
  ]);

  /** 添加一级类目 */
  function addCategory() {
    const name = prompt("请输入一级类目名称");
    if (!name) return;

    setCategories([
      ...categories,
      {
        id: Date.now().toString(),
        name,
        children: [],
      },
    ]);
  }

  /** 添加子类目 */
  function addSub(categoryId: string) {
    const name = prompt("请输入子类目名称");
    if (!name) return;

    setCategories(
      categories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              children: [
                ...c.children,
                { id: Date.now().toString(), name },
              ],
            }
          : c
      )
    );
  }

  /** 编辑名称 */
  function editName(
    categoryId: string,
    subId?: string
  ) {
    const name = prompt("请输入新名称");
    if (!name) return;

    setCategories(
      categories.map((c) => {
        if (c.id !== categoryId) return c;

        if (!subId) {
          return { ...c, name };
        }

        return {
          ...c,
          children: c.children.map((s) =>
            s.id === subId ? { ...s, name } : s
          ),
        };
      })
    );
  }

  /** 删除 */
  function remove(
    categoryId: string,
    subId?: string
  ) {
    if (!confirm("确认删除？")) return;

    setCategories(
      categories
        .map((c) => {
          if (c.id !== categoryId) return c;

          if (!subId) return null;

          return {
            ...c,
            children: c.children.filter((s) => s.id !== subId),
          };
        })
        .filter(Boolean) as Category[]
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-white">
        类目列表
      </h1>

      <button
        onClick={addCategory}
        className="mb-4 rounded bg-sky-500 px-4 py-2 text-white hover:bg-sky-600"
      >
        添加一级类目
      </button>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded border border-white/10 bg-white/5 p-3"
          >
            {/* 一级类目 */}
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-white">
                − {cat.name}
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => addSub(cat.id)}
                  className="rounded bg-emerald-500 px-2 py-1 text-white"
                >
                  +
                </button>
                <button
                  onClick={() => editName(cat.id)}
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                >
                  ✎
                </button>
                <button
                  onClick={() => remove(cat.id)}
                  className="rounded bg-red-500 px-2 py-1 text-white"
                >
                  🗑
                </button>
              </div>
            </div>

            {/* 子类目 */}
            <div className="space-y-2 pl-6">
              {cat.children.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between rounded bg-white/10 px-3 py-2"
                >
                  <span className="text-white">
                    {sub.name}
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        editName(cat.id, sub.id)
                      }
                      className="rounded bg-blue-500 px-2 py-1 text-white"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() =>
                        remove(cat.id, sub.id)
                      }
                      className="rounded bg-red-500 px-2 py-1 text-white"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
