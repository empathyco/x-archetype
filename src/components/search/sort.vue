<template>
  <CustomHeaderTogglePanel
    :data-test="'sort'"
    class="x-border-width--bottom-01 x-border-width--00 x-border-color--neutral-95"
  >
    <template #header>
      <span class="x-title3">
        {{ $t('sort.label') }}
      </span>
      <span>{{ $t(`sort.values.${$x.selectedSort || 'default'}`) }}</span>
    </template>
    <template #default>
      <SortList
        v-if="$x.totalResults"
        class="x-list x-list--vertical x-list--align-start x-padding--bottom-07"
        :class="$x.device === 'mobile' ? 'x-list--gap-07' : 'x-list--gap-06'"
        :items="sortValues"
      >
        <template #default="{ item, isSelected }">
          <RadioButtonSelectedIcon v-if="isSelected" class="x-icon--l" />
          <RadioButtonUnselectedIcon v-else class="x-icon--l" />
          <span class="x-text-neutral-90" :class="{ 'x-font-bold': isSelected }">
            {{ $t(`sort.values.${item || 'default'}`) }}
          </span>
        </template>
      </SortList>
    </template>
  </CustomHeaderTogglePanel>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { Sort } from '@empathyco/x-types';
  import { SortList } from '@empathyco/x-components/search';
  import {
    CheckTinyIcon,
    RadioButtonSelectedIcon,
    RadioButtonUnselectedIcon,
    animateScale
  } from '@empathyco/x-components';
  import CustomHeaderTogglePanel from '../custom-header-toggle-panel.vue';
  @Component({
    components: {
      SortList,
      CheckTinyIcon,
      CustomHeaderTogglePanel,
      RadioButtonSelectedIcon,
      RadioButtonUnselectedIcon
    }
  })
  export default class extends Vue {
    protected animation = animateScale();
    public sortValues: Sort[] = ['', 'price asc', 'price desc'];
  }
</script>

<style lang="scss">
  // TODO: Remove when implementing buttonClass prop in the SortList buttons
  .x-sort-list__button {
    @apply x-button-ghost;
  }
</style>
