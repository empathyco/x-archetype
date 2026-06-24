<template>
  <MobileLayout>
    <template #header>
      <div class="xds:flex xds:w-full xds:gap-8 xds:py-16">
        <CloseMainModal
          class="xds:button-circle xds:button-ghost xds:text-neutral-100"
          :class="ui('header')?.closeModal"
        >
          <ArrowLeftIcon class="xds:icon-lg" />
        </CloseMainModal>
        <SearchBox class="xds:flex-1" />
        <CartCount :class="ui('header')?.cartCount" />
      </div>
    </template>

    <template #sub-header>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="xds:relative" />
      </LocationProvider>
    </template>

    <template #toolbar>
      <MobileSubHeader v-if="hasSearched" />
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

        <FallbackDisclaimerMessage class="xds:mb-16" data-test="fallback-message" />
      </section>
      <LocationProvider location="no_query">
        <PreSearchManager class="xds:z-10 xds:mt-16" />
      </LocationProvider>
      <LocationProvider location="results">
        <Main v-if="hasSearched" />
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
import { ArrowLeftIcon, CloseMainModal, LocationProvider, use$x } from '@empathyco/x-components'
import { defineAsyncComponent } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'
import CartCount from '../add2cart/cart-count.vue'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import PreSearchManager from '../pre-search/pre-search-manager.vue'
import PredictiveLayer from '../predictive-layer/predictive-layer.vue'
import ScrollToTop from '../scroll-to-top.vue'
import SearchBox from '../search-box.vue'
import MobileLayout from './mobile-layout.vue'

const MobileOpenAside = defineAsyncComponent(() =>
  import('../x-search').then(m => m.MobileOpenAside),
)

const MobileSubHeader = defineAsyncComponent(() =>
  import('../x-search').then(m => m.MobileSubHeader),
)
const Main = defineAsyncComponent(() => import('../x-search').then(m => m.Main))
const MobileAside = defineAsyncComponent(() => import('../x-search').then(m => m.MobileAside))
const FallbackDisclaimerMessage = defineAsyncComponent(() =>
  import('../x-search').then(m => m.FallbackDisclaimerMessage),
)
const SpellcheckMessage = defineAsyncComponent(() =>
  import('../x-search').then(m => m.SpellcheckMessage),
)

const x = use$x()
const { hasSearched } = useHasSearched()
const { ui } = useInstanceExtensions()
</script>
