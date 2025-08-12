<template>
  <MobileLayout>
    <template #header>
      <div class="x-flex x-w-full x-gap-8 x-py-16">
        <CloseMainModal class="x-button-lead x-button-circle x-button-ghost">
          <ArrowLeftIcon class="x-icon-lg" />
        </CloseMainModal>
        <SearchBox class="x-flex-1" />
      </div>
    </template>

    <template #sub-header>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="x-relative" />
      </LocationProvider>
    </template>

    <template #toolbar>
      <MobileSubHeader :has-searched="hasSearched" />
    </template>

    <template #filters-modal>
      <MobileAside v-if="hasSearched" />
    </template>

    <template #my-history-modal>
      <MyHistoryAside />
      <MyHistoryConfirmDisableModal />
    </template>

    <template #main>
      <section v-if="x.query.search">
        <LocationProvider location="results">
          <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
        </LocationProvider>
        <NoResultsMessage
          v-if="showNoResultsMessage"
          class="x-mb-16"
          data-test="no-results-message"
        />
        <FallbackDisclaimerMessage class="x-mb-16" data-test="fallback-message" />
      </section>
      <LocationProvider location="no_query">
        <PreSearchManager class="x-z-10 x-mt-16" />
      </LocationProvider>
      <LocationProvider location="results">
        <MainComponent />
      </LocationProvider>
    </template>

    <template #overlay>
      <div class="x-mb-32 x-grid x-min-h-48 x-w-full x-grid-cols-12 x-items-center x-gap-24">
        <MobileOpenAside
          v-if="x.totalResults > 0"
          class="x-pointer-events-auto x-col-span-8 x-col-start-3 x-max-h-[40px] tablet:x-col-span-4 tablet:x-col-start-5"
        />
        <ScrollToTop class="x-button-lg x-pointer-events-auto x-col-start-11" />
      </div>
    </template>
  </MobileLayout>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  CloseMainModal,
  LocationProvider,
  use$x,
  useState,
} from '@empathyco/x-components'
import { computed, defineAsyncComponent } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import MainComponent from '../main.vue'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import PreSearchManager from '../pre-search/pre-search-manager.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import ScrollToTop from '../scroll-to-top.vue'
import SearchBox from '../search-box.vue'
import MobileLayout from './mobile-layout.vue'
import MobileOpenAside from './mobile-open-aside.vue'
import MobileSubHeader from './mobile-sub-header.vue'

const MobileAside = defineAsyncComponent(() => import('../search').then(m => m.MobileAside))
const NoResultsMessage = defineAsyncComponent(() =>
  import('../search').then(m => m.NoResultsMessage),
)
const SpellcheckMessage = defineAsyncComponent(() =>
  import('../search').then(m => m.SpellcheckMessage),
)
const FallbackDisclaimerMessage = defineAsyncComponent(() =>
  import('../search').then(m => m.FallbackDisclaimerMessage),
)

const x = use$x()
const { hasSearched } = useHasSearched()
const { relatedPrompts } = useState('relatedPrompts')
const showNoResultsMessage = computed(
  () => !relatedPrompts.value?.length && !x.semanticQueries.length,
)
</script>
