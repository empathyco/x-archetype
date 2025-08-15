<template>
  <div v-if="x.recommendations.length > 0" class="x-flex x-flex-col x-gap-12">
    <h1
      class="x-title4 x-title4-sm x-flex x-h-32 x-items-center x-pl-24 x-pt-16 x-uppercase desktop:x-pl-0 desktop:x-pt-0"
    >
      {{ $t('recommendations.title') }}
    </h1>
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :show-buttons="true"
      button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
      scroll-container-class="desktop:x-sliding-panel-fade"
      :reset-on-content-change="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>

      <Recommendations
        class="x-flex x-flex-row x-gap-12 x-pl-16 desktop:x-pl-0"
        data-wysiwyg="recommendations"
      >
        <template #default="{ recommendation }">
          <DisplayClickProvider result-feature="topclicked_recommendations">
            <Result
              :result="recommendation"
              data-test="recommendation-item"
              :show-description="false"
              :show-add-to-cart="false"
              class="x-w-[200px]"
            />
          </DisplayClickProvider>
        </template>
      </Recommendations>

      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon-lg" />
      </template>
    </SlidingPanel>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, SlidingPanel, use$x } from '@empathyco/x-components'
import { Recommendations } from '@empathyco/x-components/recommendations'
import Result from '../results/result.vue'
import DisplayClickProvider from '../search/display-click-provider.vue'

const x = use$x()
</script>
