# GitPulse Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          GitPulse Dashboard                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌─────────────────────────────────────┐   │
│  │  SidebarNav      │  │      HeroHeader (Search)            │   │
│  ├──────────────────┤  ├─────────────────────────────────────┤   │
│  │ • Dashboard      │  │ GitHub Username Search              │   │
│  │ • Repository     │  │ Live Status Indicator               │   │
│  │ • Rankings       │  │ "Search" Button                     │   │
│  │ • Settings       │  │                                     │   │
│  └──────────────────┘  └─────────────────────────────────────┘   │
│                                                                      │
│  ┌────────────────────────────────── Bento Grid Layout ───────────┐  │
│  │                                                                │  │
│  │  ┌─────────────────────────┐  ┌──────────────┐              │  │
│  │  │  Profile Summary (2x1)  │  │Impact Score  │              │  │
│  │  │                         │  │  (1x1)       │              │  │
│  │  │ • Avatar                │  │              │  ┌─────────┐ │  │
│  │  │ • Name & Bio            │  │ Circular     │  │Language │ │  │
│  │  │ • Persona Badge         │  │ Gauge        │  │  DNA    │ │  │
│  │  │ • Stats Grid            │  │              │  │ (1x2)   │ │  │
│  │  │ • Social Links          │  │ • Sparkline  │  │         │ │  │
│  │  └─────────────────────────┘  └──────────────┘  │ Radar   │ │  │
│  │                                                  │ Chart   │ │  │
│  │  ┌────────────────────────────────────────────┐ │         │ │  │
│  │  │   Contribution Skyline (2x2)               │ │         │ │  │
│  │  │                                            │ └─────────┘ │  │
│  │  │ • Activity Heatmap (52 weeks)             │              │  │
│  │  │ • Gradient emerald colors                 │              │  │
│  │  │ • Glow on high activity                   │              │  │
│  │  │ • Hover interactions                      │              │  │
│  │  └────────────────────────────────────────────┘              │  │
│  │                                                                │  │
│  │  ┌───────────────────────────┐  ┌───────────────────────────┐ │  │
│  │  │ Commit Activity (2x1)      │  │                           │ │  │
│  │  │                            │  │                           │ │  │
│  │  │ • Area Chart (12 months)   │  │                           │ │  │
│  │  │ • Peak activity marker     │  │                           │ │  │
│  │  │ • Smooth gradients         │  │                           │ │  │
│  │  └───────────────────────────┘  │                           │ │  │
│  │                                  │ Top Repos (3x1)           │ │  │
│  │                                  │                           │ │  │
│  │  ┌────────────────────────────────────────────────────────┐ │  │
│  │  │             Repository Cards (3 columns)              │ │  │
│  │  │ ┌──────────┐ ┌──────────┐ ┌──────────┐              │ │  │
│  │  │ │Repo Name │ │Repo Name │ │Repo Name │              │ │  │
│  │  │ │Language  │ │Language  │ │Language  │              │ │  │
│  │  │ │Stars     │ │Stars     │ │Stars     │              │ │  │
│  │  │ │Health %  │ │Health %  │ │Health %  │              │ │  │
│  │  │ └──────────┘ └──────────┘ └──────────┘              │ │  │
│  │  └────────────────────────────────────────────────────────┘ │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout (dark mode)
├── SidebarNav
│   └── NavItem × 4
└── main
    ├── HeroHeader
    │   ├── Title
    │   ├── SearchBar
    │   └── StatusIndicator
    └── Grid Container (Bento)
        ├── ProfileSummaryCard
        │   ├── Avatar
        │   ├── UserInfo
        │   ├── PersonaBadge
        │   ├── StatsGrid
        │   └── SocialLinks
        ├── ImpactScoreCard
        │   ├── CircularGauge
        │   └── Sparkline
        ├── LanguageDNACard
        │   └── RadarChart
        ├── ContributionSkylineCard
        │   └── Heatmap (52×7 grid)
        ├── CommitActivityCard
        │   └── AreaChart
        └── TopRepositoriesCard
            └── RepositoryCard × 3
                ├── NameBadge
                ├── LanguageTag
                ├── StarsAndForks
                └── HealthScoreBar
```

## Data Flow Architecture

```
┌──────────────────┐
│  User Input      │
│ (GitHub Username)│
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│   handleSearch(username)     │
│   (app/page.tsx)             │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Mock Data Generation       │
│   (lib/mock-data.ts)         │
│   • generateMockUserData()   │
│   • generateImpactTrend()    │
│   • generateLanguageDNA()    │
│   • generateCommitData()     │
│   • generateRepositories()   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   State Updates              │
│   • userData                 │
│   • impactData               │
│   • languageData             │
│   • commitData               │
│   • repoData                 │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   Component Re-render        │
│   with Animations            │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│   User Views Dashboard       │
└──────────────────────────────┘
```

## Animation Pipeline

```
Card Mount
    ↓
initial { opacity: 0, y: 20 }
    ↓
transition delay: 0.1s → 0.6s (staggered)
    ↓
animate { opacity: 1, y: 0 }
    ↓
whileHover { scale, y-offset }
    ↓
Chart Animation (800ms)
    ↓
Final State
```

## State Management Pattern

```
page.tsx (Client Component)
├── State Variables
│   ├── searchQuery
│   ├── isLoading
│   ├── userData
│   ├── impactData
│   ├── languageData
│   ├── commitData
│   └── repoData
├── Event Handlers
│   └── handleSearch(username)
└── Effect Hooks
    └── useEffect(() => { 
        handleSearch('torvalds') 
      }, [])
```

## Responsive Grid Layout

```
Mobile (< 640px)
┌─────┐
│  1  │
├─────┤
│  2  │
├─────┤
│  3  │
├─────┤
│  4  │
├─────┤
│  5  │
├─────┤
│  6  │
└─────┘

Tablet (640px - 1024px)
┌──────────┬──────────┐
│    1     │    2     │
├──────────┼──────────┤
│    3     │          │
│          │    4     │
├──────────┤          │
│    5     │          │
├──────────┼──────────┤
│         6          │
└──────────┴──────────┘

Desktop (1024px+)
┌────────────────┬──────────┐
│       1        │    2     │
├────────────────┼──────────┤
│       4        │    3     │
│                │          │
├────────────────┤          │
│       5        │          │
├────────────────┴──────────┤
│            6              │
└───────────────────────────┘
```

## Styling Architecture

```
tailwind.config.ts
├── colors
│   ├── background
│   ├── foreground
│   ├── primary
│   ├── secondary
│   ├── muted
│   ├── border
│   └── ring
├── keyframes
│   ├── fade-in-up
│   ├── slide-in-left
│   └── glow-pulse
└── animation
    ├── fade-in-up 600ms
    ├── slide-in-left 500ms
    └── glow-pulse 3000ms infinite

globals.css
├── CSS Variables (HSL format)
├── Utility Classes
│   ├── .glassmorphic
│   ├── .neon-glow
│   ├── .transition-smooth
│   └── .text-glow
└── Media Queries
    ├── md (768px)
    └── sm (640px)
```

## Component Communication

```
                    ┌─────────────┐
                    │ page.tsx    │
                    │ (Provider)  │
                    └────────┬────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
    ┌──────▼──────┐   ┌──────▼──────┐   ┌─────▼──────┐
    │  Card 1     │   │  Card 2     │   │  Card N    │
    │             │   │             │   │            │
    │ Props:      │   │ Props:      │   │ Props:     │
    │ • isLoading │   │ • isLoading │   │ • isLoading│
    │ • data      │   │ • data      │   │ • data     │
    └─────────────┘   └─────────────┘   └────────────┘

Props Flow: One Direction (Top → Down)
Event Flow: Callback (Up) via onSearch handler
```

## File Dependencies

```
app/page.tsx (Entry Point)
├── components/sidebar-nav.tsx
│   └── lucide-react (icons)
├── components/hero-header.tsx
│   └── lucide-react
├── components/profile-summary-card.tsx
│   ├── lucide-react
│   ├── next/image
│   └── framer-motion
├── components/impact-score-card.tsx
│   ├── framer-motion
│   └── recharts
├── components/language-dna-card.tsx
│   ├── framer-motion
│   └── recharts
├── components/contribution-skyline-card.tsx
│   └── framer-motion
├── components/commit-activity-card.tsx
│   ├── framer-motion
│   └── recharts
├── components/top-repositories-card.tsx
│   ├── framer-motion
│   └── lucide-react
└── lib/mock-data.ts
    └── (No external dependencies)

app/layout.tsx
├── next/font/google
├── globals.css
└── (Dark mode setup)

globals.css
└── CSS Variables & Utilities
```

## Performance Optimization Layers

```
Level 1: Code Splitting
- Next.js App Router (automatic per-route)
- Dynamic imports for heavy components

Level 2: Component Optimization
- React.memo() for cards
- useCallback for event handlers
- useMemo for computed data

Level 3: Build Optimization
- SWC minification
- Tree-shaking
- CSS purging

Level 4: Delivery Optimization
- Image optimization (WebP, AVIF)
- Gzip compression
- CDN caching

Level 5: Runtime Optimization
- Lazy loading charts
- Intersection Observer for elements
- Virtual scrolling (future)
```

## Error Handling Flow

```
handleSearch(username)
├── Validation
│   └── if (!username.trim()) return
├── Loading State
│   └── setIsLoading(true)
├── Data Generation
│   └── try/catch (future: API call)
├── State Update
│   └── Success → Display data
├── Reset Loading
│   └── setIsLoading(false)
└── Error Handling (future)
    ├── Catch API errors
    ├── Show error toast
    └── Reset UI state
```

## Deployment Architecture

```
Local Development
│
├─ pnpm dev
├─ Hot Module Replacement (HMR)
└─ localhost:3000

Production Build
│
├─ pnpm build
├─ Next.js Compilation
├─ TypeScript Type Checking
├─ Code Minification
└─ Output to .next/

Deployment Target
│
├─ Vercel (Recommended)
│   ├─ Auto-deployments
│   ├─ Environment Variables
│   └─ CDN Distribution
├─ Self-Hosted
│   ├─ Node.js Server
│   ├─ PM2 Process Manager
│   └─ Nginx Reverse Proxy
└─ Docker
    ├─ Container Image
    ├─ Health Checks
    └─ Orchestration
```

## Browser Rendering Pipeline

```
HTML Parse
├─ Layout (Recalculate box model)
├─ Paint (Rasterize pixels)
├─ Composite (Stack layers)
└─ Optimize
   ├─ GPU Acceleration
   ├─ Hardware Rendering
   └─ Frame Blitting

Framer Motion Optimization
├─ RequestAnimationFrame
├─ Transform & Opacity (GPU)
└─ No Layout Thrashing
```

## Security Architecture

```
Client-Side
├─ Input validation (search)
├─ XSS prevention
└─ Content Security Policy

API Integration (Future)
├─ HTTPS only
├─ Token in environment variables
├─ Rate limiting
└─ Request validation

Data Handling
├─ No sensitive data client-side
├─ Secure headers
└─ CORS configuration
```

---

**Last Updated**: February 2026  
**Architecture Version**: 1.0
