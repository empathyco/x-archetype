<template>
  <div>
    <DeviceDetector :breakpoints="breakpoints" />
    <BaseIdModalOpen class="x-start" modalId="x-components-app">Start</BaseIdModalOpen>

    <BaseIdModal
      @click.stop.native
      class="x-modal"
      modalId="x-components-app"
      :animation="collapseFromTop"
      :dir="documentDirection"
    >
      <Main />
    </BaseIdModal>
  </div>
</template>

<script lang="ts">
  import { DeviceDetector } from '@empathy/x-components/device';
  import { Component, Inject, Vue } from 'vue-property-decorator';
  import {
    BaseIdModalOpen,
    BaseIdModal,
    CollapseFromTop,
    Dictionary,
    SnippetConfig
  } from '@empathy/x-components';
  import Main from './components/main.vue';
  import '@empathy/x-components/design-system/full-theme.css';
  import './design-system/tokens.scss';

  @Component({
    components: {
      Main,
      BaseIdModalOpen,
      BaseIdModal,
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
      return this.snippetConfig.documentDirection ?? 'ltr';
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
  :root {
    //color
    --x-color-background-message: var(--x-color-neutral-95);
    --x-color-border-message: var(--x-color-background-message);
    --x-color-texxt-message: var(--x-color-text);

    //border
    --x-border-width-message: var(--x-border-width);

    //spacing
    --x-space-padding-message: var(--x-space-06);
  }

  *:not(.x-keyboard-navigation *) {
    outline: none;
  }

  .x-message {
    // color
    background-color: var(--x-color-background-message);
    border-style: solid;
    border-color: var(--x-color-border-message);

    // border
    border-width: var(--x-border-width-message);

    // spacing
    padding: var(--x-space-padding-message);
  }
</style>
