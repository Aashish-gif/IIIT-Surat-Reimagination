'use client'

import { Share2, Github, Twitter, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProfileSummaryCardProps {
  isLoading?: boolean
  data?: {
    avatar: string
    name: string
    login: string
    bio: string
    persona: string
    followers: number
    following: number
    publicRepos: number
  }
}

const developerPersonas = [
  'The Midnight Architect',
  'Code Alchemist',
  'System Orchestrator',
  'Innovation Catalyst',
  'Tech Pioneer',
]

export function ProfileSummaryCard({ isLoading, data }: ProfileSummaryCardProps) {
  const persona = data ? developerPersonas[Math.floor(data.followers / 100) % developerPersonas.length] : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glassmorphic col-span-2 row-span-1 p-6 neon-glow overflow-hidden"
    >
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-muted/40 to-muted/20 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gradient-to-r from-muted/40 to-muted/20 rounded animate-pulse w-32" />
              <div className="h-4 bg-gradient-to-r from-muted/40 to-muted/20 rounded animate-pulse w-24" />
            </div>
          </div>
          <div className="h-12 bg-gradient-to-r from-muted/40 to-muted/20 rounded animate-pulse" />
        </div>
      ) : data ? (
        <div>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={data.avatar}
                alt={data.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-primary/40 ring-2 ring-primary/20"
              />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{data.name}</h2>
                <p className="text-muted-foreground">@{data.login}</p>
              </div>
            </div>
            <button className="p-2 rounded-lg border border-border/40 hover:border-primary/60 hover:bg-primary/10 transition-smooth">
              <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Bio</p>
            <p className="text-foreground text-sm leading-relaxed">{data.bio || 'No bio available'}</p>
          </div>

          <div className="mb-6 inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
            <p className="text-xs font-semibold text-primary text-glow">{persona}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-border/40">
            <div>
              <p className="text-sm text-muted-foreground">Followers</p>
              <p className="text-2xl font-bold text-primary">{data.followers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Following</p>
              <p className="text-2xl font-bold text-secondary">{data.following.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Repos</p>
              <p className="text-2xl font-bold text-foreground">{data.publicRepos.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-border/40 hover:border-foreground/40 transition-smooth">
              <Github className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg border border-border/40 hover:border-foreground/40 transition-smooth">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg border border-border/40 hover:border-foreground/40 transition-smooth">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}
