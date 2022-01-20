<template>
  <div>
    <div v-if="$x.device === 'mobile'">
      <BaseScroll class="x-list__item--expand">
        <Sort class="x-list--padding-04 x-list--padding-bottom" />
        <Facets class="x-list--gap-06 x-list--padding-04 x-list--padding-bottom" />
      </BaseScroll>
      <SelectedFilters
        v-if="$x.selectedFilters.length"
        class="x-list x-list--gap-05 x-list--padding-04 x-list--padding-bottom"
      />
    </div>
    <div v-else>
      <SelectedFilters
        v-if="$x.totalResults > 0"
        class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom"
      />
      <Facets
        v-if="$x.totalResults > 0"
        class="x-list--gap-06 x-list--padding-05 x-list--padding-top"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { BaseScroll } from '@empathyco/x-components';
  import Component from 'vue-class-component';
  import Sort from '../sort.vue';
  import Facets from './facets.vue';
  import SelectedFilters from './selected-filters.vue';

  @Component({
    components: {
      BaseScroll,
      Sort,
      SelectedFilters,
      Facets
    }
  })
  export default class FacetsAndFilters extends Vue {}
</script>

<style scoped></style>
