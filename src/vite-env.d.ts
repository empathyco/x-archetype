/// <reference types="vite/client" />

// Optionally, extend ImportMetaEnv for your custom variables:
interface ImportMetaEnv {
  readonly VITE_APP_DEVELOPMENT_DOCKER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
