<template>
  <div
    v-if="$x.totalResults"
    class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center"
    data-test="total-results"
  >
    <i18n class="x-list__item--expand x-text1 x-text1-lg" path="totalResults.message" tag="span">
      <template #totalResults>
        {{ $x.totalResults }}
      </template>
      <template #query>
        <span class="x-title3">
          {{ query }}
        </span>
      </template>
    </i18n>

    <ColumnPicker data-test="column-picker" />

    <BaseIdModalOpen
      modalId="right-aside"
      class="x-button-lead x-button-ghost"
      data-test="toggle-facets-button"
    >
      <FiltersIcon class="x-icon-lg" />
      <span>{{ $t('toggleAside.showAside') }}</span>
      <span
        v-if="$x.selectedFilters.length"
        :class="{ 'x-badge-circle': $x.selectedFilters.length <= 9 }"
        class="x-badge x-badge-auxiliary"
      >
        {{ $x.selectedFilters.length }}
      </span>
    </BaseIdModalOpen>
  </div>
</template>

<script lang="ts">
  import { BaseIdModalOpen, FiltersIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import ColumnPicker from '../column-picker.vue';

  @Component({
    components: {
      BaseIdModalOpen,
      FiltersIcon,
      ColumnPicker
    }
  })
  export default class DesktopToolbar extends Vue {
    protected get query(): string {
      return this.$x.spellcheckedQuery ? this.$x.spellcheckedQuery : this.$x.query.searchBox;
    }
  }
</script>
