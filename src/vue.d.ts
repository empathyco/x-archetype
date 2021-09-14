import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $setLocale: (lang: string) => void;
    $setLocaleDevice: (device: string) => void;
  }
}
