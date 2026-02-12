# GitPulse Development Guide

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx              # Root layout with dark theme
│   ├── page.tsx                # Main dashboard
│   ├── repository/
│   │   └── page.tsx            # Repository deep-dive page
│   ├── rankings/
│   │   └── page.tsx            # Global rankings page
│   ├── settings/
│   │   └── page.tsx            # Settings page
│   └── globals.css             # Global styles & dark theme tokens
├── components/
│   ├── sidebar-nav.tsx         # Navigation sidebar
│   ├── hero-header.tsx         # Search header
│   ├── profile-summary-card.tsx # User profile card
│   ├── impact-score-card.tsx   # Developer impact score
│   ├── language-dna-card.tsx   # Skills radar chart
│   ├── contribution-skyline-card.tsx # Activity heatmap
│   ├── commit-activity-card.tsx # Commit trends
│   ├── top-repositories-card.tsx # Repository showcase
│   ├── skeleton-loader.tsx     # Loading state
│   ├── animated-card-wrapper.tsx # Animation wrapper
│   └── feature-guide.tsx       # Feature description
├── lib/
│   └── mock-data.ts            # Mock data generation
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Component Architecture

### Card Components
Each dashboard card is a self-contained component with:
- Loading state (skeleton animation)
- Data display with Framer Motion animations
- Responsive design
- Glassmorphic styling with neon glow effects

### Data Flow
1. User enters GitHub username in search
2. `handleSearch()` triggers data generation
3. Mock data is created using `lib/mock-data.ts`
4. State updates cause all cards to re-render with animations
5. Each card animates in with staggered timing

## Styling System

### Design Tokens (CSS Variables)
All colors use Tailwind design tokens:
- `--background`: Deep charcoal
- `--primary`: Emerald green
- `--secondary`: Cyber cyan
- `--muted`: Dark grays for secondary elements
- `--border`: Subtle borders
- `--radius`: Border radius

### Utility Classes
- `.glassmorphic`: Frosted glass effect with blur
- `.neon-glow`: Shadow glow effect
- `.neon-glow-active`: Bright glow for active states
- `.text-glow`: Glowing text effect
- `.transition-smooth`: 500ms ease-out transitions

### Animations
Custom Tailwind animations for:
- `fade-in-up`: Cards entering from bottom
- `slide-in-left`: Sidebar items
- `glow-pulse`: Pulsing glow effect
- Framer Motion variants for staggered animations

## Adding New Features

### 1. Create a New Card Component

```tsx
// components/my-card.tsx
'use client'

import { motion } from 'framer-motion'

export function MyCard({ isLoading, data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="glassmorphic col-span-2 row-span-1 p-6 neon-glow"
    >
      {/* Content */}
    </motion.div>
  )
}
```

### 2. Update the Dashboard Grid

Add the card to `app/page.tsx` Bento grid:

```tsx
{/* New Card */}
<div className="md:col-span-2 lg:col-span-2">
  <MyCard isLoading={isLoading} data={myData} />
</div>
```

### 3. Generate Mock Data

Add to `lib/mock-data.ts`:

```ts
export const generateMyData = () => {
  return { /* data structure */ }
}
```

### 4. Add State Management

In `app/page.tsx`:

```tsx
const [myData, setMyData] = useState<any>(null)

// In handleSearch:
setMyData(generateMyData())
```

## GitHub API Integration

To replace mock data with real GitHub API:

1. **Get GitHub Personal Access Token**
   ```bash
   # Add to .env.local
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
   ```

2. **Create API Route** (`app/api/github/route.ts`):
   ```ts
   export async function GET(req: Request) {
     const username = req.nextUrl.searchParams.get('username')
     // Fetch from GitHub GraphQL API
     // Return user data
   }
   ```

3. **Update Data Fetching** in `app/page.tsx`:
   ```ts
   const handleSearch = async (username: string) => {
     const response = await fetch(`/api/github?username=${username}`)
     const data = await response.json()
     setUserData(data)
   }
   ```

## Performance Tips

1. **Memoize Components**: Use `React.memo()` for card components
2. **Lazy Load Charts**: Recharts renders on demand
3. **Optimize Images**: Use Next.js Image component
4. **Reduce Bundle**: Tree-shake unused Recharts components
5. **Cache Data**: Store API responses with SWR or React Query

## Debugging

### Console Logging
```tsx
console.log('[v0] Component rendered with props:', props)
console.log('[v0] Data updated:', newData)
console.log('[v0] Error occurred:', error)
```

### Browser DevTools
- Check React DevTools for component hierarchy
- Use Recharts DevTools for chart debugging
- Inspect CSS Grid in DevTools

## Deployment

### Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Environment variables: GITHUB_TOKEN
```

### Build Optimization
```bash
# Check bundle size
npm run build

# Analyze production build
npm run analyze
```

## Common Issues

### Chart Not Showing
- Check Recharts import paths
- Verify data structure matches chart expectations
- Check ResponsiveContainer sizing

### Animation Not Smooth
- Ensure Framer Motion is properly installed
- Check GPU acceleration in CSS
- Reduce animation duration for faster devices

### Dark Theme Not Applied
- Verify `dark` class on `<html>` element
- Check CSS variable values in globals.css
- Clear browser cache

## Testing

Add tests for:
- Component rendering with data
- Loading state display
- Animation triggering
- Search functionality
- Responsive breakpoints

## Resources

- [Next.js Documentation](https://nextjs.org)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Recharts API](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub API](https://docs.github.com/graphql)
