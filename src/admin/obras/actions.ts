// src/app/(admin)/obras/actions.ts
'use server'

import { supabase } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function criarObra(formData: FormData) {
  const titulo = formData.get('titulo') as string
  const slug = formData.get('slug') as string
  const descricao = formData.get('descricao') as string
  const categoria_id = formData.get('categoria_id') as string
  const tecnica = formData.get('tecnica') as string
  const dimensoes = formData.get('dimensoes') as string
  const ano = parseInt(formData.get('ano') as string)
  const preco = parseFloat(formData.get('preco') as string)
  const disponivel = formData.get('disponivel') === 'true'
  const destacada = formData.get('destacada') === 'true'
  const imagem = formData.get('imagem') as File

  // Upload da imagem para o bucket 'obras'
  const fileExt = imagem.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('obras')
    .upload(fileName, imagem)

  if (uploadError) throw new Error('Erro ao fazer upload da imagem')

  // Obter URL pública
  const { data: publicUrlData } = supabase.storage
    .from('obras')
    .getPublicUrl(fileName)
  const imagem_url = publicUrlData.publicUrl

  // Inserir na tabela obras
  const { error } = await supabase
    .from('obras')
    .insert({
      titulo,
      slug,
      descricao,
      categoria_id,
      imagem_url,
      tecnica,
      dimensoes,
      ano,
      preco,
      disponivel,
      destacada,
    })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/obras')
  redirect('/admin/obras')
}