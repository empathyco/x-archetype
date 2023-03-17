<template>
  <div>
    <template v-if="$slots.header">
      <slot name="header" />
    </template>
    <SlidingPanel
      :showButtons="!isTouchable"
      :resetOnContentChange="false"
      buttonClass="x-button-lead x-button-circle x-button-ghost x-p-0"
      scrollContainerClass="desktop:x-sliding-panel-fade desktop:x-sliding-panel-fade-sm"
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
  import { defineComponent } from 'vue';
  import { SlidingPanel, ChevronLeftIcon, ChevronRightIcon } from '@empathyco/x-components';
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
