'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function atualizarConfiguracoes(formData: FormData) {
  const entries = Array.from(formData.entries()) as [string, string][]
  
  for (const [chave, valor] of entries) {
    await supabase
      .from('site_config')
      .update({ valor })
      .eq('chave', chave)
  }
  
  revalidatePath('/admin/configuracoes')
}