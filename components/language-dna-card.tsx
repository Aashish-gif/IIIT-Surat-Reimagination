'use client'

import { motion } from 'framer-motion'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface LanguageDNACardProps {
  isLoading?: boolean
  data?: Array<{
    skill: string
    level: number
  }>
}

const skills = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Documentation']

export function LanguageDNACard({ isLoading, data }: LanguageDNACardProps) {
  const chartData = data || skills.map((skill) => ({ skill, level: 60 }))

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glassmorphic col-span-1 row-span-2 p-6 neon-glow flex flex-col"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Language DNA</h3>
      
      {isLoading ? (
        <div className="flex-1 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="rgba(240, 240, 245, 0.1)" />
              <PolarAngleAxis
                dataKey="skill"
                stroke="rgba(240, 240, 245, 0.4)"
                tick={{ fill: 'rgba(240, 240, 245, 0.6)', fontSize: 12 }}
              />
              <PolarRadiusAxis
                stroke="rgba(240, 240, 245, 0.1)"
                tick={{ fill: 'rgba(240, 240, 245, 0.4)', fontSize: 10 }}
              />
              <Radar
                name="Skill Level"
                dataKey="level"
                stroke="rgb(16, 185, 129)"
                fill="rgb(16, 185, 129)"
                fillOpacity={0.2}
                isAnimationActive={true}
                animationDuration={800}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 15, 25, 0.9)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                }}
                cursor={false}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/40">
        <p className="text-xs text-muted-foreground">Technical Proficiency Distribution</p>
      </div>
    </motion.div>
  )
}
