<template>
  <BaseHeaderTogglePanel
    headerClass="x-flex x-w-full x-gap-8 x-py-24"
    :startCollapsed="true"
    :animation="animation"
  >
    <template #header-content="{ open }">
      <slot name="header" />
      <ChevronUpIcon v-if="open" class="x-icon-lg x-ml-auto" />
      <ChevronDownIcon v-else class="x-icon-lg x-ml-auto" />
    </template>
    <slot />
  </BaseHeaderTogglePanel>
</template>

<script lang="ts">
  import {
    BaseHeaderTogglePanel,
    animateScale,
    ChevronDownIcon,
    ChevronUpIcon
  } from '@empathyco/x-components';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      BaseHeaderTogglePanel,
      ChevronDownIcon,
      ChevronUpIcon
    },
    setup() {
      const animation = animateScale();

      return {
        animation
      };
    }
  });
</script>
