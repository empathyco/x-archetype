<template>
  <i18n
    v-if="$x.noResults"
    class="x-no-results-message x-text1 x-message desktop:x-mt-24 desktop:x-text1-lg"
    path="noResults.message"
    :class="{ 'x-flex-col': isTabletOrLess }"
    tag="p"
  >
    <template #query>
      <span class="x-w-auto x-font-bold">"{{ $x.query.search }}"</span>
      <div class="x-basis-full"></div>
    </template>
  </i18n>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { useDevice } from '../../composables/use-device.composable';

  @Component
  export default class NoResultsMessage extends Vue {
    protected get isTabletOrLess(): boolean {
      return useDevice().isTabletOrLess.value;
    }
  }
</script>
