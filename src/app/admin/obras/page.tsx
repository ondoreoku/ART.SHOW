import { supabase } from '@/lib/supabaseServer'
import Link from 'next/link'
import { eliminarObra } from './actions'

export default async function ObrasPage() {
  const { data: obras } = await supabase
    .from('obras')
    .select('*, categorias(nome)')
    .order('criada_em', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Obras</h1>
        <Link
          href="/admin/obras/nova"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Obra
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-left">Preço</th>
              <th className="p-3 text-left">Destaque</th>
              <th className="p-3 text-left">Disponível</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {obras?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Nenhuma obra encontrada.
                </td>
              </tr>
            )}
            {obras?.map((obra) => (
              <tr key={obra.id} className="border-t">
                <td className="p-3">{obra.titulo}</td>
                <td className="p-3">{obra.categorias?.nome || '—'}</td>
                <td className="p-3">{obra.preco ? `€${obra.preco}` : '—'}</td>
                <td className="p-3">{obra.destacada ? '⭐' : ''}</td>
                <td className="p-3">{obra.disponivel ? '✅' : '❌'}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/obras/${obra.id}`}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Editar
                  </Link>
                  <form action={eliminarObra} className="inline">
                    <input type="hidden" name="id" value={obra.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                      onClick={(e) => {
                        if (!confirm('Tem a certeza que deseja eliminar esta obra?')) {
                          e.preventDefault()
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}