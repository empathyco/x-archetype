<template>
  <div
    v-if="x.recommendations.length > 0"
    class="xds:flex xds:flex-col xds:items-start xds:gap-16 xds:pb-32 xds:desktop:items-center xds:desktop:gap-24"
    data-wysiwyg="recommendations"
  >
    <h1 class="xds:title1 xds:title1-sm xds:text-neutral-90 xds:desktop:title1-md">
      {{ $t('recommendations.title') }}
    </h1>
    <Recommendations v-if="!x.totalResults">
      <template #layout="{ recommendations }">
        <DisplayClickProvider result-feature="topclicked_recommendations">
          <BaseGrid
            v-slot="{ item: result }"
            :animation="staggeredFadeAndSlide"
            :columns="columns"
            :items="recommendations"
            class="xds:gap-x-16 xds:gap-y-32"
          >
            <Result :result="result" data-test="recommendation-item" />
          </BaseGrid>
        </DisplayClickProvider>
      </template>
    </Recommendations>
  </div>
</template>

<script setup lang="ts">
import { BaseGrid, StaggeredFadeAndSlide, use$x } from '@empathyco/x-components'
import { Recommendations } from '@empathyco/x-components/recommendations'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import DisplayClickProvider from '../search/display-click-provider.vue'
import Result from './result.vue'

const { isMobile } = useDevice()
const staggeredFadeAndSlide = StaggeredFadeAndSlide as any
const columns = computed(() => (isMobile.value ? 2 : 4))
const x = use$x()
</script>
