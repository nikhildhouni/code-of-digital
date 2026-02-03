'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
    children: string
    className?: string
    delay?: number
}

export function ScrollRevealText({ children, className = "", delay = 0 }: ScrollRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    // Split text into words (simple approximation for "line" feel without complex layout measurement)
    // For true line splitting we'd need a more complex library, but word stagger works great deeply.
    const words = children.split(" ")

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-top mr-[0.2em] -mb-[0.1em]">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: delay + (i * 0.02), // Stagger effect
                            ease: [0.33, 1, 0.68, 1] // Cubic bezier for "premium" feel
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}
