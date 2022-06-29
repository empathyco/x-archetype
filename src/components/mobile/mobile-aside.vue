<template>
  <div v-if="$x.totalResults > 0" class="x-list x-list--vertical x-list__item--expand">
    <BaseScroll class="x-list__item--expand x-padding--05">
      <Sort />
      <CustomFacets />
    </BaseScroll>
    <div class="x-list x-border-width--top-01">
      <SelectedFilters
        v-if="$x.selectedFilters.length"
        class="x-list x-list--gap-05 x-padding--top-05 x-padding--bottom-05"
      />
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
  .x-mobile {
    .x-modal.x-layout__aside {
      .x-modal__content {
        height: calc(100% - 64px) !important;
        top: 64px;
        position: fixed;
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
      }
    }
  }
</style>
