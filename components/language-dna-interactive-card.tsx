'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import { Star, GitFork, Code2 } from 'lucide-react'

interface LanguageDNAInteractiveCardProps {
    isLoading?: boolean
    data?: Array<{
        skill: string
        level: number
        color: string
    }>
    repositories?: Array<{
        name: string
        tags: string[]
        stars: number
        forks: number
        language: string
    }>
}

const defaultSkills = [
    { skill: 'Frontend', level: 85, color: 'rgb(234, 179, 8)' },
    { skill: 'Backend', level: 92, color: 'rgb(16, 185, 129)' },
    { skill: 'DevOps', level: 78, color: 'rgb(6, 182, 212)' },
    { skill: 'Mobile', level: 65, color: 'rgb(168, 85, 247)' },
    { skill: 'Documentation', level: 88, color: 'rgb(236, 72, 153)' },
]

const defaultRepos = [
    { name: 'react-dashboard', tags: ['Frontend'], stars: 1234, forks: 234, language: 'TypeScript' },
    { name: 'api-gateway', tags: ['Backend', 'DevOps'], stars: 892, forks: 145, language: 'Go' },
    { name: 'mobile-app', tags: ['Mobile', 'Frontend'], stars: 567, forks: 89, language: 'React Native' },
    { name: 'docs-site', tags: ['Documentation', 'Frontend'], stars: 345, forks: 67, language: 'Markdown' },
]

export function LanguageDNAInteractiveCard({ isLoading, data, repositories }: LanguageDNAInteractiveCardProps) {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
    const chartData = data || defaultSkills
    const repos = repositories || defaultRepos

    const filteredRepos = selectedSkill
        ? repos.filter(repo => repo.tags.includes(selectedSkill))
        : []

    return (
        <motion.div className="glassmorphic col-span-1 row-span-2 p-6 neon-glow flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Developer DNA</h3>
                {selectedSkill && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSelectedSkill(null)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-bold uppercase tracking-tighter"
                    >
                        Clear
                    </motion.button>
                )}
            </div>

            {isLoading ? (
                <div className="flex-1 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
            ) : (
                <>
                    <div className="flex-1 flex items-center justify-center -mt-4">
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={chartData}>
                                <PolarGrid stroke="rgba(16, 185, 129, 0.1)" />
                                <PolarAngleAxis
                                    dataKey="skill"
                                    stroke="rgba(240, 240, 245, 0.4)"
                                    tick={(props) => {
                                        const { payload, x, y, textAnchor } = props
                                        const isActive = selectedSkill === payload.value
                                        return (
                                            <g className="recharts-layer recharts-polar-angle-axis-tick">
                                                <text
                                                    x={x}
                                                    y={y}
                                                    textAnchor={textAnchor}
                                                    fill={isActive ? 'var(--primary)' : 'rgba(240, 240, 245, 0.6)'}
                                                    fontSize={12}
                                                    fontWeight={isActive ? 'bold' : 'normal'}
                                                    className="cursor-pointer hover:fill-primary transition-colors"
                                                    onClick={() => setSelectedSkill(payload.value)}
                                                >
                                                    {payload.value}
                                                </text>
                                            </g>
                                        )
                                    }}
                                />
                                <PolarRadiusAxis stroke="rgba(240, 240, 245, 0.1)" tick={false} axisLine={false} />
                                <Radar
                                    name="Skill Level"
                                    dataKey="level"
                                    stroke="rgb(16, 185, 129)"
                                    fill="rgb(16, 185, 129)"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(10, 15, 25, 0.95)',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                    itemStyle={{ color: 'var(--primary)' }}
                                    cursor={false}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Skill Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {chartData.map((skill) => (
                            <motion.button
                                key={skill.skill}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSkill(skill.skill === selectedSkill ? null : skill.skill)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${selectedSkill === skill.skill
                                        ? 'bg-primary/20 text-primary border-primary/40'
                                        : 'bg-white/5 text-muted-foreground border-white/10 hover:border-primary/30'
                                    }`}
                                style={{
                                    borderColor: selectedSkill === skill.skill ? skill.color : undefined,
                                }}
                            >
                                {skill.skill}
                            </motion.button>
                        ))}
                    </div>

                    {/* Related Repositories Display */}
                    <AnimatePresence>
                        {selectedSkill && filteredRepos.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Code2 className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                            Related Repositories
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {filteredRepos.map((repo, idx) => (
                                            <motion.div
                                                key={repo.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-foreground truncate">{repo.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{repo.language}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-yellow-400" />
                                                        <span>{repo.stars}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <GitFork className="w-3 h-3 text-cyan-400" />
                                                        <span>{repo.forks}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            <div className="mt-auto pt-6 border-t border-border/40">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        Interactive DNA Scan
                    </p>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                    Click skills to filter related repositories
                </p>
            </div>
        </motion.div>
    )
}
