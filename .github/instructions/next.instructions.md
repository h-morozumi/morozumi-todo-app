---
applyTo: "{app,src/app}/**/*"
---

# Next.js Rules

1. **App Router + Server Components**: Prefer server components for data fetching/mutations. Promote client components only when they rely on browser-only APIs or local interactive state.
2. **Data Layer**: Use the built-in `fetch` caching model (revalidate tags/paths) for persistence layers. Keep all API interactions typed end-to-end and colocated with the component that owns the data requirements.
3. **Routing Structure**: Organize pages with route groups and nested layouts for shared UI (nav, status bar). Co-locate metadata (`generateMetadata`) with each route.
4. **Styling**: Tailwind CSS is the primary styling tool. Use CSS variables for theme primitives (background, foreground, accent) and layer utilities for modern cards, panels, and interactive controls.
5. **Accessibility & UX**: Use semantic HTML, `aria` attributes on interactive pieces, and ensure transitions/animations have reduced-motion fallbacks. Validate forms on both client and server, surfacing inline errors.
