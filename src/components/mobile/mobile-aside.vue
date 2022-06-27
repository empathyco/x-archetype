<template>
  <div v-if="$x.totalResults > 0" class="x-list x-list--vertical x-list__item--expand">
    <BaseScroll class="x-list__item--expand x-padding--05">
      <Sort />
      <CustomFacets />
    </BaseScroll>
    <SelectedFilters
      v-if="$x.selectedFilters.length"
      class="x-list x-list--gap-05 x-padding--05 x-border-width--top-01"
    />
    <div class="x-list">
      <MobileCloseAside />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { BaseScroll } from '@empathyco/x-components';
  import CustomFacets from '../search/facets/custom-facets.vue';
  import SelectedFilters from '../search/facets/selected-filters.vue';
  import Sort from '../search/sort.vue';
  import MobileCloseAside from './mobile-close-aside.vue';

  @Component({
    components: {
      BaseScroll,
      CustomFacets,
      MobileCloseAside,
      SelectedFilters,
      Sort
    }
  })
  export default class MobileAside extends Vue {}
</script>

<style lang="scss">
  .x-modal.x-layout__aside {
    .x-modal__content {
      height: calc(100vh - 64px) !important;
      top: 64px;
      position: fixed;
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
    }
  }
</style>
