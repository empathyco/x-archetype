<template>
  <div
    class="xds:flex xds:scroll xds:min-h-0 xds:flex-1 xds:flex-col xds:bg-neutral-0 xds:desktop:overflow-hidden"
  >
    <div
      class="xds:sticky xds:top-0 xds:z-10 xds:flex xds:flex-row xds:items-center xds:gap-16 xds:bg-lead-75 xds:p-16 xds:desktop:p-32"
    >
      <BaseIdModalClose
        class="xds:button-circle xds:button-ghost xds:hover:button-lead xds:desktop:order-1 xds:desktop:ml-auto"
        modal-id="my-history-aside"
      >
        <CrossIcon class="xds:icon-lg xds:text-neutral-0" />
      </BaseIdModalClose>
      <h1 class="xds:title2 xds:title2-sm xds:text-neutral-0 xds:capitalize xds:desktop:title2-md">
        {{ $t('myHistory.title') }}
      </h1>
    </div>

    <div
      class="xds:flex xds:flex-col xds:divide-y-1 xds:divide-neutral-10 xds:desktop:scroll xds:desktop:flex-1 xds:desktop:overflow-auto"
    >
      <section
        class="xds:flex xds:flex-col xds:gap-16 xds:px-16 xds:pt-24 xds:pb-32 xds:desktop:pl-32"
      >
        <h2 class="xds:mb-8 xds:title3">{{ $t('myHistory.subtitle') }}</h2>
        <p class="xds:text1 xds:text1-lg xds:text-neutral-75">
          {{ $t('myHistory.message.header') }}
        </p>
        <p class="xds:text1 xds:text1-lg xds:text-neutral-75">{{ $t('myHistory.message.body') }}</p>
        <p class="xds:title3 xds:text-neutral-75">{{ $t('myHistory.message.footer') }}</p>
      </section>

      <section
        class="xds:flex xds:items-center xds:justify-between xds:px-16 xds:pt-24 xds:pb-32 xds:desktop:pl-32"
      >
        <div class="xds:flex xds:flex-col xds:gap-4">
          <span class="xds:title3 xds:capitalize">{{ $t('myHistory.switch.title') }}</span>
          <span class="xds:text1 xds:text1-lg xds:text-neutral-75">
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
.x-layout__my-history-modal {
  z-index: 40 !important;
}
</style>
