<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <MainModal v-if="isOpen" />
  </div>
</template>

<script lang="ts">
  import {
    QueryPreviewInfo,
    SnippetCallbacks,
    SnippetConfig,
    XOn,
    XProvide
  } from '@empathyco/x-components';
  import { Tagging } from '@empathyco/x-components/tagging';
  import { UrlHandler } from '@empathyco/x-components/url';
  import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params';
  import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
  import { useDevice } from './composables/use-device.composable';
  import currencies from './i18n/currencies';
  import '@empathyco/x-components/design-system/full-theme.css';
  import './design-system/tokens.scss';
  import './tailwind/index.css';

  @Component({
    components: {
      SnippetCallbacks,
      SnippetConfigExtraParams,
      Tagging,
      UrlHandler,
      MainModal: () => import('./components/custom-main-modal.vue').then(m => m.default)
    }
  })
  export default class App extends Vue {
    protected isOpen = false;

    @XOn(['UserOpenXProgrammatically', 'UserClickedOpenX'])
    open(): void {
      this.isOpen = true;
    }

    @Inject('snippetConfig')
    protected snippetConfig!: SnippetConfig;
    protected device = useDevice();

    protected get documentDirection(): string {
      return (
        document.documentElement.dir ||
        document.body.dir ||
        (this.snippetConfig.documentDirection ?? 'ltr')
      );
    }

    @XProvide('currencyFormat')
    public get currencyFormat(): string {
      return currencies[this.snippetConfig.currency!];
    }

    @XProvide('queriesPreviewInfo')
    public get queriesPreviewInfo(): QueryPreviewInfo[] | undefined {
      return this.snippetConfig.queriesPreview;
    }

    @Watch('snippetConfig.uiLang')
    syncLang(uiLang: string): void {
      this.$setLocale(uiLang);
    }

    @Watch('device.deviceName')
    syncDevice(devieceName: string): void {
      this.$setLocaleDevice(devieceName);
    }
  }
</script>

<style scoped>
  .x-modal::v-deep .x-modal__content {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: auto;
  }
</style>
<style lang="scss">
  *:not(.x-keyboard-navigation *) {
    outline: none;
  }

  .x-banner,
  .x-promoted {
    &__title {
      display: none;
    }
  }

  .x-recommendations__item {
    max-width: 142px;
  }

  // The width is needed because the empathize has position absolute.
  // The z-index is to avoid the related tags appearing over the empathize.
  .x-desktop {
    .x-empathize {
      z-index: 1;
      width: 100%;
    }
  }

  .x-modal__overlay {
    background: var(--x-color-background-modal-overlay-default) !important;
    opacity: 0.3 !important;
  }
</style>
