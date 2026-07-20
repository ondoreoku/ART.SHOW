import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response = NextResponse.next({
              request,
            })
            response.cookies.set(name, value, {
              ...options,
              path: '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            })
          })
        },
      },
    }
  )

  // Usar getSession em vez de getUser para garantir que a sessão é lida
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  // Logs para debug
  console.log('🔍 [middleware] Path:', request.nextUrl.pathname)
  console.log('🔍 [middleware] User:', user?.email || 'não autenticado')
  console.log('🔍 [middleware] Cookies:', request.cookies.getAll().map(c => c.name))

  // Se não estiver autenticado e tentar aceder a /admin/* (exceto login)
  if (!user && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    console.log('🔴 Redirecionando para login')
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Se estiver autenticado e tentar aceder ao login, redireciona para dashboard
  if (user && request.nextUrl.pathname === '/admin/login') {
    console.log('🟢 Já autenticado, redirecionando para dashboard')
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  console.log('✅ Acesso permitido')
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
