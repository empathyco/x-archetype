<template>
  <i18n-t
    v-if="x.noResults"
    class="x-no-results-message x-message x-text1 desktop:x-text1-lg desktop:x-mt-24"
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
import { use$x } from '@empathyco/x-components'
import { defineComponent } from 'vue'
import { useDevice } from '../../composables/use-device.composable'

export default defineComponent({
  setup() {
    const { isTabletOrLess } = useDevice()

    return {
      isTabletOrLess,
      x: use$x(),
    }
  },
})
</script>
