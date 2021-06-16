<template>
  <div class="x-list x-list--horizontal x-list--gap-06 x-list--justify-end x-list--align-center">
    <span v-if="$x.totalResults">
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>

    <ColumnPicker #default="{ column }" :columns="columnsValues">
      <span v-if="column === 0">auto</span>
      <span v-else>{{ column }}</span>
    </ColumnPicker>

    <SortDropdown v-if="$x.totalResults" class="x-dropdown--l" :items="sortValues">
      <template #toggle="{ item, isOpen }">
        <span class="x-text">{{ $t('sort.label') }}</span>
        <span class="x-text x-list__item--expand">{{ item || 'Default' }}</span>
        <ChevronTinyUpIcon v-if="isOpen" />
        <ChevronTinyDownIcon v-else />
      </template>

      <template #item="{ item, isHighlighted, isSelected }">
        <span class="x-text x-list__item--expand">{{ item || 'Default' }}</span>
        <CheckTinyIcon v-if="isSelected" />
      </template>
    </SortDropdown>
  </div>
</template>

<script lang="ts">
  import {
    BaseColumnPickerList,
    CheckTinyIcon,
    ChevronTinyDownIcon,
    ChevronTinyUpIcon
  } from '@empathy/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { Sort } from '@empathy/search-types';
  import { SortDropdown } from '@empathy/x-components/search';

  @Component({
    components: {
      CheckTinyIcon,
      ChevronTinyDownIcon,
      ChevronTinyUpIcon,
      ColumnPicker: BaseColumnPickerList,
      SortDropdown
    }
  })
  export default class SortComponent extends Vue {
    public columnsValues: number[] = [4, 6, 0];
    public sortValues: Sort[] = ['', 'price asc', 'price desc'];
  }
</script>
