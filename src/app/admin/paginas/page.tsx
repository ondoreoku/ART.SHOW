import { supabase } from '@/lib/supabaseServer'
import Link from 'next/link'
import { eliminarPagina } from './actions'

export default async function PaginasPage() {
  const { data: paginas } = await supabase
    .from('paginas')
    .select('*')
    .order('ordem', { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Páginas</h1>
        <Link
          href="/admin/paginas/nova"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Página
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Publicada</th>
              <th className="p-3 text-left">Ordem</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginas?.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.titulo}</td>
                <td className="p-3">/{p.slug}</td>
                <td className="p-3">{p.publicada ? '✅' : '❌'}</td>
                <td className="p-3">{p.ordem}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/paginas/${p.id}`}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Editar
                  </Link>
                  <form action={eliminarPagina} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                      onClick={(e) => {
                        if (!confirm('Eliminar esta página?')) e.preventDefault()
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