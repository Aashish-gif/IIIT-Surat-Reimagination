'use client'

import { Search, Wifi } from 'lucide-react'
import { useState } from 'react'

interface HeroHeaderProps {
  onSearch: (username: string) => void
  isLoading?: boolean
}

export function HeroHeader({ onSearch, isLoading }: HeroHeaderProps) {
  const [search, setSearch] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      onSearch(search)
    }
  }

  return (
    <div className="ml-16 py-8 px-8 border-b border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1 text-glow">
              GitPulse
            </h1>
            <p className="text-muted-foreground text-sm">
              Reimagined GitHub Developer Analytics
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-border/60">
            <Wifi className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">
              {isLoading ? 'Connecting...' : 'Live'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative group">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search GitHub username (e.g., torvalds)"
              className="w-full px-4 py-3 pl-12 rounded-lg bg-input/60 border border-border/60 text-foreground placeholder-muted-foreground transition-smooth focus:outline-none focus:border-primary/60 focus:bg-input/80 focus:shadow-lg focus:shadow-primary/20"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-smooth" />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 hover:border-primary/60 transition-smooth disabled:opacity-50 text-sm font-medium"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </div>
  )
}
