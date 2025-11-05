# Project Overview

## Introduction

This is an Interface X Archetype - a Vue 3 + TypeScript search interface implementation using Empathy.co's X Components library. The project builds production bundles with Rollup and uses Vite for development.

## Key Repository Context

### X Components Monorepo

**[X Components Monorepo](https://github.com/empathyco/x)**: Core library providing search components, adapters, and design system

- `@empathyco/x-components` - Search framework and UI components
- `@empathyco/x-adapter-platform` - Platform API integration
- `@empathyco/x-tailwindcss` - Design system tokens ([see design tokens](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss))

### X Archetype

**[X Archetype](https://github.com/empathyco/x-archetype)**: Reference implementation and base template for this project

When implementing features, **always reference the X Tailwind design system** to use existing design tokens (colors, spacing, typography) instead of creating custom values.

## Archetypal Pattern Reference

**This project follows a pattern shared by 17+ production implementations**. The archetypal pattern consists of:

### Core Stack

- Vue 3.4.38+ with Composition API (`<script setup lang="ts">`)
- X Components 6.0.0-alpha.x (search framework)
- X Tailwind 2.0.0-alpha.x (design system)
- Vite 6.x (development) + Rollup 4.x (production builds)
- TypeScript 5.8.3+ with strict mode

### Standard Structure

- `src/adapter/adapter.ts` - Platform adapter with schema overrides
- `src/x-components/plugin.options.ts` - X module configuration and wiring
- `src/tailwind/plugin-options.ts` - Theme customization extending X Tailwind
- `src/components/desktop/` & `src/components/mobile/` - Device-specific layouts
- `rollup.config.mjs` - Production build configuration with chunk naming

### Important Note

⚠️ While archetypal repositories are references, they may contain anti-patterns (documented in "Common Pitfalls" section). Always verify implementation patterns against this guide before adopting them.
