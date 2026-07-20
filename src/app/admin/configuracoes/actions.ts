'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

// ─── VERIFICAÇÃO DE AUTENTICAÇÃO ──────────────────────────────
async function verificarAutenticacao() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado. Faça login novamente.')
  return user
}

// ─── ATUALIZAR CONFIGURAÇÕES ────────────────────────────────────
export async function atualizarConfiguracoes(formData: FormData) {
  await verificarAutenticacao()

  const entries = Array.from(formData.entries()) as [string, string][]
  
  if (entries.length === 0) {
    throw new Error('Nenhuma configuração para atualizar.')
  }

  for (const [chave, valor] of entries) {
    // Ignora campos vazios ou que não sejam configurações válidas
    if (!chave || chave.startsWith('_')) continue

    const { error } = await supabase
      .from('site_config')
      .update({ valor })
      .eq('chave', chave)

    if (error) {
      console.error(`Erro ao atualizar configuração ${chave}:`, error)
      // Não interrompe o fluxo para uma chave específica, mas podes optar por lançar erro
    }
  }
  
  revalidatePath('/admin/configuracoes')
}
