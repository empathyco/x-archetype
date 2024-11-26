<template>
  <div>
    <template v-if="$slots.header">
      <slot name="header" />
    </template>
    <SlidingPanel
      :show-buttons="!isTouchable"
      :reset-on-content-change="false"
      button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
      scroll-container-class="desktop:x-sliding-panel-fade desktop:x-sliding-panel-fade-sm"
      class="x-sliding-panel-show-buttons-on-hover"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>
      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon-lg" />
      </template>
      <slot />
    </SlidingPanel>
  </div>
</template>

<script lang="ts">
  import { ChevronLeftIcon, ChevronRightIcon, SlidingPanel } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import { useDevice } from '../composables/use-device.composable';

  export default defineComponent({
    components: {
      SlidingPanel,
      ChevronLeftIcon,
      ChevronRightIcon
    },
    setup() {
      const { isTouchable } = useDevice();
      return { isTouchable };
    }
  });
</script>
