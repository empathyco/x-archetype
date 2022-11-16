<template>
  <div class="x-background--neutral-100 x-list__item--expand x-list x-list--vertical">
    <div
      class="
        x-list x-list--horizontal x-list--align-center
        x-border-width--bottom-01
        x-border-color--neutral-10
        x-padding--06 x-padding--right-09 x-padding--left-08
      "
    >
      <span class="x-title2 x-font-color--neutral-10 x-font-weight--bold x-margin--right-auto">
        {{ $t('facetsPanel.title') }}
      </span>
      <BaseIdModalClose class="x-button-lead x-button-circle x-button-ghost" modalId="right-aside">
        <CrossTinyIcon class="x-icon--l" />
      </BaseIdModalClose>
    </div>
    <div class="x-scroll x-list__item--expand x-padding--08 x-padding--top-00">
      <Sort />
      <CustomFacets v-if="$x.totalResults > 0" />
    </div>
    <div
      class="
        x-list x-list--horizontal x-list--gap-05
        x-border-width--top-01
        x-border-color--neutral-10
        x-padding--08 x-padding--top-06 x-padding--bottom-05
      "
    >
      <ClearFilters
        v-slot="{ selectedFilters }"
        class="
          x-button-lead x-button-outlined
          x-border-radius--20
          x-padding--06 x-padding--top-04 x-padding--bottom-04
          x-uppercase
          x-list__item--expand
        "
        :alwaysVisible="false"
      >
        {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
      </ClearFilters>
      <BaseIdModalClose
        class="
          x-button-lead
          x-border-radius--20
          x-padding--06 x-padding--top-04 x-padding--bottom-04
          x-list__item--expand
        "
        modalId="right-aside"
      >
        {{ $t('facetsPanel.viewResults', { totalResults: $x.totalResults }) }}
      </BaseIdModalClose>
    </div>
  </div>
</template>

<script lang="ts">
  import { BaseIdModalClose, CrossTinyIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { ClearFilters } from '@empathyco/x-components/facets';
  import CustomFacets from './facets/custom-facets.vue';
  import Sort from './sort.vue';

  @Component({
    components: {
      CustomFacets,
      Sort,
      BaseIdModalClose,
      CrossTinyIcon,
      ClearFilters
    }
  })
  export default class DesktopAside extends Vue {}
</script>

<style scoped></style>
