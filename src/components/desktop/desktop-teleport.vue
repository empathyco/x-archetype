<template>
  <BaseTeleport v-if="visibleGrid" :target="gridTarget">
    <div class="xds:layout-container xds:layout">
      <div class="xds:sticky xds:top-0 xds:z-2 xds:bg-neutral-0">
        <DesktopSubHeader
          v-if="hasSearched"
          data-test="sub-header"
          :is-full-predictive="false"
          class="xds:layout-item"
        />
      </div>

      <MainScroll :use-window="true" class="x-main-scroll xds:mb-24 xds:flex xds:flex-col">
        <Scroll id="main-scroll">
          <div
            class="xds:z-1 xds:layout-item xds:bg-neutral-0 xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
          >
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

            <div class="xds:flex xds:gap-24">
              <div
                v-if="!facetsPanelOverlay && x.results.length > 0"
                class="xds:flex xds:h-auto xds:flex-col xds:justify-between xds:pb-64"
              >
                <DesktopAside />
              </div>

              <LocationProvider location="results">
                <Main v-if="hasSearched" />
              </LocationProvider>
            </div>
            <PageLoaderButton
              v-if="x.query.searchBox && x.results.length > 0"
              button-classes="xds:button-outlined xds:button-lead xds:hover:bg-accent-25 xds:text-neutral-75 xds:hover:text-neutral-75 xds:text-md xds:font-regular xds:px-[42px] xds:py-12"
              :class="{ 'xds:hidden!': x.results.length >= x.totalResults }"
            >
              <template #textContent>
                <div></div>
              </template>
              <template #buttonContent>{{ $t('pageLoaderButton.message') }}</template>
            </PageLoaderButton>
          </div>
        </Scroll>
      </MainScroll>
      <div class="xds:z-20">
        <BaseIdModal
          v-if="facetsPanelOverlay"
          key="right-aside"
          :animation="rightAsideAnimation"
          modal-id="right-aside"
          content-class="xds:w-512! xds:ml-auto xds:h-full"
        >
          <DesktopAside v-if="hasSearched" />
        </BaseIdModal>

        <BaseIdModal
          key="my-history-aside"
          :animation="rightAsideAnimation"
          modal-id="my-history-aside"
          content-class="xds:bg-neutral-0 xds:w-512! xds:ml-auto xds:h-full"
        >
          <MyHistoryAside />
        </BaseIdModal>

        <MyHistoryConfirmDisableModal />
      </div>
    </div>
  </BaseTeleport>
  <ExperienceControls />
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import {
  AnimateTranslate,
  BaseIdModal,
  BaseTeleport,
  LocationProvider,
  PageLoaderButton,
  use$x,
  useState,
} from '@empathyco/x-components'
import { ExperienceControls } from '@empathyco/x-components/experience-controls'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent, h, inject, ref } from 'vue'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'

const DesktopSubHeader = defineAsyncComponent(() =>
  import('../index-search').then(m => m.DesktopSubHeader),
)
const Main = defineAsyncComponent(() => import('../index-search').then(m => m.Main))
const DesktopAside = defineAsyncComponent(() => import('../index-search').then(m => m.DesktopAside))
const FallbackDisclaimerMessage = defineAsyncComponent(() =>
  import('../index-search').then(m => m.FallbackDisclaimerMessage),
)
const NoResultsMessage = defineAsyncComponent(() =>
  import('../index-search').then(m => m.NoResultsMessage),
)
const SpellcheckMessage = defineAsyncComponent(() =>
  import('../index-search').then(m => m.SpellcheckMessage),
)

const { hasSearched } = useHasSearched()
const { relatedPrompts } = useState('relatedPrompts')
const x = use$x()
const rightAsideAnimation = h(AnimateTranslate, { animationOrigin: 'right' })

const { getControl } = useExperienceControls()
const aiSearchFallback = getControl<boolean>('aiSearchFallback')
const facetsPanelOverlay = getControl<boolean>('facetsPanelOverlay')
const showNoResultsMessage = computed(
  () => !aiSearchFallback.value && !relatedPrompts.value?.length,
)
const snippetConfig = inject<SnippetConfig>('snippetConfig')
const gridTarget = computed(() => snippetConfig?.gridTarget ?? '#maincontent')
const visibleGrid = ref(false)

x.on('UserClickedCloseX', false).subscribe(() => (visibleGrid.value = false))
x.on('EmpathizeOpened', false).subscribe(() => (visibleGrid.value = true))
// Keeping this so it works when loading from url
x.on('SearchBoxQueryChanged', false).subscribe(() => (visibleGrid.value = true))
</script>
