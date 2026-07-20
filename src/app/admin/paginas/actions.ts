'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function verificarAutenticacao() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado.')
  return user
}

export async function criarPagina(formData: FormData) {
  await verificarAutenticacao()

  const titulo = formData.get('titulo') as string
  const slug = formData.get('slug') as string
  const conteudo = formData.get('conteudo') as string
  const meta_descricao = formData.get('meta_descricao') as string
  const publicada = formData.get('publicada') === 'on'
  const ordem = parseInt(formData.get('ordem') as string) || 0

  if (!titulo || !slug) throw new Error('Título e Slug são obrigatórios.')

  const { error } = await supabase.from('paginas').insert({
    titulo,
    slug,
    conteudo,
    meta_descricao,
    publicada,
    ordem,
  })

  if (error) throw new Error('Erro ao criar página: ' + error.message)

  revalidatePath('/admin/paginas')
  redirect('/admin/paginas')
}

export async function atualizarPagina(formData: FormData) {
  await verificarAutenticacao()

  const id = formData.get('id') as string
  const titulo = formData.get('titulo') as string
  const slug = formData.get('slug') as string
  const conteudo = formData.get('conteudo') as string
  const meta_descricao = formData.get('meta_descricao') as string
  const publicada = formData.get('publicada') === 'on'
  const ordem = parseInt(formData.get('ordem') as string) || 0

  if (!id || !titulo || !slug) throw new Error('Dados inválidos.')

  const { error } = await supabase
    .from('paginas')
    .update({
      titulo,
      slug,
      conteudo,
      meta_descricao,
      publicada,
      ordem,
      atualizado_em: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw new Error('Erro ao atualizar página: ' + error.message)

  revalidatePath('/admin/paginas')
  revalidatePath(`/admin/paginas/${id}`)
  redirect('/admin/paginas')
}

export async function eliminarPagina(formData: FormData) {
  await verificarAutenticacao()

  const id = formData.get('id') as string
  if (!id) throw new Error('ID não fornecido.')

  const { error } = await supabase.from('paginas').delete().eq('id', id)
  if (error) throw new Error('Erro ao eliminar página: ' + error.message)

  revalidatePath('/admin/paginas')
}