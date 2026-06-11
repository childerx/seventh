# Seventh Air Limited - Design Patterns & Guidelines

## Design System

### Color Palette

#### Primary Colors
- **Blue**: `#1E40AF` (primary), `#3B82F6` (light), `#1E3A8A` (dark)
- **Red**: `#DC2626` (primary), `#EF4444` (light), `#B91C1C` (dark)

#### Gradients
- **Primary**: `linear-gradient(135deg, #1E40AF 0%, #DC2626 100%)`

### Typography
- **Headings**: `Plus Jakarta Sans` - Bold (700), Extra Bold (800)
- **Body**: `Inter` - Regular (400), Medium (500), Semi Bold (600)

### Theme System

#### Light Theme
- Background: `#FFFFFF` / `#F8FAFC` / `#F1F5F9`
- Text: `#0F172A` / `#475569` / `#94A3B8`
- Border: `#E2E8F0`

#### Dark Theme
- Background: `#0F172A` / `#1E293B` / `#334155`
- Text: `#F8FAFC` / `#CBD5E1` / `#64748B`
- Border: `#334155`

### iOS Glass Effect Pattern
```css
background: rgba(255, 255, 255, 0.65); /* light */
background: rgba(15, 23, 42, 0.65); /* dark */
backdrop-filter: blur(40px) saturate(180%);
-webkit-backdrop-filter: blur(40px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.5); /* light */
border: 1px solid rgba(255, 255, 255, 0.08); /* dark */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6);
```

### Thread/Line Background Pattern
SVG paths with gradient strokes used across sections for visual continuity:
```svg
<linearGradient id="thread-grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
  <stop offset="50%" stopColor="#ef4444" stopOpacity="0.15" />
  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
</linearGradient>
```

### Animation Guidelines
- Use `type: "spring" as const` for spring animations
- Stiffness: 80-100 for entrance, 300-400 for interactive
- Damping: 15-25 for smooth, 25-30 for snappy
- Duration: 0.2s-0.3s for transitions
- Use `ease: [0.4, 0, 0.2, 1]` for smooth cubic-bezier

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

### Component Patterns
- **Navbar**: iOS glass pill shape, fixed top with blur
- **Cards**: Rounded-2xl, border, hover scale + translateY
- **Buttons**: Rounded-full, gradient primary, spring hover
- **Sections**: py-16 to py-24, thread backgrounds, alternating colors
- **Testimonials**: Sticky stacking cards with scroll-based scale/opacity
