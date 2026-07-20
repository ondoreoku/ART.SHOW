import { supabase } from '@/lib/supabaseServer'
import ObraForm from '../ObraForm'
import { criarObra } from '../actions'

export default async function NovaObraPage() {
  const { data: categorias } = await supabase
    .from('categorias')
    .select('id, nome')
    .eq('ativa', true)
    .order('nome')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nova Obra</h1>
      <ObraForm
        categorias={categorias || []}
        action={criarObra}
      />
    </div>
  )
}