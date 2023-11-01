<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <ExperienceControls />
    <MainModal v-if="isOpen" />
  </div>
</template>

<script lang="ts">
  import { SnippetCallbacks, SnippetConfig, XOn, XProvide } from '@empathyco/x-components';
  import { ExperienceControls } from '@empathyco/x-components/experience-controls';
  import { Tagging } from '@empathyco/x-components/tagging';
  import { QueryPreviewInfo } from '@empathyco/x-components/queries-preview';
  import { UrlHandler } from '@empathyco/x-components/url';
  import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params';
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
      return this.snippetConfig.queriesPreview;
    }

    @XProvide('experienceControls')
    public get experienceControls(): QueryPreviewInfo[] | undefined {
      return this.$store.state.x.experienceControls.controls;
    }

    @Watch('snippetConfig.uiLang')
    syncLang(uiLang: string): void {
      this.$setLocale(uiLang);
    }

    @Watch('device.deviceName')
    syncDevice(deviceName: string): void {
      this.$setLocaleDevice(deviceName);
    }
  }
</script>

<style scoped lang="scss">
  .x-modal::v-deep {
    z-index: 10000;
    .x-modal__content {
      width: 100%;
      height: 100%;
      background-color: white;
      overflow: auto;
    }
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
