<template>
  <CustomHeaderTogglePanel :data-test="'sort'" class="x-border-0 x-border-b x-border-neutral-10">
    <template #header>
      <span class="x-title3">
        {{ $t('sort.label') }}
      </span>
      <span>{{ $t(`sort.values.${$x.selectedSort || 'default'}`) }}</span>
    </template>
    <template #default>
      <SortList
        v-if="$x.totalResults"
        class="x-flex x-flex-col x-items-start x-gap-32 x-pb-24 desktop:x-gap-24"
        :items="sortValues"
        buttonClass="x-button-tight"
      >
        <template #default="{ item, isSelected }">
          <RadioButtonSelectedIcon v-if="isSelected" class="x-icon-lg" />
          <RadioButtonUnselectedIcon v-else class="x-icon-lg" />
          <span class="x-text-neutral-90" :class="{ 'x-font-bold': isSelected }">
            {{ $t(`sort.values.${item || 'default'}`) }}
          </span>
        </template>
      </SortList>
    </template>
  </CustomHeaderTogglePanel>
</template>

<script lang="ts">
  import { Sort } from '@empathyco/x-types';
  import { SortList } from '@empathyco/x-components/search';
  import {
    RadioButtonSelectedIcon,
    RadioButtonUnselectedIcon,
    animateScale
  } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import CustomHeaderTogglePanel from '../custom-header-toggle-panel.vue';

  export default defineComponent({
    components: {
      SortList,
      CustomHeaderTogglePanel,
      RadioButtonSelectedIcon,
      RadioButtonUnselectedIcon
    },
    setup() {
      const animation = animateScale();
      const sortValues: Sort[] = ['', 'price asc', 'price desc'];
      return {
        animation,
        sortValues
      };
    }
  });
</script>

<style lang="scss">
  // TODO: Remove when implementing buttonClass prop in the SortList buttons
  .x-sort-list__button {
    @apply x-button-ghost;
  }
</style>
