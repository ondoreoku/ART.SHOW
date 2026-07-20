import { supabase } from '@/lib/supabaseServer'
import Image from 'next/image'

export default async function SecaoDestaques({ config }: { config: any }) {
  const limite = config?.limite_obras || 6
  const { data: obras } = await supabase
    .from('obras')
    .select('*')
    .eq('destacada', true)
    .eq('ativa', true)
    .limit(limite)

  if (!obras?.length) return null

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-4">Obras em Destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {obras.map((obra) => (
          <div key={obra.id} className="border rounded overflow-hidden shadow">
            <Image
              src={obra.imagem_url}
              alt={obra.titulo}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{obra.titulo}</h3>
              {obra.preco && <p className="text-gray-600">€{obra.preco}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}