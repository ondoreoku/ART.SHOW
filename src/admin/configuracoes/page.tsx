// src/app/(admin)/configuracoes/page.tsx
import { supabase } from '@/lib/supabaseServer'

export default async function ConfiguracoesPage() {
  const { data: configs } = await supabase.from('site_config').select('*')

  return (
    <div>
      <h1>Configurações</h1>
      <form action={atualizarConfiguracoes}>
        {configs?.map((config) => (
          <div key={config.chave}>
            <label>{config.descricao || config.chave}</label>
            <input
              type="text"
              name={config.chave}
              defaultValue={config.valor}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}