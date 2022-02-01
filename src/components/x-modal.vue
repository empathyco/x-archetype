<template>
  <BaseEventsModal :eventsToOpenModal="openEvents" class="x-modal" :animation="collapseFromTop">
    <Mobile v-if="$x.device === 'mobile'" />
    <Desktop v-else />
  </BaseEventsModal>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import { BaseEventsModal, CollapseFromTop } from '@empathyco/x-components';
  import Mobile from './mobile/mobile.vue';
  import Desktop from './desktop/desktop.vue';

  @Component({
    components: {
      BaseEventsModal,
      Mobile,
      Desktop
    }
  })
  export default class XModal extends Vue {
    protected openEvents = ['UserClickedOpenEventsModal', 'UserOpenXProgrammatically'];
    protected collapseFromTop = CollapseFromTop;
  }
</script>

<style scoped></style>
