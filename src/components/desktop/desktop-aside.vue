<template>
  <div
    class="xds:flex xds:min-h-0 xds:flex-auto xds:flex-col xds:bg-neutral-0"
    :class="{
      'xds:sticky xds:top-0 xds:max-h-[640px] xds:min-h-37.5 xds:w-85': !facetsPanelOverlay,
    }"
  >
    <div
      v-if="facetsPanelOverlay"
      class="xds:flex xds:items-center xds:border-b xds:border-neutral-90 xds:p-24 xds:pr-32 xds:pl-40"
    >
      <span class="xds:mr-auto xds:title2 xds:uppercase">
        {{ $t('facetsPanel.title') }}
      </span>
      <BaseIdModalClose
        class="xds:button xds:button-circle xds:button-ghost xds:button-lead"
        modal-id="right-aside"
      >
        <CrossIcon class="xds:icon-lg" />
      </BaseIdModalClose>
    </div>

    <SelectedFilters
      v-if="!facetsPanelOverlay && x.selectedFilters.length"
      class="xds:flex xds:flex-col xds:items-stretch xds:gap-16 xds:py-16"
    />

    <div
      class="xds:scroll xds:flex-auto"
      :class="facetsPanelOverlay ? 'xds:p-40 xds:pt-0 xds:pr-24' : 'xds:px-12 xds:pb-40'"
    >
      <CustomFacets v-if="x.totalResults > 0" />
    </div>
    <div
      v-if="facetsPanelOverlay"
      class="xds:flex xds:flex-col xds:gap-16 xds:border-t xds:border-neutral-90 xds:p-40 xds:pt-24 xds:pb-16"
    >
      <SelectedFilters
        v-if="x.selectedFilters.length"
        class="xds:flex xds:flex-col xds:items-stretch xds:gap-16"
      />
      <div class="xds:flex xds:gap-16">
        <ClearFilters
          v-slot="{ selectedFilters }"
          class="xds:flex-auto xds:button-outlined xds:rounded-full xds:button-lead xds:p-24 xds:py-12 xds:uppercase"
          :always-visible="false"
        >
          {{
            $t('selectedFilters.clear', selectedFilters.length, { count: selectedFilters.length })
          }}
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
  </div>
</template>

<script setup lang="ts">
import type { TranslateOptions } from 'vue-i18n'
import { BaseIdModalClose, CrossIcon, use$x } from '@empathyco/x-components'
import { ClearFilters } from '@empathyco/x-components/facets'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import CustomFacets from '../search/facets/custom-facets.vue'
import SelectedFilters from '../search/facets/selected-filters.vue'

const x = use$x()
const { getControlFromPath } = useExperienceControls()
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')
</script>
