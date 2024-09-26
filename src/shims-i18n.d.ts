export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $setLocale: (lang: string) => void;
    $setLocaleDevice: (device: string) => void;
  }
}
