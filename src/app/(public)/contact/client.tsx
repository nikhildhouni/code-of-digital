'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'


const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    service: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false)
    const supabase = createClient()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            service: "",
            message: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setSubmitting(true)
        try {
            const { error } = await supabase.from('leads').insert({
                name: values.name,
                email: values.email,
                phone: values.phone,
                service: values.service,
                message: values.message,
                status: 'new'
            })

            if (error) throw error

            toast.success("Message sent successfully! We'll get back to you soon.")
            form.reset()
        } catch (error) {
            toast.error("Failed to send message. Please try again.")
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="bg-background text-foreground min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                            Let's <br /> <span className="text-primary stroke-text">Talk</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                            Ready to start your next project? We are currently accepting new clients for 2025.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h3>
                                <p className="text-lg">hello@codeofdigital.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Phone</h3>
                                <p className="text-lg">+1 (555) 000-0000</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Office</h3>
                                <p className="text-lg">123 Digital Ave, New York, NY</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest">Your Name</label>
                            <Input placeholder="John Doe" {...form.register('name')} className="h-12 bg-background/50" />
                            {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest">Email</label>
                                <Input placeholder="john@example.com" {...form.register('email')} className="h-12 bg-background/50" />
                                {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest">Phone</label>
                                <Input placeholder="+1..." {...form.register('phone')} className="h-12 bg-background/50" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest">Service Interested In</label>
                            <Select onValueChange={(val) => form.setValue('service', val)}>
                                <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SEO">SEO</SelectItem>
                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                    <SelectItem value="Social Media">Social Media</SelectItem>
                                    <SelectItem value="Ads">Google/Meta Ads</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest">Message</label>
                            <Textarea placeholder="Tell us about your project..." {...form.register('message')} className="min-h-[150px] bg-background/50" />
                            {form.formState.errors.message && <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>}
                        </div>

                        <Button type="submit" size="lg" className="w-full h-14 rounded-full text-lg font-bold uppercase tracking-widest" disabled={submitting}>
                            {submitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </motion.div>

            </div>
        </main>
    )
}
