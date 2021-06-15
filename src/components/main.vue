<template>
  <Layout class="x-layout" :isAsideOpen="isAsideOpen">
    <template #header-middle>
      <div
        class="x-list x-list--vertical x-list--gap-05 x-list--align-stretch x-list__item--expand"
      >
        <SearchBox />
        <RelatedTags />
      </div>
    </template>

    <template #header-end>
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-06">
        <button class="x-button x-button--ghost">
          <CartIcon class="x-icon--l" />
        </button>
        <Close class="x-button--ghost" modalId="x-components-app">
          <CrossIcon class="x-icon--l" />
        </Close>
      </div>
    </template>

    <template #empathize>
      <Empathize />
    </template>

    <template #toolbar-aside>
      <button
        v-if="$x.totalResults > 0"
        @click="isAsideOpen = !isAsideOpen"
        class="x-button x-button--ghost"
      >
        <FiltersIcon />
        <span v-if="isAsideOpen">{{ $t('toggleAside.hideAside') }}</span>
        <span v-else>{{ $t('toggleAside.showAside') }}</span>
      </button>
    </template>

    <template #toolbar-body>
      <Toolbar v-if="$x.totalResults" />
    </template>

    <template #main-aside>
      <SelectedFilters />
      <Facets />
    </template>

    <template #main-body>
      <Spellcheck />

      <div
        v-if="!$x.totalResults && $x.query.search && $x.status.search !== 'loading'"
        class="x-no-results"
      >
        <span v-html="$t('noResults.message', { query: $x.query.search })" />
      </div>

      <Recommendations v-if="!$x.totalResults">
        <template #layout="{ recommendations }">
          <BaseVariableColumnGrid
            #default="{ item: result }"
            :animation="resultsAnimation"
            :items="recommendations"
          >
            <Result :result="result" />
          </BaseVariableColumnGrid>
        </template>
      </Recommendations>

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
  import {
    BaseIdModalClose,
    BaseScroll,
    BaseScrollToTop,
    BaseVariableColumnGrid,
    CartIcon,
    CrossIcon,
    CrossTinyIcon,
    FiltersIcon,
    infiniteScroll,
    Layout,
    PlusIcon,
    SlidingPanel,
    StaggeredFadeAndSlide
  } from '@empathy/x-components';
  import { ResultsList } from '@empathy/x-components/search';
  import { Recommendations } from '@empathy/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Empathize from './empathize.vue';
  import Facets from './facets/facets.vue';
  import RelatedTags from './related-tags.vue';
  import { PartialResults, Result, Results } from './results';
  import SearchBox from './search-box.vue';
  import SelectedFilters from './selected-filters.vue';
  import Spellcheck from './spellcheck.vue';
  import Toolbar from './toolbar.vue';

  @Component({
    components: {
      Toolbar,
      BaseScroll,
      BaseVariableColumnGrid,
      CartIcon,
      Close: BaseIdModalClose,
      CrossIcon,
      CrossTinyIcon,
      Empathize,
      Facets,
      FiltersIcon,
      Layout,
      PlusIcon,
      Recommendations,
      RelatedTags,
      Result,
      Results,
      ResultsList,
      SearchBox,
      Spellcheck,
      SelectedFilters,
      SlidingPanel,
      ScrollToTop: BaseScrollToTop,
      PartialResults
    },
    directives: {
      'infinite-scroll': infiniteScroll
    }
  })
  export default class Main extends Vue {
    protected resultsAnimation = StaggeredFadeAndSlide;
    protected isAsideOpen = true;
  }
</script>

<style scoped>
  .x-layout {
    height: 100%;
  }
</style>
