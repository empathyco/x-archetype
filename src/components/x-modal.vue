<template>
  <BaseEventsModal
    :eventsToOpenModal="openEvents"
    :animation="animation"
    :class="$x.device === 'mobile' ? 'x-mobile' : 'x-desktop'"
  >
    <Mobile v-if="$x.device === 'mobile'" />
    <Desktop v-else />
  </BaseEventsModal>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import { BaseEventsModal, animateClipPath, XEvent } from '@empathyco/x-components';
  import { Prop } from 'vue-property-decorator';
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
    /**
     * List of events to open the modal when emitted.
     *
     * @public
     */
    @Prop()
    public openEvents?: XEvent[];
    /**
     * Animation to use for opening/closing the modal.
     *
     * @internal
     */
    protected animation = animateClipPath();
  }
</script>
