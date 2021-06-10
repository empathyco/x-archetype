<template>
  <div>
    <div class="x-list x-list--horizontal x-list--justify-center">
      <BaseIdModalOpen modalId="x-components-app">Start</BaseIdModalOpen>
    </div>

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
</style>
<style>
  * {
    outline: none;
  }
</style>
