<template>
  <span
    v-if="selectedFilters.length > 0"
    class="
      x-small
      x-background--accent
      x-font-color--neutral-100
      x-border-radius--20
      x-padding--01 x-padding--right-03 x-padding--left-03
    "
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
