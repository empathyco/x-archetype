<template>
  <div
    class="x-layout x-layout-mobile x-layout-max-width-md x-layout-min-margin-16"
    :class="{
      'x-layout--no-query': !x.query.search,
      'x-layout--no-results': x.noResults,
      'x-layout--collapsed': isScrollingDown,
    }"
  >
    <header class="x-layout__header x-layout-item x-bg-neutral-0">
      <div class="x-layout__header-content">
        <!-- @slot Slot that can be used to insert content into the bottom part of the header. -->
        <slot name="header" :is-header-collapsed="isScrollingDown" />
      </div>
    </header>

    <div class="x-layout__sub-header x-layout-stack">
      <slot name="sub-header" />
    </div>

    <div class="x-layout__toolbar x-collapsible">
      <div ref="toolbarWrapperRef" class="x-layout__toolbar-content">
        <!-- @slot Slot that can be used to insert content into the Toolbar. -->
        <slot name="toolbar" />
      </div>
    </div>

    <BaseIdModal
      modal-id="aside-modal"
      :animation="filtersAnimation"
      class="x-layout__filters-modal"
      content-class="x-mt-64 !x-h-[calc(100%-64px)] x-fixed x-flex-1 x-rounded-t-lg x-bg-neutral-0
         desktop:x-rounded-none desktop:x-m-0"
    >
      <slot name="filters-modal" />
    </BaseIdModal>

    <BaseIdModal
      key="my-history-aside"
      modal-id="my-history-aside"
      :animation="myHistoryAnimation"
      class="x-layout__my-history-modal"
      content-class="x-bg-neutral-0"
    >
      <slot name="my-history-modal" />
    </BaseIdModal>

    <main class="x-layout__main x-flex x-flex-col x-flex-nowrap">
      <MainScroll>
        <Scroll
          id="main-scroll"
          class="x-layout__main-scroll x-collapsible x-flex x-flex-auto x-flex-col"
          @scroll="closeEmpathize"
        >
          <!-- @slot Slot that can be used to insert content into the Main. -->
          <slot name="main" />
        </Scroll>
      </MainScroll>
    </main>

    <div class="x-layout__overlay x-pointer-events-none">
      <slot name="overlay" :is-header-collapsed="isScrollingDown" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { animateTranslate, BaseIdModal, use$x } from '@empathyco/x-components'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useHasScrollPastThreshold } from '../../composables/use-has-scroll-past-threshold.composable'

/**
 * Component for use as Layout to be filled with the rest of the Components.
 *
 * @public
 */
const toolbarWrapperRef = ref(null)

const x = use$x()
const closeEmpathize = (): void => {
  x.emit('UserClosedEmpathize')
}
const { height } = useElementSize(toolbarWrapperRef, { width: 0, height: 48 })

const { hasScrolledPastThreshold } = useHasScrollPastThreshold()

const filtersAnimation = animateTranslate('bottom')
const myHistoryAnimation = animateTranslate('right')

const toolbarHeight = computed(() => `${height.value}px`)

const isScrollingDown = hasScrolledPastThreshold
</script>

<style scoped>
.x-layout {
  --toolbar-height: v-bind(toolbarHeight);

  display: grid;
  align-content: stretch;
  height: calc(100% + var(--toolbar-height));
  grid-template-columns:
    [page-start]
    1fr
    [page-end];
  grid-template-rows:
    [page-start header-start]
    auto
    [header-end subheader-start]
    auto
    [subheader-end toolbar-start]
    var(--toolbar-height)
    [toolbar-end main-start]
    1fr
    [main-end page-end];
}

.x-layout--no-query,
.x-layout--no-results {
  --toolbar-height: 0px;
}

.x-collapsible {
  transition: transform 0.3s ease-out;
}

.x-layout--collapsed .x-collapsible {
  transform: translateY(calc(var(--toolbar-height) * -1));
}

.x-layout__header {
  grid-column: page;
  grid-row: header;
  z-index: 1;
  max-width: 100vw;
}

.x-layout__header-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.x-layout__sub-header {
  grid-column: page;
  grid-row: 2/ -1;
  max-width: 100vw;
}

.x-layout__toolbar {
  grid-column: page;
  grid-row: toolbar;
  max-width: 100vw;
}

.x-layout__toolbar-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: stretch;
  margin-inline: var(--x-layout-min-margin);
}

.x-layout__filters-modal,
.x-layout__my-history-modal {
  grid-column: page;
  grid-row: page;
  z-index: 20;
}

.x-layout__overlay {
  position: fixed;
  bottom: 0;
  padding-inline: var(--x-layout-min-margin);
  width: 100%;
}

.x-layout__main {
  grid-column: page;
  grid-row: main;
  min-height: 0;
  min-width: 0;
  max-width: 100vw;
}

.x-layout__main-scroll {
  padding-inline: var(--x-layout-min-margin);
}
</style>
