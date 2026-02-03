'use client'

import { motion } from 'framer-motion'
import { ScrollRevealText } from '@/components/public/ScrollRevealText'
import Image from 'next/image'


export default function AboutPage() {
    return (
        <main className="bg-background text-foreground overflow-hidden">

            {/* HERO SECTION */}
            <section className="h-screen flex flex-col justify-end p-8 md:p-12 pb-32 box-border">
                <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter">
                    <ScrollRevealText>Standard</ScrollRevealText> <br />
                    <ScrollRevealText delay={0.2} className="text-primary">Defying</ScrollRevealText>
                </h1>
            </section>

            {/* MANIFESTO SECTION */}
            <section className="py-32 px-4 md:px-12 border-t border-border">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="w-full md:w-1/3">
                        <span className="text-sm font-mono uppercase text-muted-foreground tracking-widest">( Who We Are )</span>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-12">
                            <ScrollRevealText>
                                We are a collective of digital craftsmen, strategists, and creative engineers. We believe that in a saturated digital world, the only way to be heard is to speak a different language.
                            </ScrollRevealText>
                        </h2>
                        <div className="grid grid-cols-2 gap-8 max-w-lg">
                            <div>
                                <h3 className="text-6xl font-black text-primary mb-2">10+</h3>
                                <p className="uppercase text-sm tracking-widest">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-6xl font-black text-primary mb-2">500+</h3>
                                <p className="uppercase text-sm tracking-widest">Projects Shipped</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMAGE PARALLAX STRIP */}
            <section className="w-full h-[60vh] relative overflow-hidden bg-muted">
                {/* Placeholder for office vibe */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                    alt="Office"
                />
                <div className="absolute bottom-8 left-8 z-20">
                    <p className="text-white text-xl font-bold uppercase tracking-widest">Global HQ • New York</p>
                </div>
            </section>

            {/* SERVICES LIST (Simple Text List) */}
            <section className="py-32 px-4 md:px-12 bg-foreground text-background">
                <h2 className="text-[10vw] font-black uppercase tracking-tighter opacity-10 mb-20 leading-none">Expertise</h2>

                <div className="space-y-8">
                    {["Brand Strategy", "UI/UX Design", "Full Stack Dev", "3D Motion", "SEO & Growth"].map((item, i) => (
                        <div key={i} className="group border-b border-background/20 py-8 flex items-center justify-between cursor-pointer hover:px-4 transition-all duration-300">
                            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{item}</h3>
                            <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
