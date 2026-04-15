<template>
  <MobileLayout>
    <template #header>
      <div class="xds:flex xds:w-full xds:gap-8 xds:py-16">
        <CloseMainModal class="xds:button-circle xds:button-ghost xds:button-lead">
          <ArrowLeftIcon class="xds:icon-lg" />
        </CloseMainModal>
        <SearchBox class="xds:flex-1" />
      </div>
    </template>

    <template #sub-header>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="xds:relative" />
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
          <SpellcheckMessage class="xds:mb-16" data-test="spellcheck-message" />
        </LocationProvider>

        <NoResultsMessage
          v-if="showNoResultsMessage"
          class="xds:mb-16"
          data-test="no-results-message"
        />

        <FallbackDisclaimerMessage class="xds:mb-16" data-test="fallback-message" />
      </section>
      <LocationProvider location="no_query">
        <PreSearchManager class="xds:z-10 xds:mt-16" />
      </LocationProvider>
      <LocationProvider location="results">
        <Main />
      </LocationProvider>
    </template>

    <template #overlay>
      <div
        class="xds:mb-32 xds:grid xds:min-h-48 xds:w-full xds:grid-cols-12 xds:items-center xds:gap-24"
      >
        <MobileOpenAside
          v-if="x.totalResults > 0"
          class="xds:pointer-events-auto xds:col-span-8 xds:col-start-3 xds:max-h-40 xds:tablet:col-span-4 xds:tablet:col-start-5"
        />
        <ScrollToTop class="xds:pointer-events-auto xds:col-start-11 xds:button-sm" />
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
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import Main from '../main.vue'
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
const { getControlFromPath } = useExperienceControls()
const aiSearchFallback = getControlFromPath('aiSearchFallback')
const showNoResultsMessage = computed(
  () => !aiSearchFallback.value && !relatedPrompts.value?.length && !x.semanticQueries.length,
)
</script>
