<template>
  <div class="x-flex x-flex-col x-items-center x-gap-16">
    <SearchModeSelector v-if="$x.query.searchBox" />
    <div
      v-if="$x.totalResults"
      class="x-flex x-w-full x-items-center"
      :class="{ 'x-justify-end': !isKeywordsSearchMode }"
    >
      <i18n
        v-show="isKeywordsSearchMode"
        class="x-text1 x-flex-auto"
        path="totalResults.message"
        tag="span"
      >
        <template #totalResults>
          {{ $x.totalResults }}
        </template>
        <template #query>
          <span class="x-title3">
            {{ $x.spellcheckedQuery || $x.query.search }}
          </span>
        </template>
      </i18n>

      <ColumnPicker v-if="$x.totalResults" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useState } from '@empathyco/x-components';
  import ColumnPicker from '../column-picker.vue';
  import SearchModeSelector from '../search-mode-selector.vue';

  export default defineComponent({
    name: 'MobileToolbar',
    components: {
      SearchModeSelector,
      ColumnPicker
    },
    setup() {
      const { params, status } = useState('search', ['params', 'status']);
      const isKeywordsSearchMode = ref(true);
      watch(status, () => {
        if (status.value === 'success') {
          isKeywordsSearchMode.value = params.value.mode !== 'semantics';
        }
      });

      return {
        isKeywordsSearchMode
      };
    }
  });
</script>
