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
import { CodingPersonaCard } from '@/components/coding-persona-card'
import { motion, AnimatePresence } from 'framer-motion'
import {
  generateMockUserData,
  generateImpactTrend,
  generateLanguageDNA,
  generateContributionData,
  generateCommitData,
  generateRepositories,
} from '@/lib/mock-data'

function DataStreamingLoader() {
  const [text, setText] = useState('')
  const phrases = [
    'Initializing quantum handshake...',
    'Decrypting commit history...',
    'Analyzing language DNA...',
    'Mapping contribution skyline...',
    'Synchronizing repo momentum...',
    'Finalizing developer persona...',
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let charIndex = 0
    const phrase = phrases[index]
    const interval = setInterval(() => {
      setText(phrase.substring(0, charIndex + 1))
      charIndex++
      if (charIndex === phrase.length) {
        clearInterval(interval)
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % phrases.length)
        }, 1000)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [index])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl">
      <div className="w-full max-w-md p-8 rounded-2xl border border-primary/20 bg-card/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="font-mono text-sm space-y-2">
          <p className="text-primary">&gt; {text}<span className="animate-pulse">_</span></p>
          <p className="text-muted-foreground/40 italic">Accessing GitHub API cluster-7...</p>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [impactData, setImpactData] = useState<any>(null)
  const [languageData, setLanguageData] = useState<any>(null)
  const [commitData, setCommitData] = useState<any>(null)
  const [repoData, setRepoData] = useState<any>(null)
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null)

  // Initialize with default user
  useEffect(() => {
    handleSearch('torvalds')
  }, [])

  const handleSearch = (username: string) => {
    if (!username.trim()) return

    setIsLoading(true)
    setSearchQuery(username)

    // Simulate API delay with cinematic loader
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
    }, 3500) // Slightly longer to show off the loader

    return () => clearTimeout(timeout)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background relative z-10">
      <AnimatePresence>
        {isLoading && <DataStreamingLoader />}
      </AnimatePresence>
      <SidebarNav />
      <HeroHeader onSearch={handleSearch} isLoading={isLoading} />

      <main className="ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid Layout - Responsive */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={searchQuery} // Re-animate when user changes
          >
            {/* Card A: Profile Summary (2x1 on desktop, 1x1 on mobile) */}
            <motion.div className="md:col-span-2 lg:col-span-2" variants={itemVariants}>
              <ProfileSummaryCard isLoading={isLoading} data={userData} />
            </motion.div>

            {/* Card B: Coding Persona (1x1) */}
            <motion.div variants={itemVariants}>
              <CodingPersonaCard isLoading={isLoading} persona={userData?.persona} />
            </motion.div>

            {/* Card C: Impact Score (1x1) */}
            <motion.div variants={itemVariants}>
              <ImpactScoreCard isLoading={isLoading} data={impactData} />
            </motion.div>

            {/* Card C: Language DNA (1x2 on desktop) */}
            <motion.div className="md:row-span-2 lg:row-span-2" variants={itemVariants}>
              <LanguageDNACard
                isLoading={isLoading}
                data={languageData}
                onSkillClick={(skill) => setHighlightedSkill(skill || null)}
                activeSkill={highlightedSkill}
              />
            </motion.div>

            {/* Card D: Contribution Skyline (2x2 on desktop) */}
            <motion.div className="md:col-span-2 lg:col-span-2 lg:row-span-2" variants={itemVariants}>
              <ContributionSkylineCard isLoading={isLoading} />
            </motion.div>

            {/* Card E: Commit Activity (2x1 on desktop) */}
            <motion.div className="md:col-span-2 lg:col-span-2" variants={itemVariants}>
              <CommitActivityCard isLoading={isLoading} data={commitData} />
            </motion.div>

            {/* Card F: Top Repositories (3x1 on desktop) */}
            <motion.div className="md:col-span-2 lg:col-span-3" variants={itemVariants}>
              <TopRepositoriesCard
                isLoading={isLoading}
                data={repoData}
                highlightedSkill={highlightedSkill}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
