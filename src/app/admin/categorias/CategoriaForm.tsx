'use client'

import { useRouter } from 'next/navigation'

interface CategoriaFormProps {
  categoria?: {
    id?: string
    nome: string
    slug: string
    descricao: string
    ordem: number
    ativa: boolean
  }
  action: (formData: FormData) => Promise<void>
  isEditing?: boolean
}

export default function CategoriaForm({ categoria, action, isEditing = false }: CategoriaFormProps) {
  const router = useRouter()

  return (
    <form
      action={async (formData) => {
        await action(formData)
        router.push('/admin/categorias')
      }}
      className="bg-white p-6 rounded shadow max-w-2xl"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome *</label>
          <input
            type="text"
            name="nome"
            defaultValue={categoria?.nome}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            type="text"
            name="slug"
            defaultValue={categoria?.slug}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            name="descricao"
            rows={2}
            defaultValue={categoria?.descricao}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ordem</label>
          <input
            type="number"
            name="ordem"
            defaultValue={categoria?.ordem ?? 0}
            className="w-24 border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ativa"
              defaultChecked={categoria?.ativa ?? true}
              value="true"
            />
            Ativa
          </label>
        </div>
      </div>

      {isEditing && categoria?.id && (
        <input type="hidden" name="id" value={categoria.id} />
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Atualizar' : 'Criar'} Categoria
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/categorias')}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}