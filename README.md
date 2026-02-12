# GitPulse - Reimagined GitHub Developer Analytics Hub

An ultra-modern, dark-themed GitHub analytics dashboard built with Next.js, featuring a futuristic Bento Box grid layout and smooth animations.

## ✨ Features

### Core Features
- **Glassmorphic UI**: Translucent cards with backdrop blur effects and neon glowing borders
- **Bento Grid Layout**: Responsive card-based dashboard that adapts to all screen sizes
- **Framer Motion Animations**: Smooth stagger-fade animations on load and interactive transitions
- **Dark Theme**: Deep charcoal background (#050505) with emerald green and cyan accents
- **Real-time Status**: Live API connectivity indicator

### Dashboard Cards
1. **Profile Summary Card** - User avatar, bio, persona badge, and social stats
2. **Impact Score Card** - Circular gauge with mini sparkline showing Developer Impact Score
3. **Language DNA Card** - Radar chart mapping technical skills across 5 dimensions
4. **Contribution Skyline Card** - Enhanced heatmap with 3D-effect glowing on high-activity days
5. **Commit Activity Card** - Area chart showing commit frequency over 12 months
6. **Top Repositories Card** - 3-column grid of top repositories with language badges and health scores

### Navigation
- **Sidebar Navigation**: Slim glassmorphic sidebar with active state indicators
- **Dashboard**: Main analytics view
- **Repository Deep-Dive**: Detailed repository analysis (coming soon)
- **Global Rankings**: Developer leaderboard and statistics
- **Settings**: Preferences and configuration

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

```bash
# Clone or set up the project
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Visit `http://localhost:3000` to see GitPulse in action.

## 🎨 Design System

### Color Palette
- **Background**: Deep charcoal (#050505)
- **Primary**: Emerald green (#10b981)
- **Secondary**: Cyber cyan (#00d9ff)
- **Text**: Off-white (#f8f8fa)
- **Muted**: Dark grays (#1a1a2e)

### Effects
- **Glassmorphism**: 40% opacity cards with `backdrop-blur-md`
- **Neon Glow**: Shadow effects using primary color
- **Transitions**: 500ms ease-out for smooth interactions
- **Animations**: Stagger-fade entrance, glow pulse on load

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop (1024px+)**: Full Bento grid with all card sizes
- **Tablet (768px-1023px)**: Adapted grid layout
- **Mobile (< 768px)**: Stacked single-column layout with compact sidebar

## 🎯 Usage

### Search for a Developer

1. Enter a GitHub username in the search bar at the top
2. Click "Search" or press Enter
3. The dashboard will load with mock data for that user
4. All cards will animate in with staggered delays

### Explore Analytics

- Hover over cards to see interactive tooltips
- Click on contribution heatmap cells for daily breakdowns
- View repository health scores and language distributions
- Check the impact score trend over the last month

## 🔄 Mock Data

Currently, GitPulse uses generated mock data. To integrate with real GitHub API:

1. Replace `mock-data.ts` with API calls to GitHub GraphQL API
2. Add GitHub authentication tokens to environment variables
3. Update data loading in `page.tsx` with actual API calls

## 🚀 Performance Optimizations

- Skeleton loaders for all cards during data fetch
- Lazy-loaded Recharts components
- Optimized animations using Framer Motion
- CSS Grid for efficient layout rendering
- Image optimization with Next.js Image component

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Future Features

- Real GitHub API integration
- User authentication with OAuth
- Custom dashboard layouts
- Export analytics reports
- Advanced filtering and time-range selection
- Dark/Light theme toggle
- Collaboration metrics
- Repository comparison tools

---

Built with ❤️ using Next.js and modern web technologies.
