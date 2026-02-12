'use client'

import { useState } from 'react'
import { Sparkles, BarChart3, Star, GitFork, GitPullRequest, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LineChart,
    Line,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    Tooltip,
} from 'recharts'

interface ImpactScoreModalProps {
    isLoading?: boolean
    data?: {
        score: number
        trend: Array<{ value: number }>
        change: number
    }
}

export function ImpactScoreModal({ isLoading, data }: ImpactScoreModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const score = data?.score ?? 0
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (score / 100) * circumference

    const breakdownData = [
        { name: 'Stars', value: Math.floor(score * 0.4), color: 'rgb(234, 179, 8)', percentage: 40 },
        { name: 'Forks', value: Math.floor(score * 0.3), color: 'rgb(6, 182, 212)', percentage: 30 },
        { name: 'PRs', value: Math.floor(score * 0.3), color: 'rgb(16, 185, 129)', percentage: 30 },
    ]

    return (
        <>
            {/* Trigger Card */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsOpen(true)}
                className="glassmorphic col-span-1 row-span-1 p-6 neon-glow flex flex-col items-center justify-center cursor-pointer group"
            >
                {isLoading ? (
                    <div className="space-y-4 w-full text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-muted/40 to-muted/20 animate-pulse mx-auto" />
                        <div className="h-6 bg-gradient-to-r from-muted/40 to-muted/20 rounded animate-pulse" />
                    </div>
                ) : data ? (
                    <div className="text-center w-full relative">
                        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <BarChart3 className="w-4 h-4 text-primary" />
                        </div>

                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="45"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="text-muted"
                                />
                                <motion.circle
                                    cx="64"
                                    cy="64"
                                    r="45"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference}
                                    strokeLinecap="round"
                                    className="text-primary transition-smooth"
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">{score}</p>
                                    <p className="text-xs text-muted-foreground">/ 100</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm font-semibold text-foreground mb-2">Developer Impact Score</p>

                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className={`text-xs font-semibold ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {data.change >= 0 ? '+' : ''}{data.change}% this month
                            </span>
                        </div>

                        <div className="h-12 w-full opacity-50">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.trend}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="rgb(16, 185, 129)"
                                        dot={false}
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : null}
            </motion.div>

            {/* Glassmorphic Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-background/60 backdrop-blur-2xl border border-white/10 text-foreground rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Animated Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>

                            {/* Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center gap-2 text-2xl font-bold text-glow">
                                    <BarChart3 className="w-6 h-6 text-primary" />
                                    Impact Breakdown
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-6 space-y-8">
                                {/* Metric Cards */}
                                <div className="grid grid-cols-3 gap-4">
                                    {breakdownData.map((item, idx) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                                        >
                                            {item.name === 'Stars' && <Star className="w-5 h-5 text-yellow-500 mx-auto mb-2" />}
                                            {item.name === 'Forks' && <GitFork className="w-5 h-5 text-cyan-500 mx-auto mb-2" />}
                                            {item.name === 'PRs' && <GitPullRequest className="w-5 h-5 text-emerald-500 mx-auto mb-2" />}
                                            <p className="text-2xl font-bold text-white">{item.value}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.name}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Animated Bar Chart */}
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={breakdownData} layout="vertical" margin={{ left: -20 }}>
                                            <XAxis type="number" hide />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 'bold' }}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                contentStyle={{
                                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                radius={[0, 4, 4, 0]}
                                                barSize={32}
                                                isAnimationActive={true}
                                                animationDuration={1500}
                                            >
                                                {breakdownData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Progress Bars with Staggered Animation */}
                                <div className="space-y-4">
                                    {breakdownData.map((item, idx) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + idx * 0.15 }}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs font-semibold text-foreground">{item.name}</span>
                                                <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.percentage}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + idx * 0.15, ease: 'circOut' }}
                                                    className="h-full"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Formula Explanation */}
                                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                                        &quot;The Impact Score is calculated using a weighted algorithm analyzing repository engagement (Stars, Forks) and development velocity (PRs, Commits) relative to your ecosystem activity.&quot;
                                    </p>
                                    <div className="mt-3 text-[10px] font-mono text-primary/80">
                                        Score = (Stars × 0.4) + (Forks × 0.3) + (PRs × 0.3)
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
