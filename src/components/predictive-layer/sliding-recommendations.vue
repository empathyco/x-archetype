<template>
  <div v-if="$x.recommendations.length > 0" class="x-flex x-flex-col x-gap-12">
    <h1
      class="x-title4 x-title4-sm x-flex x-h-32 x-items-center x-pt-16 x-pl-24 x-uppercase desktop:x-pl-0 desktop:x-pt-0"
    >
      {{ $t('recommendations.title') }}
    </h1>
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :showButtons="true"
      buttonClass="x-button-lead x-button-circle x-button-ghost x-p-0"
      scrollContainerClass="desktop:x-sliding-panel-fade"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>

      <Recommendations class="x-flex x-flex-row x-gap-12 x-pl-16 desktop:x-pl-0">
        <template #default="{ recommendation }">
          <DisplayClickProvider resultFeature="recommendations">
            <Result
              :result="recommendation"
              data-test="recommendation-item"
              :showDescription="false"
              :showAddToCart="false"
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
<script lang="ts">
  import { SlidingPanel, ChevronLeftIcon, ChevronRightIcon } from '@empathyco/x-components';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import { defineComponent } from 'vue';
  import Result from '../results/result.vue';
  import DisplayClickProvider from '../search/display-click-provider.vue';

  export default defineComponent({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      DisplayClickProvider,
      Recommendations,
      Result,
      SlidingPanel
    }
  });
</script>
