<template>
  <AiOverview class="x-mb-32 x-mt-12 [--x-ai-overview-color:theme(colors.lead.25)]">
    <template #sliding-panel="{ results }">
      <CustomSlidingPanel>
        <div class="x-flex x-gap-16 x-px-16 x-pb-16">
          <Result
            v-for="result in results"
            :key="result.id"
            class="x-w-[35vw] x-rounded-md x-bg-neutral-0 x-p-3 desktop:x-w-[216px]"
            :result="result"
          />
        </div>
      </CustomSlidingPanel>
    </template>
  </AiOverview>
</template>

<script setup lang="ts">
import { AiOverview } from '@empathyco/x-components/ai'
import CustomSlidingPanel from './custom-sliding-panel.vue'
import Result from './results/result.vue'
</script>

<style scoped></style>
