'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SiteLoader() {
    const [loading, setLoading] = useState(true)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        // Prevent scroll
        document.body.style.overflow = 'hidden'

        // Counter Animation
        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.floor(Math.random() * 10) + 1
            })
        }, 100)

        // Force complete after 2s
        const timer = setTimeout(() => {
            setCounter(100)
            setTimeout(() => {
                setLoading(false)
                document.body.style.overflow = 'unset'
            }, 500)
        }, 2000)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="relative w-full max-w-md px-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-between items-end mb-4"
                        >
                            <span className="text-xl font-mono uppercase tracking-widest">Code Of Digital</span>
                            <span className="text-6xl font-black">{Math.min(counter, 100)}%</span>
                        </motion.div>

                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(counter, 100)}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
