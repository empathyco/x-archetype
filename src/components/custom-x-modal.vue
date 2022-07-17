<template>
  <XModal :animation="animation" :class="$x.device === 'mobile' ? 'x-mobile' : 'x-desktop'">
    <Mobile v-if="$x.device === 'mobile'" />
    <Desktop v-else />
  </XModal>
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import { animateClipPath, XModal } from '@empathyco/x-components';
  import Mobile from './mobile/mobile.vue';
  import Desktop from './desktop/desktop.vue';

  @Component({
    components: {
      XModal,
      Mobile,
      Desktop
    }
  })
  export default class CustomXModal extends Vue {
    /**
     * Animation to use for opening/closing the modal.
     *
     * @internal
     */
    protected animation = animateClipPath();
  }
</script>
