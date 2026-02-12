'use client'

import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface CommitActivityCardProps {
  isLoading?: boolean
  data?: Array<{
    month: string
    commits: number
    peak?: boolean
  }>
}

const generateMockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, idx) => ({
    month,
    commits: Math.floor(Math.random() * 200) + 50,
    peak: Math.random() > 0.8,
  }))
}

export function CommitActivityCard({ isLoading, data }: CommitActivityCardProps) {
  const chartData = data || generateMockData()

  const maxCommits = Math.max(...chartData.map((d) => d.commits))
  const peakMonth = chartData.find((d) => d.peak) || chartData.reduce((prev, current) =>
    current.commits > prev.commits ? current : prev
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glassmorphic col-span-2 row-span-1 p-6 neon-glow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Commit Activity</h3>
          <p className="text-xs text-muted-foreground mt-1">Last 12 months</p>
        </div>
        {!isLoading && peakMonth && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Peak Activity</p>
            <p className="text-sm font-semibold text-primary">
              {peakMonth.month}: {peakMonth.commits} commits
            </p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="h-40 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(240, 240, 245, 0.1)" />
            <XAxis
              dataKey="month"
              stroke="rgba(240, 240, 245, 0.3)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="rgba(240, 240, 245, 0.3)"
              style={{ fontSize: '12px' }}
              domain={[0, Math.ceil(maxCommits * 1.1)]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(10, 15, 25, 0.9)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'rgb(240, 240, 245)' }}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="rgb(16, 185, 129)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCommits)"
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  )
}
