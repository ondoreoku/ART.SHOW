import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ART.SHOW Admin</h1>
          <div className="flex gap-4">
            <a href="/admin/dashboard" className="hover:text-blue-400">Dashboard</a>
            <a href="/admin/obras" className="hover:text-blue-400">Obras</a>
            <a href="/admin/categorias" className="hover:text-blue-400">Categorias</a>
            <a href="/admin/aparencia" className="hover:text-blue-400">Aparência</a>
            <a href="/" className="hover:text-blue-400">Ver Site</a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}