'use client'

import { motion } from 'framer-motion'
import { Crown, Sparkles, Wand2, Zap } from 'lucide-react'

interface CodingPersonaCardProps {
    isLoading?: boolean
    persona?: string
}

export function CodingPersonaCard({ isLoading, persona = "The Midnight Alchemist" }: CodingPersonaCardProps) {
    const personas: Record<string, { icon: any; color: string; description: string }> = {
        "The Midnight Alchemist": {
            icon: Sparkles,
            color: "from-emerald-400 to-cyan-400",
            description: "Transforms caffeine into elegant code during the witching hour."
        },
        "Type-Safe Architect": {
            icon: Crown,
            color: "from-blue-400 to-indigo-400",
            description: "Builds unshakeable foundations with pixel-perfect precision."
        },
        "Documentation Sensei": {
            icon: Wand2,
            color: "from-purple-400 to-pink-400",
            description: "Masters the art of clarity, making complex systems simple."
        },
        "Performance Ninja": {
            icon: Zap,
            color: "from-yellow-400 to-orange-400",
            description: "Squeezes every millisecond of efficiency out of every cycle."
        }
    }

    const currentPersona = personas[persona] || personas["The Midnight Alchemist"]
    const Icon = currentPersona.icon

    return (
        <div className="relative group overflow-hidden rounded-xl h-full">
            {/* Animated Aura/Glowing Border */}
            <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${currentPersona.color} opacity-30 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-pulse`}
                animate={{
                    background: [
                        `linear-gradient(45deg, var(--primary) 0%, transparent 50%, var(--secondary) 100%)`,
                        `linear-gradient(225deg, var(--primary) 0%, transparent 50%, var(--secondary) 100%)`,
                        `linear-gradient(45deg, var(--primary) 0%, transparent 50%, var(--secondary) 100%)`,
                    ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative flex flex-col items-center justify-center h-full p-6 bg-card border border-border/40 rounded-xl glassmorphic">
                {isLoading ? (
                    <div className="animate-pulse space-y-4 w-full flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-muted/40" />
                        <div className="h-4 w-3/4 bg-muted/40 rounded" />
                        <div className="h-3 w-1/2 bg-muted/40 rounded" />
                    </div>
                ) : (
                    <>
                        <motion.div
                            className={`p-4 rounded-full bg-gradient-to-br ${currentPersona.color} mb-4 relative shadow-2xl`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <Icon className="w-8 h-8 text-background" />
                            <motion.div
                                className="absolute inset-0 rounded-full blur-xl bg-inherit opacity-50"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                            {persona}
                        </h3>
                        <p className="text-sm text-muted-foreground text-center">
                            {currentPersona.description}
                        </p>

                        <div className="mt-4 flex gap-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 w-8 rounded-full bg-gradient-to-r ${currentPersona.color} opacity-40`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
