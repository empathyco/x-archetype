<template>
  <div v-if="totalResults" class="x-flex x-flex-auto x-items-center">
    <i18n-t class="x-text1 x-flex-auto" keypath="totalResults.message" tag="span">
      <template #totalResults>
        {{ totalResults }}
      </template>
      <template #query>
        <span class="x-title3">
          {{ spellcheckedQuery || query.search }}
        </span>
      </template>
    </i18n-t>

    <ColumnPicker v-if="totalResults" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { use$x } from '@empathyco/x-components';
  import ColumnPicker from '../column-picker.vue';

  export default defineComponent({
    components: {
      ColumnPicker
    },
    setup() {
      const $x = use$x();
      return {
        totalResults: $x.totalResults,
        spellcheckedQuery: $x.spellcheckedQuery,
        query: $x.query
      };
    }
  });
</script>
