<template>
  <div class="x-input-group x-input-group--card x-border-color--lead">
    <SearchInput
      :placeholder="$t('searchBox.placeholder')"
      :class="$x.device === 'mobile' ? 'x-padding--left-05' : 'x-padding--left-08'"
    />

    <ClearSearchInput v-if="$x.device === 'desktop' && $x.query.searchBox" class="x-font-size--04">
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <button
      v-if="$x.device === 'desktop' || !$x.query.searchBox"
      class="x-button x-input-group__action"
    >
      <SearchTinyIcon class="x-icon--l" />
    </button>
    <ClearSearchInput v-else class="x-input-group__action">
      <CrossTinyIcon class="x-icon--l" />
    </ClearSearchInput>
  </div>
</template>

<script lang="ts">
  import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box';
  import { CrossTinyIcon, SearchTinyIcon } from '@empathyco/x-components';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      ClearSearchInput,
      CrossTinyIcon,
      SearchButton,
      SearchInput,
      SearchTinyIcon
    }
  })
  export default class SearchBox extends Vue {}
</script>
