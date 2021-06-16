<template>
  <BaseHeaderTogglePanel class="x-facet" :startCollapsed="true" :animation="collapseFromTop">
    <template #header-content="{ open }">
      <span>{{ $t(`facets.${facet.label}`) }}</span>
      <ChevronDownIcon v-if="open" class="x-icon__up" />
      <ChevronDownIcon v-else class="x-icon__down" />
    </template>
    <slot />
  </BaseHeaderTogglePanel>
</template>

<script lang="ts">
  import { Facet } from '@empathy/search-types';
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import {
    BaseHeaderTogglePanel,
    CollapseFromTop,
    ChevronDownIcon,
    ChevronUpIcon
  } from '@empathy/x-components';
  import { SelectedFilters } from '@empathy/x-components/facets';

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

<style scoped lang="scss">
  .x-icon {
    transition: transform 0.3s ease-in-out;
    &__up {
      transform: rotate(180deg);
    }

    &__down {
      transform: rotate(0deg);
    }
  }
</style>
