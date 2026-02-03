'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Trash2, Upload, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MediaFile {
    name: string
    id: string
    metadata: {
        mimetype: string
        size: number
    }
}

interface MediaLibraryProps {
    onSelect?: (url: string) => void
    className?: string
}

export function MediaLibrary({ onSelect, className }: MediaLibraryProps) {
    const [files, setFiles] = useState<MediaFile[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()
    const CDN_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`

    const fetchFiles = async () => {
        setLoading(true)
        const { data, error } = await supabase.storage.from('media').list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        })

        if (error) {
            // If bucket doesn't match/exist, this might error. 
            // We'll handle gracefully.
            console.error(error)
            // toast.error("Failed to load media. Ensure 'media' bucket exists.")
        } else {
            setFiles(data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchFiles()
    }, [])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        setUploading(true)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `${fileName}`

        const { error } = await supabase.storage.from('media').upload(filePath, file)

        if (error) {
            toast.error('Error uploading file')
            console.error(error)
        } else {
            toast.success('File uploaded successfully')
            fetchFiles()
        }
        setUploading(false)
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleDelete = async (fileName: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return

        const { error } = await supabase.storage.from('media').remove([fileName])

        if (error) {
            toast.error('Error deleting file')
        } else {
            toast.success('File deleted')
            setFiles(files.filter((f) => f.name !== fileName))
        }
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
        toast.success('URL copied to clipboard')
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Media Library</h2>
                <div className="flex gap-2">
                    <Button disabled={uploading} onClick={() => fileInputRef.current?.click()}>
                        {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        Upload Image
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : files.length === 0 ? (
                <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
                    No media files found. Upload some images!
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map((file) => {
                        // Basic filter for folders
                        if (!file.metadata) return null
                        const url = `${CDN_URL}/${file.name}`

                        return (
                            <Card key={file.id} className="group relative overflow-hidden aspect-square border-border/50">
                                <Image
                                    src={url}
                                    alt={file.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                    {onSelect ? (
                                        <Button size="sm" onClick={() => onSelect(url)}>
                                            <Check className="w-4 h-4 mr-1" /> Select
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="secondary" onClick={() => copyToClipboard(url)}>
                                            <Copy className="w-4 h-4 mr-1" /> Copy URL
                                        </Button>
                                    )}
                                    <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(file.name)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 truncate text-xs text-white text-center">
                                    {file.name}
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
