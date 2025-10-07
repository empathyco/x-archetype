<template>
  <div
    v-if="x.totalResults"
    class="x-flex x-w-full x-flex-row x-items-center x-justify-between x-gap-16"
  >
    <div class="x-flex x-flex-auto x-items-center x-justify-end">
      <i18n-t
        class="x-text1 x-flex-auto"
        keypath="totalResults.message"
        tag="span"
        scope="global"
        :plural="x.totalResults"
      >
        <template #totalResults>
          {{ x.totalResults }}
        </template>
        <template #query>
          <span class="x-title3">
            {{ x.spellcheckedQuery || query }}
          </span>
        </template>
      </i18n-t>

      <ColumnPicker v-if="x.totalResults" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { use$x, useGetter } from '@empathyco/x-components'
import ColumnPicker from '../column-picker.vue'

const x = use$x()
const { query } = useGetter('search')
</script>
