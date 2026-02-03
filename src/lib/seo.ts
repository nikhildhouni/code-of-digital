import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/client'

// Since we are server-side in generateMetadata usually, we might need createClient from ssr/server?
// But generateMetadata can be async.
// Let's use a standard client for simplicity, but note that for server components we usually want fetch cache.
// However, the standard supabase-js client works fine for basic fetching.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Standard fetch wrapper to avoid initializing client repeatedly if possible,
// or just fetch directly.
async function fetchSeoData(slug: string, type: 'page' | 'post' = 'page') {
    // We can't use the hooks client here effectively if it depends on browser context, 
    // but generateMetadata runs on the server.
    // So we use a basic fetch or a clean supabase instance.

    // Manual query to avoid extensive dependency setup
    // 1. Get Entity ID
    let entityId = null
    let defaultTitle = ''

    if (type === 'page') {
        const res = await fetch(`${supabaseUrl}/rest/v1/pages?slug=eq.${slug}&select=id,title`, {
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`
            },
            cache: 'no-store' // Ensure fresh data
        })
        const data = await res.json()
        if (data && data.length > 0) {
            entityId = data[0].id
            defaultTitle = data[0].title
        }
    } else {
        const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts?slug=eq.${slug}&select=id,title`, {
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`
            },
            cache: 'no-store'
        })
        const data = await res.json()
        if (data && data.length > 0) {
            entityId = data[0].id
            defaultTitle = data[0].title
        }
    }

    if (!entityId) return null

    // 2. Get SEO Meta
    const res = await fetch(`${supabaseUrl}/rest/v1/seo_meta?entity_id=eq.${entityId}&entity_type=eq.${type}&select=*`, {
        headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
        },
        cache: 'no-store'
    })
    const seoData = await res.json()

    if (seoData && seoData.length > 0) {
        return { ...seoData[0], defaultTitle }
    }

    return { defaultTitle }
}

export async function getPageSeo(slug: string): Promise<Metadata> {
    const seo = await fetchSeoData(slug, 'page')

    if (!seo) {
        return {
            title: 'Code Of Digital',
            description: 'Premium Digital Agency'
        }
    }

    return {
        title: seo.title || seo.defaultTitle || 'Code Of Digital',
        description: seo.description || undefined,
        keywords: seo.keywords ? seo.keywords.split(',') : undefined,
        openGraph: seo.og_image_url ? {
            images: [seo.og_image_url]
        } : undefined
    }
}

export async function getBlogPostSeo(slug: string): Promise<Metadata> {
    const seo = await fetchSeoData(slug, 'post')

    if (!seo) {
        return {
            title: 'Article | Code Of Digital'
        }
    }

    return {
        title: seo.title || seo.defaultTitle,
        description: seo.description || undefined,
        keywords: seo.keywords ? seo.keywords.split(',') : undefined,
        openGraph: seo.og_image_url ? {
            images: [seo.og_image_url]
        } : undefined
    }
}
