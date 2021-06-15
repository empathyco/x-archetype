<template>
  <div>
    <BaseIdModalOpen class="x-start" modalId="x-components-app">Start</BaseIdModalOpen>

    <BaseIdModal
      @click.stop.native
      class="x-modal"
      modalId="x-components-app"
      :animation="collapseFromTop"
    >
      <Main />
    </BaseIdModal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { BaseIdModalOpen, BaseIdModal, CollapseFromTop } from '@empathy/x-components';
  import Main from './components/main.vue';
  import '@empathy/x-components/css/full-theme.css';
  import './design-system/tokens.scss';

  @Component({
    components: {
      Main,
      BaseIdModalOpen,
      BaseIdModal
    }
  })
  export default class Layer extends Vue {
    protected collapseFromTop = CollapseFromTop;
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
<style>
  *:not(.x-keyboard-navigation *) {
    outline: none;
  }
</style>
