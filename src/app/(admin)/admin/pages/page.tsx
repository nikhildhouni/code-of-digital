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
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Page {
    id: string
    title: string
    slug: string
    status: string
    updated_at: string
}

export default function PagesListPage() {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchPages()
    }, [])

    const fetchPages = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('pages')
            .select('id, title, slug, status, updated_at')
            .order('updated_at', { ascending: false })

        if (error) {
            toast.error('Failed to load pages')
        } else {
            setPages(data || [])
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return

        const { error } = await supabase.from('pages').delete().eq('id', id)
        if (error) {
            toast.error('Error deleting page')
        } else {
            toast.success('Page deleted')
            setPages(pages.filter(p => p.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
                    <p className="text-muted-foreground">Manage website pages and Landing Pages.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/pages/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Page
                    </Link>
                </Button>
            </div>

            <div className="border rounded-md bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : pages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No pages found.</TableCell>
                            </TableRow>
                        ) : (
                            pages.map(page => (
                                <TableRow key={page.id}>
                                    <TableCell className="font-medium">{page.title}</TableCell>
                                    <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                                    <TableCell>
                                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                                            {page.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" asChild>
                                            <Link href={`/admin/pages/${page.id}`}>
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button size="icon" variant="destructive" onClick={() => handleDelete(page.id)}>
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
