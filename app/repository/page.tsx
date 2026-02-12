'use client'

import { SidebarNav } from '@/components/sidebar-nav'
import { motion } from 'framer-motion'

export default function RepositoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      
      <main className="ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glassmorphic p-8 rounded-lg neon-glow"
          >
            <h1 className="text-4xl font-bold text-glow mb-2">Repository Deep-Dive</h1>
            <p className="text-muted-foreground mb-6">
              Analyze individual repository metrics, contributors, and activity patterns.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="glassmorphic p-6 rounded-lg border border-border/40 hover:border-primary/60 transition-smooth cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Repository {i}</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">repo-name-{i}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Deep analytics coming soon</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
