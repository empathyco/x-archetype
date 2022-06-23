<template>
  <div
    class="
      x-list x-list--horizontal x-list--gap-05
      x-border-color--neutral-10
      x-padding--05 x-padding--top-03 x-padding--bottom-04
    "
  >
    <ClearFilters
      v-slot="{ selectedFilters }"
      class="
        x-button--secondary x-button--round
        x-padding--05 x-padding--top-04 x-padding--bottom-04
        x-uppercase
        x-list__item--expand
      "
      :alwaysVisible="false"
    >
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>
    <BaseIdModalClose
      class="
        x-button--round
        x-padding--05 x-padding--top-04 x-padding--bottom-04
        x-list__item--expand
      "
      modalId="aside-modal"
    >
      {{ $t('facetsPanel.viewResults', { totalResults: $x.totalResults }) }}
    </BaseIdModalClose>
  </div>
</template>

<script lang="ts">
  import { BaseIdModalClose, FiltersIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { ClearFilters } from '@empathyco/x-components/facets';

  @Component({
    components: { BaseIdModalClose, FiltersIcon, ClearFilters }
  })
  export default class MobileCloseAside extends Vue {}
</script>
