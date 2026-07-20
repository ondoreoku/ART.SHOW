import { supabase } from '@/lib/supabaseServer'
import Link from 'next/link'
import { eliminarCategoria } from './actions'

export default async function CategoriasPage() {
  const { data: categorias } = await supabase
    .from('categorias')
    .select('*')
    .order('ordem', { ascending: true })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Link
          href="/admin/categorias/nova"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Categoria
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Ordem</th>
              <th className="p-3 text-left">Ativa</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias?.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.nome}</td>
                <td className="p-3">{cat.slug}</td>
                <td className="p-3">{cat.ordem}</td>
                <td className="p-3">{cat.ativa ? '✅' : '❌'}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/categorias/${cat.id}`}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Editar
                  </Link>
                  <form action={eliminarCategoria} className="inline">
                    <input type="hidden" name="id" value={cat.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                      onClick={(e) => {
                        if (!confirm('Eliminar esta categoria?')) e.preventDefault()
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