'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function atualizarStatusComissao(id: string, status: string) {
  await supabase
    .from('comissoes')
    .update({ status, atualizada_em: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/admin/comissoes')
}