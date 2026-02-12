'use client'

import { SidebarNav } from '@/components/sidebar-nav'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function RankingsPage() {
  const developers = [
    { rank: 1, name: 'torvalds', score: 98, repos: 180, followers: 120000 },
    { rank: 2, name: 'gvanrossum', score: 96, repos: 95, followers: 85000 },
    { rank: 3, name: 'tjholowaychuk', score: 94, repos: 210, followers: 92000 },
    { rank: 4, name: 'addyosmani', score: 92, repos: 156, followers: 78000 },
    { rank: 5, name: 'chromakode', score: 89, repos: 142, followers: 65000 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      
      <main className="ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-glow mb-2">Global Rankings</h1>
            <p className="text-muted-foreground mb-8">
              Top developers ranked by impact score and contribution metrics.
            </p>

            <div className="glassmorphic rounded-lg overflow-hidden neon-glow">
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-border/40 bg-muted/20">
                <div className="font-semibold text-muted-foreground">Rank</div>
                <div className="font-semibold text-muted-foreground">Developer</div>
                <div className="font-semibold text-muted-foreground">Impact Score</div>
                <div className="font-semibold text-muted-foreground">Repos</div>
                <div className="font-semibold text-muted-foreground">Followers</div>
              </div>

              <div className="divide-y divide-border/40">
                {developers.map((dev, i) => (
                  <motion.div
                    key={dev.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="grid grid-cols-5 gap-4 p-6 hover:bg-primary/5 transition-smooth cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">#{dev.rank}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{dev.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${dev.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-primary">{dev.score}</span>
                    </div>
                    <div className="text-foreground">{dev.repos}</div>
                    <div className="text-foreground">{dev.followers.toLocaleString()}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { title: 'Most Active', value: 'torvalds', subtitle: '45k commits this year' },
                { title: 'Trending Up', value: '+42%', subtitle: 'Growth vs last year' },
                { title: 'Total Impact', value: '2.5M+', subtitle: 'Developer impact score' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glassmorphic p-6 rounded-lg neon-glow text-center"
                >
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
