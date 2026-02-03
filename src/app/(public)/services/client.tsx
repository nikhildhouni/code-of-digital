'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, Search, Share2, Megaphone } from 'lucide-react'
import Link from 'next/link'


const services = [
    {
        title: "Search Engine Optimization",
        description: "Dominate search results and drive organic traffic. We craft data-driven SEO strategies that put your brand in front of the right audience at the right time.",
        icon: Search,
        link: "/pricing#seo" // Anchor link to pricing page section if needed, or just /pricing
    },
    {
        title: "Web Development",
        description: "We build pixel-perfect, high-performance websites. From corporate platforms to complex e-commerce systems using the latest technologies like Next.js and React.",
        icon: Code2,
        link: "/pricing#web-dev"
    },
    {
        title: "Social Media Marketing",
        description: "Turn followers into loyal customers. Our strategic approach to social media ensures consistent growth, engagement, and brand authority across all major platforms.",
        icon: Share2,
        link: "/pricing#smm"
    },
    {
        title: "Google & Meta Ads",
        description: "Instant traffic, measurable ROI. We manage high-converting ad campaigns that maximize your ad spend and deliver qualified leads instantly.",
        icon: Megaphone,
        link: "/pricing#ads"
    }
]

export default function ServicesPage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <section className="mb-32">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8"
                    >
                        Our <span className="text-primary">Expertise</span>
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                        We don't just offer services; we provide digital solutions that transform businesses.
                        Every strategy is bespoke, every line of code is purposeful.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group border-t border-border pt-8 hover:border-primary transition-colors duration-500"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <service.icon className="w-12 h-12 text-primary opacity-80 group-hover:scale-110 transition-transform duration-500" />
                                <Link href={service.link} className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                                    <ArrowUpRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <h2 className="text-4xl font-bold uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-300">{service.title}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{service.description}</p>

                            <Link href="/pricing" className="text-sm font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors">
                                View Plans
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
