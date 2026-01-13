# SAVED OPTION 2: Extended 10-Second Calculation Experience

**Status:** Saved for later implementation
**Project:** rentcurves-landing

## Goal
Make the calculation process feel complex and sophisticated by extending it to ~10 seconds with multi-stage visual feedback.

## Current State
- 1.8s API simulation delay
- 200ms pause before reveal
- 1.5s number counting animation
- Total: ~3.5 seconds

## Proposed Design: Multi-Stage Calculation

### Visual Concept
Show a series of calculation "phases" with status messages, progress indicator, and animated elements to make it feel like a sophisticated analysis is happening.

### Calculation Phases (10 seconds total)

| Phase | Duration | Status Message |
|-------|----------|----------------|
| 1 | 0-2s | "Analyzing market conditions..." |
| 2 | 2-4s | "Processing crop yield data..." |
| 3 | 4-6s | "Computing insurance factors..." |
| 4 | 6-8s | "Calculating optimal rent..." |
| 5 | 8-9.5s | "Finalizing results..." |
| 6 | 9.5-10s | Reveal animation begins |

### UI Elements to Add

1. **Status Text** - Below the button, shows current phase message
2. **Progress Bar** - Thin animated bar showing overall progress
3. **Percentage Counter** - "42% complete" style indicator
4. **Pulsing Glow** - Button/area pulses with theme color during calculation

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.html` | Add status text element, progress bar HTML, CSS styles, update `calculateRent()` function |

## Implementation Details

### 1. HTML Structure (after calc-button)
```html
<div class="calc-progress" id="calcProgress">
  <div class="calc-status" id="calcStatus">Analyzing market conditions...</div>
  <div class="calc-progress-bar">
    <div class="calc-progress-fill" id="calcProgressFill"></div>
  </div>
  <div class="calc-percent" id="calcPercent">0%</div>
</div>
```

### 2. CSS Styles
- Hidden by default, visible when `.calculating` active
- Progress bar with animated gradient fill
- Status text with fade transitions between phases
- Percentage with number morphing effect

### 3. JavaScript Updates
Replace the simple `setTimeout(1800)` with a phased calculation:

```javascript
async function calculateRent() {
  const phases = [
    { msg: "Analyzing market conditions...", duration: 2000 },
    { msg: "Processing crop yield data...", duration: 2000 },
    { msg: "Computing insurance factors...", duration: 2000 },
    { msg: "Calculating optimal rent...", duration: 2000 },
    { msg: "Finalizing results...", duration: 1500 }
  ];

  // Show progress UI
  // Animate through phases
  // Update progress bar and percentage
  // Then reveal result
}
```

## Verification
1. Click Calculate button
2. Observe 5 distinct phases with changing status messages
3. Progress bar fills smoothly over 10 seconds
4. Percentage counter increments to 100%
5. Result reveals with existing celebration animation
6. Total time from click to reveal: ~10 seconds
