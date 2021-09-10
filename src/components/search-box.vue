<template>
  <div
    class="x-input-group"
    :class="$x.device === 'mobile' ? 'x-input-group--card' : 'x-input-group--line'"
  >
    <SearchIcon />
    <SearchInput :placeholder="$t('searchBox.placeholder')" />
    <ClearSearchInput>{{ $t('searchBox.clear') }}</ClearSearchInput>
  </div>
</template>

<script lang="ts">
  import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box';
  import { SearchIcon } from '@empathyco/x-components';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      ClearSearchInput,
      SearchButton,
      SearchIcon,
      SearchInput
    }
  })
  export default class SearchBox extends Vue {}
</script>
