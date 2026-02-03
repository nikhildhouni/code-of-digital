'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'


// Data Structure
const services = [
    {
        id: '01',
        title: 'Search Engine Optimization',
        subtitle: 'SEO Plans',
        plans: [
            {
                name: 'Basic Plan',
                price: '249',
                tagline: 'For Beginners',
                features: ['15 Keywords', '120 Backlinks', '3 Months Delivery', 'Monthly Report', 'Audit Report Free'],
                isPopular: false
            },
            {
                name: 'Delux Plan',
                price: '349',
                tagline: 'For Advanced',
                features: ['30 Keywords', '180 Backlinks', '3 Months Delivery', 'Weekly Report', 'Audit Report Free'],
                isPopular: true
            },
            {
                name: 'Master Plan',
                price: '449',
                tagline: 'For Pro',
                features: ['50 Keywords', '250 Backlinks', '3 Months Delivery', 'Weekly Reports', 'Audit Report Free'],
                isPopular: false
            }
        ]
    },
    {
        id: '02',
        title: 'Web Development',
        subtitle: 'Web Dev Plans',
        plans: [
            {
                name: 'Basic Plan',
                price: '249',
                tagline: 'For Beginners',
                features: ['Wordpress Website', '5 to 10 Pages Website', 'Domain Hosting Include', 'Analytics Connections', '07-10 Days Delivery'],
                isPopular: false
            },
            {
                name: 'Delux Plan',
                price: '599',
                tagline: 'For Advanced',
                features: ['React JS Website', '5 To 20 Pages Website', 'Domain Hosting Include', 'Deployment Includes', '10-20 Days Delivery'],
                isPopular: true
            },
            {
                name: 'Master Plan',
                price: '399',
                tagline: 'For Pro',
                features: ['E-Commerce Website', '5 To 10 Pages Website', 'Domain Hosting Include', '30 To 50 Products Add', '10-20 Days Delivery'],
                isPopular: false
            }
        ]
    },
    {
        id: '03',
        title: 'Social Media Marketing',
        subtitle: 'SMM Plans',
        plans: [
            {
                name: 'Basic Plan',
                price: '249',
                tagline: 'For Beginners',
                features: ['Facebook Page & Instagram', '8 Post 4 Reels', 'Page Optimization', 'Marketing Strategy', '3 Months Delivery'],
                isPopular: false
            },
            {
                name: 'Delux Plan',
                price: '349',
                tagline: 'For Advanced',
                features: ['Facebook Page & Instagram', '12 Posts 6 Reels', 'Page Optimization + Reach', 'Marketing Strategy', '3 Months Delivery'],
                isPopular: true
            },
            {
                name: 'Master Plan',
                price: '449',
                tagline: 'For Pro',
                features: ['Facebook Page & Instagram', '12 Posts 8 Reels 2 Stories', 'Page Optimization + Reach', 'Marketing Strategy', '3 Months Delivery'],
                isPopular: false
            }
        ]
    },
    {
        id: '04',
        title: 'Google & Meta ads',
        subtitle: 'Paid Ads',
        plans: [
            {
                name: 'Basic Plan',
                price: '299',
                tagline: 'For Beginners',
                features: ['Meta Ads', '25 to 35 Campaign', 'Daily Lead Report', 'Free Page Creation', 'Graphics For Ads', 'Instant Delivery'],
                isPopular: false
            },
            {
                name: 'Delux Plan',
                price: '349',
                tagline: 'For Advanced',
                features: ['Google Ads', '30 To 40 Campaign', 'Daily Lead Report', 'Free Page Creation', 'Instant Delivery'],
                isPopular: true
            },
            {
                name: 'Master Plan',
                price: '499',
                tagline: 'For Pro',
                features: ['Meta & Google Ads', '50 To 60 Campaign', 'Daily Lead Report', 'Free page Creation', 'Graphics For Ads', 'Instant Delivery'],
                isPopular: false
            }
        ]
    }
]

export default function ServicesPage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Header */}
                <section className="text-center space-y-6">
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">
                        Pricing <span className="text-primary stroke-text">Plans</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Transparent pricing for digital excellence. Choose the plan that fits your ambition.
                    </p>
                </section>

                {/* Service Categories */}
                {services.map((service, index) => (
                    <section key={service.id} className="space-y-12">
                        <div className="flex flex-col md:flex-row items-baseline gap-4 border-b border-border pb-4">
                            <span className="text-6xl font-black text-muted-foreground/20">{service.id}</span>
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">{service.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {service.plans.map((plan, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={`relative p-8 rounded-2xl border flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300 ${plan.isPopular ? 'bg-muted/30 border-primary/50' : 'bg-background border-border'}`}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" /> Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold uppercase mb-2">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest mb-6">{plan.tagline}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black">$</span>
                                            <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button className="w-full rounded-full font-bold uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all" variant={plan.isPopular ? 'default' : 'outline'} asChild>
                                        <Link href="/contact"> Sign Me Up <ArrowRight className="w-4 h-4 ml-2" /> </Link>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}

            </div>
        </main>
    )
}
