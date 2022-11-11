<template>
  <CustomHeaderTogglePanel
    :data-test="'sort'"
    class="x-border-width--bottom-01 x-border-width--00 x-border-color--neutral-95"
  >
    <template #header>
      <span class="x-font-size--05 x-font-weight--bold x-padding--bottom-02">
        {{ $t('sort.label') }}
      </span>
      {{ $t(`sort.values.${$x.selectedSort || 'default'}`) }}
    </template>
    <template #default>
      <SortList
        v-if="$x.totalResults"
        class="x-list x-list--vertical x-list--align-start x-list--gap-06 x-padding--bottom-05"
        :items="sortValues"
      >
        <template #default="{ item, isSelected }">
          <RadioButtonSelectedIcon v-if="isSelected" class="x-icon--l" />
          <RadioButtonUnselectedIcon v-else class="x-icon--l" />
          <span class="x-font-color--neutral-10" :class="{ 'x-text--bold': isSelected }">
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
