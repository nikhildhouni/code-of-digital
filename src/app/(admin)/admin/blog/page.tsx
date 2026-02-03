'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Post {
    id: string
    title: string
    status: string
    published_at: string
    created_at: string
}

export default function BlogListPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('blog_posts')
            .select('id, title, status, published_at, created_at')
            .order('created_at', { ascending: false })

        if (error) {
            toast.error('Failed to load posts')
        } else {
            setPosts(data || [])
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure? This cannot be undone.')) return

        const { error } = await supabase.from('blog_posts').delete().eq('id', id)
        if (error) {
            toast.error('Error deleting post')
        } else {
            toast.success('Post deleted')
            setPosts(posts.filter(p => p.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground">Manage your articles and content.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/blog/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Post
                    </Link>
                </Button>
            </div>

            <div className="border rounded-md bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Published Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No posts found.</TableCell>
                            </TableRow>
                        ) : (
                            posts.map(post => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                            {post.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" asChild>
                                            <Link href={`/admin/blog/${post.id}`}>
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button size="icon" variant="destructive" onClick={() => handleDelete(post.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
