<template>
  <div class="x-flex x-flex-col x-items-center x-gap-16">
    <SearchModeSelector />
    <div v-if="$x.totalResults" class="x-flex x-w-full x-items-center">
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ColumnPicker from '../column-picker.vue';
  import SearchModeSelector from '../search-mode-selector.vue';

  @Component({
    components: {
      SearchModeSelector,
      ColumnPicker
    }
  })
  export default class MobileToolbar extends Vue {}
</script>
