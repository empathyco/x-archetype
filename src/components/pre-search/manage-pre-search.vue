<template>
  <div v-if="!$x.query.searchBox">
    <h1 v-if="!hasQueryPreviews" class="x-title1 max-desktop:x-title1-sm max-desktop:x-px-16">
      {{ $t('popularSearches.title') }}
    </h1>
    <CustomQueryPreview
      :queriesPreviewInfo="
        hasQueryPreviews ? queriesPreviewInfo : getQueriesPreviewInfo($x.popularSearches)
      "
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject } from 'vue';
  import { QueryPreviewInfo } from '@empathyco/x-components/queries-preview';
  import { Suggestion } from '@empathyco/x-types';
  import CustomQueryPreview from './custom-query-preview.vue';

  export default defineComponent({
    components: {
      CustomQueryPreview
    },
    props: {
      maxPopularSearchesToRender: {
        type: Number,
        default: 4
      }
    },
    setup(props) {
      const injectedQueriesPreview = inject<{ value: QueryPreviewInfo[] }>('queriesPreviewInfo', {
        value: []
      });
      const queriesPreviewInfo = computed<QueryPreviewInfo[]>(() => injectedQueriesPreview.value);

      const hasQueryPreviews = computed<boolean>(() => queriesPreviewInfo.value.length !== 0);

      const getQueriesPreviewInfo = (suggestion: readonly Suggestion[]): QueryPreviewInfo[] => {
        const queryPreviewInfo: QueryPreviewInfo[] = suggestion.map(item => ({
          query: item.query
        }));
        return queryPreviewInfo.slice(0, props.maxPopularSearchesToRender);
      };

      return { hasQueryPreviews, queriesPreviewInfo, getQueriesPreviewInfo };
    }
  });
</script>
