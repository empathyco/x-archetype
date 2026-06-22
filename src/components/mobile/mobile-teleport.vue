<template>
  <BaseTeleport v-if="visibleGrid" :target="resultsSelector">
    <MobileLayout>
      <template #toolbar>
        <MobileSubHeader v-if="hasSearched && !x.noResults" />
      </template>

      <template #filters-modal>
        <MobileAside v-if="hasSearched" class="xds:z-20 xds:w-full" />
      </template>

      <template #my-history-modal>
        <MyHistoryAside />
        <MyHistoryConfirmDisableModal />
      </template>

      <template #main>
        <MainScroll :use-window="true" class="x-main-scroll xds:flex xds:flex-col">
          <Scroll id="main-scroll">
            <section v-if="x.query.search" class="x-layout-padding">
              <LocationProvider location="results">
                <SpellcheckMessage class="xds:mb-16" data-test="spellcheck-message" />
              </LocationProvider>

              <FallbackDisclaimerMessage class="xds:mb-16" data-test="fallback-message" />
            </section>
            <LocationProvider location="results">
              <Main v-if="hasSearched" />
            </LocationProvider>
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
          </Scroll>
        </MainScroll>
      </template>

      <template #overlay>
        <div
          class="xds:mb-32 xds:grid xds:min-h-48 xds:w-full xds:grid-cols-12 xds:items-center xds:gap-24"
        >
          <MobileOpenAside
            v-if="x.totalResults > 0"
            class="xds:pointer-events-auto xds:col-span-8 xds:col-start-3 xds:max-h-40 xds:tablet:col-span-4 xds:tablet:col-start-5"
          />
          <ScrollToTop class="xds:pointer-events-auto xds:col-start-11 xds:button-lg" />
        </div>
      </template>
    </MobileLayout>
  </BaseTeleport>
  <ExperienceControls />
</template>

<script lang="ts" setup>
import type { SnippetConfig } from '@empathyco/x-components'
import { BaseTeleport, LocationProvider, PageLoaderButton, use$x } from '@empathyco/x-components'
import { ExperienceControls } from '@empathyco/x-components/experience-controls'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent, inject, ref } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import MobileLayout from '../mobile/mobile-layout.vue'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import ScrollToTop from '../scroll-to-top.vue'
const MobileSubHeader = defineAsyncComponent(() =>
  import('../x-search').then(m => m.MobileSubHeader),
)
const Main = defineAsyncComponent(() => import('../x-search').then(m => m.Main))
const MobileOpenAside = defineAsyncComponent(() =>
  import('../x-search').then(m => m.MobileOpenAside),
)
const MobileAside = defineAsyncComponent(() => import('../x-search').then(m => m.MobileAside))
const FallbackDisclaimerMessage = defineAsyncComponent(() =>
  import('../x-search').then(m => m.FallbackDisclaimerMessage),
)
const SpellcheckMessage = defineAsyncComponent(() =>
  import('../x-search').then(m => m.SpellcheckMessage),
)

const snippetConfig = inject<SnippetConfig>('snippetConfig')!
const { hasSearched } = useHasSearched()
const x = use$x()

const resultsSelector = computed(
  () => snippetConfig.resultsSelector ?? "[data-teleport='empathy-results-container']",
)
const visibleGrid = ref(false)

x.on('UserClickedCloseX', false).subscribe(() => (visibleGrid.value = false))
x.on('EmpathizeOpened', false).subscribe(() => (visibleGrid.value = true))
// Keeping this so it works when loading from url
x.on('SearchBoxQueryChanged', false).subscribe(() => (visibleGrid.value = true))
</script>

<style scoped>
.x-layout-padding {
  padding-inline: var(--xds-layout-min-margin);
}
.x-scroll-to-top {
  justify-self: start !important;
}
</style>
