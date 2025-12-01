# morozumi TODO App – Copilot Instructions

## Project Vision
- Build a Next.js-based TODO application that feels fast, accessible, and production-ready.
- Favor a modern, minimal aesthetic powered by Tailwind CSS. Use consistent spacing, a subdued neutral palette, and accent colors for primary actions.
- Keep business logic reusable and framework-agnostic whenever possible.

## Engineering Guardrails
- Default to TypeScript everywhere; keep `strict` mode enabled and eliminate `any` usage unless a clear justification is documented inline.
- Prefer server components/layouts for data loading and mutations unless a client component is required (stateful interactions, browser APIs, or form handling with hooks).
- Co-locate tests and stories near their subjects when practical, and keep UI components small and composable.
- Write clear, action-focused copy and labels; avoid lorem ipsum.

## Design + UX Expectations
- Leverage Tailwind utility classes for spacing, typography, color, and layout. Use semantic HTML elements and responsive breakpoints.
- Provide delightful micro-interactions (hover, focus, pressed states) while preserving WCAG AA color contrast.
- Ensure keyboard navigation works for all interactive controls and announce UI changes for assistive technologies when feasible.

## Workload-Specific Guides
Refer to the detailed rules for each workload:
- [TypeScript Rules](.github/instructions/typescript.instructions.md)
- [Next.js Rules](.github/instructions/next.instructions.md)
