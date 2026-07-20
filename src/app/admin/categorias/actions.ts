'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function criarCategoria(formData: FormData) {
  const nome = formData.get('nome') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const ordem = parseInt(formData.get('ordem') as string) || 0
  const ativa = formData.get('ativa') === 'true'

  await supabase.from('categorias').insert({ nome, slug, descricao, ordem, ativa })
  revalidatePath('/admin/categorias')
  redirect('/admin/categorias')
}

export async function atualizarCategoria(formData: FormData) {
  const id = formData.get('id') as string
  const nome = formData.get('nome') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const ordem = parseInt(formData.get('ordem') as string) || 0
  const ativa = formData.get('ativa') === 'true'

  await supabase.from('categorias').update({ nome, slug, descricao, ordem, ativa }).eq('id', id)
  revalidatePath('/admin/categorias')
  redirect('/admin/categorias')
}

export async function eliminarCategoria(formData: FormData) {
  const id = formData.get('id') as string
  await supabase.from('categorias').delete().eq('id', id)
  revalidatePath('/admin/categorias')
}