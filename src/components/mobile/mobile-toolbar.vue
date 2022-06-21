<template>
  <div
    class="x-list x-list--horizontal x-list--align-center x-list--padding-03 x-list__item--expand"
  >
    <span v-if="$x.totalResults" class="x-list__item--expand">
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>

    <ColumnPicker v-slot="{ column }" :columns="columnsValues">
      <Grid2ColIcon v-if="column === 2" />
      <Grid1ColIcon v-if="column === 1" />
    </ColumnPicker>

    <EnvSelector />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { BaseColumnPickerList, Grid2ColIcon, Grid1ColIcon } from '@empathyco/x-components';
  import EnvSelector from '../env-selector.vue';

  @Component({
    components: {
      ColumnPicker: BaseColumnPickerList,
      EnvSelector,
      Grid2ColIcon,
      Grid1ColIcon
    }
  })
  export default class MobileToolbar extends Vue {
    public columnsValues: number[] = [2, 1];
  }
</script>
