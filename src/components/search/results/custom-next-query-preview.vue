<template>
  <NextQueryPreview
    v-slot="{ results, totalResults, suggestion }"
    class="x-flex x-flex-col x-gap-4 x-bg-neutral-10 x-py-24 desktop:x-px-24"
    :suggestion="nextQuery"
    :max-items-to-render="maxItemsToRender"
  >
    <i18n-t
      class="x-text1 x-text1-lg max-desktop:x-px-16"
      tag="span"
      keypath="nextQueryPreview.message"
      scope="global"
    >
      <template #query>
        <span class="x-title3">
          {{ query }}
        </span>
      </template>
    </i18n-t>
    <CustomSlidingPanel>
      <template #header>
        <NextQuery
          :suggestion="nextQuery"
          class="x-button x-button-lead x-button-tight max-desktop:x-px-16"
        >
          {{ $t('nextQueryPreview.query', { query: suggestion.query }) }}
          {{ $t('nextQueryPreview.totalResults', { totalResults }) }}
          <ArrowRightIcon class="x-icon-lg" />
        </NextQuery>
      </template>
      <ItemsList
        :items="results"
        class="x-flex x-gap-16 x-pt-4 max-desktop:x-px-16 desktop:x-w-full"
        item-class="x-flex-shrink-0"
      >
        <template #result="{ item: result }">
          <DisplayClickProvider result-feature="next_query_recommendations">
            <Result :result="result" class="x-w-[calc(38vw-16px)] desktop:x-max-w-[265px]" />
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
import { useDevice } from '../../../composables/use-device.composable'
import CustomSlidingPanel from '../../custom-sliding-panel.vue'
import Result from '../../results/result.vue'
import DisplayClickProvider from '../display-click-provider.vue'

interface Props {
  nextQuery: NextQueryModel
}

defineProps<Props>()

const { isTabletOrLess } = useDevice()
const maxItemsToRender = computed(() => (isTabletOrLess.value ? undefined : 5))
const queryGetter = useGetter('nextQueries', ['query'])

const query = queryGetter.query
</script>

<style lang="scss">
.x-mobile {
  .x-next-query-preview {
    margin-left: calc(-1 * var(--x-margin-left));
  }
}
</style>
