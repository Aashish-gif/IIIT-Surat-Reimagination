'use client'

import { Info } from 'lucide-react'
import { motion } from 'framer-motion'

export function FeatureGuide() {
  const features = [
    {
      title: 'Developer Persona',
      description: 'AI-generated developer archetype based on your contribution patterns and skills',
    },
    {
      title: 'Impact Score',
      description: 'Comprehensive metric combining contributions, followers, and project quality',
    },
    {
      title: 'Language DNA',
      description: 'Technical skill distribution across Frontend, Backend, DevOps, Mobile, and Docs',
    },
    {
      title: 'Contribution Heatmap',
      description: 'Year-long visualization of activity patterns with intensity-based coloring',
    },
    {
      title: 'Commit Analytics',
      description: 'Trend analysis showing peak activity periods and consistency patterns',
    },
    {
      title: 'Repository Health',
      description: 'Quality score combining stars, forks, documentation, and activity metrics',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 glassmorphic p-6 rounded-lg border border-border/40"
    >
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Dashboard Features</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
            className="p-3 rounded-lg bg-muted/20 border border-border/40"
          >
            <p className="font-medium text-sm text-foreground">{feature.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
