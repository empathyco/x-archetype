<template>
  <div class="x-input-group x-input-group--line x-list__item--expand">
    <SearchIcon />
    <SearchInput :placeholder="$t('searchBox.placeholder')" />
    <ClearSearchInput>{{ $t('searchBox.clear') }}</ClearSearchInput>
  </div>
</template>

<script lang="ts">
  import { ClearSearchInput, SearchButton, SearchInput } from '@empathy/x-components/search-box';
  import { SearchIcon } from '@empathy/x-components';
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
