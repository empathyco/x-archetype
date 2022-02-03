<template>
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
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { Sort } from '@empathyco/x-types';
  import { SortDropdown } from '@empathyco/x-components/search';
  import { CheckTinyIcon, ChevronTinyDownIcon, CollapseFromTop } from '@empathyco/x-components';

  @Component({
    components: {
      SortDropdown,
      CheckTinyIcon,
      ChevronTinyDownIcon
    }
  })
  export default class extends Vue {
    protected collapseFromTop = CollapseFromTop;
    public sortValues: Sort[] = ['', 'price asc', 'price desc'];
  }
</script>
