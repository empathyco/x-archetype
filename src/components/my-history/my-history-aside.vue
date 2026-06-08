<template>
  <div class="xds:layout-container xds:gap-8 xds:layout-min-margin-24">
    <Scroll id="my-history-scroll">
      <div class="xds:sticky xds:top-0 xds:z-10 xds:layout-item xds:border-b xds:border-neutral-50">
        <section class="x-my-history-aside__header">
          <h1 class="xds:text-xl xds:font-bold">
            {{ $t('myHistory.title') }}
          </h1>
          <BaseIdModalClose class="xds:button xds:button-ghost" modal-id="my-history-aside">
            <CrossIcon class="xds:icon-lg" />
          </BaseIdModalClose>
        </section>
      </div>

      <div class="xds:layout-item">
        <div class="x-my-history-aside__content-message">
          <h2 class="xds:text-md xds:font-bold">{{ $t('myHistory.subtitle') }}</h2>
          <p class="xds:text-md xds:text-neutral-75">
            {{ $t('myHistory.message.body') }}
          </p>
          <p class="xds:text-md xds:font-bold xds:text-neutral-75">
            {{ $t('myHistory.message.footer') }}
          </p>
        </div>
      </div>

      <div class="xds:layout-item">
        <div class="x-my-history-aside__content-tool">
          <div class="xds:flex xds:flex-col xds:gap-16">
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
        </div>
      </div>

      <div class="xds:layout-item">
        <LocationProvider location="my_history">
          <CustomMyHistory />
        </LocationProvider>
      </div>
    </Scroll>
  </div>
</template>

<script setup lang="ts">
import { BaseIdModalClose, CrossIcon, LocationProvider, use$x } from '@empathyco/x-components'
import { HistoryQueriesSwitch } from '@empathyco/x-components/history-queries'
import { Scroll } from '@empathyco/x-components/scroll'
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

<style scoped>
.x-my-history-aside__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--xds-color-neutral-0);
  height: var(--xds-spacing-80);
}

.x-my-history-aside__content-message {
  display: flex;
  flex-direction: column;
  gap: var(--xds-spacing-12);
  padding-block: var(--xds-spacing-16);
  border-bottom: 1px solid var(--xds-color-neutral-25);
}

.x-my-history-aside__content-tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: var(--xds-spacing-8);
}
</style>
