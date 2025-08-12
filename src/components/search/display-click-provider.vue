<template>
  <slot />
</template>

<script setup lang="ts">
import type { DisplayWireMetadata, ResultFeature } from '@empathyco/x-components'
import type { TaggingRequest } from '@empathyco/x-types'
import { use$x } from '@empathyco/x-components'
import { computed, provide } from 'vue'

interface Props {
  resultFeature: ResultFeature
  ignoreResultClickEvent?: boolean
  queryTagging?: TaggingRequest
}

defineOptions({
  name: 'DisplayClickProvider',
})

const props = withDefaults(defineProps<Props>(), {
  ignoreResultClickEvent: false,
  queryTagging: undefined,
})

const $x = use$x()

const displayClickMetadata = computed<Partial<DisplayWireMetadata>>(() => ({
  displayOriginalQuery: $x.query.search,
  feature: props.resultFeature,
  queryTagging: props.queryTagging,
}))

provide('resultClickExtraEvents', ['UserClickedADisplayResult'])
provide('resultLinkMetadataPerEvent', {
  UserClickedADisplayResult: displayClickMetadata.value,
  ...(props.ignoreResultClickEvent && {
    UserClickedAResult: {
      ignoreInModules: ['tagging'],
    },
  }),
})
</script>
