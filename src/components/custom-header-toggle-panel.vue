<template>
  <BaseHeaderTogglePanel
    class="x-facet x-list x-list--gap-05"
    :startCollapsed="true"
    :animation="animation"
  >
    <template #header-content="{ open }">
      <slot name="header" />
      <ChevronUpIcon v-if="open" class="x-icon--l" />
      <ChevronDownIcon v-else class="x-icon--l" />
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
