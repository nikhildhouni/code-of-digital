'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


const projects = [
    {
        id: "01",
        title: "Neon Horizon",
        category: "Web Design / Development",
        year: "2025",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        description: "A futuristic e-commerce platform for high-street streetwear, focusing on immersive 3D product interactions."
    },
    {
        id: "02",
        title: "Vertex Audio",
        category: "Branding / Identity",
        year: "2024",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        description: "Rebranding a legacy audio equipment manufacturer to appeal to the modern audiophile. Sonic identity meet visual design."
    },
    {
        id: "03",
        title: "Cyber Leaf",
        category: "UI/UX / App",
        year: "2024",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
        description: "Sustainable tech dashboard allowing corporations to track and offset their carbon footprint in real-time."
    },
    {
        id: "04",
        title: "Orbital",
        category: "3D Motion / Marketing",
        year: "2023",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        description: "Launch campaign for a satellite internet provider, featuring gravity-defying motion graphics."
    }
]

export default function PortfolioPage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <section className="mb-32">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter"
                    >
                        Selected <br /> <span className="text-primary stroke-text">Works</span>
                    </motion.h1>
                </section>

                {/* Projects List */}
                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                        >
                            {/* Text Content */}
                            <div className={`md:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2 md:col-start-8' : 'md:order-1'}`}>
                                <div className="flex items-center gap-4 mb-6 text-muted-foreground font-mono uppercase tracking-widest text-sm">
                                    <span>{project.id}</span>
                                    <span className="w-12 h-[1px] bg-border"></span>
                                    <span>{project.year}</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                                    {project.title}
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 border border-border rounded-full text-xs uppercase tracking-wider">{project.category}</span>
                                </div>
                                <div className="mt-8">
                                    <Link href={`/portfolio/${project.id.toLowerCase()}`} className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:gap-4 transition-all">
                                        View Case Study <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Image */}
                            <div className={`md:col-span-7 relative aspect-[4/3] overflow-hidden rounded-lg bg-muted ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer CTA */}
                <section className="mt-32 pt-20 border-t border-border text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                        Have a project <br /> in mind?
                    </h2>
                    <Link href="/contact" className="inline-flex items-center justify-center h-16 px-8 rounded-full bg-primary text-primary-foreground text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                        Start Collaboration
                    </Link>
                </section>

            </div>
        </main>
    )
}
