<template>
  <div
    v-if="x.totalResults"
    class="x-flex x-items-center x-justify-end x-gap-24"
    :class="{ 'x-mb-8': !x.selectedFilters.length }"
    data-test="total-results"
  >
    <i18n-t
      class="x-text1 x-text1-lg x-flex-auto"
      keypath="totalResults.message"
      tag="span"
      scope="global"
      :plural="x.totalResults"
    >
      <template #totalResults>
        {{ x.totalResults }}
      </template>
      <template #query>
        <span class="x-title3">
          {{ x.spellcheckedQuery || x.query.search }}
        </span>
      </template>
    </i18n-t>

    <ColumnPicker data-test="column-picker" />

    <BaseIdModalOpen
      modal-id="right-aside"
      class="x-button-lead x-button-ghost"
      data-test="toggle-facets-button"
    >
      <FiltersIcon class="x-icon-lg" />
      <span class="x-capitalize">{{ $t('toggleAside.showAside') }}</span>
      <span
        v-if="x.selectedFilters.length"
        :class="{ 'x-badge-circle': x.selectedFilters.length <= 9 }"
        class="x-badge x-badge-auxiliary"
      >
        {{ x.selectedFilters.length }}
      </span>
    </BaseIdModalOpen>
  </div>
</template>

<script lang="ts">
import { BaseIdModalOpen, FiltersIcon, use$x } from '@empathyco/x-components'
import { defineComponent } from 'vue'
import ColumnPicker from '../column-picker.vue'

export default defineComponent({
  components: {
    BaseIdModalOpen,
    FiltersIcon,
    ColumnPicker,
  },
  setup() {
    return { x: use$x() }
  },
})
</script>
