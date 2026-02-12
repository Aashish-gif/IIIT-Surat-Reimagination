'use client'

import { motion } from 'framer-motion'

interface ContributionSkylineCardProps {
  isLoading?: boolean
  data?: Array<Array<number>>
}

const getHeatmapColor = (value: number) => {
  if (value === 0) return 'bg-muted/20'
  if (value < 2) return 'bg-emerald-900/40'
  if (value < 5) return 'bg-emerald-800/60'
  if (value < 10) return 'bg-emerald-700/80'
  if (value < 20) return 'bg-emerald-600'
  return 'bg-emerald-500 shadow-lg shadow-emerald-500/40'
}

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function ContributionSkylineCard({ isLoading, data }: ContributionSkylineCardProps) {
  // Generate mock data if not provided
  const heatmapData = data || Array(52).fill(null).map(() =>
    Array(7).fill(null).map(() => Math.floor(Math.random() * 25))
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glassmorphic col-span-2 row-span-2 p-6 neon-glow overflow-hidden"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Contribution Skyline</h3>

      {isLoading ? (
        <div className="h-40 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex gap-1">
              {heatmapData.map((week, weekIdx) => (
                <motion.div
                  key={weekIdx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: weekIdx * 0.01 }}
                  className="flex flex-col gap-1"
                >
                  {week.map((day, dayIdx) => (
                    <motion.div
                      key={`${weekIdx}-${dayIdx}`}
                      whileHover={{ scale: 1.2 }}
                      className={`w-3 h-3 rounded transition-smooth cursor-pointer hover:ring-2 hover:ring-primary/60 ${getHeatmapColor(day)}`}
                      title={`${day} contributions on day`}
                    />
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border/40">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Contribution activity:</span>
          <div className="flex gap-1 items-center">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded ${
                  level === 0
                    ? 'bg-muted/20'
                    : level === 1
                    ? 'bg-emerald-900/40'
                    : level === 2
                    ? 'bg-emerald-800/60'
                    : level === 3
                    ? 'bg-emerald-700/80'
                    : 'bg-emerald-500'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-auto">Less ← More</span>
        </div>
      </div>
    </motion.div>
  )
}
