<template>
  <div
    class="xds:flex xds:min-h-0 xds:flex-auto xds:flex-col xds:bg-neutral-0"
    :class="{
      'xds:sticky xds:top-0 xds:max-h-[640px] xds:min-h-[150px] xds:w-[340px]': !facetsPanelOverlay,
    }"
  >
    <div
      class="xds:flex xds:items-center xds:border-b xds:border-neutral-90 xds:p-24 xds:pr-32 xds:pl-40"
    >
      <span class="xds:mr-auto xds:title2 xds:uppercase">
        {{ $t('facetsPanel.title') }}
      </span>
      <BaseIdModalClose
        v-if="facetsPanelOverlay"
        class="xds:button xds:button-circle xds:button-ghost xds:button-lead"
        modal-id="right-aside"
      >
        <CrossIcon class="xds:icon-lg" />
      </BaseIdModalClose>
    </div>
    <div class="xds:scroll xds:flex-auto xds:p-40 xds:pt-0 xds:pr-24">
      <Sort />
      <CustomFacets v-if="x.totalResults > 0" />
    </div>
    <div
      v-if="facetsPanelOverlay"
      class="xds:flex xds:gap-16 xds:border-t xds:border-neutral-90 xds:p-40 xds:pt-24 xds:pb-16"
    >
      <ClearFilters
        v-slot="{ selectedFilters }"
        class="xds:flex-auto xds:button-outlined xds:rounded-full xds:button-lead xds:p-24 xds:py-12 xds:uppercase"
        :always-visible="false"
      >
        {{ $t('selectedFilters.clear', selectedFilters.length, { count: selectedFilters.length }) }}
      </ClearFilters>
      <BaseIdModalClose
        class="xds:flex-auto xds:rounded-full xds:button-lead xds:p-24 xds:py-12 xds:uppercase"
        modal-id="right-aside"
      >
        {{
          $t('facetsPanel.viewResults', x.totalResults, {
            count: x.totalResults,
          } as TranslateOptions)
        }}
      </BaseIdModalClose>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TranslateOptions } from 'vue-i18n'
import { BaseIdModalClose, CrossIcon, use$x } from '@empathyco/x-components'
import { ClearFilters } from '@empathyco/x-components/facets'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import CustomFacets from './facets/custom-facets.vue'
import Sort from './sort.vue'

const x = use$x()
const { getControlFromPath } = useExperienceControls()
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')
</script>
