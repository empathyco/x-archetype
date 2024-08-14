<template>
  <div v-if="$x.totalResults" class="x-flex x-flex-auto x-items-center">
    <i18n class="x-text1 x-flex-auto" path="totalResults.message" tag="span">
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
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ColumnPicker from '../column-picker.vue';

  export default defineComponent({
    name: 'MobileToolbar',
    components: {
      ColumnPicker
    }
  });
</script>
