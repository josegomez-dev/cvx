# CVx Components Structure

This directory contains all React components organized by functionality and purpose.

## 📁 Directory Structure

### `/ui` - Reusable UI Components
- **Badge.tsx** - Badge component with variants
- **CertifiedBadge.tsx** - Specialized badge for certifications
- **WIPBadge.tsx** - Work-in-progress indicator badge
- **TiltCard.tsx** - 3D tilt effect card component
- **ProfileSwitch.tsx** - Profile switching component
- **Tabs.tsx** - Tab navigation component
- **Section.tsx** - Section wrapper component

### `/layout` - Layout Components
- **Navbar.tsx** - Main navigation bar
- **Footer.tsx** - Site footer
- **Hero.tsx** - Hero section component

### `/features` - Feature-specific Components
- **ProjectCard.tsx** - Project display card
- **HackathonCard.tsx** - Hackathon achievement card
- **FeaturedArticles.tsx** - Featured articles section
- **ArticleList.tsx** - Article listing component
- **EducationTimeline.tsx** - Education timeline component

### `/modals` - Modal Components
- **DeveloperConsoleModal.tsx** - CVx Developer Console modal
- **NexusSimulateModal.tsx** - Nexus Simulate modal
- **WalletModal.tsx** - Wallet connection modal

### `/sidebar` - Sidebar Components
- **InteractiveToolsSidebar.tsx** - Main interactive tools sidebar
- **DeveloperSidebar.tsx** - Developer console sidebar
- **NexusSidebar.tsx** - Nexus simulation sidebar
- **WalletSidebar.tsx** - Wallet management sidebar
- **WalletSidebarManager.tsx** - Wallet sidebar state manager

### `/interactive` - Interactive Components
- **InteractiveTreeMap.tsx** - Interactive tree map visualization
- **NexusSimulate.tsx** - Web3 simulation component
- **AIChat.tsx** - AI chat interface
- **AIChatButton.tsx** - AI chat trigger button
- **AIChatManager.tsx** - AI chat state manager

### `/web3` - Web3-specific Components
- **DeveloperConsole.tsx** - CVx Developer Console terminal

### `/animations` - Animation Components
- **AnimatedText.tsx** - Animated text effects
- **AnimatedHighlights.tsx** - Highlight animations
- **TypewriterText.tsx** - Typewriter text effect
- **TypewriterSubtitle.tsx** - Typewriter subtitle effect
- **RotatingPhrases.tsx** - Rotating phrases component
- **CustomCursor.tsx** - Custom cursor component

## 🎯 Best Practices

### Component Organization
- **Single Responsibility**: Each component has a single, well-defined purpose
- **Logical Grouping**: Components are grouped by functionality
- **Consistent Naming**: PascalCase for component names
- **Clear Hierarchy**: Layout → Features → UI → Animations

### Import Structure
```typescript
// Layout components
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Feature components
import { ProjectCard } from '@/components/features/ProjectCard'

// UI components
import { Badge } from '@/components/ui/Badge'

// Animation components
import { AnimatedText } from '@/components/animations/AnimatedText'
```

### Component Guidelines
- **Props Interface**: Define clear prop interfaces for each component
- **Default Props**: Provide sensible defaults where appropriate
- **Error Boundaries**: Wrap complex components in error boundaries
- **Performance**: Use React.memo for expensive components
- **Accessibility**: Include proper ARIA labels and keyboard navigation

## 🚀 Adding New Components

1. **Choose the right directory** based on component purpose
2. **Follow naming conventions** (PascalCase)
3. **Create proper TypeScript interfaces** for props
4. **Add JSDoc comments** for complex components
5. **Update this README** when adding new directories or components

## 📝 Component Standards

### File Structure
```typescript
// ComponentName.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ComponentNameProps {
  // Define props here
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Component logic
  return (
    // JSX
  )
}
```

### Styling
- Use Tailwind CSS classes
- Follow the project's color scheme
- Maintain responsive design
- Use consistent spacing and typography

### State Management
- Use local state for component-specific data
- Use Zustand for global state
- Keep state as close to where it's used as possible
