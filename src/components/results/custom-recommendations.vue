<template>
  <div
    v-if="$x.recommendations.length > 0"
    class="x-flex x-flex-col x-items-start x-gap-24 x-pb-32 desktop:x-items-center"
  >
    <h1 class="x-title1 x-title1-sm desktop:x-title1-md">
      {{ $t('recommendations.title') }}
    </h1>
    <Recommendations v-if="!$x.totalResults">
      <template #layout="{ recommendations }">
        <DisplayClickProvider resultFeature="recommendations">
          <BaseGrid
            #default="{ item: result }"
            :animation="staggeredFadeAndSlide"
            :columns="columns"
            :items="recommendations"
            class="x-gap-y-32 x-gap-x-16"
          >
            <Result :result="result" data-test="recommendation-item" />
          </BaseGrid>
        </DisplayClickProvider>
      </template>
    </Recommendations>
  </div>
</template>

<script lang="ts">
  import { BaseGrid, StaggeredFadeAndSlide } from '@empathyco/x-components';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import { computed, defineComponent } from 'vue';
  import { useDevice } from '../../composables/use-device.composable';
  import DisplayClickProvider from '../search/display-click-provider.vue';
  import Result from './result.vue';

  export default defineComponent({
    components: {
      BaseGrid,
      DisplayClickProvider,
      Recommendations,
      Result
    },
    setup() {
      const { isMobile } = useDevice();
      return {
        staggeredFadeAndSlide: StaggeredFadeAndSlide,
        columns: computed(() => (isMobile.value ? 2 : 4))
      };
    }
  });
</script>
