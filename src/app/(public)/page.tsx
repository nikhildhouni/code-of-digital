'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { TestimonialsSection } from '@/components/public/TestimonialsSection'
import { FoundersSection } from '@/components/public/FoundersSection'

// Animated Mesh Gradient Background
function MeshGradient() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Animated Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/30 rounded-full blur-[120px] mix-blend-screen"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[150px] mix-blend-screen"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
                className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen"
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
    )
}

export default function Home() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef })
    const y = useTransform(scrollYProgress, [0, 1], [0, -200])

    return (
        <main ref={containerRef} className="bg-background text-foreground overflow-hidden relative">

            {/* HERO SECTION */}
            <section className="min-h-screen w-full flex flex-col justify-center relative px-4 md:px-12 pt-7 pb-20 bg-white text-black overflow-hidden">
                {/* Blurred Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/background.webp"
                        alt="Background"
                        fill
                        className="object-cover blur-xl scale-110 opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
                </div>

                {/* Simplified Background Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none z-[1]" />

                <div className="max-w-[1600px] mx-auto w-full relative z-10">
                    {/* Top Side Labels */}
                    <div className="flex justify-between items-start mb-12 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest uppercase text-black/60"
                        >
                            <span className="w-2 h-2 bg-primary rounded-sm" />
                            Creative Agency
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-right max-w-[200px]"
                        >
                            <div className="text-xl md:text-2xl font-bold mb-2 tracking-tight">© 2026</div>
                            <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-black/40 leading-relaxed font-medium">
                                Our team uses aesthetic and minimal design to create impact.
                            </p>
                        </motion.div>
                    </div>

                    <div className="relative">
                        {/* Text Content */}
                        <div className="relative z-10 space-y-2 md:space-y-4 text-center md:text-left">
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                                    className="text-[13vw] md:text-[10vw] leading-none font-light tracking-tighter uppercase text-black"
                                >
                                    Creative
                                </motion.h1>
                            </div>

                            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-2 md:gap-8">
                                <div className="overflow-hidden">
                                    <motion.h1
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                                        className="text-[13vw] md:text-[10vw] leading-none font-bold tracking-tighter uppercase text-primary"
                                    >
                                        Digital
                                    </motion.h1>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.h1
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                                        className="text-[13vw] md:text-[10vw] leading-none font-light tracking-tighter uppercase text-black"
                                    >
                                        Agency
                                    </motion.h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mt-20 md:mt-32 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="max-w-md text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-black/60 text-center md:text-left leading-relaxed font-bold"
                        >
                            Beyond Pixels. <br />
                            Defining the future of digital interaction.
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <Button size="lg" className="rounded-full h-16 px-10 text-lg bg-black text-white hover:bg-black/90 group" asChild>
                                <Link href="/contact">
                                    Start Project <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Refined Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40 font-bold">Scroll Down</div>
                    <div className="relative w-px h-20 bg-gradient-to-b from-black/20 via-black to-transparent">
                        <motion.div
                            animate={{ y: [0, 50, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 -left-[3.5px] w-2 h-2 bg-black rounded-full shadow-sm"
                        />
                    </div>
                </motion.div>
            </section>

            {/* SECTION 2: MARQUEE */}
            <section className="py-24 border-t border-b border-white/10 overflow-hidden bg-black relative z-10">
                <div className="whitespace-nowrap flex gap-12 items-center animate-marquee">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent stroke-text-white opacity-50">
                                Creative
                            </span>
                            <span className="w-4 h-4 rounded-full bg-primary" />
                            <span className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white">
                                Developer
                            </span>
                            <span className="w-4 h-4 rounded-full bg-primary" />
                            <span className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent stroke-text-white opacity-50">
                                Strategy
                            </span>
                            <span className="w-4 h-4 rounded-full bg-primary" />
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: FOUNDERS SECTION */}
            <FoundersSection />

            {/* SECTION 4: SELECTED WORKS */}
            <section className="py-32 px-4 md:px-12 relative z-10 bg-background">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div>
                        <span className="text-primary font-mono uppercase tracking-widest mb-4 block">Our Work</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Selected <br /> Projects</h2>
                    </div>
                    <Button variant="outline" size="lg" className="rounded-full mt-8 md:mt-0 h-14 px-8 border-white/20 hover:border-white" asChild>
                        <Link href="/portfolio">View All Works <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-0 border-t border-white/10">
                    {projects.map((project, index) => (
                        <ProjectItem key={index} index={index + 1} title={project.title} category={project.category} year={project.year} />
                    ))}
                </div>
            </section>

            {/* SECTION 5: TESTIMONIALS */}
            <TestimonialsSection />

            {/* SECTION 6: PHILOSOPHY */}
            <section className="min-h-[80vh] flex items-center justify-center p-8 bg-white relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)]" />

                <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
                    <Zap className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-4xl md:text-7xl font-medium leading-tight tracking-tight text-black">
                        "We believe that <span className="text-primary">design</span> is not just about how it looks, but how it <span className="text-primary italic">works</span>."
                    </h3>
                    <p className="text-xl text-black/60 uppercase tracking-widest font-mono">Code Of Digital • Est 2022</p>
                </div>
            </section>

        </main>
    )
}

const projects = [
    { title: "Neon Horizon", category: "Web Design", year: "2025" },
    { title: "Vertex Audio", category: "Branding", year: "2024" },
    { title: "Cyber Leaf", category: "Development", year: "2024" },
    { title: "Orbital", category: "3D Motion", year: "2023" },
]

function ProjectItem({ index, title, category, year }: { index: number, title: string, category: string, year: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative border-b border-white/10 py-16 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-white/5 transition-all duration-500 px-4 md:px-8"
        >
            <div className="flex items-baseline gap-12">
                <span className="text-sm font-mono text-muted-foreground/50">0{index}</span>
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500">{title}</h3>
            </div>
            <div className="flex items-center gap-12 mt-4 md:mt-0">
                <span className="uppercase text-sm tracking-widest font-medium border border-white/20 px-4 py-1 rounded-full">{category}</span>
                <span className="font-mono text-sm text-muted-foreground">{year}</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowRight className="w-5 h-5" />
                </div>
            </div>
        </motion.div>
    )
}
