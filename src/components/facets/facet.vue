<template>
  <BaseHeaderTogglePanel class="x-facet" :startCollapsed="true" :animation="collapseFromTop">
    <template #header-content="{ open }">
      <span>{{ $t(`facets.${facet.label}`) }}</span>
      <ChevronUpIcon v-if="open" />
      <ChevronDownIcon v-else />
    </template>
    <slot />
  </BaseHeaderTogglePanel>
</template>

<script lang="ts">
  import { Facet } from '@empathyco/x-types';
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import {
    BaseHeaderTogglePanel,
    CollapseFromTop,
    ChevronDownIcon,
    ChevronUpIcon
  } from '@empathyco/x-components';
  import { SelectedFilters } from '@empathyco/x-components/facets';

  @Component({
    components: {
      BaseHeaderTogglePanel,
      ChevronDownIcon,
      ChevronUpIcon,
      SelectedFilters
    }
  })
  export default class FacetComponent extends Vue {
    public collapseFromTop = CollapseFromTop;

    @Prop()
    public facet?: Facet;
  }
</script>
