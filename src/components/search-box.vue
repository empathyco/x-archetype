<template>
  <div class="x-input-group x-input-group-lead x-rounded-sm">
    <SearchInput
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="false"
      class="desktop:x-pl-24"
    />

    <ClearSearchInput
      v-if="$x.device === 'desktop' && $x.query.searchBox"
      class="x-input-group-button"
    >
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <SearchButton
      v-if="$x.device === 'desktop' || !$x.query.searchBox"
      class="x-input-group-button-primary"
    >
      <SearchIcon class="x-icon-lg" />
    </SearchButton>

    <ClearSearchInput v-else class="x-input-group-button-primary">
      <CrossTinyIcon class="x-icon-lg" />
    </ClearSearchInput>
  </div>
</template>

<script lang="ts">
  import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box';
  import { CrossTinyIcon, SearchIcon } from '@empathyco/x-components';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      ClearSearchInput,
      CrossTinyIcon,
      SearchButton,
      SearchInput,
      SearchIcon
    }
  })
  export default class SearchBox extends Vue {}
</script>
