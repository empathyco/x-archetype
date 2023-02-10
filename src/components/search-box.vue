<template>
  <div class="x-input-group x-input-group--card x-border-color--lead">
    <SearchInput
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :class="$x.device === 'mobile' ? 'x-padding--left-05' : 'x-padding--left-08'"
    />

    <!-- TODO: Remove x-max-h when implementing XDS input-group -->
    <ClearSearchInput
      v-if="$x.device === 'desktop' && $x.query.searchBox"
      class="x-button-lead !x-button-sm x-button-ghost x-max-h-32"
    >
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <button
      v-if="$x.device === 'desktop' || !$x.query.searchBox"
      class="x-input-group__action x-button x-button-lead x-button-square"
    >
      <SearchIcon class="x-icon-lg" />
    </button>
    <ClearSearchInput v-else class="x-input-group__action x-button-lead x-button-square">
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
