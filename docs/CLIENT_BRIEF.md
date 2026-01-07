# Client Brief Summary

## Project Overview

**Client**: Craig Tuttle, CEO/Owner/Founder of Rent Curves
**Location**: 310 S. Indian Rd., Scott City, KS 67871
**Contact**: 785-673-6127
**Request Date**: December 10, 2025

## Business Context

Rent Curves is an agricultural intelligence platform that helps farmers calculate appropriate land rent based on crop performance data. The platform uses a Laravel backend API (developed by Andrew in Sydney) that calculates rent values and effective yields.

## Landing Page Goals

1. **Engagement**: Create a visually striking first impression
2. **Simplicity**: 2-3 clicks from page load to seeing rent calculation
3. **Conversion**: Drive sign-ups for the full Rent Curves platform

## Design Direction

### Style Reference
> "Look at nice Casino landing pages... they are sharp, big, bold, and extremely interesting. I do NOT want a boring page that says "click here" and "click there" -- I want something that is engaging."

### Key Requirements

| Requirement | Implementation |
|-------------|----------------|
| Casino-style engagement | Auto-rotating wheel, particle effects, dramatic reveals |
| No boring form fields | Interactive crop selector instead of dropdowns |
| Shimmer/glitter effects | CSS animations on selection, glow effects |
| Bold rent display | Massive gradient text with counting animation |
| Mobile responsive | Fully adaptive layout |

## Feature Specifications

### 1. Crop Selector
- Interactive wheel/carousel with 6 default crops
- Visual feedback on hover and selection
- CMS-editable crop options

### 2. Five Input Values
Each crop displays:
- **Price** - Current market price per bushel
- **Yield** - Expected harvest yield
- **Cost** - Production cost per acre
- **High** - High yield estimate
- **Avg** - Average yield

### 3. Calculate Button
- Prominent placement below inputs
- Animated gear icon
- Triggers rent calculation

### 4. Rent Result Display
> "Create a nice bold showy Rent $ value"

- Large, colorful number display
- Animation on reveal
- Per acre/per year units

### 5. Sign-Up CTA
- Below rent result
- Links to main Rent Curves platform
- Clear call-to-action text

## CMS Requirements (Future)

Each crop in the CMS should have:
- Crop name
- State/Region/Country
- Base Price ($)
- Coverage Level (65%, 70%, 75%)
- Premium ($)
- Insurance Shared (boolean)

## Technical Integration

### API Endpoint
- **Backend**: Laravel (existing, production-ready)
- **Developer**: Andrew (Sydney, +17 hours)
- **Returns**: Rent value + Effective Yield

### Webflow Compatibility
- All animations must work in Webflow
- Use CDN-loaded libraries (GSAP, etc.)
- Self-contained HTML with embedded styles

## Design Assets

Client provided:
- 5 input value logos (color scheme defined)
- 1 rent value logo
- Figma draft designs
- Brand colors and typography

## Success Metrics

1. User can select a crop within 1 click
2. User sees rent calculation within 2-3 clicks total
3. Page feels "inviting" and "empowering"
4. Mobile experience matches desktop quality

## Out of Scope (Initial Release)

- Complex rent curve charts (too technical for landing page)
- Multi-field calculations
- User authentication on landing page
- Full dashboard functionality

---

*For complete specifications, see the original client PDF in `docs/assets/client-specs.pdf`*
