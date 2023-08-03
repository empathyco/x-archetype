<template>
  <div class="x-flex x-flex-col x-gap-4">
    <h1 class="x-title4 x-title4-sm x-uppercase">
      {{ $t('popularSearches.title') }}
    </h1>
    <PopularSearches
      :animation="animation"
      :max-items-to-render="4"
      class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
    >
      <template #suggestion="{ suggestion }">
        <PopularSearch
          class="x-suggestion-lg x-suggestion desktop:x-suggestion-md"
          :suggestion="suggestion"
        >
          <TrendingIcon class="x-icon-lg desktop:x-icon-md" />
          <span>{{ suggestion.query }}</span>
        </PopularSearch>
      </template>
    </PopularSearches>
  </div>
</template>

<script lang="ts">
  import { AnimationProp, TrendingIcon } from '@empathyco/x-components';
  import { PopularSearches, PopularSearch } from '@empathyco/x-components/popular-searches';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      TrendingIcon,
      PopularSearches,
      PopularSearch
    },
    props: {
      animation: {
        type: AnimationProp,
        required: true
      }
    }
  });
</script>
<style lang="scss"></style>
