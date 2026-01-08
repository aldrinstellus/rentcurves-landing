# CLAUDE.md - Rent Curves Landing Page

## Project Overview
Interactive agricultural rent calculation landing page with casino-style engagement and 3D animations. Features a rotating crop wheel selector with morphing organic shapes.

## Repository
- **GitHub**: https://github.com/aldrinstellus/rentcurves-landing
- **Production**: https://rentcurves-landing.vercel.app

## Quick Commands
```bash
# Serve locally
cd src && python3 -m http.server 8080
# Visit: http://localhost:8080/index.html

# Deploy to Vercel
vercel --prod --yes

# Commit and deploy
git add -A && git commit -m "message" && git push origin main && vercel --prod --yes
```

## Live URLs
- **Production**: https://rentcurves-landing.vercel.app
- **Local Dev**: http://localhost:8080/index.html
- **3D Version**: http://localhost:8080/index-3d.html

## Key Files
| File | Purpose |
|------|---------|
| `src/index.html` | Main landing page (casino-style) |
| `src/index-3d.html` | Alternative 3D animated version |
| `src/nextgen.js` | GSAP + Lenis animation system |
| `vercel.json` | Vercel deployment config |

## Tech Stack
- **GSAP** - Animation platform (ScrollTrigger, etc.)
- **Three.js** - 3D WebGL particle backgrounds
- **Anime.js** - Number counting, micro-interactions
- **Lenis** - Smooth scrolling
- Pure CSS with custom properties (no build step)

## Architecture Notes

### Crop Wheel System
- 6 crops: Corn, Soybeans, Wheat, Canola, Cotton, Rice
- Each crop has unique theme colors and morphing shape
- Auto-rotates with spotlight effect on top item
- Located in `src/index.html` around line 3248 (`cropsData` array)

### Shape Morphing
Each crop has a unique CSS keyframe animation for organic border-radius morphing:
- `.crop-item.crop-corn .crop-item-inner` -> `corn-morph`
- `.crop-item.crop-soybeans .crop-item-inner` -> `bean-morph`
- etc.

**Important**: The `.crop-item-inner` transition must NOT include `border-radius` or it will interfere with the morph animations. Current fix (line ~1304):
```css
transition: transform 0.4s ease, background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
```

### Theme System
Each crop defines its own color theme in `cropsData`:
```javascript
theme: {
  primary: '#d97706',
  secondary: '#f59e0b',
  accent: '#fbbf24',
  glow: 'rgba(245, 158, 11, 0.5)',
  // ... bg colors, particle colors, seed colors
}
```

## Common Issues & Fixes

### Shapes not morphing properly
- **Cause**: `transition: all` on `.crop-item-inner` interferes with keyframe animations
- **Fix**: Exclude `border-radius` from transition property

### Console warnings about GSAP targets
- `.hero-description` not found warning is benign (optional element)
- Animations still initialize correctly

## Deployment
- Static site, no build step required
- Vercel config in `vercel.json` handles routing
- All CDN dependencies load externally

## Key Code Locations (index.html)
| Line | Content |
|------|---------|
| ~1291 | `.crop-item-inner` base styles |
| ~1304 | Transition property (exclude border-radius!) |
| ~1337-1411 | Crop morph keyframe animations |
| ~1413-1436 | Crop-specific animation assignments |
| ~3248 | `cropsData` array with all crop definitions |
| ~3475 | `initWheel()` function |
| ~3870 | `startAutoRotation()` function |

## Testing Checklist
- [ ] Crop shapes morph smoothly (organic shapes, not circles)
- [ ] Wheel auto-rotates on page load
- [ ] Spotlight highlights top crop
- [ ] Click stops rotation and selects crop
- [ ] Theme colors change per crop
- [ ] Calculate button reveals rent with animation
- [ ] Mobile responsive layout works
