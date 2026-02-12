'use client'

import { LayoutDashboard, GitBranch, TrendingUp, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: GitBranch, label: 'Repository Deep-Dive', href: '/repository' },
  { icon: TrendingUp, label: 'Global Rankings', href: '/rankings' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 glassmorphic border-r flex flex-col items-center justify-start pt-8 gap-8 z-50">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg neon-glow">
        G
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${
                isActive
                  ? 'bg-primary/20 text-primary neon-glow-active border border-primary/60'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
