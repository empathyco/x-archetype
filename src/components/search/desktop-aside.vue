<template>
  <div class="x-flex x-min-h-0 x-flex-auto x-flex-col x-bg-neutral-0">
    <div class="x-flex x-items-center x-border-b x-border-neutral-90 x-p-24 x-pl-40 x-pr-32">
      <span class="x-title2 x-mr-auto x-uppercase">
        {{ $t('facetsPanel.title') }}
      </span>
      <BaseIdModalClose class="x-button-lead x-button-circle x-button-ghost" modal-id="right-aside">
        <CrossIcon class="x-icon-lg" />
      </BaseIdModalClose>
    </div>
    <div class="x-scroll x-flex-auto x-p-40 x-pr-24 x-pt-0">
      <Sort />
      <CustomFacets v-if="x.totalResults > 0" />
    </div>
    <div class="x-flex x-gap-16 x-border-t x-border-neutral-90 x-p-40 x-pb-16 x-pt-24">
      <ClearFilters
        v-slot="{ selectedFilters }"
        class="x-button-lead x-button-outlined x-flex-auto x-rounded-full x-p-24 x-py-12 x-uppercase"
        :always-visible="false"
      >
        {{ $t('selectedFilters.clear', selectedFilters.length, { count: selectedFilters.length }) }}
      </ClearFilters>
      <BaseIdModalClose
        class="x-button-lead x-flex-auto x-rounded-full x-p-24 x-py-12 x-uppercase"
        modal-id="right-aside"
      >
        {{ $t('facetsPanel.viewResults', x.totalResults, { count: x.totalResults }) }}
      </BaseIdModalClose>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseIdModalClose, CrossIcon, use$x } from '@empathyco/x-components'
import { ClearFilters } from '@empathyco/x-components/facets'
import { defineComponent } from 'vue'
import CustomFacets from './facets/custom-facets.vue'
import Sort from './sort.vue'

export default defineComponent({
  components: {
    CustomFacets,
    Sort,
    BaseIdModalClose,
    CrossIcon,
    ClearFilters,
  },
  setup() {
    return { x: use$x() }
  },
})
</script>
