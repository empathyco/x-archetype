# Project Overview

## Introduction

This is an Interface X Archetype - a Vue 3 + TypeScript search interface implementation using Empathy.co's X Components library. The project builds production bundles with Rollup and uses Vite for development.

## Key Repository Context

### X Components Monorepo

**[X Components Monorepo](https://github.com/empathyco/x)**: Core library providing search components, adapters, utilities, and design system. Main packages:

- [`@empathyco/x-components`](https://github.com/empathyco/x/tree/main/packages/x-components) – Search framework and UI components (core search, wiring, state, and UI building blocks)
- [`@empathyco/x-adapter-platform`](https://github.com/empathyco/x/tree/main/packages/x-adapter-platform) – Platform API integration (maps platform API to X Components schema)
- [`@empathyco/x-tailwindcss`](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss) – Empathy X Tailwind plugin and design system tokens ([see design tokens](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss)), prebuilt Tailwind utilities and components
- [`@empathyco/x-types`](https://github.com/empathyco/x/tree/main/packages/x-types) – Shared TypeScript types and interfaces for all X packages (Result, Facet, etc.)
- [`@empathyco/x-adapter`](https://github.com/empathyco/x/tree/main/packages/x-adapter) – Adapter base utilities and schema helpers for building custom adapters
- [`@empathyco/x-archetype-utils`](https://github.com/empathyco/x/tree/main/packages/x-archetype-utils) – Utilities for archetype projects (build, CSS injection, analytics helpers)
- [`@empathyco/x-utils`](https://github.com/empathyco/x/tree/main/packages/x-utils) – General utilities to ease development across X projects
- [`@empathyco/x-translations`](https://github.com/empathyco/x/tree/main/packages/x-translations) – Tools for managing translations (JSON↔CSV conversion, i18n helpers)
- [`@empathyco/x-svg-converter`](https://github.com/empathyco/x/tree/main/packages/x-svg-converter) – Utilities for converting SVGs for use in X Components
- [`@empathyco/x-deep-merge`](https://github.com/empathyco/x/tree/main/packages/deep-merge) – Utility for deep merging of objects (used internally by other packages)
- [`@empathyco/storage-service`](https://github.com/empathyco/x/tree/main/packages/storage-service) – Wrapper on top of the Web Storage API with key prefixing and TTL
- [`@empathyco/jest-utils`](https://github.com/empathyco/x/tree/main/packages/jest-utils) – Utilities and helpers for testing with Jest

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

⚠️ While archetypal repositories are references, they may contain anti-patterns (documented in "Common Pitfalls" section). Always verify implementation patterns against this guide before adopting them
