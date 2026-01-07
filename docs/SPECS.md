# Technical Specifications

## Overview

This document outlines the technical specifications for the Rent Curves landing page implementation.

## Architecture

### File Structure
```
src/
├── index.html      # Casino-style version (85KB)
└── index-3d.html   # 3D animated version (59KB)
```

### Design Philosophy
- **Self-contained HTML** - All CSS and JavaScript embedded
- **No build step** - Direct browser execution
- **CDN dependencies** - External libraries loaded via CDN
- **Webflow compatible** - Can be integrated into Webflow projects

## External Dependencies

### GSAP (GreenSock Animation Platform)
- **Version**: 3.12.5
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **Usage**: Page animations, stagger effects, elastic easing
- **Webflow**: Fully compatible

### Three.js
- **Version**: r128
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
- **Usage**: 3D particle background, floating geometric shapes
- **Note**: Only used in `index-3d.html`

### Anime.js
- **Version**: 3.2.2
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js`
- **Usage**: Number counting animations, micro-interactions

### Google Fonts
- **Space Grotesk**: 300-700 weights (body text)
- **Syne**: 400-800 weights (headings)
- **DM Serif Display**: Display font (casino version)
- **Outfit**: Sans-serif (casino version)

## Features Implementation

### Auto-Rotating Crop Wheel

```javascript
// Key variables
let wheelRotation = 0;      // Current rotation angle
let isSpinning = true;      // Rotation state
let spinSpeed = 0.3;        // Degrees per frame

// Animation loop uses requestAnimationFrame
function animate() {
    if (!isSpinning) return;
    wheelRotation += spinSpeed;
    // Position crops around wheel
    requestAnimationFrame(animate);
}
```

### Spotlight Effect
- Crops at top position (270° normalized) get highlighted
- Cyan glow + larger scale (1.15x)
- Center text updates to show featured crop

### Selection Mechanics
1. Click stops rotation (`isSpinning = false`)
2. Particle burst effect (20 particles)
3. Selected crop scales to 1.3x with gold glow
4. Non-selected crops dim to 60% opacity + 40% grayscale
5. Re-selection animates transition between crops

### Rent Calculation Animation
```javascript
// Anime.js number counting
anime({
    targets: rentElement,
    innerHTML: [0, calculatedRent],
    round: 1,
    duration: 2000,
    easing: 'easeOutExpo'
});
```

## CSS Architecture

### Custom Properties (3D Version)
```css
:root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --accent-cyan: #00f5d4;
    --accent-purple: #9b5de5;
    --accent-pink: #f15bb5;
    --accent-yellow: #fee440;
    --accent-orange: #ff6b35;
    --text-primary: #ffffff;
    --text-secondary: rgba(255,255,255,0.6);
    --glass: rgba(255,255,255,0.03);
    --glass-border: rgba(255,255,255,0.1);
}
```

### Glassmorphism Components
```css
.glass-card {
    background: linear-gradient(145deg,
        rgba(255,255,255,0.05) 0%,
        rgba(255,255,255,0.02) 100%);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(20px);
    border-radius: 20px;
}
```

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `< 600px` | Mobile phones |
| `600px - 900px` | Tablets |
| `> 900px` | Desktop |

### Mobile Adaptations
- Wheel radius: 120px (vs 220px desktop)
- Crop items: 80px (vs 140px desktop)
- Hamburger menu replaces nav links
- Stacked input cards

## Performance Considerations

### Three.js Optimization
- Limited particle count (200 stars)
- Simple geometries (TorusGeometry)
- Frame rate capped to display refresh

### Animation Performance
- Hardware-accelerated transforms
- `will-change` hints for animated elements
- `requestAnimationFrame` for smooth loops

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Variables | Yes | Yes | Yes | Yes |
| Backdrop Filter | Yes | Yes | Yes | Yes |
| WebGL (Three.js) | Yes | Yes | Yes | Yes |
| ES6+ JavaScript | Yes | Yes | Yes | Yes |

## API Integration (Future)

The landing page is designed to integrate with a Laravel backend:

```javascript
// Placeholder for API call
async function calculateRent(cropData) {
    const response = await fetch('/api/calculate-rent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData)
    });
    return response.json();
}
```

## Testing Checklist

- [ ] Wheel rotates smoothly on page load
- [ ] Spotlight effect highlights top crop
- [ ] Click stops rotation and selects crop
- [ ] Re-selection works after initial selection
- [ ] Input cards display correct data
- [ ] Calculate button triggers rent reveal
- [ ] Animations work on mobile
- [ ] All fonts load correctly
- [ ] Three.js background renders (3D version)
