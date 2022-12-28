<template>
  <div
    v-if="$x.totalResults"
    class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center"
    data-test="total-results"
  >
    <span
      v-html="$t('totalResults.message', { totalResults: $x.totalResults, query })"
      class="x-text1 x-text1-lg x-list__item--expand"
    />

    <ColumnPicker data-test="column-picker" />

    <BaseIdModalOpen
      modalId="right-aside"
      class="x-button-lead x-button-ghost"
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
  export default class DesktopToolbar extends Vue {
    protected get query(): string {
      return this.$x.spellcheckedQuery ? this.$x.spellcheckedQuery : this.$x.query.searchBox;
    }
  }
</script>
