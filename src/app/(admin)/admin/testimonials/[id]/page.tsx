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
import { Switch } from '@/components/ui/switch'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { MediaLibrary } from '@/components/admin/MediaLibrary'
import { ArrowLeft, Loader2, Save, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    company: z.string().optional(),
    quote: z.string().min(1, 'Quote is required'),
    image_url: z.string().optional(),
    sort_order: z.number(),
    is_active: z.boolean()
})

type FormData = {
    name: string;
    role: string;
    company?: string;
    quote: string;
    image_url?: string;
    sort_order: number;
    is_active: boolean;
}

export default function TestimonialEditorPage() {
    const params = useParams()
    const router = useRouter()
    const supabase = createClient()
    const isNew = params.id === 'new'
    const [loading, setLoading] = useState(false)
    const [mediaOpen, setMediaOpen] = useState(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            is_active: true,
            sort_order: 0,
        }
    })

    const imageUrl = watch('image_url')
    const isActive = watch('is_active')

    useEffect(() => {
        if (!isNew && params.id) {
            loadItem(params.id as string)
        }
    }, [params.id])

    const loadItem = async (id: string) => {
        setLoading(true)
        const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single()
        if (!error && data) {
            setValue('name', data.name)
            setValue('role', data.role)
            setValue('company', data.company)
            setValue('quote', data.quote)
            setValue('image_url', data.image_url)
            setValue('sort_order', data.sort_order)
            setValue('is_active', data.is_active)
        }
        setLoading(false)
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        const payload = { ...data, updated_at: new Date().toISOString() }

        if (isNew) {
            const { error } = await supabase.from('testimonials').insert([payload])
            if (error) toast.error(error.message)
            else {
                toast.success('Created')
                router.push('/admin/testimonials')
            }
        } else {
            const { error } = await supabase.from('testimonials').update(payload).eq('id', params.id)
            if (error) toast.error(error.message)
            else toast.success('Saved')
        }
        setLoading(false)
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/testimonials"><ArrowLeft className="w-4 h-4" /></Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{isNew ? 'New Testimonial' : 'Edit Testimonial'}</h1>
                </div>
                <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    <Save className="w-4 h-4 mr-2" />
                    Save
                </Button>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input {...register('name')} placeholder="Client Name" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input {...register('role')} placeholder="CEO / Founder" />
                            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Company</Label>
                        <Input {...register('company')} placeholder="Company Name" />
                    </div>

                    <div className="space-y-2">
                        <Label>Quote</Label>
                        <Textarea {...register('quote')} rows={4} placeholder="Their feedback..." />
                        {errors.quote && <p className="text-red-500 text-xs">{errors.quote.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Sort Order</Label>
                            <Input type="number" {...register('sort_order')} />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                            <Switch checked={isActive} onCheckedChange={(v) => setValue('is_active', v)} />
                            <Label>Active</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Client Image</Label>
                        <div className="flex items-center gap-4">
                            {imageUrl ? (
                                <div className="relative w-20 h-20 rounded-full overflow-hidden border">
                                    <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                                    <Button size="icon" variant="destructive" className="absolute top-0 right-0 w-6 h-6" onClick={() => setValue('image_url', '')}>x</Button>
                                </div>
                            ) : <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border border-dashed"><ImageIcon className="opacity-20" /></div>}

                            <Dialog open={mediaOpen} onOpenChange={setMediaOpen}>
                                <DialogTrigger asChild><Button variant="outline">Select Image</Button></DialogTrigger>
                                <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                                    <DialogTitle>Media Library</DialogTitle>
                                    <div className="flex-1 overflow-auto p-4">
                                        <MediaLibrary onSelect={(url) => { setValue('image_url', url); setMediaOpen(false) }} />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
