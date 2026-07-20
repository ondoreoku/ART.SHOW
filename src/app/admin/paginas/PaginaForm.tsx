'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Carregar o ReactQuill apenas no cliente (evita erros de SSR)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface PaginaFormProps {
  pagina?: {
    id?: string
    titulo: string
    slug: string
    conteudo: string
    meta_descricao: string
    publicada: boolean
    ordem: number
  }
  action: (formData: FormData) => Promise<void>
  isEditing?: boolean
}

export default function PaginaForm({ pagina, action, isEditing = false }: PaginaFormProps) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await action(formData)
    router.push('/admin/paginas')
  }

  return (
    <form action={handleSubmit} className="bg-white p-6 rounded shadow max-w-4xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input
            type="text"
            name="titulo"
            defaultValue={pagina?.titulo}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            type="text"
            name="slug"
            defaultValue={pagina?.slug}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo</label>
          <ReactQuill
            theme="snow"
            defaultValue={pagina?.conteudo || ''}
            onChange={(value) => {
              // O valor é passado para o formulário através de um campo hidden
              const hidden = document.getElementById('conteudo-hidden') as HTMLInputElement
              if (hidden) hidden.value = value
            }}
            className="h-64"
          />
          <input type="hidden" name="conteudo" id="conteudo-hidden" defaultValue={pagina?.conteudo || ''} />
        </div>
        <div className="mt-12">
          <label className="block text-sm font-medium mb-1">Meta Descrição</label>
          <textarea
            name="meta_descricao"
            rows={2}
            defaultValue={pagina?.meta_descricao}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="publicada"
              defaultChecked={pagina?.publicada ?? false}
              value="on"
            />
            Publicada
          </label>
          <div>
            <label className="block text-sm font-medium">Ordem</label>
            <input
              type="number"
              name="ordem"
              defaultValue={pagina?.ordem ?? 0}
              className="w-24 border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {isEditing && pagina?.id && (
        <input type="hidden" name="id" value={pagina.id} />
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Atualizar' : 'Criar'} Página
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/paginas')}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}