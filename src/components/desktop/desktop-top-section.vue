<template>
  <div>
    <div>
      <DesktopHeaderFullPredictive v-if="fullPredictive" />
      <DesktopHeaderFloatingPredictive v-else />
    </div>

    <DesktopSubHeader
      :has-searched="hasSearched"
      :full-predictive="fullPredictive"
      class="x-layout-item"
    />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import HasSearchedMixin from '../has-searched.mixin';
  import DesktopHeaderFullPredictive from './desktop-header-full-predictive.vue';
  import DesktopSubHeader from './desktop-sub-header.vue';
  import DesktopHeaderFloatingPredictive from './desktop-header-floating-predictive.vue';

  export default defineComponent({
    components: { DesktopHeaderFloatingPredictive, DesktopSubHeader, DesktopHeaderFullPredictive },
    mixins: [HasSearchedMixin],
    setup() {
      const fullPredictive = true;

      return { fullPredictive };
    }
  });
</script>
