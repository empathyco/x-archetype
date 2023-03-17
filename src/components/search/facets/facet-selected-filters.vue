<template>
  <span
    v-if="selectedFilters.length > 0"
    :class="{ 'x-badge-circle': $x.selectedFilters.length <= 9 }"
    class="x-badge x-badge-auxiliary"
  >
    {{ selectedFilters.length }}
  </span>
</template>

<script lang="ts">
  import { FacetFilter } from '@empathyco/x-types';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class FacetSelectedFilters extends Vue {
    @Prop({ required: true })
    public selectedFilters!: FacetFilter[];
  }
</script>
