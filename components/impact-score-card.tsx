'use client'

import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface ImpactScoreCardProps {
  isLoading?: boolean
  data?: {
    score: number
    trend: Array<{ value: number }>
    change: number
  }
}

export function ImpactScoreCard({ isLoading, data }: ImpactScoreCardProps) {
  const score = data?.score ?? 0
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glassmorphic col-span-1 row-span-1 p-6 neon-glow flex flex-col items-center justify-center"
    >
      {isLoading ? (
        <div className="space-y-4 w-full text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-muted/40 to-muted/20 animate-pulse mx-auto" />
          <div className="h-6 bg-gradient-to-r from-muted/40 to-muted/20 rounded animate-pulse" />
        </div>
      ) : data ? (
        <div className="text-center w-full">
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

          <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend}>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 15, 25, 0.8)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                  cursor={false}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(16, 185, 129)"
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}
