<template>
  <SemanticQueries #default="{ queries, findSemanticQuery }">
    <section>
      <h1
        v-if="isAnyQueryLoadedInPreview(queries)"
        class="x-title x-title1-md x-my-64 x-text-center"
      >
        {{ $t('semanticQueries.title') }}
      </h1>
      <QueryPreviewList
        :queries="queries"
        #default="{ query, results, totalResults }"
        class="x-flex x-flex-col x-gap-64"
      >
        <CustomSlidingPanel>
          <template #header>
            <SemanticQuery
              :suggestion="findSemanticQuery(query)"
              class="x-button-neutral x-button-tight x-button max-desktop:x-px-16"
            >
              {{ query }}
              ({{ totalResults }})
              <ArrowRightIcon class="x-icon-lg" />
            </SemanticQuery>
          </template>
          <DisplayClickProvider resultFeature="semantics">
            <div class="x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
              <Result
                v-for="result in results"
                :key="result.id"
                :result="result"
                class="x-w-[calc(38vw-16px)] desktop:x-w-[216px]"
              />
            </div>
          </DisplayClickProvider>
        </CustomSlidingPanel>
      </QueryPreviewList>
    </section>
  </SemanticQueries>
</template>

<script lang="ts">
  import { ArrowRightIcon } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import { SemanticQueries, SemanticQuery } from '@empathyco/x-components/semantic-queries';
  import { QueryPreviewList, useQueriesPreview } from '@empathyco/x-components/queries-preview';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';
  import Result from '../results/result.vue';
  import DisplayClickProvider from './display-click-provider.vue';

  export default defineComponent({
    components: {
      ArrowRightIcon,
      CustomSlidingPanel,
      DisplayClickProvider,
      QueryPreviewList,
      Result,
      SemanticQueries,
      SemanticQuery
    },
    setup() {
      const { isAnyQueryLoadedInPreview } = useQueriesPreview();

      return {
        isAnyQueryLoadedInPreview
      };
    }
  });
</script>
