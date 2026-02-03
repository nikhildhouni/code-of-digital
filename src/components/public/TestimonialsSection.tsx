'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Quote } from 'lucide-react'

interface Testimonial {
    id: string
    name: string
    role: string
    company: string
    quote: string
    image_url?: string
}

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchTestimonials() {
            // Fetch testimonials from DB
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true })

            if (data && data.length > 0) {
                setTestimonials(data)
            }
            // Removed static fallback to avoid confusion
            setLoading(false)
        }
        fetchTestimonials()
    }, [supabase])

    if (loading) return null
    if (testimonials.length === 0) return null

    // Ensure we have enough items for a smooth marquee
    const marqueeItems = testimonials.length < 4
        ? [...testimonials, ...testimonials, ...testimonials, ...testimonials]
        : [...testimonials, ...testimonials]

    return (
        <section className="py-32 bg-white text-black overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-30" />

            <div className="container mx-auto px-4 mb-20 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Client <br /> Voices</h2>
            </div>

            <div className="flex gap-8 animate-marquee whitespace-normal relative z-10">
                {marqueeItems.map((t, i) => (
                    <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[400px] md:w-[600px] p-8 md:p-12 border border-black/5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors duration-300 shadow-sm">
                        <Quote className="w-12 h-12 mb-8 text-primary" />
                        <p className="text-xl md:text-3xl font-medium leading-tight mb-8 tracking-tight text-black">"{t.quote}"</p>
                        <div className="flex items-center gap-4">
                            {t.image_url ? (
                                <img src={t.image_url} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {t.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-lg uppercase text-black">{t.name}</h4>
                                <p className="text-sm text-black/60 font-mono uppercase">{t.role} {t.company && `• ${t.company}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
