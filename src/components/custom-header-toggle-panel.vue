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
  import { Vue, Component } from 'vue-property-decorator';
  import {
    BaseHeaderTogglePanel,
    animateScale,
    ChevronDownIcon,
    ChevronUpIcon
  } from '@empathyco/x-components';

  @Component({
    components: {
      BaseHeaderTogglePanel,
      ChevronDownIcon,
      ChevronUpIcon
    }
  })
  export default class CustomHeaderTogglePanel extends Vue {
    public animation = animateScale();
  }
</script>
