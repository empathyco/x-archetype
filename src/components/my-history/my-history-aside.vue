<template>
  <div class="x-my-history-aside xds:scroll xds:desktop:overflow-hidden">
    <div class="x-my-history-aside__header">
      <h1 class="xds:text-xl xds:font-bold">
        {{ $t('myHistory.title') }}
      </h1>
      <BaseIdModalClose
        class="xds:button-circle xds:button-ghost xds:hover:button-lead"
        modal-id="my-history-aside"
      >
        <CrossIcon class="xds:icon-lg" />
      </BaseIdModalClose>
    </div>

    <div
      class="x-my-history-aside__content xds:desktop:scroll xds:desktop:flex-1 xds:desktop:overflow-auto"
    >
      <section class="x-my-history-aside__content-message">
        <h2 class="xds:mb-8 xds:text-md xds:font-bold">{{ $t('myHistory.subtitle') }}</h2>
        <p class="xds:text-md xds:text-neutral-75">
          {{ $t('myHistory.message.body') }}
        </p>
        <p class="xds:text-md xds:font-bold xds:text-neutral-75">
          {{ $t('myHistory.message.footer') }}
        </p>
      </section>

      <section class="x-my-history-aside__content-tool">
        <div class="xds:flex xds:flex-col xds:gap-4">
          <span class="xds:text-lg xds:font-bold">{{ $t('myHistory.switch.title') }}</span>
          <span class="xds:text-md xds:text-neutral-75">
            {{
              x.isHistoryQueriesEnabled
                ? $t('myHistory.switch.disable')
                : $t('myHistory.switch.enable')
            }}
          </span>
        </div>
        <HistoryQueriesSwitch
          :class="{ 'x-switch--is-selected xds:selected': x.isHistoryQueriesEnabled }"
        />
      </section>

      <LocationProvider location="my_history">
        <CustomMyHistory />
      </LocationProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIdModalClose, CrossIcon, LocationProvider, use$x } from '@empathyco/x-components'
import { HistoryQueriesSwitch } from '@empathyco/x-components/history-queries'
import { onMounted } from 'vue'
import CustomMyHistory from './custom-my-history.vue'

onMounted(() => {
  const activeElement = document.activeElement as HTMLElement
  if (activeElement.classList.contains('x-search-input')) {
    activeElement.blur()
  }
})

const x = use$x()
</script>

<style>
.x-my-history-aside {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  background-color: var(--xds-color-neutral-0);
}

.x-my-history-aside__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--xds-spacing-16);
  background-color: var(--xds-color-neutral-0);
  padding: var(--xds-spacing-16);
  position: sticky;
  top: 0;
  z-index: 10;
}

.x-my-history-aside__content {
  display: flex;
  flex-direction: column;
}

.x-my-history-aside__content-message {
  display: flex;
  flex-direction: column;
  gap: var(--xds-spacing-16);
  padding: var(--xds-spacing-16);
}

.x-my-history-aside__content-tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--xds-spacing-16);
}

.x-layout__my-history-modal {
  z-index: 40 !important;
}
</style>
