<template>
  <AiOverview
    :collapse-text="$t('overview.collapseButton')"
    :expand-text="$t('overview.expandButton')"
    class="[--x-ai-overview-color:var(--xds-color-lead-25)] xds:mt-12 xds:mb-32"
  >
    <template #sliding-panel="{ results }">
      <CustomSlidingPanel>
        <div class="xds:flex xds:gap-16 xds:px-16 xds:pb-16">
          <Result
            v-for="result in results"
            :key="result.id"
            class="xds:w-[35vw] xds:rounded-md xds:bg-neutral-0 xds:p-3 xds:desktop:w-[216px]"
            :result="result"
          />
        </div>
      </CustomSlidingPanel>
    </template>
  </AiOverview>
</template>

<script setup lang="ts">
import { AiOverview } from '@empathyco/x-components/ai'
import CustomSlidingPanel from '../custom-sliding-panel.vue'
import Result from '../results/result.vue'
</script>
