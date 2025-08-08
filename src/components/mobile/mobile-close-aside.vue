<template>
  <div class="x-mx-16 x-flex x-gap-16 x-border-t x-border-neutral-10 x-py-24">
    <ClearFilters
      v-slot="{ selectedFilters }"
      class="x-button-lead x-button-outlined x-flex-auto x-rounded-full x-py-12 x-uppercase"
      :always-visible="false"
    >
      {{ $t('selectedFilters.clear', selectedFilters.length, { count: selectedFilters.length }) }}
    </ClearFilters>
    <BaseIdModalClose
      class="x-button-lead x-flex-auto x-rounded-full x-py-12 x-uppercase"
      modal-id="aside-modal"
    >
      {{
        $t('facetsPanel.viewResults', x.totalResults, { count: x.totalResults } as TranslateOptions)
      }}
    </BaseIdModalClose>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line unused-imports/no-unused-imports
import type { TranslateOptions } from 'vue-i18n'
import { BaseIdModalClose, use$x } from '@empathyco/x-components'
import { ClearFilters } from '@empathyco/x-components/facets'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseIdModalClose, ClearFilters },
  setup() {
    return { x: use$x() }
  },
})
</script>
