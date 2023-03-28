<template>
  <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
    <span class="x-uppercase x-title4">{{ $t('columnPicker.message') }}</span>
    <!-- eslint-disable max-len-->
    <BaseColumnPickerList
      :columns="values"
      buttonClass="x-button-sm x-button-square x-button-tight x-text-neutral-25
      selected:x-text-neutral-90"
    >
      <template #divider>
        <span class="x-button-group-divider" />
      </template>
      <template #default="{ column }">
        <component :is="icon(column)" class="x-icon-lg" />
      </template>
    </BaseColumnPickerList>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {
    BaseColumnPickerList,
    Grid1ColIcon,
    Grid2ColIcon,
    Grid4ColIcon
  } from '@empathyco/x-components';

  @Component({
    components: {
      BaseColumnPickerList,
      Grid1ColIcon,
      Grid2ColIcon,
      Grid4ColIcon
    }
  })
  export default class ColumnPicker extends Vue {
    protected get values(): number[] {
      return this.$x.device === 'mobile' ? [2, 1] : [4, 2];
    }

    protected icon(column: number): string {
      if (this.$x.device === 'mobile') {
        return column === 2 ? 'Grid2ColIcon' : 'Grid1ColIcon';
      } else {
        return column === 4 ? 'Grid4ColIcon' : 'Grid2ColIcon';
      }
    }
  }
</script>
