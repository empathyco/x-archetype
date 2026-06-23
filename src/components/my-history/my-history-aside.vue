<template>
  <div class="xds:layout-container xds:gap-8 xds:layout-min-margin-24">
    <Scroll id="my-history-scroll">
      <div
        class="xds:sticky xds:top-0 xds:z-10 xds:layout-item xds:border-b xds:border-neutral-50 xds:bg-neutral-0"
        :class="ui('aside')?.header"
      >
        <div class="xds:flex xds:h-80 xds:flex-row xds:items-center xds:justify-between">
          <h1
            class="xds:font-family-alternative xds:text-xl xds:font-bold xds:text-font"
            :class="ui('aside')?.title"
          >
            {{ $t('myHistory.title') }}
          </h1>
          <BaseIdModalClose
            class="xds:button-circle xds:button-ghost"
            modal-id="my-history-aside"
            :class="ui('aside')?.closeModal"
          >
            <CrossIcon class="xds:icon-lg" />
          </BaseIdModalClose>
        </div>
      </div>

      <div class="xds:layout-item">
        <div
          class="xds:flex xds:flex-col xds:gap-12 xds:border-b xds:border-neutral-25 xds:py-16 xds:text-font"
        >
          <h3 class="xds:text-md xds:font-bold">{{ $t('myHistory.subtitle') }}</h3>
          <p class="xds:text-md">
            {{ $t('myHistory.message.body') }}
          </p>
          <h3 class="xds:text-md xds:font-bold">
            {{ $t('myHistory.message.footer') }}
          </h3>
        </div>
      </div>

      <div class="xds:layout-item">
        <div class="xds:flex xds:items-center xds:justify-between xds:py-8">
          <div class="xds:flex xds:flex-col xds:gap-16 xds:text-font">
            <h2 class="xds:font-family-alternative xds:text-lg xds:font-bold">
              {{ $t('myHistory.switch.title') }}
            </h2>
            <p class="xds:text-md">
              {{
                x.isHistoryQueriesEnabled
                  ? $t('myHistory.switch.disable')
                  : $t('myHistory.switch.enable')
              }}
            </p>
          </div>
          <HistoryQueriesSwitch
            :class="{
              'x-switch--is-selected xds:selected xds:bg-lead!': x.isHistoryQueriesEnabled,
            }"
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
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'
import CustomMyHistory from './custom-my-history.vue'

onMounted(() => {
  const activeElement = document.activeElement as HTMLElement
  if (activeElement.classList.contains('x-search-input')) {
    activeElement.blur()
  }
})

const x = use$x()

const { ui } = useInstanceExtensions()
</script>
