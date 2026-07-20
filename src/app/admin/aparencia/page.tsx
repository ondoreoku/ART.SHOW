// src/app/admin/aparencia/page.tsx
import { createClient } from '@/utils/supabase/server'
import { updateSiteConfig } from './actions'

export default async function AdminAparencia() {
  const supabase = await createClient()
  
  // Buscar configurações atuais
  const { data: configs } = await supabase.from('site_config').select('chave, valor')
  
  // Helper para obter o valor de uma chave específica
  const getValue = (chave: string, fallback: string) => {
    const config = configs?.find(c => c.chave === chave)
    return config ? config.valor : fallback
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Personalizar Aparência</h1>
      
      <form action={updateSiteConfig} className="space-y-6 bg-gray-900 p-6 rounded-lg">
        
        {/* Textos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-400">Textos Principais</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Título Principal (Hero)</label>
            <input 
              name="titulo_hero" 
              defaultValue={getValue('titulo_hero', 'ART.SHOW')}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtítulo</label>
            <input 
              name="subtitulo_hero" 
              defaultValue={getValue('subtitulo_hero', 'Portfolio de Arte Contemporânea')}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Cores */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <h2 className="text-xl font-semibold text-blue-400">Cores</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cor de Fundo</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  name="cor_fundo" 
                  defaultValue={getValue('cor_fundo', '#000000')}
                  className="h-10 w-20 bg-transparent border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  name="cor_fundo_text" 
                  defaultValue={getValue('cor_fundo', '#000000')}
                  className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm font-mono"
                  onChange={(e) => {
                    // Sincronizar o input de texto com o color picker (opcional, mas útil)
                    const colorInput = e.target.form?.querySelector('input[name="cor_fundo"]') as HTMLInputElement;
                    if(colorInput) colorInput.value = e.target.value;
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cor de Destaque (Primária)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  name="cor_primaria" 
                  defaultValue={getValue('cor_primaria', '#60A5FA')}
                  className="h-10 w-20 bg-transparent border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  name="cor_primaria_text" 
                  defaultValue={getValue('cor_primaria', '#60A5FA')}
                  className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm font-mono"
                  onChange={(e) => {
                    const colorInput = e.target.form?.querySelector('input[name="cor_primaria"]') as HTMLInputElement;
                    if(colorInput) colorInput.value = e.target.value;
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fontes */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
          <h2 className="text-xl font-semibold text-blue-400">Tipografia</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Fonte dos Títulos</label>
            <select 
              name="fonte_titulo" 
              defaultValue={getValue('fonte_titulo', 'sans-serif')}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="sans-serif">Moderna (Sans-Serif)</option>
              <option value="serif">Clássica (Serif)</option>
              <option value="monospace">Técnica (Monospace)</option>
              <option value="cursive">Artística (Cursive)</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors mt-6"
        >
          Guardar Alterações
        </button>
      </form>
    </div>
  )
}