// https://vuejs.org/guide/typescript/options-api.html#type-augmentation-placement
export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $setLocale: (lang: string) => void;
    $setLocaleDevice: (device: string) => void;
  }
}
