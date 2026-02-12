import { Star, GitFork, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Repository {
  name: string
  language: string
  stars: number
  forks: number
  health: number
  description: string
  recentCommits?: number
  tags?: string[]
}

interface TopRepositoriesCardProps {
  isLoading?: boolean
  data?: Repository[]
  highlightedSkill?: string | null
}

const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    JavaScript: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    TypeScript: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Python: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    Go: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Rust: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    Java: 'bg-red-500/20 text-red-300 border-red-500/30',
    'C++': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  }
  return colors[language] || 'bg-muted/20 text-muted-foreground border-muted/30'
}

export function TopRepositoriesCard({ isLoading, data, highlightedSkill }: TopRepositoriesCardProps) {
  const repos = data || []

  return (
    <motion.div
      className="glassmorphic col-span-3 row-span-1 p-6 neon-glow"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Repositories</h3>
        <div className="flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-orange-400">
            <Flame className="w-3 h-3" />
            <span>Trending Velocity</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 p-4 rounded-lg bg-muted/20 animate-pulse">
              <div className="h-6 bg-gradient-to-r from-muted/40 to-muted/20 rounded w-32" />
              <div className="h-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, idx) => {
            const isHighlighted = highlightedSkill ? repo.tags?.includes(highlightedSkill) : true
            const isTrending = (repo.recentCommits || 0) > 5

            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isHighlighted ? 1 : 0.3,
                  scale: isHighlighted ? 1 : 0.95,
                  borderColor: isHighlighted && highlightedSkill ? 'var(--primary)' : 'rgba(255,255,255,0.1)'
                }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg border border-border/40 transition-all duration-300 group cursor-pointer relative overflow-hidden backdrop-blur-sm ${isHighlighted ? 'bg-card/40' : 'bg-card/10'
                  }`}
              >
                {/* Momentum Gauge / Fire Icon */}
                {isTrending && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] text-orange-400 font-bold uppercase tracking-tighter animate-pulse">
                    <Flame className="w-3 h-3 fill-orange-400" />
                    Trending
                  </div>
                )}

                <div className="mb-3">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-smooth truncate pr-16">
                    {repo.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{repo.description}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getLanguageColor(repo.language)}`}>
                    {repo.language}
                  </span>

                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{repo.stars >= 1000 ? `${(repo.stars / 1000).toFixed(1)}k` : repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{repo.forks >= 1000 ? `${(repo.forks / 1000).toFixed(1)}k` : repo.forks}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase text-muted-foreground tracking-widest font-bold">Vitality Alpha</span>
                    <span className="text-[10px] font-mono text-primary">{repo.health}%</span>
                  </div>
                  <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${repo.health}%` }}
                      transition={{ duration: 1, ease: 'circOut' }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
