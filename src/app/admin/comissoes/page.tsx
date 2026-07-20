'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { atualizarStatusComissao } from './actions'

export default function ComissoesPage() {
  const [comissoes, setComissoes] = useState<any[]>([])
  const [filter, setFilter] = useState('todos')

  useEffect(() => {
    carregarComissoes()
  }, [filter])

  async function carregarComissoes() {
    let query = supabase.from('comissoes').select('*').order('criada_em', { ascending: false })
    if (filter !== 'todos') {
      query = query.eq('status', filter)
    }
    const { data } = await query
    setComissoes(data || [])
  }

  async function handleStatusChange(id: string, novoStatus: string) {
    await atualizarStatusComissao(id, novoStatus)
    carregarComissoes()
  }

  const statusOptions = ['pendente', 'contactado', 'em_progresso', 'concluida', 'cancelada']

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Comissões</h1>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="todos">Todos</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {comissoes.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.nome_cliente}</td>
                <td className="p-3">{c.email_cliente}</td>
                <td className="p-3 max-w-xs truncate">{c.descricao}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    c.status === 'pendente' ? 'bg-yellow-200' :
                    c.status === 'concluida' ? 'bg-green-200' :
                    'bg-gray-200'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-3">{new Date(c.criada_em).toLocaleDateString()}</td>
                <td className="p-3">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}