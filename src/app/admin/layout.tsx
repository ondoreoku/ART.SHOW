'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from './logout/actions'   // <-- agora actions.ts

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Obras', href: '/admin/obras' },
  { name: 'Categorias', href: '/admin/categorias' },
  { name: 'Comissões', href: '/admin/comissoes' },
  { name: 'Doações', href: '/admin/doacoes' },
  { name: 'Configurações', href: '/admin/configuracoes' },
  { name: 'Secções da Página', href: '/admin/secoes' },
  { name: 'Páginas', href: '/admin/paginas' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Painel</h2>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                pathname === item.href ? 'bg-gray-700' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Sair
        </button>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}