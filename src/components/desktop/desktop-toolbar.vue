<template>
  <div
    v-if="x.totalResults"
    class="xds:flex xds:items-center xds:justify-end xds:gap-24"
    :class="{ 'xds:mb-8': !x.selectedFilters.length }"
    data-test="total-results"
  >
    <i18n-t
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
    </i18n-t>

    <ColumnPicker data-test="column-picker" />

    <BaseIdModalOpen
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
import ColumnPicker from '../column-picker.vue'
import SortSelector from '../search/sort-selector.vue'

const x = use$x()
const { query } = useGetter('search')
</script>
