<template>
  <Layout>
    <template #header-start>
      <div class="x-list x-list--padding-top x-list--padding-04">
        <Logo />
      </div>
    </template>

    <template #header-middle>
      <div
        class="x-list x-list--vertical x-list--gap-05 x-list--align-stretch x-list__item--expand"
      >
        <SearchBox />
        <RelatedTags v-if="!$x.isEmpathizeOpen" />
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
      <BaseIdTogglePanelButton
        v-if="$x.totalResults > 0"
        panelId="aside-panel"
        class="x-button x-button--ghost x-button--ghost-start"
      >
        <template #default="{ isPanelOpen }">
          <FiltersIcon />
          <span v-if="isPanelOpen">{{ $t('toggleAside.hideAside') }}</span>
          <span v-else>{{ $t('toggleAside.showAside') }}</span>
        </template>
      </BaseIdTogglePanelButton>
    </template>

    <template #toolbar-body>
      <Toolbar />
    </template>

    <template #main-aside>
      <SelectedFilters v-if="$x.totalResults > 0" />
      <Facets v-if="$x.totalResults > 0" />
    </template>

    <template #main-body>
      <div
        v-if="$x.totalResults === 0 || spellcheckedQuery"
        class="x-list x-list--padding-06 x-list--padding-bottom"
      >
        <Spellcheck />
        <NoResults />
      </div>

      <div
        v-if="!$x.totalResults && $x.recommendations.length > 0"
        class="x-list x-list--align-center x-list--padding-07 x-list--gap-07 x-list--padding-bottom"
      >
        <h1 class="x-title1 x-text--bold">{{ $t('recommendations.title') }}</h1>
        <Recommendations v-if="!$x.totalResults">
          <template #layout="{ recommendations }">
            <BaseVariableColumnGrid
              #default="{ item: result }"
              class="x-grid"
              :animation="resultsAnimation"
              :items="recommendations"
            >
              <Result :result="result" />
            </BaseVariableColumnGrid>
          </template>
        </Recommendations>
      </div>
      <ResultsList v-if="$x.totalResults" v-infinite-scroll:body-scroll>
        <BannersList>
          <PromotedLists>
            <BaseVariableColumnGrid class="x-grid" :animation="resultsAnimation">
              <template #Result="{ item: result }">
                <Result :result="result" />
              </template>
              <template #Banner="{ item: banner }">
                <Banner :banner="banner" />
              </template>

              <template #Promoted="{ item: promoted }">
                <Promoted :promoted="promoted" />
              </template>
            </BaseVariableColumnGrid>
          </PromotedLists>
        </BannersList>
      </ResultsList>
      <PartialResults />
    </template>

    <template #scroll-to-top>
      <BaseScrollToTop class="x-button--round" scrollId="body-scroll" :thresholdPx="100">
        <ChevronUpIcon />
      </BaseScrollToTop>
    </template>
  </Layout>
</template>

<script lang="ts">
  import {
    BaseIdTogglePanelButton,
    BaseIdModalClose,
    BaseScroll,
    BaseScrollToTop,
    BaseVariableColumnGrid,
    CartIcon,
    ChevronUpIcon,
    CrossIcon,
    CrossTinyIcon,
    FiltersIcon,
    infiniteScroll,
    Layout,
    PlusIcon,
    SlidingPanel,
    StaggeredFadeAndSlide,
    State
  } from '@empathyco/x-components';
  import {
    Banner,
    BannersList,
    ResultsList,
    Promoted,
    PromotedsList
  } from '@empathyco/x-components/search';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Empathize from './empathize.vue';
  import Facets from './facets/facets.vue';
  import Logo from './logo.vue';
  import NoResults from './no-results.vue';
  import RelatedTags from './related-tags.vue';
  import Result from './results/result.vue';
  import PartialResults from './results/partial-results.vue';
  import SearchBox from './search-box.vue';
  import SelectedFilters from './selected-filters.vue';
  import Spellcheck from './spellcheck.vue';
  import Toolbar from './toolbar.vue';

  @Component({
    components: {
      BaseIdTogglePanelButton,
      Banner,
      BannersList,
      BaseScroll,
      BaseVariableColumnGrid,
      CartIcon,
      ChevronUpIcon,
      Close: BaseIdModalClose,
      CrossIcon,
      CrossTinyIcon,
      Empathize,
      Facets,
      FiltersIcon,
      Layout,
      Logo,
      NoResults,
      PartialResults,
      PlusIcon,
      Promoted,
      PromotedsList,
      Recommendations,
      RelatedTags,
      Result,
      ResultsList,
      SearchBox,
      Spellcheck,
      SelectedFilters,
      SlidingPanel,
      BaseScrollToTop,
      Toolbar
    },
    directives: {
      'infinite-scroll': infiniteScroll
    }
  })
  export default class Main extends Vue {
    protected resultsAnimation = StaggeredFadeAndSlide;

    // TODO add the spellcheckedQuery to alias API
    @State('search', 'spellcheckedQuery')
    public spellcheckedQuery!: string;
  }
</script>
