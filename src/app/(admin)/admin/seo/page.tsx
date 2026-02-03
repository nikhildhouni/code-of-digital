'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit, Save } from 'lucide-react'
import { toast } from 'sonner'

interface SeoEntity {
    id: string // entity_id
    title: string // page title or post title
    slug: string
    seo: {
        title: string
        description: string
        keywords: string
        og_image_url: string
    } | null
}

export default function SeoManagerPage() {
    const [activeTab, setActiveTab] = useState('pages')
    const [entities, setEntities] = useState<SeoEntity[]>([])
    const [loading, setLoading] = useState(false)

    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null)
    const [seoForm, setSeoForm] = useState({
        title: '',
        description: '',
        keywords: '',
        og_image_url: ''
    })
    const [dialogOpen, setDialogOpen] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchEntities()
    }, [activeTab])

    const fetchEntities = async () => {
        setLoading(true)
        let data: any[] = []

        // We need to fetch entities and LEFT JOIN seo_meta
        // Supabase JS doesn't do complex joins easily on polymorphic tables without foreign keys setup perfectly.
        // Easier approach: Fetch entities, then fetch seo_meta matching IDs.

        let rows = []
        if (activeTab === 'pages') {
            const { data: pages } = await supabase.from('pages').select('id, title, slug')
            rows = pages || []
        } else {
            const { data: posts } = await supabase.from('blog_posts').select('id, title, slug')
            rows = posts || []
        }

        if (rows.length > 0) {
            const ids = rows.map(r => r.id)
            const { data: seoData } = await supabase
                .from('seo_meta')
                .select('*')
                .in('entity_id', ids)
                .eq('entity_type', activeTab === 'pages' ? 'page' : 'post')

            data = rows.map(r => {
                const seo = seoData?.find(s => s.entity_id === r.id)
                return {
                    id: r.id,
                    title: r.title,
                    slug: r.slug,
                    seo: seo ? {
                        title: seo.title,
                        description: seo.description,
                        keywords: seo.keywords,
                        og_image_url: seo.og_image_url
                    } : null
                }
            })
        }

        setEntities(data)
        setLoading(false)
    }

    const handleEdit = (entity: SeoEntity) => {
        setEditingId(entity.id)
        setSeoForm({
            title: entity.seo?.title || entity.title, // default to entity title
            description: entity.seo?.description || '',
            keywords: entity.seo?.keywords || '',
            og_image_url: entity.seo?.og_image_url || ''
        })
        setDialogOpen(true)
    }

    const handleSave = async () => {
        if (!editingId) return

        const payload = {
            entity_type: activeTab === 'pages' ? 'page' : 'post',
            entity_id: editingId,
            title: seoForm.title,
            description: seoForm.description,
            keywords: seoForm.keywords,
            og_image_url: seoForm.og_image_url
        }

        // Upsert logic
        // First check if exists
        const { data: existing } = await supabase
            .from('seo_meta')
            .select('id')
            .eq('entity_type', payload.entity_type)
            .eq('entity_id', payload.entity_id)
            .single()

        if (existing) {
            await supabase.from('seo_meta').update(payload).eq('id', existing.id)
        } else {
            await supabase.from('seo_meta').insert([payload])
        }

        toast.success('SEO updated')
        setDialogOpen(false)
        fetchEntities()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">SEO Manager</h1>
                <p className="text-muted-foreground">Manage meta tags and social preview settings.</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="pages">Pages</TabsTrigger>
                    <TabsTrigger value="posts">Blog Posts</TabsTrigger>
                </TabsList>

                <div className="mt-4 border rounded-md bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>SEO Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center h-24">Loading...</TableCell></TableRow>
                            ) : entities.length === 0 ? (
                                <TableRow><TableCell colSpan={4} className="text-center h-24">No items found.</TableCell></TableRow>
                            ) : (
                                entities.map(e => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">{e.title}</TableCell>
                                        <TableCell className="text-muted-foreground">{e.seo?.title || '-'}</TableCell>
                                        <TableCell className="max-w-md truncate text-muted-foreground">{e.seo?.description || '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="ghost" onClick={() => handleEdit(e)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Tabs>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit SEO Meta</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Meta Title</Label>
                            <Input
                                value={seoForm.title}
                                onChange={e => setSeoForm({ ...seoForm, title: e.target.value })}
                                placeholder="Page Title | Code Of Digital"
                            />
                            <p className="text-xs text-muted-foreground">Rec: 50-60 chars</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Meta Description</Label>
                            <Textarea
                                value={seoForm.description}
                                onChange={e => setSeoForm({ ...seoForm, description: e.target.value })}
                                placeholder="A brief summary for search results..."
                            />
                            <p className="text-xs text-muted-foreground">Rec: 150-160 chars</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Keywords (comma separated)</Label>
                            <Input
                                value={seoForm.keywords}
                                onChange={e => setSeoForm({ ...seoForm, keywords: e.target.value })}
                                placeholder="digital, agency, 3d"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>OG Image URL</Label>
                            <Input
                                value={seoForm.og_image_url}
                                onChange={e => setSeoForm({ ...seoForm, og_image_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                        <Button className="w-full" onClick={handleSave}>Save Changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
