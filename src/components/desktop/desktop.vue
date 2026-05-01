<template>
  <div class="xds:layout-container">
    <DesktopTopSection />

    <MainScroll class="xds:flex xds:flex-col">
      <Scroll id="main-scroll">
        <MaxDesktopWidthItem>
          <div v-if="hasSearched">
            <LocationProvider location="results">
              <SpellcheckMessage class="xds:mb-16" data-test="spellcheck-message" />
            </LocationProvider>

            <NoResultsMessage
              v-if="showNoResultsMessage"
              class="xds:mb-16"
              data-test="no-results-message"
            />

            <FallbackDisclaimerMessage class="xds:mb-16" />
          </div>

          <LocationProvider location="no_query">
            <PreSearchManager :max-popular-searches-to-render="5" class="xds:mt-56" />
          </LocationProvider>

          <LocationProvider location="results">
            <MainComponent />
          </LocationProvider>
        </MaxDesktopWidthItem>
      </Scroll>
    </MainScroll>

    <MaxDesktopWidthItem class="xds:layout-overlap xds:layout-on-margin-right">
      <ScrollToTop />
    </MaxDesktopWidthItem>

    <div class="xds:z-20">
      <BaseIdModal
        key="right-aside"
        :animation="rightAsideAnimation"
        modal-id="right-aside"
        content-class="xds:w-512! xds:ml-auto"
      >
        <DesktopAside v-if="hasSearched" />
      </BaseIdModal>

      <BaseIdModal
        key="my-history-aside"
        :animation="rightAsideAnimation"
        modal-id="my-history-aside"
        content-class="xds:w-512! xds:ml-auto"
      >
        <MyHistoryAside />
      </BaseIdModal>

      <MyHistoryConfirmDisableModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dictionary } from '@empathyco/x-utils'
import {
  AnimateTranslate,
  BaseIdModal,
  LocationProvider,
  use$x,
  useState,
} from '@empathyco/x-components'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent, h } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import MainComponent from '../main.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import PreSearchManager from '../pre-search/pre-search-manager.vue'
import ScrollToTop from '../scroll-to-top.vue'
import DesktopTopSection from './desktop-top-section.vue'

const DesktopAside = defineAsyncComponent(() => import('../search').then(m => m.DesktopAside))
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
const rightAsideAnimation = h(AnimateTranslate, { animationOrigin: 'right' })

const { hasSearched } = useHasSearched()
const { relatedPrompts } = useState('relatedPrompts')
const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
const aiSearchFallback = controls.aiSearchFallback as boolean

const showNoResultsMessage = computed(
  () => !aiSearchFallback && !relatedPrompts.value?.length && !x.semanticQueries.length,
)
</script>
