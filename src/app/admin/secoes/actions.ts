'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

// ─── VERIFICAÇÃO DE AUTENTICAÇÃO ──────────────────────────────
async function verificarAutenticacao() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado. Faça login novamente.')
  return user
}

// ─── ATUALIZAR SECÇÕES ─────────────────────────────────────────
export async function atualizarSecao(formData: FormData) {
  await verificarAutenticacao()

  const entries = Array.from(formData.entries())
  const ids = new Set<string>()

  // Recolhe todos os IDs das secções
  for (const [key, value] of entries) {
    if (key === 'id') {
      ids.add(value as string)
    }
  }

  if (ids.size === 0) {
    throw new Error('Nenhuma secção para atualizar.')
  }

  for (const id of ids) {
    const ativa = formData.get(`ativa_${id}`) === 'on'
    const ordem = parseInt(formData.get(`ordem_${id}`) as string) || 0
    const configRaw = formData.get(`config_${id}`) as string

    let configuracao = null
    if (configRaw && configRaw.trim()) {
      try {
        configuracao = JSON.parse(configRaw)
      } catch {
        // Se o JSON for inválido, mantém o valor anterior (não atualiza)
        console.warn(`Configuração inválida para secção ${id}, mantendo anterior.`)
      }
    }

    const { error } = await supabase
      .from('secoes_pagina')
      .update({
        ativa,
        ordem,
        configuracao
      })
      .eq('id', id)

    if (error) {
      console.error(`Erro ao atualizar secção ${id}:`, error)
      throw new Error(`Erro ao atualizar secção: ${error.message}`)
    }
  }

  revalidatePath('/admin/secoes')
  revalidatePath('/')
}
