'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function FoundersSection() {
    return (
        <section className="py-32 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg bg-muted"
                >
                    {/* Placeholder for Founder Image. Replace src with actual image. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img
                        src="/images/ceo.jpg"
                        alt="Founder"
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-8 left-8 z-20 text-white">
                        <h3 className="text-4xl font-black uppercase tracking-tight">Deepak <br /> Kumar</h3>
                        <p className="text-sm font-mono uppercase tracking-widest mt-2 opacity-80">Founder & CEO</p>
                    </div>
                </motion.div>

                {/* Text */}
                <div className="space-y-8">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                        Vision <br /> <span className="text-primary italic">Manifested</span>
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-lg">
                        <p>
                            "Code Of Digital wasn't built to be just another agency. It was forged to bridge the widening gap between artistic ambition and technical reality."
                        </p>
                        <p>
                            We don't just write code; we architect digital emotions. Every pixel, every transition, every line of logic is crafted with a singular purpose: to leave a lasting mark on the digital consciousness.
                        </p>
                    </div>

                    <div className="pt-8">
                        <img src="/signature.png" alt="" className="h-16 opacity-50 mb-4" /> {/* Use a placeholder or remove if no sig */}
                        <div className="flex gap-4">
                            <a href="/about" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:underline">
                                Read Full Story <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
