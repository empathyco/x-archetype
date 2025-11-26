# AI Coding Agent Instructions

> **Modular Documentation System**: This document aggregates specialized instructions for working with this Interface X Archetype project.

## Quick Start

This is an **Interface X Archetype** - a Vue 3 + TypeScript search interface implementation using Empathy.co's X Components library. The project follows a pattern shared by 17+ production implementations.

**Core Stack**: Vue 3.4.38+, X Components 6.0.0-alpha.x, X Tailwind 2.0.0-alpha.x, TypeScript 5.8.3+

## Documentation Index

The documentation is organized into specialized topics for easier navigation:

### 0. [AI Instructions](./setup-copilot-instructions/00-ai-instructions.md)

Essential AI behavior guidelines.

### 1. [Project Overview](./setup-copilot-instructions/01-project-overview.md)

Understanding the archetypal pattern, key repositories, and core stack. Start here for project context and external references.

### 2. [Architecture](./setup-copilot-instructions/02-architecture.md)

Core integration patterns, adapter system, component architecture, and state management using X Components and Vuex.

### 3. [Vue & TypeScript](./setup-copilot-instructions/03-vue-typescript.md)

Vue 3 component patterns (script setup, async loading, device-specific), TypeScript conventions, type extensions, and module augmentation.

### 4. [Design & Tailwind](./setup-copilot-instructions/04-design-tailwind.md)

**🚨 CRITICAL**: X Tailwind design system usage, device breakpoints synchronization, theme customization patterns, and anti-patterns to avoid.

### 5. [Figma MCP Workflow](./setup-copilot-instructions/05-figma-workflow.md)

Design token mapping strategy, Figma to code translation examples, and design system first approach for transferring designs.

### 6. [Development Workflows](./setup-copilot-instructions/06-development-workflows.md)

Essential commands, local X Components development, E2E testing with Cypress/Cucumber, and Docker development setup.

### 7. [X Components Integration](./setup-copilot-instructions/07-x-components-integration.md)

X module configuration, custom wiring patterns, adapter schema overrides, and common integration patterns.

### 8. [Build System](./setup-copilot-instructions/08-build-system.md)

Rollup configuration, Vite setup, CSS injection patterns, dev vs production differences, and environment configuration.

### 9. [Production Patterns](./setup-copilot-instructions/09-production-patterns.md)

Proven patterns from 17+ production implementations: query filtering, semantic chunk naming, editable facets, tracking configuration, and Result schema extensions.

### 10. [Common Pitfalls](./setup-copilot-instructions/10-common-pitfalls.md)

**⚠️ READ FIRST**: Frequent mistakes and anti-patterns that cause issues - device breakpoints synchronization, type system errors, Tailwind issues, and wiring problems.

### 11. [Project Conventions](./setup-copilot-instructions/11-project-conventions.md)

Feature flags, internationalization, code style, file naming, import conventions, and testing patterns.

## How to Use This Documentation

### For New AI Agents

1. Read [Project Overview](./setup-copilot-instructions/01-project-overview.md) for context
2. Review [Common Pitfalls](./setup-copilot-instructions/10-common-pitfalls.md) to avoid frequent mistakes
3. Reference specialized documents as needed for specific tasks

### For Specific Tasks

- **Implementing UI from Figma**: [Figma MCP Workflow](./setup-copilot-instructions/05-figma-workflow.md) → [Design & Tailwind](./setup-copilot-instructions/04-design-tailwind.md)
- **Adding search features**: [X Components Integration](./setup-copilot-instructions/07-x-components-integration.md) → [Architecture](./setup-copilot-instructions/02-architecture.md)
- **Fixing responsive issues**: [Design & Tailwind - Device Breakpoints](./setup-copilot-instructions/04-design-tailwind.md#critical-device-breakpoints-synchronization)
- **Setting up development**: [Development Workflows](./setup-copilot-instructions/06-development-workflows.md)
- **Extending types**: [Vue & TypeScript](./setup-copilot-instructions/03-vue-typescript.md)
- **Customizing wiring**: [X Components Integration](./setup-copilot-instructions/07-x-components-integration.md)

## Key References

### External Documentation

- **[X Components Monorepo](https://github.com/empathyco/x)**: Core library (components, adapters, design system)
- **[X Archetype](https://github.com/empathyco/x-archetype)**: Reference implementation
- **[X Tailwind Design System](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss)**: Theme tokens, components, utilities

### Critical Patterns to Remember

1. **🚨 Device Breakpoints Synchronization**: `src/device-breakpoints.ts` must match `tailwind.config.ts` screens
2. **Design System First**: Always use [X Tailwind tokens](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss) before creating custom values
3. **Type Extensions**: Declare in `src/shims-*.d.ts` files, override schemas in `adapter.ts`
4. **Script Setup**: Prefer `<script setup lang="ts">` for new components
5. **Custom Wiring**: Place in `src/x-components/wiring/` for reusable event handlers

Adding new content for lauching update
