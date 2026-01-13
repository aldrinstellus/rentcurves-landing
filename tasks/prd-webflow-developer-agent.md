# PRD: Webflow Developer Agent

## Introduction

A full-spectrum Webflow developer agent that uses browser automation to physically build websites directly in the Webflow Designer interface. This agent can create sites from scratch, clone existing sites by scraping them, and handle all Webflow features including CMS, interactions, e-commerce, and third-party integrations.

Unlike code-generation approaches, this agent controls Chrome/Playwright to interact with Webflow's visual designer—adding elements, styling them, configuring CMS collections, and setting up interactions exactly as a human developer would.

## Goals

- Physically build complete Webflow sites via browser automation (not just generate code)
- Clone/mimic reference sites by scraping their structure, design, and content
- Handle all site types: marketing pages, landing pages, e-commerce, CMS-driven sites
- Configure Webflow CMS collections, fields, and dynamic content
- Set up interactions and animations
- Integrate third-party tools (Finsweet, Memberstack, Jetboost, etc.)
- Add custom code/embeds where needed
- Ask clarifying questions to understand requirements before building
- Support iterative refinement based on user feedback

## User Stories

### US-001: Initialize Webflow Session
**Description:** As a user, I want the agent to connect to my Webflow account so it can build sites for me.

**Acceptance Criteria:**
- [ ] Agent opens Webflow in browser using dev-browser skill
- [ ] Handles login if needed (or uses existing session)
- [ ] Navigates to correct project/site
- [ ] Confirms connection before proceeding

### US-002: Scrape Reference Site
**Description:** As a user, I want to provide a reference URL and have the agent analyze it completely so it can replicate the design.

**Acceptance Criteria:**
- [ ] Scrapes full page structure (sections, containers, grids, elements)
- [ ] Extracts typography styles (fonts, sizes, weights, colors)
- [ ] Extracts color palette
- [ ] Captures spacing/layout patterns
- [ ] Downloads or notes all images/assets
- [ ] Identifies interactions/animations
- [ ] Documents CMS structure if applicable
- [ ] Creates a structured analysis document

### US-003: Create Site Structure
**Description:** As a user, I want the agent to build the basic site structure with all pages and navigation.

**Acceptance Criteria:**
- [ ] Creates all required pages in Webflow
- [ ] Sets up navigation component
- [ ] Configures page settings (SEO title, description)
- [ ] Creates global styles (colors, fonts, breakpoints)
- [ ] Sets up reusable symbols/components

### US-004: Build Page Layouts
**Description:** As a user, I want the agent to construct page layouts with proper hierarchy and responsiveness.

**Acceptance Criteria:**
- [ ] Creates sections with proper structure
- [ ] Uses Webflow's layout tools (flexbox, grid)
- [ ] Adds all content elements (headings, text, images, buttons)
- [ ] Applies styling to match design
- [ ] Handles responsive breakpoints (tablet, mobile landscape, mobile)
- [ ] Verifies layout at each breakpoint

### US-005: Configure CMS Collections
**Description:** As a user, I want the agent to set up CMS collections with proper fields and relationships.

**Acceptance Criteria:**
- [ ] Creates CMS collections with appropriate fields
- [ ] Configures field types correctly (text, image, reference, multi-reference)
- [ ] Sets up collection pages and templates
- [ ] Creates collection lists on pages
- [ ] Binds dynamic content to CMS fields
- [ ] Configures filtering and sorting

### US-006: Add Interactions & Animations
**Description:** As a user, I want the agent to add professional interactions and animations.

**Acceptance Criteria:**
- [ ] Creates page load animations
- [ ] Adds scroll-triggered animations
- [ ] Configures hover states and transitions
- [ ] Sets up click interactions
- [ ] Uses Webflow's native interaction panel
- [ ] Tests all interactions work correctly

### US-007: Integrate Third-Party Tools
**Description:** As a user, I want the agent to integrate external tools and services.

**Acceptance Criteria:**
- [ ] Adds Finsweet attributes where needed
- [ ] Configures Memberstack for membership sites
- [ ] Sets up form integrations
- [ ] Adds analytics/tracking code
- [ ] Integrates payment systems for e-commerce
- [ ] Embeds custom code properly in head/body

### US-008: Handle E-commerce Setup
**Description:** As a user, I want the agent to configure Webflow e-commerce when needed.

**Acceptance Criteria:**
- [ ] Creates product collections
- [ ] Sets up product pages
- [ ] Configures cart and checkout
- [ ] Adds e-commerce elements (add to cart, cart count)
- [ ] Sets up categories and filters
- [ ] Configures shipping and payment settings

### US-009: Add Custom Code
**Description:** As a user, I want the agent to add custom HTML/CSS/JS where Webflow's native features fall short.

**Acceptance Criteria:**
- [ ] Adds custom code in site settings (head, footer)
- [ ] Uses embed elements for inline code
- [ ] Writes clean, optimized code
- [ ] Tests code works correctly
- [ ] Documents custom code purpose

### US-010: Quality Check & Publish
**Description:** As a user, I want the agent to verify the site works correctly before publishing.

**Acceptance Criteria:**
- [ ] Checks all links work
- [ ] Verifies responsive design on all breakpoints
- [ ] Tests all interactions
- [ ] Validates forms work
- [ ] Checks page load performance
- [ ] Publishes site when approved

## Functional Requirements

- FR-1: Use Playwright/dev-browser skill to control Chrome browser
- FR-2: Navigate Webflow Designer interface programmatically
- FR-3: Add, select, and modify elements using Webflow's panels
- FR-4: Apply styles using the style panel
- FR-5: Configure settings in various Webflow panels (CMS, interactions, page settings)
- FR-6: Scrape reference sites using standard web scraping techniques
- FR-7: Take screenshots at key stages for verification
- FR-8: Handle Webflow's autosave and publishing workflow
- FR-9: Support undo/redo when corrections needed
- FR-10: Provide progress updates during long operations

## Non-Goals

- No direct Webflow API integration (using visual designer instead)
- No building sites outside of Webflow
- No automatic content writing (user provides or references content)
- No automatic image generation (uses provided or scraped assets)
- No hosting outside Webflow

## Technical Considerations

### Browser Automation Approach
- Use dev-browser skill with Playwright for browser control
- Must handle Webflow's canvas iframe structure
- Need to wait for Webflow's dynamic UI to load
- Handle drag-and-drop interactions
- Work with Webflow's keyboard shortcuts for efficiency

### Webflow Designer Selectors
Key UI elements to interact with:
- Left panel: Add elements, Navigator, Pages
- Right panel: Style, Settings, Interactions
- Top bar: Device switchers, publish button
- Canvas: Element selection and manipulation

### State Management
- Track current page/element selection
- Maintain style/class naming conventions
- Keep record of created components for reuse

### Error Handling
- Detect Webflow error modals
- Handle session timeouts
- Retry failed operations
- Take diagnostic screenshots on errors

## Success Metrics

- Complete a basic landing page in under 30 minutes of agent time
- Clone a reference site with 90%+ visual accuracy
- Zero broken interactions on published site
- All breakpoints properly configured
- User approval on first or second iteration

## Open Questions

1. Should we store Webflow credentials or rely on existing browser session?
2. How to handle Webflow's rate limits on rapid interactions?
3. Should we create a visual diff tool to compare with reference sites?
4. How to handle sites that require Webflow paid features the user may not have?

---

## Implementation Phases

### Phase 1: Core Browser Automation
- Connect to Webflow Designer
- Basic element creation and styling
- Page creation and navigation

### Phase 2: Site Scraping & Analysis
- Reference site scraping
- Design token extraction
- Structure analysis

### Phase 3: Full Site Building
- Complete page layouts
- CMS configuration
- Responsive design

### Phase 4: Advanced Features
- Interactions and animations
- E-commerce setup
- Third-party integrations

### Phase 5: Quality & Polish
- Automated testing
- Visual comparison tools
- Performance optimization
