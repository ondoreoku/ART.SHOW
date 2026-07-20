import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: obrasCount },
    { count: categoriasCount },
    { count: comissoesCount },
  ] = await Promise.all([
    supabase.from('obras').select('*', { count: 'exact', head: true }),
    supabase.from('categorias').select('*', { count: 'exact', head: true }),
    supabase.from('comissoes').select('*', { count: 'exact', head: true }),
  ])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total de Obras</h3>
          <p className="text-3xl font-bold">{obrasCount || 0}</p>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Categorias</h3>
          <p className="text-3xl font-bold">{categoriasCount || 0}</p>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Comissões</h3>
          <p className="text-3xl font-bold">{comissoesCount || 0}</p>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/obras/nova"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Adicionar Nova Obra
          </a>
          <a
            href="/admin/categorias"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
          >
            Gerir Categorias
          </a>
          <a
            href="/admin/aparencia"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
          >
            Personalizar Aparência
          </a>
        </div>
      </div>
    </div>
  )
}