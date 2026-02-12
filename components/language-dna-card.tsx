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
  onSkillClick?: (skill: string) => void
  activeSkill?: string | null
}

const skillsList = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Documentation']

export function LanguageDNACard({ isLoading, data, onSkillClick, activeSkill }: LanguageDNACardProps) {
  const chartData = data || skillsList.map((skill) => ({ skill, level: 60 }))

  return (
    <motion.div
      className="glassmorphic col-span-1 row-span-2 p-6 neon-glow flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Language DNA</h3>
        {activeSkill && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onSkillClick?.('')}
            className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-bold uppercase tracking-tighter"
          >
            Clear Filter
          </motion.button>
        )}
      </div>

      {isLoading ? (
        <div className="flex-1 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
      ) : (
        <div className="flex-1 flex items-center justify-center -mt-4">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart
              data={chartData}
              onClick={(e) => {
                if (e && e.activeLabel) onSkillClick?.(e.activeLabel)
              }}
            >
              <PolarGrid stroke="rgba(16, 185, 129, 0.1)" />
              <PolarAngleAxis
                dataKey="skill"
                stroke="rgba(240, 240, 245, 0.4)"
                tick={(props) => {
                  const { payload, x, y, textAnchor, index } = props;
                  const isActive = activeSkill === payload.value;
                  return (
                    <g className="recharts-layer recharts-polar-angle-axis-tick">
                      <text
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        fill={isActive ? "var(--primary)" : "rgba(240, 240, 245, 0.6)"}
                        fontSize={12}
                        fontWeight={isActive ? "bold" : "normal"}
                        className="cursor-pointer hover:fill-primary transition-colors"
                        onClick={() => onSkillClick?.(payload.value)}
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <PolarRadiusAxis
                stroke="rgba(240, 240, 245, 0.1)"
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Skill Level"
                dataKey="level"
                stroke="rgb(16, 185, 129)"
                fill="rgb(16, 185, 129)"
                fillOpacity={0.4}
                isAnimationActive={true}
                animationDuration={1000}
                className="cursor-pointer"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 15, 25, 0.95)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)'
                }}
                itemStyle={{ color: 'var(--primary)' }}
                cursor={false}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-auto pt-6 border-t border-border/40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Interactive DNA Scan</p>
        </div>
        <p className="text-[10px] text-muted-foreground/60 mt-1">Select a vertex to filter repository highlights</p>
      </div>
    </motion.div>
  )
}
