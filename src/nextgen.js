// ===========================================
// RENTCURVES NEXT-GEN ANIMATION SYSTEM
// GSAP + Lenis + Custom Effects
// ===========================================

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    if (prefersReducedMotion) {
      console.log('Reduced motion preferred - using simplified animations');
      return;
    }

    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    } else {
      console.warn('GSAP not loaded');
      return;
    }

    // Initialize Lenis smooth scroll
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Initialize all features
    initHeroAnimations();
    initCustomCursor();
    initScrollTriggers();
    initMagneticButtons();
    initSoundEffects();
    init3DWheel();
    initGlassmorphism();
    initTextEffects();

    console.log('🚀 Next-Gen animations initialized');
  }

  // ===========================================
  // PHASE 2: HERO ANIMATIONS
  // ===========================================

  function initHeroAnimations() {
    // Split text animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      // Get text content only (strips HTML tags)
      const textContent = heroTitle.textContent.trim();
      const words = textContent.split(/\s+/).filter(w => w.length > 0);

      // Rebuild with animated letters
      heroTitle.innerHTML = words.map(word => {
        const letters = word.split('').map(letter =>
          `<span class="hero-letter" style="display: inline-block;">${letter}</span>`
        ).join('');
        return `<span class="hero-word" style="display: inline-block; margin-right: 0.25em;">${letters}</span>`;
      }).join(' ');

      // Animate letters with stagger
      gsap.from('.hero-letter', {
        y: 50,
        opacity: 0,
        rotationX: -60,
        stagger: 0.02,
        duration: 0.5,
        ease: 'back.out(1.5)',
        delay: 0.3
      });
    }

    // Hero tag entrance
    gsap.from('.hero-tag', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.1
    });

    // Hero description entrance
    gsap.from('.hero-description', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.6
    });

    // Parallax on atmosphere layers
    gsap.to('.atmosphere', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // 3D tilt effect on hero section
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');

    if (heroContent && hero && window.innerWidth > 768) {
      heroContent.style.transformStyle = 'preserve-3d';
      heroContent.style.perspective = '1000px';

      let heroTiltRAF = null;
      hero.addEventListener('mousemove', (e) => {
        if (heroTiltRAF) return;
        heroTiltRAF = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 40;
        const y = (e.clientY - rect.top - rect.height / 2) / 40;

        gsap.to(heroContent, {
          rotateY: x,
          rotateX: -y,
          duration: 0.4,
          ease: 'power2.out'
        });
          heroTiltRAF = null;
        });
      });

      hero.addEventListener('mouseleave', () => {
        gsap.to(heroContent, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }
  }

  // ===========================================
  // PHASE 3: 3D WHEEL ENHANCEMENT
  // ===========================================

  function init3DWheel() {
    const wheelContainer = document.querySelector('.wheel-container');
    if (!wheelContainer) return;

    // Add 3D perspective to wheel
    wheelContainer.style.perspective = '1200px';
    wheelContainer.style.transformStyle = 'preserve-3d';

    // Subtle 3D tilt on wheel
    const wheelWrapper = document.querySelector('.wheel-wrapper');
    if (wheelWrapper) {
      gsap.set(wheelWrapper, {
        rotationX: 10,
        transformPerspective: 1200
      });
    }

    // Add particle trail on drag
    let isDraggingWheel = false;
    let lastParticleTime = 0;

    wheelContainer.addEventListener('mousedown', () => { isDraggingWheel = true; });
    document.addEventListener('mouseup', () => { isDraggingWheel = false; });

    wheelContainer.addEventListener('mousemove', (e) => {
      if (!isDraggingWheel) return;

      const now = Date.now();
      if (now - lastParticleTime < 50) return; // Throttle
      lastParticleTime = now;

      emitDragParticle(e.clientX, e.clientY);
    });
  }

  function emitDragParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'drag-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 8px;
      height: 8px;
      background: var(--theme-accent, #34d399);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px var(--theme-accent, #34d399);
    `;
    document.body.appendChild(particle);

    gsap.to(particle, {
      scale: 0,
      opacity: 0,
      y: -30 + Math.random() * 60,
      x: -30 + Math.random() * 60,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => particle.remove()
    });
  }

  // ===========================================
  // PHASE 4: GLASSMORPHISM ENHANCEMENT
  // ===========================================

  function initGlassmorphism() {
    // Add enhanced glassmorphism to input cards
    const glassStyles = document.createElement('style');
    glassStyles.textContent = `
      .input-card {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(20px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      .input-card:hover {
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
        transform: translateY(-4px) scale(1.02) !important;
        box-shadow:
          0 16px 48px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 30px var(--theme-glow, rgba(16, 185, 129, 0.2)) !important;
      }

      .rent-result {
        background: rgba(255, 255, 255, 0.02) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
      }
    `;
    document.head.appendChild(glassStyles);
  }

  // ===========================================
  // PHASE 7: CUSTOM CURSOR
  // ===========================================

  function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    // Add cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
      .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: difference;
      }
      .cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--theme-accent, #34d399);
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        transition: transform 0.1s, background 0.3s;
      }
      .cursor-ring {
        width: 40px;
        height: 40px;
        border: 2px solid var(--theme-accent, #34d399);
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        opacity: 0.5;
        transition: transform 0.15s ease-out, opacity 0.3s, border-color 0.3s;
      }
      .custom-cursor.hover .cursor-dot {
        transform: translate(-50%, -50%) scale(2);
      }
      .custom-cursor.hover .cursor-ring {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0.8;
      }
      .custom-cursor.clicking .cursor-ring {
        transform: translate(-50%, -50%) scale(0.8);
      }
      body { cursor: none !important; }
      a, button, .crop-item, .calculate-btn, .cta-main, .input-card { cursor: none !important; }
    `;
    document.head.appendChild(cursorStyles);

    // Track cursor position (throttled for performance)
    let cursorRAF = null;
    document.addEventListener('mousemove', (e) => {
      if (cursorRAF) return;
      cursorRAF = requestAnimationFrame(() => {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        cursorRAF = null;
      });
    });

    // Hover effects on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .crop-item, .calculate-btn, .cta-main, .input-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Click effect
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
  }

  // ===========================================
  // PHASE 6: SCROLL TRIGGERS
  // ===========================================

  function initScrollTriggers() {
    // Progress bar at top of page
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
    document.body.appendChild(progressBar);

    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255,255,255,0.1);
        z-index: 99998;
      }
      .scroll-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--theme-primary, #059669), var(--theme-accent, #34d399));
        transform-origin: left;
        transform: scaleX(0);
      }
    `;
    document.head.appendChild(progressStyles);

    gsap.to('.scroll-progress-fill', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    // Animate CTA section on scroll
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      gsap.from(ctaSection, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }

  // ===========================================
  // PHASE 5: MAGNETIC BUTTONS
  // ===========================================

  function initMagneticButtons() {
    const magneticEls = document.querySelectorAll('.calculate-btn, .cta-main, .btn-header');

    magneticEls.forEach(btn => {
      if (!btn) return;

      const originalTransform = btn.style.transform;

      // Magnetic pull effect
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });

      // Ripple effect on click
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.cssText = `
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          left: ${e.clientX - rect.left}px;
          top: ${e.clientY - rect.top}px;
          pointer-events: none;
        `;

        // Ensure button has relative positioning
        if (getComputedStyle(btn).position === 'static') {
          btn.style.position = 'relative';
        }
        btn.style.overflow = 'hidden';

        btn.appendChild(ripple);

        gsap.to(ripple, {
          scale: 8,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        });
      });
    });
  }

  // ===========================================
  // PHASE 7: SOUND EFFECTS + HAPTICS
  // ===========================================

  function initSoundEffects() {
    // Create audio context on first user interaction
    let audioCtx = null;

    function createAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioCtx;
    }

    // Subtle hover sound
    function playHoverSound() {
      try {
        const ctx = createAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = 800;
        osc.type = 'sine';
        gain.gain.value = 0.02;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    }

    // Click sound
    function playClickSound() {
      try {
        const ctx = createAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = 600;
        osc.type = 'triangle';
        gain.gain.value = 0.04;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
      } catch (e) {}
    }

    // Success sound (for rent reveal)
    window.playSuccessSound = function() {
      try {
        const ctx = createAudioContext();
        if (ctx.state === 'suspended') ctx.resume();

        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.value = 0.06;
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25 + i * 0.08);

          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + 0.3 + i * 0.08);
        });
      } catch (e) {}
    };

    // Add hover sounds to crop items
    document.querySelectorAll('.crop-item').forEach(el => {
      el.addEventListener('mouseenter', playHoverSound);
    });

    // Add click sounds to buttons
    document.querySelectorAll('button, .calculate-btn, .cta-main').forEach(el => {
      el.addEventListener('click', playClickSound);
    });

    // Haptic feedback for mobile
    if ('vibrate' in navigator) {
      document.querySelectorAll('.crop-item').forEach(el => {
        el.addEventListener('click', () => navigator.vibrate(25));
      });

      const calcBtn = document.querySelector('.calculate-btn');
      if (calcBtn) {
        calcBtn.addEventListener('click', () => navigator.vibrate([25, 40, 25]));
      }
    }
  }

  // ===========================================
  // PHASE 8: TEXT EFFECTS
  // ===========================================

  function initTextEffects() {
    // Gradient text animation for hero
    const gradientStyles = document.createElement('style');
    gradientStyles.textContent = `
      .hero-title {
        background: linear-gradient(
          90deg,
          var(--theme-accent, #34d399),
          var(--theme-primary, #059669),
          var(--theme-secondary, #10b981),
          var(--theme-accent, #34d399)
        ) !important;
        background-size: 300% 100% !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        animation: gradientShift 6s ease infinite !important;
      }

      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      .hero-letter {
        display: inline-block;
        transition: transform 0.3s ease;
      }

      .hero-letter:hover {
        transform: translateY(-5px) scale(1.1);
        color: var(--theme-accent);
      }
    `;
    document.head.appendChild(gradientStyles);
  }

  // ===========================================
  // INITIALIZE ON DOM READY
  // ===========================================

  function waitForReadyAndInit() {
    // Wait for main script to finish (js-ready class indicates initialization complete)
    if (document.body.classList.contains('js-ready')) {
      init();
    } else {
      // Use MutationObserver to detect when js-ready is added
      const observer = new MutationObserver((mutations) => {
        if (document.body.classList.contains('js-ready')) {
          observer.disconnect();
          init();
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

      // Fallback: if js-ready never added after 2 seconds, init anyway
      setTimeout(() => {
        observer.disconnect();
        if (typeof gsap !== 'undefined') init();
      }, 2000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForReadyAndInit);
  } else {
    waitForReadyAndInit();
  }

})();
