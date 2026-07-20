// src/app/page.tsx
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  
  // Buscar configurações do site
  const { data: configs } = await supabase.from('site_config').select('chave, valor')
  
  // Helper para obter valores com fallback para os valores originais
  const getConfig = (chave: string, fallback: string) => {
    const config = configs?.find(c => c.chave === chave)
    return config ? config.valor : fallback
  }

  const titulo = getConfig('titulo_hero', 'ART.SHOW')
  const subtitulo = getConfig('subtitulo_hero', 'Portfolio de Arte Contemporânea')
  const corFundo = getConfig('cor_fundo', '#000000')
  const corPrimaria = getConfig('cor_primaria', '#60A5FA') // Azul Tailwind por defeito
  const fonteTitulo = getConfig('fonte_titulo', 'sans-serif')

  return (
    <main 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: corFundo, color: corFundo === '#ffffff' ? '#000000' : '#ffffff' }}
    >
      <div className="container mx-auto px-4 py-16">
        <h1 
          className="text-6xl font-bold text-center mb-8 transition-all duration-300"
          style={{ fontFamily: fonteTitulo, color: corPrimaria }}
        >
          {titulo}
        </h1>
        
        <p className="text-xl text-center text-gray-300 mb-12">
          {subtitulo}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: corPrimaria }}>Portfolio</h2>
            <p className="text-gray-400 mb-4">Explora as obras de arte</p>
            <a href="/portfolio" className="hover:underline" style={{ color: corPrimaria }}>
              Ver Obras →
            </a>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: corPrimaria }}>Comissões</h2>
            <p className="text-gray-400 mb-4">Encomenda uma obra personalizada</p>
            <a href="/comissoes" className="hover:underline" style={{ color: corPrimaria }}>
              Saber Mais →
            </a>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: corPrimaria }}>Sobre</h2>
            <p className="text-gray-400 mb-4">Conhece a artista</p>
            <a href="/sobre" className="hover:underline" style={{ color: corPrimaria }}>
              Ler Mais →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}