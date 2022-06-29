<template>
  <div
    v-if="$x.totalResults"
    class="x-list x-list--horizontal x-list--gap-07 x-list--justify-end x-list--align-center"
    data-test="total-results"
  >
    <span
      v-html="
        $t('totalResults.message', { totalResults: $x.totalResults, query: $x.query.searchBox })
      "
      class="x-list__item--expand"
    />

    <ColumnPicker />

    <BaseIdModalOpen
      modalId="right-aside"
      class="x-button x-button--ghost x-button--ghost-end x-padding--left-00"
      data-test="toggle-facets-button"
    >
      <FiltersIcon />
      <span>{{ $t('toggleAside.showAside') }}</span>
      <span
        v-if="$x.selectedFilters.length"
        class="
          x-background--accent
          x-border-radius--20
          x-padding--01 x-padding--right-03 x-padding--left-03
          x-text--light
          x-font-color--neutral-100
          x-font-size--04
        "
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
  export default class DesktopToolbar extends Vue {}
</script>
