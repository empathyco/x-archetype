<template>
  <FixedHeaderAndAsidesLayout>
    <template #header>
      <div class="x-list x-list--horizontal x-list__item--expand">
        <div class="x-list x-list--padding-top x-list--padding-04">
          <Logo />
        </div>

        <div
          class="x-list x-list--vertical x-list--gap-05 x-list--align-stretch x-list__item--expand"
        >
          <SearchBox />

          <LocationProvider location="predictive_layer">
            <PredictiveLayer />
          </LocationProvider>
          <LocationProvider location="predictive_layer">
            <RelatedTags v-if="!$x.isEmpathizeOpen && $x.relatedTags.length > 0" />
          </LocationProvider>
        </div>

        <div class="x-list x-list--wrap-reverse x-list--justify-end">
          <EnvSelector />

          <Close class="x-button--ghost">
            <CrossIcon class="x-icon--l" />
          </Close>
        </div>
      </div>
    </template>

    <template #sub-header>
      <DesktopToolbar />
    </template>

    <template #toolbar>
      <SelectedFilters
        v-if="$x.totalResults > 0"
        class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom"
      />
    </template>

    <template #main>
      <LocationProvider location="results">
        <Main />
      </LocationProvider>
    </template>

    <template v-if="hasSearched" #right-aside>
      <DesktopAside />
    </template>

    <template #scroll-to-top>
      <ScrollToTop />
    </template>
  </FixedHeaderAndAsidesLayout>
</template>

<script lang="ts">
  import {
    BaseEventsModalClose,
    BaseScroll,
    BaseVariableColumnGrid,
    CartIcon,
    CrossIcon,
    CrossTinyIcon,
    FixedHeaderAndAsidesLayout,
    LocationProvider,
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
  import HasSearchedMixin from '../has-searched.mixin';
  import DesktopToolbar from './desktop-toolbar.vue';

  @Component({
    components: {
      BaseScroll,
      BaseVariableColumnGrid,
      CartIcon,
      Close: BaseEventsModalClose,
      CrossIcon,
      CrossTinyIcon,
      DesktopToolbar,
      EnvSelector,
      Empathize,
      FixedHeaderAndAsidesLayout,
      LocationProvider,
      Logo,
      Main,
      PlusIcon,
      PredictiveLayer,
      ScrollToTop,
      SearchBox,
      SlidingPanel,
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters),
      DesktopAside: () => import('./desktop-aside.vue')
    }
  })
  export default class Desktop extends HasSearchedMixin {}
</script>
