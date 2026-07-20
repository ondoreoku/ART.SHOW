'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function atualizarSecao(formData: FormData) {
  const entries = Array.from(formData.entries())
  const ids = new Set<string>()

  for (const [key, value] of entries) {
    if (key === 'id') {
      ids.add(value as string)
    }
  }

  for (const id of ids) {
    const ativa = formData.get(`ativa_${id}`) === 'on'
    const ordem = parseInt(formData.get(`ordem_${id}`) as string) || 0
    const configRaw = formData.get(`config_${id}`) as string
    let configuracao = null
    try { configuracao = JSON.parse(configRaw) } catch {}

    await supabase
      .from('secoes_pagina')
      .update({ ativa, ordem, configuracao })
      .eq('id', id)
  }

  revalidatePath('/admin/secoes')
  revalidatePath('/')
}