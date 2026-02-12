'use client'

import { useState, useEffect } from 'react'
import { SidebarNav } from '@/components/sidebar-nav'
import { HeroHeader } from '@/components/hero-header'
import { ProfileSummaryCard } from '@/components/profile-summary-card'
import { ImpactScoreCard } from '@/components/impact-score-card'
import { LanguageDNACard } from '@/components/language-dna-card'
import { ContributionSkylineCard } from '@/components/contribution-skyline-card'
import { CommitActivityCard } from '@/components/commit-activity-card'
import { TopRepositoriesCard } from '@/components/top-repositories-card'
import {
  generateMockUserData,
  generateImpactTrend,
  generateLanguageDNA,
  generateContributionData,
  generateCommitData,
  generateRepositories,
} from '@/lib/mock-data'

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [impactData, setImpactData] = useState<any>(null)
  const [languageData, setLanguageData] = useState<any>(null)
  const [commitData, setCommitData] = useState<any>(null)
  const [repoData, setRepoData] = useState<any>(null)

  // Initialize with default user
  useEffect(() => {
    handleSearch('torvalds')
  }, [])

  const handleSearch = (username: string) => {
    if (!username.trim()) return

    setIsLoading(true)
    setSearchQuery(username)

    // Simulate API delay
    const timeout = setTimeout(() => {
      const user = generateMockUserData(username)
      setUserData(user)
      setImpactData({
        score: user.score,
        trend: generateImpactTrend(),
        change: user.change,
      })
      setLanguageData(generateLanguageDNA())
      setCommitData(generateCommitData())
      setRepoData(generateRepositories())
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timeout)
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <HeroHeader onSearch={handleSearch} isLoading={isLoading} />

      <main className="ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid Layout - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {/* Card A: Profile Summary (2x1 on desktop, 1x1 on mobile) */}
            <div className="md:col-span-2 lg:col-span-2">
              <ProfileSummaryCard isLoading={isLoading} data={userData} />
            </div>

            {/* Card B: Impact Score (1x1) */}
            <ImpactScoreCard isLoading={isLoading} data={impactData} />

            {/* Card C: Language DNA (1x2 on desktop) */}
            <div className="md:row-span-2 lg:row-span-2">
              <LanguageDNACard isLoading={isLoading} data={languageData} />
            </div>

            {/* Card D: Contribution Skyline (2x2 on desktop) */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
              <ContributionSkylineCard isLoading={isLoading} />
            </div>

            {/* Card E: Commit Activity (2x1 on desktop) */}
            <div className="md:col-span-2 lg:col-span-2">
              <CommitActivityCard isLoading={isLoading} data={commitData} />
            </div>

            {/* Card F: Top Repositories (3x1 on desktop) */}
            <div className="md:col-span-2 lg:col-span-3">
              <TopRepositoriesCard isLoading={isLoading} data={repoData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
