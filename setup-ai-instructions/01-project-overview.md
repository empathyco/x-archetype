# Project Overview

## Introduction

This is an Interface X Archetype - a Vue 3 + TypeScript search interface implementation using Empathy.co's X Components library. The project uses Vite for both development and production builds.

## Key Repository Context

### X Components Monorepo

**[X Components Monorepo](https://github.com/empathyco/x)**: Core library providing search components, adapters, utilities, and design system. Main packages:

- [`@empathyco/x-components`](https://github.com/empathyco/x/tree/main/packages/x-components) – Search framework and UI components (core search, wiring, state, and UI building blocks)
- [`@empathyco/x-adapter-platform`](https://github.com/empathyco/x/tree/main/packages/x-adapter-platform) – Platform API integration (maps platform API to X Components schema)
- [`@empathyco/x-design-system`](https://github.com/empathyco/x/tree/main/packages/x-design-system) – Empathy X Design System with Tailwind 4 CSS components, theme tokens, and variants
- [`@empathyco/x-types`](https://github.com/empathyco/x/tree/main/packages/x-types) – Shared TypeScript types and interfaces for all X packages (Result, Facet, etc.)
- [`@empathyco/x-adapter`](https://github.com/empathyco/x/tree/main/packages/x-adapter) – Adapter base utilities and schema helpers for building custom adapters
- [`@empathyco/x-archetype-utils`](https://github.com/empathyco/x/tree/main/packages/x-archetype-utils) – Utilities for archetype projects (CSS injection, analytics helpers)
- [`@empathyco/x-utils`](https://github.com/empathyco/x/tree/main/packages/x-utils) – General utilities to ease development across X projects
- [`@empathyco/storage-service`](https://github.com/empathyco/x/tree/main/packages/storage-service) – Wrapper on top of the Web Storage API with key prefixing and TTL

### X Archetype

**[X Archetype](https://github.com/empathyco/x-archetype)**: Reference implementation and base template for this project

When implementing features, **always reference the X Design System** to use existing design tokens (colors, spacing, typography) instead of creating custom values.

## Archetypal Pattern Reference

**This project follows a pattern shared by 17+ production implementations**. The archetypal pattern consists of:

### Core Stack

- Vue 3.5.30+ with Composition API (`<script setup lang="ts">`)
- X Components 6.0.0-alpha.x (search framework)
- X Design System 0.1.0-alpha.x with Tailwind 4.2.2+ (CSS-first design system)
- Vite 6.4.2+ (both development and production builds)
- TypeScript 5.9.3+ with strict mode

### Standard Structure

- `src/adapter/adapter.ts` - Platform adapter with schema overrides
- `src/x-components/plugin.options.ts` - X module configuration and wiring
- `src/tailwind/xds.css` - Tailwind 4 CSS configuration with X Design System
- `src/composables/use-device.composable.ts` - Device breakpoints configuration
- `src/components/desktop/` & `src/components/mobile/` - Device-specific layouts
- `vite.config.ts` - Build configuration for both dev and production

### Important Note

⚠️ While archetypal repositories are references, they may contain anti-patterns (documented in "Common Pitfalls" section). Always verify implementation patterns against this guide before adopting them
