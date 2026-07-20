'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Categoria {
  id: string
  nome: string
}

interface ObraFormProps {
  obra?: {
    id?: string
    titulo: string
    slug: string
    descricao: string
    categoria_id: string
    tecnica: string
    dimensoes: string
    ano: number
    preco: number
    disponivel: boolean
    destacada: boolean
  }
  categorias: Categoria[]
  action: (formData: FormData) => Promise<void>
  isEditing?: boolean
}

export default function ObraForm({ obra, categorias, action, isEditing = false }: ObraFormProps) {
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form action={async (formData) => {
      await action(formData)
      router.push('/admin/obras')
    }} className="bg-white p-6 rounded shadow max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input
            type="text"
            name="titulo"
            defaultValue={obra?.titulo}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            type="text"
            name="slug"
            defaultValue={obra?.slug}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            name="descricao"
            rows={3}
            defaultValue={obra?.descricao}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <select
            name="categoria_id"
            defaultValue={obra?.categoria_id}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Sem categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Técnica</label>
          <input
            type="text"
            name="tecnica"
            defaultValue={obra?.tecnica}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dimensões</label>
          <input
            type="text"
            name="dimensoes"
            defaultValue={obra?.dimensoes}
            placeholder="ex: 80x100 cm"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ano</label>
          <input
            type="number"
            name="ano"
            defaultValue={obra?.ano}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preço (€)</label>
          <input
            type="number"
            step="0.01"
            name="preco"
            defaultValue={obra?.preco}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="disponivel"
              defaultChecked={obra?.disponivel ?? true}
              value="true"
            />
            Disponível
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="destacada"
              defaultChecked={obra?.destacada ?? false}
              value="true"
            />
            Destacada
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            {isEditing ? 'Nova imagem (opcional)' : 'Imagem *'}
          </label>
          <input
            type="file"
            name="imagem"
            accept="image/*"
            required={!isEditing}
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Pré-visualização" className="h-32 object-contain" />
            </div>
          )}
        </div>
      </div>

      {isEditing && obra?.id && (
        <input type="hidden" name="id" value={obra.id} />
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Atualizar' : 'Criar'} Obra
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/obras')}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}