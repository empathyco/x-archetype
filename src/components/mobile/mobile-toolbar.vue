<template>
  <div v-if="x.totalResults" class="x-flex x-flex-auto x-items-center">
    <i18n-t class="x-text1 x-flex-auto" keypath="totalResults.message" tag="span">
      <template #totalResults>
        {{ x.totalResults }}
      </template>
      <template #query>
        <span class="x-title3">
          {{ x.spellcheckedQuery || x.query.search }}
        </span>
      </template>
    </i18n-t>

    <ColumnPicker v-if="x.totalResults" />
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
      return {
        x: use$x()
      };
    }
  });
</script>
