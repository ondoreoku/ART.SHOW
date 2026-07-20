// src/app/page.tsx
import { supabase } from '@/lib/supabaseServer'

export default async function Home() {
  const { data: configs } = await supabase.from('site_config').select('chave, valor')
  const configMap = Object.fromEntries(configs?.map(c => [c.chave, c.valor]) || [])

  const { data: secoes } = await supabase
    .from('secoes_pagina')
    .select('*')
    .eq('ativa', true)
    .order('ordem', { ascending: true })

  return (
    <div style={{ '--primary-color': configMap.cor_primaria || '#000' } as React.CSSProperties}>
      <header>
        <h1 style={{ color: 'var(--primary-color)' }}>{configMap.titulo_site || 'Galeria'}</h1>
      </header>
      {secoes?.map((sec) => {
        if (sec.nome === 'destaques') {
          return <SecaoDestaques key={sec.id} config={sec.configuracao} />
        }
        // outras secções...
      })}
    </div>
  )
}