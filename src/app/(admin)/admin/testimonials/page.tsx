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

interface Testimonial {
    id: string
    name: string
    role: string
    company: string
    is_active: boolean
    sort_order: number
}

export default function TestimonialsListPage() {
    const [data, setData] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, name, role, company, is_active, sort_order')
            .order('sort_order', { ascending: true })

        if (error) {
            //   toast.error('Failed to load testimonials (Table might not exist yet)')
        } else {
            setData(data || [])
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return

        const { error } = await supabase.from('testimonials').delete().eq('id', id)
        if (error) {
            toast.error('Error deleting')
        } else {
            toast.success('Deleted')
            setData(data.filter(i => i.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-muted-foreground">Manage client reviews and quotes.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/testimonials/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Testimonial
                    </Link>
                </Button>
            </div>

            <div className="border rounded-md bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Order</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role/Company</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={5} className="h-24 text-center">Loading...</TableCell></TableRow>
                        ) : data.length === 0 ? (
                            <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No testimonials found. Create one!</TableCell></TableRow>
                        ) : (
                            data.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.sort_order}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{item.role} {item.company && `@ ${item.company}`}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.is_active ? 'default' : 'secondary'}>
                                            {item.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" asChild>
                                            <Link href={`/admin/testimonials/${item.id}`}>
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
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
