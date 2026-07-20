'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── VERIFICAÇÃO DE AUTENTICAÇÃO ──────────────────────────────
async function verificarAutenticacao() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado. Faça login novamente.')
  return user
}

// ─── CRIAR CATEGORIA ────────────────────────────────────────────
export async function criarCategoria(formData: FormData) {
  await verificarAutenticacao()

  const nome = formData.get('nome') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const ordem = parseInt(formData.get('ordem') as string) || 0
  const ativa = formData.get('ativa') === 'on'

  if (!nome || !slug) {
    throw new Error('Nome e Slug são obrigatórios.')
  }

  const { error } = await supabase
    .from('categorias')
    .insert({ nome, slug, descricao, ordem, ativa })

  if (error) {
    console.error('Erro ao criar categoria:', error)
    throw new Error('Erro ao criar categoria: ' + error.message)
  }

  revalidatePath('/admin/categorias')
  redirect('/admin/categorias')
}

// ─── ATUALIZAR CATEGORIA ────────────────────────────────────────
export async function atualizarCategoria(formData: FormData) {
  await verificarAutenticacao()

  const id = formData.get('id') as string
  if (!id) throw new Error('ID da categoria não fornecido.')

  const nome = formData.get('nome') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const ordem = parseInt(formData.get('ordem') as string) || 0
  const ativa = formData.get('ativa') === 'on'

  if (!nome || !slug) {
    throw new Error('Nome e Slug são obrigatórios.')
  }

  const { error } = await supabase
    .from('categorias')
    .update({ nome, slug, descricao, ordem, ativa })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar categoria:', error)
    throw new Error('Erro ao atualizar categoria: ' + error.message)
  }

  revalidatePath('/admin/categorias')
  revalidatePath(`/admin/categorias/${id}`)
  redirect('/admin/categorias')
}

// ─── ELIMINAR CATEGORIA ─────────────────────────────────────────
export async function eliminarCategoria(formData: FormData) {
  await verificarAutenticacao()

  const id = formData.get('id') as string
  if (!id) throw new Error('ID da categoria não fornecido.')

  const { error } = await supabase
    .from('categorias')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao eliminar categoria:', error)
    throw new Error('Erro ao eliminar categoria: ' + error.message)
  }

  revalidatePath('/admin/categorias')
}
