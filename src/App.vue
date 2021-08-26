<template>
  <div>
    <DeviceDetector :breakpoints="breakpoints" />
    <BaseEventsModalOpen class="x-start">Start</BaseEventsModalOpen>

    <BaseEventsModal
      :eventsToOpenModal="['UserClickedOpenEventsModal', 'UserOpenXProgrammatically']"
      class="x-modal"
      :animation="collapseFromTop"
      :dir="documentDirection"
    >
      <Main />
    </BaseEventsModal>
  </div>
</template>

<script lang="ts">
  import { DeviceDetector } from '@empathyco/x-components/device';
  import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
  import {
    BaseEventsModal,
    BaseEventsModalOpen,
    CollapseFromTop,
    Dictionary,
    SnippetConfig,
    XProvide
  } from '@empathyco/x-components';
  import { adapter } from './adapter/adapter';
  import Main from './components/main.vue';
  import '@empathyco/x-components/design-system/full-theme.css';
  import './design-system/tokens.scss';
  import currencies from './i18n/currencies';

  @Component({
    components: {
      Main,
      BaseEventsModal,
      BaseEventsModalOpen,
      DeviceDetector
    }
  })
  export default class Layer extends Vue {
    protected collapseFromTop = CollapseFromTop;

    protected breakpoints: Dictionary<number> = {
      mobile: 500,
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

  .x-start {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<style lang="scss">
  //TODO: move all this to the XComponents Design System

  :root {
    //color
    --x-color-background-message-default: var(--x-color-base-neutral-95);
    --x-color-border-message-default: var(--x-color-background-message-default);
    --x-color-text-message-default: var(--x-color-text-default);

    //border
    --x-size-border-width-message-default: var(--x-size-border-width-base);

    //spacing
    --x-space-padding-message: var(--x-size-base-06);
  }

  *:not(.x-keyboard-navigation *) {
    outline: none;
  }

  .x-message {
    // color
    background-color: var(--x-color-background-message-default);
    border-style: solid;
    border-color: var(--x-color-border-message-default);

    // border
    border-width: var(--x-size-border-width-message-default);

    // spacing
    padding: var(--x-space-padding-message);
  }

  .x-layout__scroll-to-top {
    position: fixed;
    bottom: var(--x-size-base-03);
    right: var(--x-size-base-06);
  }

  .x-banner,
  .x-promoted {
    &__title {
      display: none;
    }
  }

  // TODO - Remove this classes when the design-system fix the chevron animation
  .x-dropdown {
    &__toggle {
      .x-icon {
        transition: transform 0.3s ease-in-out;
      }
    }
    &--is-open {
      .x-dropdown {
        &__toggle {
          .x-icon {
            transition: transform 0.3s ease-in-out;
          }
        }
      }
    }
  }
</style>
