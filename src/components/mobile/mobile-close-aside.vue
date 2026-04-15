<template>
  <div class="xds:mx-16 xds:flex xds:gap-16 xds:border-t xds:border-neutral-10 xds:py-24">
    <ClearFilters
      v-slot="{ selectedFilters }"
      class="xds:flex-auto xds:button-outlined xds:rounded-full xds:button-lead xds:py-12 xds:uppercase"
      :always-visible="false"
    >
      {{ $t('selectedFilters.clear', selectedFilters.length, { count: selectedFilters.length }) }}
    </ClearFilters>
    <BaseIdModalClose
      class="xds:flex-auto xds:rounded-full xds:button-lead xds:py-12 xds:uppercase"
      modal-id="aside-modal"
    >
      {{
        $t('facetsPanel.viewResults', x.totalResults, { count: x.totalResults } as TranslateOptions)
      }}
    </BaseIdModalClose>
  </div>
</template>

<script setup lang="ts">
import type { TranslateOptions } from 'vue-i18n'
import { BaseIdModalClose, use$x } from '@empathyco/x-components'
import { ClearFilters } from '@empathyco/x-components/facets'

const x = use$x()
</script>
