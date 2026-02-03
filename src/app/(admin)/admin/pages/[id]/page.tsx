'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Save, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface PageSection {
    id?: string // local or db id
    type: 'hero' | 'features' | 'cta' | 'content'
    content: any
    sort_order: number
    is_enabled: boolean
}

export default function PageEditorPage() {
    const params = useParams()
    const router = useRouter()
    const supabase = createClient()
    const isNew = params.id === 'new'
    const [loading, setLoading] = useState(false)

    // Page Fields
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState('draft')

    // Sections
    const [sections, setSections] = useState<PageSection[]>([])

    useEffect(() => {
        if (!isNew && params.id) {
            loadPage(params.id as string)
        }
    }, [params.id])

    const loadPage = async (id: string) => {
        setLoading(true)

        // 1. Get Page
        const { data: pageData, error: pageError } = await supabase
            .from('pages')
            .select('*')
            .eq('id', id)
            .single()

        if (pageError) {
            toast.error('Failed to load page')
            router.push('/admin/pages')
            return
        }

        setTitle(pageData.title)
        setSlug(pageData.slug)
        setStatus(pageData.status)

        // 2. Get Sections
        const { data: sectionData, error: sectionError } = await supabase
            .from('page_sections')
            .select('*')
            .eq('page_id', id)
            .order('sort_order', { ascending: true })

        if (!sectionError && sectionData) {
            setSections(sectionData)
        }

        setLoading(false)
    }

    const addSection = (type: PageSection['type']) => {
        const newSection: PageSection = {
            type,
            content: type === 'hero' ? { title: 'Hero Title', subtitle: 'Subtitle here' } :
                type === 'content' ? { html: '<p>Content happens.</p>' } : {},
            sort_order: sections.length,
            is_enabled: true
        }
        setSections([...sections, newSection])
    }

    const removeSection = (index: number) => {
        const newSections = [...sections]
        newSections.splice(index, 1)
        setSections(newSections)
    }

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...sections]
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
        }
        setSections(newSections)
    }

    const updateSectionContent = (index: number, field: string, value: any) => {
        const newSections = [...sections]
        newSections[index].content = { ...newSections[index].content, [field]: value }
        setSections(newSections)
    }

    const handleSave = async () => {
        setLoading(true)
        let pageId = params.id as string

        const pagePayload = {
            title,
            slug,
            status,
            updated_at: new Date().toISOString()
        }

        // 1. Save Page
        if (isNew) {
            const { data, error } = await supabase.from('pages').insert([pagePayload]).select().single()
            if (error) {
                toast.error(error.message)
                setLoading(false)
                return
            }
            pageId = data.id
        } else {
            const { error } = await supabase.from('pages').update(pagePayload).eq('id', pageId)
            if (error) {
                toast.error(error.message)
                setLoading(false)
                return
            }
        }

        // 2. Save Sections
        // For simplicity: delete all existing sections for this page and re-insert. 
        // (Not efficient for massive pages, but fine for now).
        if (!isNew) {
            await supabase.from('page_sections').delete().eq('page_id', pageId)
        }

        const sectionsPayload = sections.map((s, idx) => ({
            page_id: pageId,
            type: s.type,
            content: s.content,
            sort_order: idx,
            is_enabled: s.is_enabled
        }))

        if (sectionsPayload.length > 0) {
            const { error: secError } = await supabase.from('page_sections').insert(sectionsPayload)
            if (secError) {
                console.error(secError)
                toast.warning('Page saved but sections failed')
            }
        }

        toast.success('Page saved successfully')
        if (isNew) {
            router.push(`/admin/pages/${pageId}`)
        }
        setLoading(false)
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/pages"><ArrowLeft className="w-4 h-4" /></Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h1>
                </div>
                <Button onClick={handleSave} disabled={loading}>
                    {loading && <p>Saving...</p>}
                    {!loading && <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main - Section Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Sections</h2>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => addSection('hero')}>+ Hero</Button>
                            <Button size="sm" variant="outline" onClick={() => addSection('content')}>+ Content</Button>
                            <Button size="sm" variant="outline" onClick={() => addSection('features')}>+ Features</Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {sections.map((section, idx) => (
                            <Card key={idx} className="relative group">
                                <CardHeader className="bg-muted/40 py-3 flex flex-row items-center justify-between">
                                    <CardTitle className="text-sm uppercase font-bold text-muted-foreground">{section.type}</CardTitle>
                                    <div className="flex items-center gap-1">
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveSection(idx, 'up')} disabled={idx === 0}><ArrowUp className="w-3 h-3" /></Button>
                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveSection(idx, 'down')} disabled={idx === sections.length - 1}><ArrowDown className="w-3 h-3" /></Button>
                                        <Button size="icon" variant="destructive" className="h-6 w-6 ml-2" onClick={() => removeSection(idx)}><Trash2 className="w-3 h-3" /></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                    {section.type === 'hero' && (
                                        <>
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input value={section.content.title || ''} onChange={(e) => updateSectionContent(idx, 'title', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Subtitle</Label>
                                                <Input value={section.content.subtitle || ''} onChange={(e) => updateSectionContent(idx, 'subtitle', e.target.value)} />
                                            </div>
                                        </>
                                    )}
                                    {section.type === 'content' && (
                                        <div className="space-y-2">
                                            <Label>HTML Content</Label>
                                            <textarea
                                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                                value={section.content.html || ''}
                                                onChange={(e) => updateSectionContent(idx, 'html', e.target.value)}
                                            />
                                            <p className="text-xs text-muted-foreground">HTML supported. (TipTap integration recommended for future)</p>
                                        </div>
                                    )}
                                    {/* More types ... */}
                                </CardContent>
                            </Card>
                        ))}
                        {sections.length === 0 && (
                            <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                                No sections yet. Add one above.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar - Settings */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Page Title</Label>
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Services" />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug</Label>
                                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="services" />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
