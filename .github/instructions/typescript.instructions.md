---
applyTo: "**/*.ts?(x)"
---

# TypeScript Rules

1. **Strictness First**: Keep `strict`, `noImplicitAny`, and `noUncheckedIndexedAccess` enabled. If a third-party type forces you to loosen settings, isolate it with `// eslint-disable-next-line` and explain why.
2. **Types Over Interfaces? Use Both Judiciously**: Default to `type` aliases for object literals and utility compositions, and prefer `interface` only when extending external contracts or classes.
3. **Never Cast Blindly**: Avoid `as any` or double assertions. Introduce type guards, discriminated unions, or helper functions instead.
4. **Stable APIs**: Export explicit types for props, DTOs, and domain models so UI and data layers evolve independently.
5. **Error Handling**: Model async results with `Result`-style discriminated unions or typed errors to prevent forgotten branches.
