<template>
  <div
    class="x-list x-list--horizontal x-list--gap-05 x-border-width--top-01 x-border-color--neutral-95 x-padding--top-06 x-padding--bottom-06 x-margin--right-05 x-margin--left-05"
  >
    <ClearFilters
      v-slot="{ selectedFilters }"
      class="x-border-radius--20 x-padding--top-04 x-padding--bottom-04 x-uppercase x-list__item--expand x-button-lead x-button-outlined"
      :alwaysVisible="false"
    >
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>
    <BaseIdModalClose
      class="x-border-radius--20 x-padding--top-04 x-padding--bottom-04 x-list__item--expand x-button-lead"
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
