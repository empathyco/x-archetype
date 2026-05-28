<template>
  <div
    v-if="x.totalResults"
    class="xds:mb-8 xds:flex xds:items-center xds:justify-end xds:gap-24"
    data-test="total-results"
  >
    <div v-if="!facetsPanelOverlay" class="xds:flex xds:w-full xds:max-w-85 xds:gap-8 xds:title3">
      <FiltersIcon class="xds:icon-lg" />
      <span class="xds:capitalize">{{ $t('toggleAside.showAside') }}</span>
      <span
        v-if="x.selectedFilters.length"
        :class="{ 'xds:badge-circle': x.selectedFilters.length <= 9 }"
        class="xds:badge xds:badge-auxiliary"
      >
        {{ x.selectedFilters.length }}
      </span>
    </div>

    <Translation
      class="xds:flex-auto xds:text1 xds:text1-lg"
      keypath="totalResults.message"
      tag="span"
      scope="global"
      :plural="x.totalResults"
    >
      <template #totalResults>
        {{ x.totalResults }}
      </template>
      <template #query>
        <span class="xds:title3">
          {{ x.spellcheckedQuery || query }}
        </span>
      </template>
    </Translation>

    <ColumnPicker v-if="columnPicker" data-test="column-picker" />

    <BaseIdModalOpen
      v-if="facetsPanelOverlay"
      modal-id="right-aside"
      class="xds:button-ghost xds:button-lead"
      data-test="toggle-facets-button"
    >
      <FiltersIcon class="xds:icon-lg" />
      <span class="xds:capitalize">{{ $t('toggleAside.showAside') }}</span>
      <span
        v-if="x.selectedFilters.length"
        :class="{ 'xds:badge-circle': x.selectedFilters.length <= 9 }"
        class="xds:badge xds:badge-auxiliary"
      >
        {{ x.selectedFilters.length }}
      </span>
    </BaseIdModalOpen>

    <SortSelector />
  </div>
</template>

<script setup lang="ts">
import { BaseIdModalOpen, FiltersIcon, use$x, useGetter } from '@empathyco/x-components'
import { Translation } from 'vue-i18n'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { xControlsState } from '../../x-components/xcontrols'
import ColumnPicker from '../column-picker.vue'
import SortSelector from '../search/sort-selector.vue'

const x = use$x()
const { query } = useGetter('search')

//const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
const columnPicker = xControlsState.gridColumns.columnPicker
//((controls?.gridColumns as Dictionary<unknown>).columnPicker as boolean) ?? xControlsState.gridColumns.columnPicker

const { getControlFromPath } = useExperienceControls()
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')
</script>
