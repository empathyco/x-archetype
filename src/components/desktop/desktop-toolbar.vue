<template>
  <div
    v-if="x.totalResults"
    class="xds:mb-8 xds:flex xds:items-center xds:justify-end"
    data-test="desktop-toolbar"
  >
    <div
      v-if="!facetsPanelOverlay"
      class="xds:flex xds:w-full xds:max-w-85 xds:gap-8 xds:text-md xds:font-bold"
    >
      <FiltersIcon class="xds:icon-lg" />
      <span class="xds:capitalize" data-test="desktop-toolbar-filter-text">{{
        t('toggleAside.showAside')
      }}</span>
      <span
        v-if="x.selectedFilters.length"
        :class="{ 'xds:badge-circle': x.selectedFilters.length <= 9 }"
        class="xds:badge xds:badge-auxiliary"
        data-test="desktop-toolbar-selected-filters"
      >
        {{ x.selectedFilters.length }}
      </span>
    </div>

    <Translation
      class="xds:flex-auto xds:text-md"
      keypath="totalResults.message"
      tag="span"
      scope="global"
      :plural="x.totalResults"
    >
      <template #totalResults>
        {{ x.totalResults }}
      </template>
      <template #query>
        <span class="xds:font-bold">
          {{ x.spellcheckedQuery || query }}
        </span>
      </template>
    </Translation>

    <ColumnPicker v-if="gridConfig.columnPicker" />

    <BaseIdModalOpen
      v-if="facetsPanelOverlay"
      modal-id="right-aside"
      class="xds:button-ghost xds:button-lead xds:px-8 xds:text-md xds:font-regular"
      data-test="desktop-toolbar-toggle-facets-button"
    >
      <FiltersIcon class="xds:icon-lg" />
      <span data-test="desktop-toolbar-filter-text">{{ t('toggleAside.showAside') }}</span>
      <span
        v-if="x.selectedFilters.length"
        :class="{ 'xds:badge-circle': x.selectedFilters.length <= 9 }"
        class="xds:badge xds:badge-auxiliary"
        data-test="desktop-toolbar-selected-filters-badge"
      >
        {{ x.selectedFilters.length }}
      </span>
    </BaseIdModalOpen>

    <SortSelector />
  </div>
</template>

<script setup lang="ts">
import { BaseIdModalOpen, FiltersIcon, use$x, useGetter } from '@empathyco/x-components'
import { Translation, useI18n } from 'vue-i18n'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import ColumnPicker from '../column-picker.vue'
import SortSelector from '../search/sort-selector.vue'

const { t } = useI18n()
const x = use$x()
const { query } = useGetter('search')
const { getControlFromPath } = useExperienceControls()

const facetsPanelOverlay = getControlFromPath<boolean>('facetsPanelOverlay')
const gridConfig = getControlFromPath<{ columnPicker: boolean }>('gridConfig')
</script>
