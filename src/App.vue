<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <ExperienceControls />
    <MainModal v-if="isOpen" data-wysiwyg="layer" />
  </div>
</template>

<script lang="ts">
  import {
    SnippetCallbacks,
    SnippetConfig,
    UrlParams,
    XOn,
    XProvide
  } from '@empathyco/x-components';
  import { ExperienceControls } from '@empathyco/x-components/experience-controls';
  import { Tagging } from '@empathyco/x-components/tagging';
  import { QueryPreviewInfo } from '@empathyco/x-components/queries-preview';
  import { UrlHandler } from '@empathyco/x-components/url';
  import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params';
  import { InternalSearchRequest, InternalSearchResponse } from '@empathyco/x-components/search';
  import { Component, Inject, Provide, Vue, Watch } from 'vue-property-decorator';
  import { useDevice } from './composables/use-device.composable';
  import currencies from './i18n/currencies';
  import './tailwind/index.css';

  @Component({
    components: {
      SnippetCallbacks,
      SnippetConfigExtraParams,
      Tagging,
      UrlHandler,
      ExperienceControls,
      MainModal: () => import('./components/custom-main-modal.vue').then(m => m.default)
    }
  })
  export default class App extends Vue {
    protected isOpen = false;

    @XOn(['UserOpenXProgrammatically', 'UserClickedOpenX'])
    open(): void {
      this.isOpen = true;
      window.wysiwyg?.open();
    }

    @XOn(['UserClickedCloseX'])
    close(): void {
      window.wysiwyg?.close();
    }

    @XOn(['UserAcceptedAQuery'])
    async goToLoginWysiwyg(query: string): Promise<void> {
      if (/^::\s*login/.test(query)) {
        await window.wysiwyg?.goToLogin();
      }
    }

    @XOn(['SearchRequestChanged'])
    onSearchRequestChanged(payload: InternalSearchRequest | null): void {
      window.wysiwyg?.setContext({ query: payload?.query, spellcheckedQuery: undefined });
    }

    @XOn(['SearchResponseChanged'])
    onSearchResponseChanged(payload: InternalSearchResponse): void {
      if (payload.spellcheck) {
        window.wysiwyg?.setContext({ spellcheckedQuery: payload.spellcheck });
      }
    }

    @XOn(['ParamsLoadedFromUrl'])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async requestAuthWysiwyg(payload: UrlParams): Promise<void> {
      try {
        if (window.wysiwyg) {
          await window.wysiwyg?.requestAuth();
          window.InterfaceX?.search();
          window.wysiwyg?.setContext({ query: payload.query });
        }
      } catch (_) {
        // No error handling
      }
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

    @Provide('currencyFormat')
    public get currencyFormat(): string {
      return currencies[this.snippetConfig.currency!];
    }

    @XProvide('queriesPreviewInfo')
    public get queriesPreviewInfo(): QueryPreviewInfo[] | undefined {
      return this.snippetConfig.queriesPreview ?? [];
    }

    @Watch('snippetConfig.uiLang')
    syncLang(uiLang: string): void {
      this.$setLocale(uiLang);
    }

    @Watch('device.deviceName')
    syncDevice(deviceName: string): void {
      this.$setLocaleDevice(deviceName);
    }

    reloadSearch(): void {
      this.$x.emit('ReloadSearchRequested');
    }

    mounted(): void {
      document.addEventListener('wysiwyg:reloadSearch', () => this.reloadSearch());
    }

    beforeDestroy(): void {
      document.removeEventListener('wysiwyg:reloadSearch', () => this.reloadSearch());
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
</style>
