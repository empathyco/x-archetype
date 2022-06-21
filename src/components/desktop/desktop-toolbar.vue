<template>
  <div
    v-if="$x.totalResults"
    class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center"
    data-test="total-results"
  >
    <span
      v-html="
        $t('totalResults.message', { totalResults: $x.totalResults, query: $x.query.searchBox })
      "
      class="x-list__item--expand"
    />

    <ColumnPicker v-slot="{ column }" :columns="columnsValues">
      <Grid2ColIcon v-if="column === 4" />
      <Grid1ColIcon v-if="column === 2" />
    </ColumnPicker>

    <BaseIdModalOpen
      modalId="right-aside"
      class="x-button x-button--ghost x-button--ghost-start"
      data-test="toggle-facets-button"
    >
      <FiltersIcon />
      <span>{{ $t('toggleAside.showAside') }}</span>
    </BaseIdModalOpen>
  </div>
</template>

<script lang="ts">
  import {
    BaseColumnPickerList,
    BaseIdModalOpen,
    FiltersIcon,
    Grid2ColIcon,
    Grid1ColIcon
  } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      BaseIdModalOpen,
      ColumnPicker: BaseColumnPickerList,
      FiltersIcon,
      Grid2ColIcon,
      Grid1ColIcon
    }
  })
  export default class DesktopToolbar extends Vue {
    public columnsValues: number[] = [4, 2];
  }
</script>
