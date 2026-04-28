<template>
  <div
    class="xds:flex xds:min-h-0 xds:flex-auto xds:flex-col xds:bg-neutral-0"
    :class="{
      'xds:sticky xds:top-0 xds:max-h-[640px] xds:min-h-[150px] xds:w-[340px]': !facetsPanelOverlay,
    }"
  >
    <div class="xds:scroll xds:flex-auto xds:px-12 xds:pb-40">
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
import { BaseIdModalClose, use$x } from '@empathyco/x-components'
import { ClearFilters } from '@empathyco/x-components/facets'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import CustomFacets from './facets/custom-facets.vue'

const x = use$x()
const { getControlFromPath } = useExperienceControls()
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')
</script>
