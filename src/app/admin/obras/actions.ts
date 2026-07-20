// src/app/admin/obras/actions.ts
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

// ─── CRIAR OBRA ──────────────────────────────────────────────────
export async function criarObra(formData: FormData) {
  await verificarAutenticacao()

  const titulo = formData.get('titulo') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const categoria_id = formData.get('categoria_id') as string
  const tecnica = formData.get('tecnica') as string
  const dimensoes = formData.get('dimensoes') as string
  const ano = parseInt(formData.get('ano') as string) || null
  const preco = parseFloat(formData.get('preco') as string) || null
  const disponivel = formData.get('disponivel') === 'on'
  const destacada = formData.get('destacada') === 'on'
  const imagem = formData.get('imagem') as File

  // Validações básicas
  if (!titulo || !slug) throw new Error('Título e Slug são obrigatórios.')
  if (!imagem || imagem.size === 0) throw new Error('A imagem é obrigatória.')

  // Upload da imagem
  const fileExt = imagem.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const { error: uploadError } = await supabase.storage
    .from('obras')
    .upload(fileName, imagem)

  if (uploadError) {
    console.error('Erro no upload:', uploadError)
    throw new Error('Erro ao fazer upload da imagem. Tente novamente.')
  }

  const { data: publicUrlData } = supabase.storage
    .from('obras')
    .getPublicUrl(fileName)
  const imagem_url = publicUrlData.publicUrl

  // Inserir no banco
  const { error } = await supabase
    .from('obras')
    .insert({
      titulo,
      slug,
      descricao,
      categoria_id: categoria_id || null,
      imagem_url,
      tecnica,
      dimensoes,
      ano,
      preco,
      disponivel,
      destacada,
    })

  if (error) {
    console.error('Erro ao inserir obra:', error)
    throw new Error('Erro ao criar obra: ' + error.message)
  }

  revalidatePath('/admin/obras')
  redirect('/admin/obras')
}

// ─── ATUALIZAR OBRA ──────────────────────────────────────────────
export async function atualizarObra(formData: FormData) {
  await verificarAutenticacao()

  const id = formData.get('id') as string
  if (!id) throw new Error('ID da obra não fornecido.')

  const titulo = formData.get('titulo') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const categoria_id = formData.get('categoria_id') as string
  const tecnica = formData.get('tecnica') as string
  const dimensoes = formData.get('dimensoes') as string
  const ano = parseInt(formData.get('ano') as string) || null
  const preco = parseFloat(formData.get('preco') as string) || null
  const disponivel = formData.get('disponivel') === 'on'
  const destacada = formData.get('destacada') === 'on'
  const imagem = formData.get('imagem') as File

  // Validação básica
  if (!titulo || !slug) throw new Error('Título e Slug são obrigatórios.')

  // Prepara dados para atualização
  const updateData: any = {
    titulo,
    slug,
    descricao,
    categoria_id: categoria_id || null,
    tecnica,
    dimensoes,
    ano,
    preco,
    disponivel,
    destacada,
    atualizada_em: new Date().toISOString(),
  }

  // Se houver nova imagem, faz upload e atualiza o URL
  if (imagem && imagem.size > 0) {
    // (Opcional) Apagar imagem antiga do storage? Podes implementar depois.
    const fileExt = imagem.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('obras')
      .upload(fileName, imagem)

    if (uploadError) {
      console.error('Erro no upload:', uploadError)
      throw new Error('Erro ao fazer upload da nova imagem.')
    }

    const { data: publicUrlData } = supabase.storage
      .from('obras')
      .getPublicUrl(fileName)
    updateData.imagem_url = publicUrlData.publicUrl
  }

  // Atualizar no banco
  const { error } = await supabase
    .from('obras')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar obra:', error)
    throw new Error('Erro ao atualizar obra: ' + error.message)
  }

  revalidatePath('/admin/obras')
  revalidatePath(`/admin/obras/${id}`)
  redirect('/admin/obras')
}

// ─── ELIMINAR OBRA ──────────────────────────────────────────────
export async function eliminarObra(formData: FormData) {
  await verificarAutenticacao()

  const id = formData.get('id') as string
  if (!id) throw new Error('ID da obra não fornecido.')

  // (Opcional) Buscar a obra para obter o nome do ficheiro e apagar do storage
  // const { data: obra } = await supabase.from('obras').select('imagem_url').eq('id', id).single()
  // if (obra?.imagem_url) {
  //   const fileName = obra.imagem_url.split('/').pop()
  //   await supabase.storage.from('obras').remove([fileName])
  // }

  const { error } = await supabase
    .from('obras')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao eliminar obra:', error)
    throw new Error('Erro ao eliminar obra: ' + error.message)
  }

  revalidatePath('/admin/obras')
}