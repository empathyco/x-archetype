// https://vuejs.org/guide/typescript/options-api.html#type-augmentation-placement
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $setLocale: (lang: string) => Promise<void>
    $setLocaleDevice: (device: string) => Promise<void>
  }
}
