<template>
  <div v-if="x.recommendations.length > 0" class="xds:flex xds:flex-col xds:gap-12">
    <h1
      class="xds:flex xds:h-32 xds:items-center xds:pt-16 xds:pl-24 xds:title4 xds:title4-sm xds:uppercase xds:desktop:pt-0 xds:desktop:pl-0"
    >
      {{ $t('recommendations.title') }}
    </h1>
    <SlidingPanel
      class="xds:sliding-panel-show-buttons-on-hover"
      :show-buttons="true"
      button-class="xds:button xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
      scroll-container-class="xds:desktop:sliding-panel-fade"
      :reset-on-content-change="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="xds:icon-lg" />
      </template>

      <Recommendations
        class="xds:flex xds:flex-row xds:gap-12 xds:pl-16 xds:desktop:pl-0"
        data-wysiwyg="recommendations"
      >
        <template #default="{ recommendation }">
          <DisplayClickProvider result-feature="topclicked_recommendations">
            <Result
              :result="recommendation"
              data-test="recommendation-item"
              :show-description="false"
              :show-add-to-cart="false"
              class="xds:w-50"
            />
          </DisplayClickProvider>
        </template>
      </Recommendations>

      <template #sliding-panel-right-button>
        <ChevronRightIcon class="xds:icon-lg" />
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
