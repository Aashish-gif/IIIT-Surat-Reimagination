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
  // Generate mock data if not provided (24 weeks for a better perspective view)
  const heatmapData = data || Array(24).fill(null).map(() =>
    Array(7).fill(null).map(() => Math.floor(Math.random() * 25))
  )

  return (
    <motion.div
      className="glassmorphic col-span-2 row-span-2 p-6 neon-glow overflow-hidden flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-foreground">Contribution Skyline</h3>
        <div className="flex gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
          <span>Isometric</span>
          <div className="w-px h-3 bg-border/40" />
          <span>3D View</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-48 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
        </div>
      ) : (
        <div className="relative flex-1 flex items-center justify-center perspective-1000">
          <motion.div
            className="flex gap-2"
            style={{
              transform: 'rotateX(55deg) rotateZ(-45deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {heatmapData.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="flex flex-col gap-2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {week.map((day, dayIdx) => {
                  const height = (day / 25) * 80 + 4 // Scaling height
                  const colorClass = getHeatmapColor(day)

                  return (
                    <motion.div
                      key={`${weekIdx}-${dayIdx}`}
                      initial={{ opacity: 0, translateZ: -100 }}
                      animate={{ opacity: 1, translateZ: 0 }}
                      transition={{ duration: 0.5, delay: (weekIdx * 7 + dayIdx) * 0.005 }}
                      className="relative w-4 h-4"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* 3D Vertical Bar (The City Skyline) */}
                      <motion.div
                        className={`absolute bottom-0 left-0 w-full rounded-sm transition-all duration-500 ${colorClass}`}
                        style={{
                          height: `${height}px`,
                          transform: `translateZ(${height}px)`,
                          transformOrigin: 'bottom',
                          boxShadow: day > 15 ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none'
                        }}
                      />

                      {/* Sides of the bar for 3D effect */}
                      <div
                        className={`absolute bottom-0 left-full w-full h-full origin-left bg-black/20`}
                        style={{
                          height: `${height}px`,
                          width: `${height}px`,
                          transform: 'rotateY(90deg)',
                          backgroundColor: 'rgba(0,0,0,0.3)'
                        }}
                      />
                      <div
                        className={`absolute bottom-full left-0 w-full h-full origin-bottom bg-black/10`}
                        style={{
                          height: `${height}px`,
                          transform: 'rotateX(90deg)',
                          backgroundColor: 'rgba(255,255,255,0.05)'
                        }}
                      />

                      {/* Base Square */}
                      <div className="absolute inset-0 bg-muted/10 rounded-sm" />
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </motion.div>
        </div>
      )}

      <div className="mt-auto pt-6 border-t border-border/40">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground uppercase">Intensity Map</span>
            <div className="flex gap-1 items-center">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${level === 0 ? 'bg-muted/20' :
                      level === 1 ? 'bg-emerald-900/40' :
                        level === 2 ? 'bg-emerald-800/60' :
                          level === 3 ? 'bg-emerald-700/80' : 'bg-emerald-500'
                    }`}
                />
              ))}
            </div>
          </div>
          <div className="h-8 w-px bg-border/40" />
          <div className="text-[10px] text-muted-foreground leading-tight">
            Vertical axis corresponds to<br />scaled contribution count
          </div>
        </div>
      </div>
    </motion.div>
  )
}
