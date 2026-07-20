import { supabase } from '@/lib/supabaseServer'
import { atualizarCategoria } from '../actions'
import CategoriaForm from '../CategoriaForm'
import { notFound } from 'next/navigation'

export default async function EditarCategoriaPage({ params }: { params: { id: string } }) {
  const { data: categoria } = await supabase
    .from('categorias')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!categoria) return notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Categoria</h1>
      <CategoriaForm categoria={categoria} action={atualizarCategoria} isEditing />
    </div>
  )
}