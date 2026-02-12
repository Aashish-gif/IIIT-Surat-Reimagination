'use client'

import { SidebarNav } from '@/components/sidebar-nav'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Shield, Database, Palette } from 'lucide-react'

export default function SettingsPage() {
  const settings = [
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of GitPulse',
      options: ['Dark Mode', 'Accent Color', 'Font Size'],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage notification preferences',
      options: ['Email Alerts', 'Browser Notifications', 'Weekly Digest'],
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Control your data and security settings',
      options: ['Data Sharing', 'API Access', 'Two-Factor Auth'],
    },
    {
      icon: Database,
      title: 'Data & Cache',
      description: 'Manage your data and cache settings',
      options: ['Clear Cache', 'Export Data', 'Data Retention'],
    },
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
            <div className="flex items-center gap-3 mb-2">
              <SettingsIcon className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-glow">Settings</h1>
            </div>
            <p className="text-muted-foreground mb-8">
              Configure GitPulse to match your preferences and workflow.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {settings.map((section, i) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glassmorphic p-6 rounded-lg neon-glow cursor-pointer hover:border-primary/60 transition-smooth border border-border/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{section.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {section.options.map((option) => (
                            <span
                              key={option}
                              className="px-2 py-1 rounded text-xs bg-muted/30 text-muted-foreground border border-border/40"
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 glassmorphic p-6 rounded-lg border border-border/40"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">About GitPulse</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="text-foreground font-semibold">Version:</span> 1.0.0
                </p>
                <p>
                  <span className="text-foreground font-semibold">Built with:</span> Next.js, React, Tailwind CSS, Framer Motion
                </p>
                <p>
                  <span className="text-foreground font-semibold">Last Updated:</span> February 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
