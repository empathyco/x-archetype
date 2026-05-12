<template>
  <div
    v-if="x.totalResults"
    class="xds:flex xds:w-full xds:flex-row xds:items-center xds:justify-between xds:gap-16"
  >
    <div class="xds:flex xds:flex-auto xds:items-center xds:justify-end">
      <i18n-t
        class="xds:flex-auto xds:text1"
        keypath="totalResults.message"
        tag="span"
        scope="global"
        :plural="x.totalResults"
      >
        <template #totalResults>
          {{ x.totalResults }}
        </template>
        <template #query>
          <span class="xds:title3">
            {{ x.spellcheckedQuery || query }}
          </span>
        </template>
      </i18n-t>

      <ColumnPicker v-if="columnPicker && x.totalResults" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { use$x, useGetter } from '@empathyco/x-components'
import { defineAsyncComponent } from 'vue'
import { xControlsState } from '../../x-components/xcontrols'

const ColumnPicker = defineAsyncComponent(() => import('../column-picker.vue').then(m => m.default))

const x = use$x()
const { query } = useGetter('search')
//const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
const columnPicker = xControlsState.gridColumns.columnPicker
//((controls?.gridColumns as Dictionary<unknown>).columnPicker as boolean) ?? xControlsState.gridColumns.columnPicker
</script>
