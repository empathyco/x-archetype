<template>
  <i18n-t
    v-if="showNoResultsMessage"
    class="x-no-results-message x-text1 x-message desktop:x-text1-lg desktop:x-mt-24"
    keypath="noResults.message"
    :class="{ 'x-flex-col': isTabletOrLess }"
    tag="p"
  >
    <template #query>
      <span class="x-w-auto x-font-bold">"{{ x.query.search }}"</span>
      <div class="x-basis-full"></div>
    </template>
  </i18n-t>
</template>

<script lang="ts">
import { use$x, useState } from '@empathyco/x-components'
import { computed, defineComponent } from 'vue'
import { useDevice } from '../../composables/use-device.composable'

export default defineComponent({
  setup() {
    const x = use$x()
    const { isTabletOrLess } = useDevice()
    const { relatedPrompts } = useState('relatedPrompts', ['relatedPrompts'])
    const showNoResultsMessage = computed(
      () => x.noResults && !relatedPrompts.value?.length && !x.semanticQueries.length,
    )

    return {
      isTabletOrLess,
      showNoResultsMessage,
      x,
    }
  },
})
</script>
