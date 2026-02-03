'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    service: string
    message: string
    status: 'new' | 'contacted' | 'closed'
    created_at: string
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchLeads()
    }, [])

    const fetchLeads = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setLeads(data as Lead[])
        setLoading(false)
    }

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', id)

        if (!error) {
            setLeads(leads.map(l => l.id === id ? { ...l, status: status as any } : l))
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <div className="border rounded-md bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell></TableRow>
                        ) : leads.length === 0 ? (
                            <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No leads yet.</TableCell></TableRow>
                        ) : (
                            leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {format(new Date(lead.created_at), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{lead.email}</span>
                                            <span className="text-muted-foreground">{lead.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{lead.service || '-'}</TableCell>
                                    <TableCell className="max-w-[300px] truncate" title={lead.message}>
                                        {lead.message}
                                    </TableCell>
                                    <TableCell>
                                        <Select value={lead.status} onValueChange={(val) => updateStatus(lead.id, val)}>
                                            <SelectTrigger className="w-[120px] h-8">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="contacted">Contacted</SelectItem>
                                                <SelectItem value="closed">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
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
