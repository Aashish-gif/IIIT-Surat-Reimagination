'use client'

import { Star, GitFork } from 'lucide-react'
import { motion } from 'framer-motion'

interface Repository {
  name: string
  language: string
  stars: number
  forks: number
  health: number
  description: string
}

interface TopRepositoriesCardProps {
  isLoading?: boolean
  data?: Repository[]
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

const mockRepos: Repository[] = [
  {
    name: 'linux',
    language: 'C',
    stars: 180000,
    forks: 52000,
    health: 95,
    description: 'The Linux kernel',
  },
  {
    name: 'git',
    language: 'C',
    stars: 52000,
    forks: 28000,
    health: 92,
    description: 'Version control system',
  },
  {
    name: 'kubernetes',
    language: 'Go',
    stars: 115000,
    forks: 40000,
    health: 88,
    description: 'Container orchestration platform',
  },
]

export function TopRepositoriesCard({ isLoading, data }: TopRepositoriesCardProps) {
  const repos = data || mockRepos

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="glassmorphic col-span-3 row-span-1 p-6 neon-glow"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Repositories</h3>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 p-4 rounded-lg bg-muted/20 animate-pulse">
              <div className="h-6 bg-gradient-to-r from-muted/40 to-muted/20 rounded w-32" />
              <div className="h-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded" />
              <div className="h-3 bg-gradient-to-r from-muted/40 to-muted/20 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
              className="p-4 rounded-lg border border-border/40 hover:border-primary/60 hover:bg-primary/5 transition-smooth group cursor-pointer"
            >
              <div className="mb-3">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-smooth truncate">
                  {repo.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{repo.description}</p>
              </div>

              <div className="mb-3">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getLanguageColor(repo.language)}`}>
                  {repo.language}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{(repo.stars / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4 text-cyan-400" />
                  <span>{(repo.forks / 1000).toFixed(0)}k</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Health Score</span>
                  <span className="text-xs font-semibold text-primary">{repo.health}%</span>
                </div>
                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${repo.health}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
