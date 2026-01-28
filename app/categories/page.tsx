'use client'

import { useEffect, useState } from 'react'

type Category = {
  id: string
  name: string
}

export default function CategoriesPage() {
  const [list, setList] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    const res = await fetch('/api/categories', { cache: 'no-store' })
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    load()
  }, [])

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    setName('')
    setLoading(false)
    load()
  }

  async function onDelete(id: string) {
    if (!confirm('确定删除这个分类吗？')) return
    await fetch(`/api/categories?id=${id}`, { method: 'DELETE' })
    load()
  }

  async function onSave(id: string) {
    if (!editingName.trim()) return
    await fetch('/api/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: editingName }),
    })
    setEditingId(null)
    setEditingName('')
    load()
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '40px auto',
        fontFamily: '"Microsoft YaHei", sans-serif',
        color: '#eaeaea',
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>分类管理</h1>

      <form onSubmit={onCreate} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入分类名称"
          style={{
            flex: 1,
            padding: '6px 10px',
            background: '#1f1f1f',
            border: '1px solid #555',
            color: '#fff',
          }}
        />
        <button type="submit" disabled={loading}>
          新增
        </button>
      </form>

      <table width="100%" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #555' }}>
            <th align="left">名称</th>
            <th align="left">操作</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #333' }}>
              <td>
                {editingId === c.id ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  c.name
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <>
                    <button onClick={() => onSave(c.id)}>保存</button>{' '}
                    <button onClick={() => setEditingId(null)}>取消</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(c.id)
                        setEditingName(c.name)
                      }}
                    >
                      编辑
                    </button>{' '}
                    <button
                      disabled={c.name === '默认'}
                      onClick={() => onDelete(c.id)}
                    >
                      删除
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 12, color: '#aaa', fontSize: 13 }}>
        说明：默认分类不可删除；若分类被交易引用，删除会失败。
      </p>
    </div>
  )
}
