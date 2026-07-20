import { supabase } from '@/lib/supabaseServer'
import { atualizarConfiguracoes } from './actions'

export default async function ConfiguracoesPage() {
  const { data: configs } = await supabase.from('site_config').select('*')

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Configurações do Site</h1>
      <form action={atualizarConfiguracoes} className="bg-white p-6 rounded shadow">
        {configs?.map((config) => (
          <div key={config.chave} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {config.descricao || config.chave}
            </label>
            <input
              type="text"
              name={config.chave}
              defaultValue={config.valor}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Guardar Configurações
        </button>
      </form>
    </div>
  )
}