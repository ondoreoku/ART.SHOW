import { supabase } from '@/lib/supabaseServer'

export default async function DoacoesPage() {
  const { data: doacoes } = await supabase
    .from('doacoes')
    .select('*')
    .order('criada_em', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doações</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Valor</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {doacoes?.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">{d.nome || 'Anónimo'}</td>
                <td className="p-3">{d.email || '—'}</td>
                <td className="p-3">{d.valor} {d.moeda}</td>
                <td className="p-3">{d.status}</td>
                <td className="p-3">{new Date(d.criada_em).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}