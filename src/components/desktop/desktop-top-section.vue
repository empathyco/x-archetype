<template>
  <div>
    <DesktopHeaderFullPredictive />

    <DesktopSubHeader
      data-test="sub-header"
      :hasSearched="hasSearched"
      :isFullPredictive="true"
      class="x-layout-item"
    />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { useHasSearched } from '../../composables/use-has-searched.composable';
  import DesktopHeaderFullPredictive from './desktop-header-full-predictive.vue';
  import DesktopSubHeader from './desktop-sub-header.vue';

  export default defineComponent({
    components: { DesktopSubHeader, DesktopHeaderFullPredictive },
    setup() {
      const { hasSearched } = useHasSearched();
      return { hasSearched };
    }
  });
</script>
