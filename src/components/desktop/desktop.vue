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

        <LocationProvider location="predictive_layer">
          <RelatedTags v-if="!$x.isEmpathizeOpen && $x.relatedTags.length > 0" />
        </LocationProvider>
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
      <LocationProvider location="predictive_layer">
        <PredictiveLayer />
      </LocationProvider>
    </template>

    <template #toolbar-aside>
      <DesktopToggleAside v-if="$x.totalResults > 0" />
    </template>

    <template #toolbar-body>
      <DesktopToolbar />
    </template>

    <template #main-aside>
      <template v-if="hasSearched">
        <SelectedFilters
          v-if="$x.totalResults > 0"
          class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom"
        />
        <Facets
          v-if="$x.totalResults > 0"
          class="x-list--gap-06 x-list--padding-05 x-list--padding-top"
        />
      </template>
    </template>

    <template #main-body>
      <LocationProvider location="results">
        <Main />
      </LocationProvider>
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
    LocationProvider,
    MultiColumnMaxWidthLayout,
    PlusIcon,
    SlidingPanel
  } from '@empathyco/x-components';
  import { Empathize } from '@empathyco/x-components/empathize';
  import { Component } from 'vue-property-decorator';
  import EnvSelector from '../env-selector.vue';
  import Logo from '../logo.vue';
  import Main from '../main.vue';
  import PredictiveLayer from '../predictive-layer.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import SearchBox from '../search-box.vue';
  import HasSearchedMixin from '../has-searched.mixin.vue';
  import DesktopToggleAside from './desktop-toggle-aside.vue';
  import DesktopToolbar from './desktop-toolbar.vue';

  @Component({
    components: {
      BaseScroll,
      BaseVariableColumnGrid,
      CartIcon,
      Close: BaseEventsModalClose,
      CrossIcon,
      CrossTinyIcon,
      DesktopToggleAside,
      DesktopToolbar,
      EnvSelector,
      Empathize,
      LocationProvider,
      Logo,
      Main,
      MultiColumnMaxWidthLayout,
      PlusIcon,
      PredictiveLayer,
      ScrollToTop,
      SearchBox,
      SlidingPanel,
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters),
      Facets: () => import('../search').then(m => m.Facets)
    }
  })
  export default class Desktop extends HasSearchedMixin {}
</script>
