<template>
  <div class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center">
    <span v-if="$x.totalResults">
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>

    <ColumnPicker #default="{ column }" :columns="columnsValues">
      <span v-if="column === 0">auto</span>
      <span v-else>{{ column }}</span>
    </ColumnPicker>

    <SortDropdown
      v-if="$x.totalResults"
      class="x-dropdown--l"
      :items="sortValues"
      :animation="collapseFromTop"
    >
      <template #toggle="{ item }">
        <span>{{ $t('sort.label') }}</span>
        <!--TODO: remove the `x-text` class when this task done:
        https://searchbroker.atlassian.net/browse/EX-4196-->
        <span class="x-text x-dropdown__toggle-selected-value x-list__item--expand">
          {{ item || 'Default' }}
        </span>
        <ChevronTinyDownIcon />
      </template>

      <template #item="{ item, isHighlighted, isSelected }">
        <!--TODO: remove the `x-text` class when this task done:
        https://searchbroker.atlassian.net/browse/EX-4196-->
        <span class="x-text x-list__item--expand">{{ item || 'Default' }}</span>
        <CheckTinyIcon v-if="isSelected" />
      </template>
    </SortDropdown>

    <RenderlessExtraParams
      #default="{ value, updateValue }"
      name="extraParamName"
      defaultValue="en"
    >
      <BaseDropdown
        @change="updateValue"
        class="x-dropdown"
        :value="value"
        :items="catalogs"
        :animation="collapseFromTop"
      >
        <template #toggle>
          <span class="x-text x-extra-params-name">{{ catalogExtraParam }}:</span>
          <span class="x-text--bold x-text">{{ value }}</span>
          <ChevronTinyDownIcon />
        </template>
        <template #item="{ item, isSelected }">
          <span class="x-text">{{ item }}</span>
          <CheckTinyIcon v-if="isSelected" />
        </template>
      </BaseDropdown>
    </RenderlessExtraParams>
  </div>
</template>

<script lang="ts">
  import {
    BaseColumnPickerList,
    BaseDropdown,
    CheckTinyIcon,
    ChevronTinyDownIcon,
    ChevronTinyUpIcon,
    CollapseFromTop
  } from '@empathyco/x-components';
  import { RenderlessExtraParams } from '@empathyco/x-components/extra-params';
  import { Component, Vue } from 'vue-property-decorator';
  import { Sort } from '@empathyco/x-types';
  import { SortDropdown } from '@empathyco/x-components/search';

  @Component({
    components: {
      CheckTinyIcon,
      ChevronTinyDownIcon,
      ChevronTinyUpIcon,
      ColumnPicker: BaseColumnPickerList,
      SortDropdown,
      RenderlessExtraParams,
      BaseDropdown
    }
  })
  export default class SortComponent extends Vue {
    public columnsValues: number[] = [4, 6, 0];
    public sortValues: Sort[] = ['', 'price asc', 'price desc'];
    public catalogs: string[] = ['en', 'es'];
    public catalogExtraParam = 'catalog';

    protected collapseFromTop = CollapseFromTop;
  }
</script>

<style scoped lang="scss">
  .x-extra-params-name {
    &:first-letter {
      text-transform: uppercase;
    }
  }
</style>
