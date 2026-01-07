# Rent Curves Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)](https://threejs.org/)

> Interactive agricultural rent calculation landing page with casino-style engagement and 3D animations.

## Overview

Rent Curves is an agricultural intelligence platform that helps farmers calculate land rent based on crop data. This landing page features an interactive crop wheel selector with dramatic animations and a bold rent calculation reveal.

## Features

### Interactive Crop Wheel
- **Auto-rotating wheel** with 6 crop options (Corn, Soybeans, Wheat, Canola, Cotton, Rice)
- **Spotlight effect** highlights featured crop during rotation
- **Hover interactions** slow rotation and scale up hovered items
- **Click to select** stops rotation with particle burst effect
- **Re-selection support** - switch crops anytime after initial selection

### 5 Input Value Display
- Price per bushel
- Harvest Yield
- Production Cost
- High Yield estimate
- Average Yield

### Dramatic Rent Reveal
- Massive gradient text display ($yellow → $orange → $pink)
- Anime.js number counting animation
- Holographic glow effect
- Confetti/particle celebration

### Two Versions Included

| Version | File | Description |
|---------|------|-------------|
| **Casino Style** | `src/index.html` | Original design with emerald/gold theme |
| **3D Animated** | `src/index-3d.html` | Neo-futuristic with Three.js background |

## Tech Stack

- **GSAP** (GreenSock) - Animation platform (Webflow compatible)
- **Three.js** - 3D WebGL particle background
- **Anime.js** - Number counting and micro-interactions
- **Google Fonts** - Space Grotesk, Syne typography
- **Pure CSS** - Glassmorphism, gradients, custom properties

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/aldrinstellus/rentcurves-landing.git
cd rentcurves-landing
```

2. Open in browser:
```bash
# Option 1: Direct file
open src/index-3d.html

# Option 2: Local server (recommended)
npx serve src
```

3. Or deploy to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## Project Structure

```
rentcurves-landing/
├── README.md           # This file
├── LICENSE             # MIT License
├── CHANGELOG.md        # Version history
├── .gitignore          # Git ignore rules
│
├── src/                # Source files
│   ├── index.html      # Casino-style version
│   └── index-3d.html   # 3D animated version
│
├── docs/               # Documentation
│   ├── SPECS.md        # Technical specifications
│   ├── CLIENT_BRIEF.md # Client requirements
│   └── assets/         # Reference materials
│
└── assets/             # Static assets (images, etc.)
```

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Full |
| Firefox | Full |
| Safari | Full |
| Edge | Full |
| Mobile | Responsive |

## CDN Dependencies

All libraries loaded via CDN (no build step required):

```html
<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Anime.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>
```

## Customization

### Colors (CSS Variables)
```css
:root {
    --accent-cyan: #00f5d4;
    --accent-purple: #9b5de5;
    --accent-pink: #f15bb5;
    --accent-yellow: #fee440;
    --accent-orange: #ff6b35;
}
```

### Crop Data
Edit the `crops` array in the JavaScript section to modify crop options:
```javascript
const crops = [
    { id: 1, name: 'Corn', state: 'Iowa', icon: '🌽', ... },
    // Add more crops...
];
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- **Client**: Craig Tuttle, Rent Curves CEO
- **Design & Development**: Built with Claude Code
- **Animation Libraries**: GSAP, Three.js, Anime.js

---

Made with agricultural intelligence
