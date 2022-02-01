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
  import '@empathyco/x-components/design-system/full-theme.css';
  import '../design-system/tokens.scss';

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
