
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    // Read only in route
                },
            },
        }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    let profile = null
    let profileError = null
    let isAdmin = false

    if (user && serviceRoleKey) {
        const adminClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            { auth: { persistSession: false } }
        )

        const res = await adminClient.from('profiles').select('*').eq('id', user.id).single()
        profile = res.data
        profileError = res.error
        if (profile?.role === 'admin') isAdmin = true
    }

    return NextResponse.json({
        auth: {
            user_id: user?.id,
            email: user?.email,
            error: authError
        },
        env: {
            has_service_key: !!serviceRoleKey
        },
        profile: {
            data: profile,
            error: profileError,
            role: profile?.role
        },
        check: {
            isAdmin
        }
    })
}
