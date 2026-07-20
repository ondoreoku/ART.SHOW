import { supabase } from '@/lib/supabaseServer'

export default async function DashboardPage() {
  const { count: obrasCount } = await supabase
    .from('obras')
    .select('*', { count: 'exact', head: true })
    .eq('ativa', true)

  const { count: comissoesPendentes } = await supabase
    .from('comissoes')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pendente')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Obras Activas</h3>
          <p className="text-2xl font-bold">{obrasCount || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Comissões Pendentes</h3>
          <p className="text-2xl font-bold">{comissoesPendentes || 0}</p>
        </div>
      </div>
    </div>
  )
}