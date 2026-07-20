'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

// ─── VERIFICAÇÃO DE AUTENTICAÇÃO ──────────────────────────────
async function verificarAutenticacao() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado. Faça login novamente.')
  return user
}

// ─── ATUALIZAR STATUS DA COMISSÃO ──────────────────────────────
export async function atualizarStatusComissao(id: string, status: string) {
  await verificarAutenticacao()

  if (!id || !status) {
    throw new Error('ID e status são obrigatórios.')
  }

  const statusValidos = ['pendente', 'contactado', 'em_progresso', 'concluida', 'cancelada']
  if (!statusValidos.includes(status)) {
    throw new Error('Status inválido.')
  }

  const { error } = await supabase
    .from('comissoes')
    .update({
      status,
      atualizada_em: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar status da comissão:', error)
    throw new Error('Erro ao atualizar status: ' + error.message)
  }

  revalidatePath('/admin/comissoes')
}
