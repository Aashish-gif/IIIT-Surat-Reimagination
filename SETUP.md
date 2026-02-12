# GitPulse Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd gitpulse
   
   # Or download and extract the ZIP
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## First Time Setup Checklist

- [ ] Dependencies installed
- [ ] Development server running
- [ ] Application loads at localhost:3000
- [ ] Search works (try "torvalds")
- [ ] All cards render with animations
- [ ] Sidebar navigation functions
- [ ] Mobile view is responsive

## Environment Setup

### For GitHub API Integration (Optional)

1. **Get GitHub Personal Access Token**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `public_repo`, `read:user`
   - Copy the token

2. **Create `.env.local` file**
   ```bash
   touch .env.local
   ```

3. **Add to `.env.local`**
   ```
   GITHUB_TOKEN=ghp_your_token_here
   ```

4. **Update API Routes** (when ready for real data)
   Create `app/api/github/route.ts` with GitHub GraphQL queries

## Project Configuration

### Tailwind CSS
- **Config**: `tailwind.config.ts`
- **Styles**: `app/globals.css`
- **Design Tokens**: CSS variables in `:root`

### Dark Theme
The application is configured for dark mode by default:
- HTML has `dark` class
- Color tokens use dark values
- Backgrounds use deep charcoal gradient

### Animations
- **Framework**: Framer Motion
- **Config**: Tailwind animation keyframes
- **Defaults**: 600ms duration, ease-out timing

## Build & Deployment

### Build for Production
```bash
pnpm build
# or
npm run build
```

### Start Production Server
```bash
pnpm start
# or
npm start
```

### Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Vercel auto-deploys on push
# Add environment variables in Vercel dashboard
```

## Troubleshooting

### Issue: Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev --port 3001
```

### Issue: Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Dark Theme Not Working
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check that `<html class="dark">` is in layout.tsx

### Issue: Charts Not Rendering
1. Verify Recharts is installed: `pnpm list recharts`
2. Check browser console for errors
3. Ensure data structure matches chart expectations

### Issue: Animations Jittery
1. Check GPU acceleration enabled
2. Reduce number of simultaneous animations
3. Increase animation duration for testing

## Development Workflow

### Making Changes
1. Edit component files in `components/`
2. Changes auto-refresh in browser (HMR)
3. Check browser console for errors
4. Test responsive design with DevTools

### Adding New Features
1. Create component in `components/`
2. Import in appropriate page
3. Add Framer Motion animations
4. Test on desktop and mobile
5. Update documentation

### Testing
```bash
# Run linter
pnpm lint

# Build check
pnpm build

# Start production build locally
pnpm start
```

## Performance Optimization

### Current Optimizations
✅ Image optimization with Next.js Image  
✅ Code splitting with lazy loading  
✅ CSS minification with Tailwind  
✅ JavaScript minification with SWC  
✅ Tree-shaking unused code  

### Further Optimizations
- [ ] Add React Query for data caching
- [ ] Implement service workers
- [ ] Code split route components
- [ ] Preload critical resources
- [ ] Use dynamic imports for heavy components

## Monitoring

### Performance Metrics
- Lighthouse scores (DevTools)
- Core Web Vitals (PageSpeed Insights)
- Bundle size analysis

### Error Tracking (Optional)
- Set up Sentry for production errors
- Add analytics to track user behavior
- Monitor API performance

## Security Checklist

- [ ] No sensitive data in client code
- [ ] API keys stored in environment variables
- [ ] HTTPS enforced in production
- [ ] CORS properly configured
- [ ] Input validation on all forms
- [ ] SQL injection prevention (if using database)

## Next Steps

1. **Explore Components**: Review each card component's implementation
2. **Customize Styling**: Adjust colors in globals.css
3. **Add Real Data**: Integrate GitHub API
4. **Deploy**: Push to Vercel or your hosting platform
5. **Monitor**: Set up analytics and error tracking

## Resources & Documentation

### Official Docs
- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Recharts](https://recharts.org)
- [GitHub API](https://docs.github.com/en/graphql)

### Useful Tools
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://www.npmjs.com/package/next-bundle-analyzer)

## Support

For issues or questions:
1. Check the DEVELOPMENT.md guide
2. Review component source code
3. Check browser console for errors
4. See Common Issues in DEVELOPMENT.md
5. Open an issue on GitHub (if applicable)

---

**Happy coding! 🚀**

For the best experience, use the latest version of Chrome, Firefox, Safari, or Edge.
