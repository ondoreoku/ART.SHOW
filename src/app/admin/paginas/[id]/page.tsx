import { supabase } from '@/lib/supabaseServer'
import { atualizarPagina } from '../actions'
import PaginaForm from '../PaginaForm'
import { notFound } from 'next/navigation'

export default async function EditarPaginaPage({ params }: { params: { id: string } }) {
  const { data: pagina } = await supabase
    .from('paginas')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!pagina) return notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Página</h1>
      <PaginaForm pagina={pagina} action={atualizarPagina} isEditing />
    </div>
  )
}