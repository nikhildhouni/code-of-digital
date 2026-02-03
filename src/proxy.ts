import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
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
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            const url = new URL('/login', request.url)
            url.searchParams.set('next', request.nextUrl.pathname)
            return NextResponse.redirect(url)
        }

        // Use Service Role to bypass RLS for Admin Check
        // This ensures middleware doesn't get blocked by recursive policies or cookie sync issues
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

        let isAdmin = false

        if (serviceRoleKey) {
            const adminAuthClient = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                serviceRoleKey,
                {
                    auth: {
                        persistSession: false // Service role client doesn't need to persist session
                    }
                }
            )

            const { data: profile } = await adminAuthClient
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profile?.role === 'admin') {
                isAdmin = true
            }
        } else {
            console.error("Middleware: Missing SUPABASE_SERVICE_ROLE_KEY")
            // Fallback to regular client (might fail if RLS is broken)
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()
            if (profile?.role === 'admin') isAdmin = true
        }

        if (!isAdmin) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return response
}

export async function proxy(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
