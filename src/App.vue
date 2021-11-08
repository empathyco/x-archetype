<template>
  <div class="x" :dir="documentDirection">
    <SnippetConfigExtraParams />
    <DeviceDetector @DeviceProvided="$setLocaleDevice" :breakpoints="breakpoints" />
    <UrlHandler env="env" />

    <BaseEventsModal :eventsToOpenModal="openEvents" class="x-modal" :animation="collapseFromTop">
      <Mobile v-if="$x.device === 'mobile'" />
      <Desktop v-else />
    </BaseEventsModal>
  </div>
</template>

<script lang="ts">
  import {
    BaseEventsModal,
    BaseEventsModalOpen,
    CollapseFromTop,
    Dictionary,
    SnippetConfig,
    XProvide
  } from '@empathyco/x-components';
  import '@empathyco/x-components/design-system/full-theme.css';
  import { DeviceDetector } from '@empathyco/x-components/device';
  import { UrlHandler } from '@empathyco/x-components/url';
  import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params';
  import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
  import { adapter } from './adapter/adapter';
  import Desktop from './components/desktop/desktop.vue';
  import Mobile from './components/mobile/mobile.vue';
  import './design-system/tokens.scss';
  import currencies from './i18n/currencies';

  @Component({
    components: {
      Mobile,
      Desktop,
      BaseEventsModal,
      BaseEventsModalOpen,
      DeviceDetector,
      SnippetConfigExtraParams,
      UrlHandler
    }
  })
  export default class Layer extends Vue {
    protected collapseFromTop = CollapseFromTop;

    protected openEvents = ['UserClickedOpenEventsModal', 'UserOpenXProgrammatically'];

    protected breakpoints: Dictionary<number> = {
      mobile: 640,
      tablet: 900,
      desktop: Number.POSITIVE_INFINITY
    };

    @Inject('snippetConfig')
    protected snippetConfig!: SnippetConfig;

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

    @Watch('snippetConfig.lang')
    syncLang(lang: string): void {
      this.$setLocale(lang);
      this.syncSearchLang(lang);
    }

    @Watch('snippetConfig.searchLang')
    syncSearchLang(searchLang: string): void {
      adapter.setConfig({
        requestParams: {
          lang: searchLang
        }
      });
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
