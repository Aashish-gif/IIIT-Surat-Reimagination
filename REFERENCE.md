# GitPulse Quick Reference

## File Locations

| Component | Location | Purpose |
|-----------|----------|---------|
| Main Page | `app/page.tsx` | Dashboard layout & state management |
| Sidebar | `components/sidebar-nav.tsx` | Navigation |
| Search Header | `components/hero-header.tsx` | User input & API status |
| Profile Card | `components/profile-summary-card.tsx` | User info & stats |
| Impact Score | `components/impact-score-card.tsx` | Circular gauge chart |
| Language DNA | `components/language-dna-card.tsx` | Radar chart |
| Contribution | `components/contribution-skyline-card.tsx` | Heatmap visualization |
| Commits | `components/commit-activity-card.tsx` | Area chart |
| Repositories | `components/top-repositories-card.tsx` | Repository grid |
| Mock Data | `lib/mock-data.ts` | Data generation functions |
| Styles | `app/globals.css` | Design tokens & utilities |
| Config | `tailwind.config.ts` | Tailwind settings |

## Key Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Run production build
pnpm lint             # Run linter

# Git
git add .
git commit -m "message"
git push origin main

# Dependencies
pnpm add <package>    # Add dependency
pnpm remove <package> # Remove dependency
pnpm install          # Install all
```

## CSS Classes

### Layout
```tsx
// Flexbox
className="flex items-center justify-between gap-4"

// Grid (3-column bento)
className="grid grid-cols-3 gap-6 auto-rows-max"

// Responsive
className="md:col-span-2 lg:col-span-3"
```

### Styling
```tsx
// Background & text
className="bg-background text-foreground"

// Cards
className="glassmorphic border border-border/40 rounded-lg"

// Glow effects
className="neon-glow hover:neon-glow-active"

// Transitions
className="transition-smooth hover:border-primary/60"
```

### Colors
```
Primary:    --primary (Emerald #10b981)
Secondary:  --secondary (Cyan)
Muted:      --muted (Dark gray)
Background: --background (Charcoal #050505)
Foreground: --foreground (Off-white)
```

## Component Patterns

### Card Component Template
```tsx
'use client'
import { motion } from 'framer-motion'

export function MyCard({ isLoading, data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.X }}
      className="glassmorphic col-span-2 row-span-1 p-6 neon-glow"
    >
      {isLoading ? (
        <div className="h-40 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg animate-pulse" />
      ) : (
        // Content
      )}
    </motion.div>
  )
}
```

### Animation Delays
- Profile Summary: 0.1s
- Impact Score: 0.2s
- Language DNA: 0.3s
- Contribution: 0.4s
- Commit Activity: 0.5s
- Top Repositories: 0.6s

## Data Types

### User Data
```ts
interface UserData {
  avatar: string
  name: string
  login: string
  bio: string
  followers: number
  following: number
  publicRepos: number
  score: number
  change: number
}
```

### Repository
```ts
interface Repository {
  name: string
  language: string
  stars: number
  forks: number
  health: number
  description: string
}
```

### Chart Data
```ts
// Impact trend (30 points)
Array<{ value: number }>

// Language DNA (5 skills)
Array<{ skill: string; level: number }>

// Commit activity (12 months)
Array<{ month: string; commits: number; peak?: boolean }>

// Contributions (52 weeks × 7 days)
Array<Array<number>>
```

## Recharts Examples

### Line Chart
```tsx
<ResponsiveContainer width="100%" height={200}>
  <LineChart data={data}>
    <Line type="monotone" dataKey="value" stroke="rgb(16, 185, 129)" />
  </LineChart>
</ResponsiveContainer>
```

### Radar Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <RadarChart data={data}>
    <PolarGrid stroke="rgba(240, 240, 245, 0.1)" />
    <PolarAngleAxis dataKey="skill" />
    <Radar dataKey="level" stroke="rgb(16, 185, 129)" />
  </RadarChart>
</ResponsiveContainer>
```

### Area Chart
```tsx
<ResponsiveContainer width="100%" height={200}>
  <AreaChart data={data}>
    <Area type="monotone" dataKey="commits" fill="url(#colorCommits)" />
  </AreaChart>
</ResponsiveContainer>
```

## Framer Motion Variants

### Entrance Animation
```ts
{
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, delay: 0.X, ease: 'easeOut' }
}
```

### Hover Effect
```ts
{
  whileHover: { scale: 1.05, y: -4 },
  transition: { duration: 0.2 }
}
```

### Stagger Container
```tsx
<motion.div
  variants={{
    container: { staggerChildren: 0.1 }
  }}
>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariant}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Common Tasks

### Change Primary Color
Edit `app/globals.css`:
```css
:root {
  --primary: 160 84% 39%;  /* Change this */
}
```

### Add a New Navigation Item
Edit `components/sidebar-nav.tsx`:
```ts
const navItems = [
  // Add new item here
  { icon: MyIcon, label: 'New Page', href: '/new-page' },
]
```

### Update Card Delay
Edit `components/my-card.tsx`:
```ts
transition={{ duration: 0.6, delay: 0.X }}  // Change X
```

### Adjust Grid Columns
Edit `app/page.tsx`:
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Change Animation Speed
Edit `tailwind.config.ts`:
```ts
animation: {
  'fade-in-up': 'fade-in-up 0.6s ease-out',  // Change duration
}
```

## Debugging Tips

### Check Component Rendering
```tsx
console.log('[v0] Rendering:', { isLoading, data })
```

### Verify Data Structure
```tsx
console.log('[v0] Data:', JSON.stringify(data, null, 2))
```

### Animation Issues
- Open DevTools → Performance tab
- Record animation → Check frame rate
- Look for dropped frames or jank

### Styling Issues
- Check DevTools → Computed Styles
- Verify CSS variable values
- Check specificity conflicts

## Browser Compatibility

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Mobile browsers (iOS 13+, Android 8+)  

## Performance Targets

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB (gzipped)

## Useful Extensions

- React Developer Tools
- Redux DevTools (if using state management)
- Tailwind CSS IntelliSense (VS Code)
- ES7+ React/Redux Snippets (VS Code)

## Links

- [Project README](./README.md)
- [Setup Guide](./SETUP.md)
- [Development Guide](./DEVELOPMENT.md)
- [GitHub Repo](https://github.com/yourusername/gitpulse)
- [Vercel Deployment](https://gitpulse.vercel.app)

## Quick Tips

💡 **Use TypeScript**: Catches errors before runtime  
💡 **Memoize Functions**: Prevent unnecessary re-renders  
💡 **Lazy Load**: Import components only when needed  
💡 **Test Mobile**: Use DevTools device toolbar  
💡 **Check Lighthouse**: Regular performance audits  

---

**Last Updated**: February 2026
