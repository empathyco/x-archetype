<template>
  <div
    v-if="$x.totalResults > 0"
    class="
      x-list
      x-list--vertical
      x-list__item--expand
      x-list--padding-05
      x-list--padding-left
      x-list--padding-right
    "
  >
    <BaseScroll class="x-list__item--expand">
      <Sort class="x-list--padding-04 x-list--padding-bottom" />
      <CustomFacets class="x-list--gap-06 x-list--padding-04 x-list--padding-bottom" />
    </BaseScroll>
    <SelectedFilters
      v-if="$x.selectedFilters.length"
      class="
        x-list x-list--gap-05 x-list--padding-04 x-list--padding-bottom
        x-border-width--top-01
        x-padding--top-03
      "
    />
    <div class="x-list x-list--padding-03 x-list--padding-bottom">
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
