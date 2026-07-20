import { supabase } from '@/lib/supabaseServer'
import { notFound } from 'next/navigation'

export default async function PaginaEstatica({ params }: { params: { slug: string } }) {
  const { data: pagina } = await supabase
    .from('paginas')
    .select('*')
    .eq('slug', params.slug)
    .eq('publicada', true)
    .single()

  if (!pagina) return notFound()

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{pagina.titulo}</h1>
      {pagina.conteudo && (
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: pagina.conteudo }} />
      )}
    </div>
  )
}