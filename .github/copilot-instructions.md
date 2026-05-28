# AI Coding Agent Instructions

> **Modular Documentation System**: This document aggregates specialized instructions for working with this Interface X Archetype project.

## Quick Start

This is an **Interface X Archetype** - a Vue 3 + TypeScript search interface implementation using Empathy.co's X Components library. The project follows a pattern shared by 17+ production implementations.

**Core Stack**: Vue 3.5.30+, X Components 6.0.0-alpha.x, X Design System 0.1.0-alpha.x (Tailwind 4.2.2), TypeScript 5.9.3+, Vite 6.4.2+

## Documentation Index

The documentation is organized into specialized topics for easier navigation:

### 0. [AI Instructions](../setup-ai-instructions/00-ai-instructions.md)

Essential AI behavior guidelines.

### 1. [Project Overview](../setup-ai-instructions/01-project-overview.md)

Understanding the archetypal pattern, key repositories, and core stack. Start here for project context and external references.

### 2. [Architecture](../setup-ai-instructions/02-architecture.md)

Core integration patterns, adapter system, component architecture, and state management using X Components and Vuex.

### 3. [Vue & TypeScript](../setup-ai-instructions/03-vue-typescript.md)

Vue 3 component patterns (script setup, async loading, device-specific), TypeScript conventions, type extensions, and module augmentation.

### 4. [Design & Tailwind](../setup-ai-instructions/04-design-tailwind.md)

**🚨 CRITICAL**: X Design System with Tailwind 4 usage, device breakpoints synchronization, theme customization patterns, and anti-patterns to avoid. **ALL classes use `xds:` prefix** (e.g., `xds:button`, `xds:flex`, `xds:bg-white`).

### 5. [Figma MCP Workflow](../setup-ai-instructions/05-figma-workflow.md)

Design token mapping strategy, Figma to code translation examples, and design system first approach for transferring designs.

### 6. [Development Workflows](../setup-ai-instructions/06-development-workflows.md)

Essential commands and local X Components development.

### 7. [X Components Integration](../setup-ai-instructions/07-x-components-integration.md)

X module configuration, custom wiring patterns, adapter schema overrides, and common integration patterns.

### 8. [Build System](../setup-ai-instructions/08-build-system.md)

Vite configuration (unified for dev and production), CSS injection patterns, environment configuration, and bundle analysis.

### 9. [Production Patterns](../setup-ai-instructions/09-production-patterns.md)

Proven patterns from 17+ production implementations: query filtering, semantic chunk naming, editable facets, tracking configuration, and Result schema extensions.

### 10. [Common Pitfalls](../setup-ai-instructions/10-common-pitfalls.md)

**⚠️ READ FIRST**: Frequent mistakes and anti-patterns that cause issues - device breakpoints synchronization, type system errors, Tailwind issues, and wiring problems.

### 11. [Project Conventions](../setup-ai-instructions/11-project-conventions.md)

Feature flags, internationalization, code style, file naming and import conventions.

### 12. [Setup New Instance](../setup-ai-instructions/12-setup-new-instance.md)

**📦 ARCHETYPE SETUP**: Complete guide for creating a new search experience from this archetype. Required configuration (lang, currency, viewMode, platform), GitHub cleanup, snippet configuration, adapter setup, and verification checklist.

## How to Use This Documentation

### For New AI Agents

1. Read [Project Overview](../setup-ai-instructions/01-project-overview.md) for context
2. Review [Common Pitfalls](../setup-ai-instructions/10-common-pitfalls.md) to avoid frequent mistakes
3. Reference specialized documents as needed for specific tasks

### For Specific Tasks

- **Implementing UI from Figma**: [Figma MCP Workflow](../setup-ai-instructions/05-figma-workflow.md) → [Design & Tailwind](../setup-ai-instructions/04-design-tailwind.md)
- **Adding search features**: [X Components Integration](../setup-ai-instructions/07-x-components-integration.md) → [Architecture](../setup-ai-instructions/02-architecture.md)
- **Fixing responsive issues**: [Design & Tailwind - Device Breakpoints](../setup-ai-instructions/04-design-tailwind.md#critical-device-breakpoints-synchronization)
- **Setting up development**: [Development Workflows](../setup-ai-instructions/06-development-workflows.md)
- **Extending types**: [Vue & TypeScript](../setup-ai-instructions/03-vue-typescript.md)
- **Customizing wiring**: [X Components Integration](../setup-ai-instructions/07-x-components-integration.md)
- **Creating a new instance from archetype**: [Setup New Instance](../setup-ai-instructions/12-setup-new-instance.md)

## Key References

### External Documentation

- **[X Components Monorepo](https://github.com/empathyco/x)**: Core library (components, adapters, design system)
- **[X Archetype](https://github.com/empathyco/x-archetype)**: Reference implementation
- **[X Design System](https://github.com/empathyco/x/tree/main/packages/x-design-system)**: Tailwind 4 design system with components, theme tokens, and variants

### Critical Patterns to Remember

1. **🚨 Device Breakpoints Synchronization**: `src/composables/use-device.composable.ts` must match `@variant` breakpoints in `src/tailwind/xds.css`
2. **Design System First**: Always use [X Design System tokens](https://github.com/empathyco/x/tree/main/packages/x-design-system) before creating custom values
3. **Tailwind Classes**: ALL classes use `xds:` prefix (e.g., `xds:button`, `xds:flex`, `xds:bg-white`)
4. **Type Extensions**: Declare in `src/shims-*.d.ts` files, override schemas in `adapter.ts`
5. **Script Setup**: Prefer `<script setup lang="ts">` for new components
6. **Custom Wiring**: Place in `src/x-components/wiring/` for reusable event handlers
