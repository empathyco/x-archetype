<template>
  <div v-if="selectedFilters.length" class="x-ellipsis">
    <span
      v-if="selectedFilters.length >= 0"
      class="
        x-small
        x-background--accent
        x-font-color--neutral-100
        x-border-radius--pill
        x-padding--left-04 x-padding--right-04 x-padding--top-01 x-padding--bottom-01
      "
    >
      {{ selectedFilters.length }}
    </span>
  </div>
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
