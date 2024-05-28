<template>
  <div
    class="x-flex x-flex-col x-gap-24 x-p-4"
    :class="{ 'x-mb-8': !$x.selectedFilters.length }"
    data-test="total-results"
  >
    <div class="x-flex x-justify-end">
      <SearchModeSelector v-if="$x.query.searchBox" />

      <ColumnPicker v-if="$x.totalResults" data-test="column-picker" />

      <BaseIdModalOpen
        v-if="$x.totalResults"
        modalId="right-aside"
        class="x-button-lead x-button-ghost"
        data-test="toggle-facets-button"
      >
        <FiltersIcon class="x-icon-lg" />
        <span>{{ $t('toggleAside.showAside') }}</span>
        <span
          v-if="$x.selectedFilters.length"
          :class="{ 'x-badge-circle': $x.selectedFilters.length <= 9 }"
          class="x-badge x-badge-lead"
        >
          {{ $x.selectedFilters.length }}
        </span>
      </BaseIdModalOpen>
    </div>
    <div v-if="$x.totalResults">
      <i18n class="x-text1 x-text1-lg x-flex-auto" path="totalResults.message" tag="span">
        <template #totalResults>
          {{ $x.totalResults }}
        </template>
        <template #query>
          <span class="x-title3">
            {{ $x.spellcheckedQuery || $x.query.search }}
          </span>
        </template>
      </i18n>
    </div>
  </div>
</template>

<script lang="ts">
  import { BaseIdModalOpen, FiltersIcon } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import ColumnPicker from '../column-picker.vue';
  import SearchModeSelector from '../../components/search-mode-selector.vue';

  export default defineComponent({
    components: {
      SearchModeSelector,
      BaseIdModalOpen,
      FiltersIcon,
      ColumnPicker
    }
  });
</script>
