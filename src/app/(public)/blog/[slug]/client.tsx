'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Post {
    title: string
    content: string
    featured_image_url: string
    published_at: string
}

export default function BlogPostPage() {
    const params = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const slug = params.slug as string
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .eq('status', 'published')
                .single()

            if (data) setPost(data)
            setLoading(false)
        }
        if (params.slug) fetchPost()
    }, [params.slug, supabase])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold">404</h1>
                <p>Article not found.</p>
                <Link href="/blog" className="text-primary hover:underline">Return to Blog</Link>
            </div>
        )
    }

    return (
        <main className="bg-background text-foreground min-h-screen pt-32 pb-20 px-4 md:px-0">
            {/* Progress Bar could act here */}

            <article className="max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
                </Link>

                <header className="mb-12 text-center px-4">
                    <div className="text-sm font-mono uppercase tracking-widest text-primary mb-4">
                        {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : 'Draft'}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-8">
                        {post.title}
                    </h1>
                    {post.featured_image_url && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border">
                            <Image
                                src={post.featured_image_url}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div
                    className="prose prose-lg md:prose-xl dark:prose-invert max-w-none px-4"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </main>
    )
}
