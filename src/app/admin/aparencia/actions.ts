// src/app/admin/aparencia/actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSiteConfig(formData: FormData) {
  const supabase = await createClient()
  
  // Verificar se o utilizador está autenticado (segurança)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const configs = [
    { chave: 'titulo_hero', valor: formData.get('titulo_hero') as string },
    { chave: 'subtitulo_hero', valor: formData.get('subtitulo_hero') as string },
    { chave: 'cor_fundo', valor: formData.get('cor_fundo') as string },
    { chave: 'cor_primaria', valor: formData.get('cor_primaria') as string },
    { chave: 'fonte_titulo', valor: formData.get('fonte_titulo') as string },
  ]

  // Atualizar ou inserir cada configuração (Upsert)
  for (const config of configs) {
    await supabase
      .from('site_config')
      .upsert({ chave: config.chave, valor: config.valor, tipo: 'texto' }, { onConflict: 'chave' })
  }

  // Limpar a cache para a homepage mostrar os novos valores imediatamente
  revalidatePath('/')
  
  return { success: true }
}