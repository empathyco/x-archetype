<template>
  <div
    v-if="recommendations.length > 0"
    class="x-flex x-flex-col x-items-start x-gap-16 x-pb-32 desktop:x-items-center desktop:x-gap-24"
    data-wysiwyg="recommendations"
  >
    <h1 class="x-title1 x-title1-sm x-text-neutral-90 desktop:x-title1-md">
      {{ $t('recommendations.title') }}
    </h1>
    <Recommendations v-if="!totalResults">
      <template #layout="{ recommendations }">
        <DisplayClickProvider resultFeature="topclicked_recommendations">
          <BaseGrid
            #default="{ item: result }"
            :animation="staggeredFadeAndSlide"
            :columns="columns"
            :items="recommendations"
            class="x-gap-x-16 x-gap-y-32"
          >
            <Result :result="result" data-test="recommendation-item" />
          </BaseGrid>
        </DisplayClickProvider>
      </template>
    </Recommendations>
  </div>
</template>

<script lang="ts">
  import { BaseGrid, StaggeredFadeAndSlide, useState } from '@empathyco/x-components';
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
      const { totalResults } = useState('search', ['totalResults']);
      const { recommendations } = useState('recommendations', ['recommendations']);

      return {
        staggeredFadeAndSlide: StaggeredFadeAndSlide,
        columns: computed(() => (isMobile.value ? 2 : 4)),
        recommendations,
        totalResults
      };
    }
  });
</script>
