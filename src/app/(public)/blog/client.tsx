'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'


interface Post {
    id: string
    title: string
    slug: string
    excerpt: string
    featured_image_url: string
    published_at: string
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true)
            const { data, error } = await supabase
                .from('blog_posts')
                .select('id, title, slug, excerpt, featured_image_url, published_at')
                .eq('status', 'published')
                .order('published_at', { ascending: false })

            if (data) setPosts(data)
            setLoading(false)
        }
        fetchPosts()
    }, [supabase])

    return (
        <main className="bg-background text-foreground min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <section className="mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6"
                    >
                        Insights
                    </motion.h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Thoughts on technology, design, and the future of digital.
                    </p>
                </section>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-muted rounded-2xl h-[400px]" />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed rounded-xl">
                        <p className="text-xl text-muted-foreground">No articles published yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {posts.map((post, i) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col h-full"
                            >
                                <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative bg-muted border border-border">
                                    {post.featured_image_url ? (
                                        <Image
                                            src={post.featured_image_url}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-6xl font-black uppercase">
                                            {post.title.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-border">
                                        {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'Recently'}
                                    </div>
                                </Link>

                                <div className="flex-1 flex flex-col">
                                    <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                                        <h2 className="text-2xl font-bold uppercase tracking-tight mb-4 leading-tight line-clamp-2">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all">
                                        Read Article <ArrowUpRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
