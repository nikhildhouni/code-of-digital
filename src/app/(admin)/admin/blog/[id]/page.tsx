'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { TipTapEditor } from '@/components/admin/TipTapEditor'
import { MediaLibrary } from '@/components/admin/MediaLibrary'
import { ArrowLeft, Loader2, Save, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

const statusEnum = z.enum(['draft', 'published', 'scheduled'])
type PostStatus = z.infer<typeof statusEnum>

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    status: statusEnum,
    featured_image_url: z.string().optional(),
})

type FormData = {
    title: string;
    slug: string;
    excerpt?: string;
    status: PostStatus;
    featured_image_url?: string;
}

export default function BlogEditorPage() {
    const params = useParams()
    const router = useRouter()
    const supabase = createClient()
    const isNew = params.id === 'new'
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [mediaOpen, setMediaOpen] = useState(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            status: 'draft',
            title: '',
            slug: '',
            excerpt: '',
            featured_image_url: ''
        }
    })

    const featuredImage = watch('featured_image_url')

    useEffect(() => {
        if (!isNew && params.id) {
            loadPost(params.id as string)
        }
    }, [params.id])

    const loadPost = async (id: string) => {
        setLoading(true)
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            toast.error('Failed to load post')
            router.push('/admin/blog')
        } else {
            setValue('title', data.title)
            setValue('slug', data.slug)
            setValue('excerpt', data.excerpt)
            setValue('status', data.status)
            setValue('featured_image_url', data.featured_image_url)
            setContent(data.content || '') // Handle jsonb/string mismatch later if complex, simpler to use HTML string for now
        }
        setLoading(false)
    }

    const handleSlugGen = () => {
        const title = watch('title')
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '')
            setValue('slug', slug)
        }
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true)

        const payload = {
            ...data,
            content, // Saving as string (HTML) for simplicity. If JSON needed, use editor.getJSON()
            updated_at: new Date().toISOString()
        }

        if (isNew) {
            const { error } = await supabase.from('blog_posts').insert([payload])
            if (error) {
                toast.error(`Error creating post: ${error.message}`)
            } else {
                toast.success('Post created')
                router.push('/admin/blog')
            }
        } else {
            const { error } = await supabase.from('blog_posts').update(payload).eq('id', params.id)
            if (error) {
                toast.error(`Error updating post: ${error.message}`)
            } else {
                toast.success('Post saved')
            }
        }
        setLoading(false)
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/blog"><ArrowLeft className="w-4 h-4" /></Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{isNew ? 'New Post' : 'Edit Post'}</h1>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input {...register('title')} placeholder="Post title" onBlur={handleSlugGen} />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Slug</Label>
                                <Input {...register('slug')} placeholder="post-url-slug" />
                                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Content</Label>
                                <TipTapEditor content={content} onChange={setContent} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Excerpt</Label>
                                <Textarea {...register('excerpt')} placeholder="Short summary for SEO and previews" rows={3} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    onValueChange={(val: any) => setValue('status', val)}
                                    defaultValue={watch('status')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <Label>Featured Image</Label>

                            {featuredImage ? (
                                <div className="relative aspect-video rounded-md overflow-hidden border">
                                    <Image src={featuredImage} alt="Featured" fill className="object-cover" />
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => setValue('featured_image_url', '')}
                                    >
                                        <span className="sr-only">Remove</span>x
                                    </Button>
                                </div>
                            ) : (
                                <div className="aspect-video bg-muted rounded-md flex items-center justify-center border border-dashed text-muted-foreground">
                                    <ImageIcon className="w-8 h-8 opacity-50" />
                                </div>
                            )}

                            <Dialog open={mediaOpen} onOpenChange={setMediaOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">Select Image</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                                    <DialogTitle>Media Library</DialogTitle>
                                    <div className="flex-1 overflow-auto p-4">
                                        <MediaLibrary onSelect={(url) => {
                                            setValue('featured_image_url', url)
                                            setMediaOpen(false)
                                        }} />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
