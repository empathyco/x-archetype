<template>
  <Layout class="x-layout">
    <template #header-middle>
      <div
        class="x-list x-list--vertical x-list--gap-05 x-list--align-stretch x-list__item--expand"
      >
        <SearchBox />
        <RelatedTags :animation="resultsAnimation" />
      </div>
    </template>

    <template #header-end>
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-06">
        <button class="x-button x-button--ghost">
          <CartIcon class="x-icon--l" />
        </button>
        <Close class="x-button--ghost" modalId="x-components-app">
          <CloseIcon class="x-icon--l" />
        </Close>
      </div>
    </template>

    <template #empathize>
      <Empathize />
    </template>

    <template #toolbar-body>
      <nav v-if="$x.totalResults" class="x-toolbar">
        <ColumnPicker :columns="[4, 6]" />
        <Sort />
      </nav>
    </template>

    <template #main-aside>
      <SelectedFilters>
        <template #default="{ selectedFilters }">
          Filters selected: {{ selectedFilters.length }}
        </template>
      </SelectedFilters>
      <SelectedFiltersList />
      <ClearFilters v-slot="{ selectedFilters }" :alwaysVisible="false">
        Clear {{ selectedFilters.length }} filters
      </ClearFilters>
      <Facets />
    </template>

    <template #main-body>
      <Spellcheck />

      <div v-if="!$x.totalResults && $x.query.searchBox" class="x-no-results">
        <span>No results found for '{{ $x.query.search }}'.Try with another query.</span>
      </div>

      <Recommendations v-if="!$x.totalResults" />
      <ResultsList v-infinite-scroll:body-scroll>
        <template #layout="{ results }">
          <BaseVariableColumnGrid
            #default="{ item: result }"
            :animation="resultsAnimation"
            :items="results"
          >
            <Result :result="result" />
          </BaseVariableColumnGrid>
        </template>
      </ResultsList>
      <PartialResults />

      <ScrollToTop scroll-id="mainScroll" :threshold-px="100">⬆</ScrollToTop>
    </template>
  </Layout>
</template>

<script lang="ts">
  import { RelatedTags } from '@empathy/x-components/related-tags';
  import { ClearFilters, SelectedFiltersList, SelectedFilters } from '@empathy/x-components/facets';
  import {
    BaseVariableColumnGrid,
    BaseColumnPickerList,
    BaseScroll,
    BaseScrollToTop,
    CartIcon,
    CloseIcon,
    StaggeredFadeAndSlide,
    BaseIdModalClose,
    Layout,
    infiniteScroll
  } from '@empathy/x-components';
  import { ResultsList } from '@empathy/x-components/search';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { Sort, Spellcheck } from './body';
  import { Empathize } from './empathize';
  import { Facet, Facets } from './facets';
  import { PartialResults, Recommendations, Results, Result } from './results';
  import SearchBox from './search-box.vue';

  @Component({
    components: {
      BaseScroll,
      BaseVariableColumnGrid,
      CartIcon,
      Close: BaseIdModalClose,
      CloseIcon,
      ClearFilters,
      Empathize,
      Facets,
      Facet,
      Layout,
      Recommendations,
      RelatedTags,
      Result,
      Results,
      ResultsList,
      SearchBox,
      Spellcheck,
      SelectedFiltersList,
      SelectedFilters,
      ColumnPicker: BaseColumnPickerList,
      ScrollToTop: BaseScrollToTop,
      Sort,
      PartialResults
    },
    directives: {
      'infinite-scroll': infiniteScroll
    }
  })
  export default class Main extends Vue {
    protected resultsAnimation = StaggeredFadeAndSlide;
  }
</script>

<style scoped>
  .x-layout {
    height: 100%;
  }
</style>
