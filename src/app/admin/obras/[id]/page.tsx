import { supabase } from '@/lib/supabaseServer'
import ObraForm from '../ObraForm'
import { atualizarObra } from '../actions'
import { notFound } from 'next/navigation'

export default async function EditarObraPage({ params }: { params: { id: string } }) {
  const { data: obra } = await supabase
    .from('obras')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!obra) return notFound()

  const { data: categorias } = await supabase
    .from('categorias')
    .select('id, nome')
    .eq('ativa', true)
    .order('nome')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Obra</h1>
      <ObraForm
        obra={obra}
        categorias={categorias || []}
        action={atualizarObra}
        isEditing
      />
    </div>
  )
}