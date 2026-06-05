<template>
  <NextQueryPreview
    v-slot="{ results, totalResults, suggestion }"
    class="xds:flex xds:flex-col xds:gap-4 xds:bg-neutral-10 xds:py-24 xds:desktop:px-24"
    :suggestion="nextQuery"
    :max-items-to-render="maxItemsToRender"
  >
    <span class="xds:text-md xds:max-desktop:px-16">{{
      t('nextQueryPreview.message', { query })
    }}</span>
    <CustomSlidingPanel>
      <template #header>
        <NextQuery
          :suggestion="nextQuery"
          class="xds:button xds:button-tight xds:button-lead xds:max-desktop:px-16"
        >
          {{ t('nextQueryPreview.query', { query: suggestion.query }) }}
          {{ t('nextQueryPreview.totalResults', { totalResults }) }}
          <ArrowRightIcon class="xds:icon-lg" />
        </NextQuery>
      </template>
      <ItemsList
        :items="results"
        class="xds:flex xds:gap-16 xds:pt-4 xds:max-desktop:px-16 xds:desktop:w-full"
        item-class="xds:flex-shrink-0"
      >
        <template #result="{ item: result }">
          <DisplayClickProvider result-feature="next_query_recommendations">
            <Result :result="result" class="xds:w-[calc(38vw-16px)] xds:desktop:max-w-66.25" />
          </DisplayClickProvider>
        </template>
      </ItemsList>
    </CustomSlidingPanel>
  </NextQueryPreview>
</template>

<script setup lang="ts">
import type { NextQuery as NextQueryModel } from '@empathyco/x-types'
import { ArrowRightIcon, ItemsList, useGetter } from '@empathyco/x-components'
import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDevice } from '../../../composables/use-device.composable'
import Result from '../../results/result.vue'
import CustomSlidingPanel from '../../search/custom-sliding-panel.vue'
import DisplayClickProvider from '../../search/display-click-provider.vue'

interface Props {
  nextQuery: NextQueryModel
}

defineProps<Props>()

const { isTabletOrLess } = useDevice()
const maxItemsToRender = computed(() => (isTabletOrLess.value ? undefined : 5))
const { query } = useGetter('nextQueries')
const { t } = useI18n()
</script>

<style>
.x-mobile .x-next-query-preview {
  margin-left: calc(-1 * var(--xds-margin-left));
}
</style>
