<template>
  <div class="x-list x-list--horizontal x-list--align-center x-list--gap-05">
    <span class="x-uppercase">{{ $t('columnPicker.message') }}</span>

    <BaseColumnPickerList v-slot="{ column }" :columns="columnsValues">
      <component :is="columnIcon(column)" class="x-icon--l" />
    </BaseColumnPickerList>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { BaseColumnPickerList, Grid1ColIcon, Grid2ColIcon } from '@empathyco/x-components';

  @Component({
    components: {
      BaseColumnPickerList,
      Grid1ColIcon,
      Grid2ColIcon
    }
  })
  export default class ColumnPicker extends Vue {
    public get columnsValues(): number[] {
      return this.$x.device === 'mobile' ? [2, 1] : [4, 2];
    }

    columnIcon(column: number): unknown {
      if (this.$x.device === 'mobile') {
        return column === 2 ? Grid2ColIcon : Grid1ColIcon;
      } else {
        return column === 4 ? Grid2ColIcon : Grid1ColIcon;
      }
    }
  }
</script>
