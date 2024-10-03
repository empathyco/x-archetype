<template>
  <div v-if="!x.query.searchBox">
    <h1 v-if="!hasQueryPreviews" class="x-title1 max-desktop:x-title1-sm max-desktop:x-px-16">
      {{ $t('popularSearches.title') }}
    </h1>
    <CustomQueryPreview :queriesPreviewInfo="queriesPreviewToRender" />
  </div>
</template>

<script lang="ts">
  import { Suggestion } from '@empathyco/x-types';
  import { computed, ComputedRef, defineComponent, inject } from 'vue';
  import { QueryPreviewInfo } from '@empathyco/x-components/queries-preview';
  import { use$x, useState } from '@empathyco/x-components';
  import { popularSearchesXModule } from '@empathyco/x-components/popular-searches';
  import CustomQueryPreview from './custom-query-preview.vue';

  export default defineComponent({
    xModule: popularSearchesXModule.name,
    components: { CustomQueryPreview },
    props: {
      maxPopularSearchesToRender: {
        type: Number,
        default: 4
      }
    },
    setup(props) {
      const popularSearches: ComputedRef<Suggestion[]> = useState('popularSearches', [
        'popularSearches'
      ]).popularSearches;

      const injectedQueriesPreviewInfo = computed<QueryPreviewInfo[]>(() => {
        const injectedQueriesPreview = inject<QueryPreviewInfo[] | { value: QueryPreviewInfo[] }>(
          'queriesPreviewInfo',
          []
        );
        return 'value' in injectedQueriesPreview
          ? injectedQueriesPreview.value
          : injectedQueriesPreview;
      });

      const hasQueryPreviews = computed(() => injectedQueriesPreviewInfo.value.length !== 0);

      const queriesPreviewToRender = computed<QueryPreviewInfo[]>(() => {
        const queryPreviewInfo: QueryPreviewInfo[] = popularSearches.value.map(({ query }) => ({
          query
        }));
        return hasQueryPreviews.value
          ? injectedQueriesPreviewInfo.value
          : queryPreviewInfo.slice(0, props.maxPopularSearchesToRender);
      });

      return { hasQueryPreviews, queriesPreviewToRender, x: use$x() };
    }
  });
</script>
