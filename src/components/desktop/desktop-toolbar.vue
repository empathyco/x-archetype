<template>
  <div
    v-if="$x.totalResults"
    class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center"
    data-test="total-results"
  >
    <span>
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>

    <ColumnPicker v-slot="{ column }" :columns="columnsValues">
      <Grid2ColIcon v-if="column === 4" />
      <Grid1ColIcon v-if="column === 2" />
    </ColumnPicker>

    <BaseIdModalOpen
      modalId="right-aside"
      class="x-button x-button--ghost x-button--ghost-start"
      data-test="toggle-facets-button"
    >
      <template #default="{ isPanelOpen }">
        <FiltersIcon />
        <span v-if="isPanelOpen">{{ $t('toggleAside.hideAside') }}</span>
        <span v-else>{{ $t('toggleAside.showAside') }}</span>
      </template>
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
