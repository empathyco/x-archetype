<template>
  <div>
    <DesktopHeaderFullPredictive />

    <DesktopSubHeader :hasSearched="hasSearched" :isFullPredictive="true" class="x-layout-item" />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import HasSearchedMixin from '../has-searched.mixin.ts';
  import DesktopHeaderFullPredictive from './desktop-header-full-predictive.vue';
  import DesktopSubHeader from './desktop-sub-header.vue';

  export default defineComponent({
    components: { DesktopSubHeader, DesktopHeaderFullPredictive },
    mixins: [HasSearchedMixin]
  });
</script>
