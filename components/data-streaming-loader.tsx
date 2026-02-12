'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function DataStreamingLoader() {
    const [text, setText] = useState('')
    const phrases = [
        'Initializing quantum handshake...',
        'Decrypting commit history...',
        'Analyzing language DNA...',
        'Mapping contribution skyline...',
        'Synchronizing repo momentum...',
        'Finalizing developer persona...',
    ]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        let charIndex = 0
        const phrase = phrases[index]
        const interval = setInterval(() => {
            setText(phrase.substring(0, charIndex + 1))
            charIndex++
            if (charIndex === phrase.length) {
                clearInterval(interval)
                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % phrases.length)
                }, 1000)
            }
        }, 50)
        return () => clearInterval(interval)
    }, [index])

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-8 rounded-2xl border border-primary/20 bg-card/50 shadow-2xl relative overflow-hidden"
            >
                {/* Animated Loading Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                    />
                </div>

                {/* Terminal Header */}
                <div className="flex items-center gap-3 mb-4">
                    <motion.div
                        className="w-3 h-3 rounded-full bg-red-500/50"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-3 h-3 rounded-full bg-yellow-500/50"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-3 h-3 rounded-full bg-green-500/50"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    />
                </div>

                {/* Terminal Content */}
                <div className="font-mono text-sm space-y-2">
                    <motion.p
                        className="text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        &gt; {text}
                        <motion.span
                            className="inline-block w-2 h-4 bg-primary ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        >
                            _
                        </motion.span>
                    </motion.p>
                    <p className="text-muted-foreground/40 italic text-xs">
                        Accessing GitHub API cluster-7...
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                            Status: Active
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
