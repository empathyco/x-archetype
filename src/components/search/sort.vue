<template>
  <CustomHeaderTogglePanel :data-test="'sort'" class="x-border-0 x-border-b x-border-neutral-10">
    <template #header>
      <span class="x-title3">
        {{ $t('sort.label') }}
      </span>
      <span>{{ $t(`sort.values.${$x.selectedSort || 'default'}`) }}</span>
    </template>
    <template #default>
      <SortPickerList
        v-if="$x.totalResults"
        class="x-flex x-flex-col x-gap-8 x-pb-24"
        :items="sortValues"
        buttonClass="x-facet-filter x-facet-filter-lg"
      >
        <template #default="{ item, isSelected }">
          <RadioButtonSelectedIcon v-if="isSelected" class="x-icon-lg" />
          <RadioButtonUnselectedIcon v-else class="x-icon-lg" />
          {{ $t(`sort.values.${item || 'default'}`) }}
        </template>
      </SortPickerList>
    </template>
  </CustomHeaderTogglePanel>
</template>

<script lang="ts">
  import { Sort } from '@empathyco/x-types';
  import { SortPickerList } from '@empathyco/x-components/search';
  import {
    RadioButtonSelectedIcon,
    RadioButtonUnselectedIcon,
    animateScale
  } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import CustomHeaderTogglePanel from '../custom-header-toggle-panel.vue';

  export default defineComponent({
    components: {
      SortPickerList,
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
