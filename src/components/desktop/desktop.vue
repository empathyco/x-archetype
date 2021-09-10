<template>
  <MultiColumnMaxWidthLayout>
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
        <RelatedTags v-if="!$x.isEmpathizeOpen && $x.relatedTags.length > 0" />
      </div>
    </template>

    <template #header-end>
      <div class="x-list x-list--wrap-reverse x-list--justify-end">
        <EnvSelector />

        <Close class="x-button--ghost">
          <CrossIcon class="x-icon--l" />
        </Close>
      </div>
    </template>

    <template #sub-header>
      <PredictiveLayer />
    </template>

    <template #toolbar-aside>
      <DesktopToggleAside v-if="$x.totalResults > 0" />
    </template>

    <template #toolbar-body>
      <DesktopToolbar />
    </template>

    <template #main-aside>
      <SelectedFilters
        v-if="$x.totalResults > 0"
        class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom"
      />
      <Facets
        v-if="$x.totalResults > 0"
        class="x-list--gap-06 x-list--padding-05 x-list--padding-top"
      />
    </template>

    <template #main-body>
      <div
        v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
        class="x-list x-list--padding-06 x-list--padding-bottom"
      >
        <SpellcheckMessage />
        <NoResultsMessage />
      </div>

      <Recommendations />

      <Results />

      <PartialResults />
    </template>

    <template #scroll-to-top>
      <ScrollToTop />
    </template>
  </MultiColumnMaxWidthLayout>
</template>

<script lang="ts">
  import {
    BaseEventsModalClose,
    BaseScroll,
    BaseVariableColumnGrid,
    CartIcon,
    CrossIcon,
    CrossTinyIcon,
    MultiColumnMaxWidthLayout,
    PlusIcon,
    SlidingPanel
  } from '@empathyco/x-components';
  import { Empathize } from '@empathyco/x-components/empathize';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import PredictiveLayer from '../empathize.vue';
  import EnvSelector from '../env-selector.vue';
  import Facets from '../facets/facets.vue';
  import Logo from '../logo.vue';
  import NoResultsMessage from '../no-results-message.vue';
  import RelatedTags from '../related-tags.vue';
  import Recommendations from '../results/recommendations.vue';
  import PartialResults from '../results/partial-results.vue';
  import Results from '../results/results.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import SearchBox from '../search-box.vue';
  import SelectedFilters from '../facets/selected-filters.vue';
  import SpellcheckMessage from '../spellcheck-message.vue';
  import DesktopToggleAside from './desktop-toggle-aside.vue';
  import DesktopToolbar from './desktop-toolbar.vue';

  @Component({
    components: {
      ScrollToTop,
      DesktopToggleAside,
      EnvSelector,
      BaseScroll,
      BaseVariableColumnGrid,
      CartIcon,
      Close: BaseEventsModalClose,
      CrossIcon,
      CrossTinyIcon,
      DesktopToolbar,
      Empathize,
      PredictiveLayer,
      Facets,
      MultiColumnMaxWidthLayout,
      Logo,
      NoResultsMessage,
      PartialResults,
      PlusIcon,
      RelatedTags,
      Results,
      Recommendations,
      SearchBox,
      SpellcheckMessage,
      SelectedFilters,
      SlidingPanel
    }
  })
  export default class Desktop extends Vue {}
</script>
