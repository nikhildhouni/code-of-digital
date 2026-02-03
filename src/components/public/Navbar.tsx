'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'

const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Work', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-white/10 text-white shadow-sm"
        >
            <div className="flex items-center gap-2">
                {/* Logo */}
                <Link href="/" className="relative z-10 block w-48 h-12">
                    <Image
                        src="/logo.png"
                        alt="Code of Digital"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
                <Button asChild className="rounded-full px-6 bg-white text-black hover:bg-gray-200">
                    <Link href="/contact">Start Project</Link>
                </Button>
            </nav>

            {/* Mobile Nav */}
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetTitle className="hidden">Navigation</SheetTitle>
                        <div className="flex flex-col gap-6 mt-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-bold hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button asChild onClick={() => setIsOpen(false)} className="w-full">
                                <Link href="/contact">Start Project</Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </motion.header>
    )
}
