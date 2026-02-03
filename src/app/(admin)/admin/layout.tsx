'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    LayoutDashboard,
    FileText,
    Settings,
    Image as ImageIcon,
    LogOut,
    Globe,
    Home
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const items = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'Pages', icon: FileText, href: '/admin/pages' },
        { name: 'Blog', icon: Globe, href: '/admin/blog' },
        { name: 'Media', icon: ImageIcon, href: '/admin/media' },
        { name: 'SEO Manager', icon: Settings, href: '/admin/seo' },
        { name: 'Leads', icon: FileText, href: '/admin/leads' },
        { name: 'Testimonials', icon: FileText, href: '/admin/testimonials' },
    ]

    return (
        <div className="flex h-screen bg-muted/10">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r border-border flex flex-col hidden md:flex sticky top-0 h-screen">
                <div className="p-6 border-b border-border flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">A</span>
                    </div>
                    <span className="font-bold text-lg">Admin Panel</span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {items.map(item => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}>
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </div>
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-border space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground" asChild>
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            View Website
                        </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-muted/5">
                <div className="container mx-auto p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
