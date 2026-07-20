import { supabase } from '@/lib/supabaseServer'
import { atualizarSecao } from './actions'

export default async function SecoesPage() {
  const { data: secoes } = await supabase
    .from('secoes_pagina')
    .select('*')
    .order('ordem', { ascending: true })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Secções da Página</h1>
      <form action={atualizarSecao} className="space-y-4">
        {secoes?.map((sec) => (
          <div key={sec.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
            <input type="hidden" name="id" value={sec.id} />
            <div className="flex-1">
              <label className="block text-sm font-medium">{sec.nome}</label>
              <div className="flex gap-4 items-center mt-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={`ativa_${sec.id}`} defaultChecked={sec.ativa} />
                  Ativa
                </label>
                <label className="flex items-center gap-2 text-sm">
                  Ordem:
                  <input
                    type="number"
                    name={`ordem_${sec.id}`}
                    defaultValue={sec.ordem}
                    className="w-16 border rounded px-2 py-1"
                  />
                </label>
              </div>
            </div>
            <details className="text-sm">
              <summary className="cursor-pointer text-blue-600">Configuração</summary>
              <textarea
                name={`config_${sec.id}`}
                defaultValue={JSON.stringify(sec.configuracao, null, 2)}
                rows={3}
                className="w-full border rounded px-3 py-2 mt-2 font-mono text-xs"
              />
            </details>
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Guardar Alterações
        </button>
      </form>
    </div>
  )
}