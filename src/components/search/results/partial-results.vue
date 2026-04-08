<template>
  <PartialResultsList class="xds:mb-24 xds:gap-40 xds:desktop:gap-80">
    <template #default="{ partialResult }">
      <CustomSlidingPanel>
        <template #header>
          <PartialQueryButton
            :query="partialResult.query"
            class="xds:button xds:button-tight xds:button-lead xds:max-desktop:px-16"
          >
            {{ $t('partialResults.query', { query: partialResult.query }) }}
            {{ $t('partialResults.totalResults', { totalResults: partialResult.totalResults }) }}
            <ArrowRightIcon class="xds:icon-lg" />
          </PartialQueryButton>
        </template>
        <ItemsList
          :items="partialResult.results"
          class="xds:flex xds:gap-16 xds:pt-4 xds:max-desktop:px-16"
        >
          <template #result="{ item: result }">
            <Result
              :result="result"
              class="xds:w-[calc(38vw-16px)] xds:min-w-35.5 xds:desktop:w-224"
              :show-description="isTabletOrGreater"
              show-compact-prices
            />
          </template>
        </ItemsList>
      </CustomSlidingPanel>
    </template>
  </PartialResultsList>
</template>

<script setup lang="ts">
import { ArrowRightIcon, ItemsList } from '@empathyco/x-components'
import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search'
import { useDevice } from '../../../composables/use-device.composable'
import CustomSlidingPanel from '../../custom-sliding-panel.vue'
import Result from '../../results/result.vue'

const { isTabletOrGreater } = useDevice()
</script>
