<template>
  <MainModal :animation="animation" :class="`x-${$x.device}`">
    <Mobile v-if="$x.device === 'mobile' || $x.device === 'tablet'" />
    <Desktop v-else />
  </MainModal>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import { animateClipPath, MainModal } from '@empathyco/x-components';
  import Mobile from './mobile/mobile.vue';
  import Desktop from './desktop/desktop.vue';

  @Component({
    components: {
      MainModal,
      Mobile,
      Desktop
    }
  })
  export default class CustomMainModal extends Vue {
    /**
     * Animation to use for opening/closing the modal.
     *
     * @internal
     */
    protected animation = animateClipPath();
  }
</script>
