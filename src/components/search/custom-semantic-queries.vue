<template>
  <SemanticQueries #default="{ queries }">
    <section>
      <QueryPreviewList :queries="queries" #default="{ query, results, totalResults }">
        <CustomSlidingPanel>
          <template #header>
            <BaseEventButton
              :events="getEvent(query)"
              class="x-button-neutral x-button-tight x-button max-desktop:x-px-16"
            >
              {{ query }}
              ({{ totalResults }})
              <ArrowRightIcon class="x-icon-lg" />
            </BaseEventButton>
          </template>
          <div class="x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
            <Result
              v-for="result in results"
              :key="result.id"
              :result="result"
              class="x-w-[calc(38vw-16px)] desktop:x-w-[216px]"
            />
          </div>
        </CustomSlidingPanel>
      </QueryPreviewList>
    </section>
  </SemanticQueries>
</template>

<script lang="ts">
  import { ArrowRightIcon, BaseEventButton, XEventsTypes } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import { SemanticQueries } from '@empathyco/x-components/semantic-queries';
  import { QueryPreviewList } from '@empathyco/x-components/queries-preview';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';
  import Result from '../results/result.vue';

  export default defineComponent({
    components: {
      BaseEventButton,
      ArrowRightIcon,
      CustomSlidingPanel,
      QueryPreviewList,
      Result,
      SemanticQueries
    },
    setup() {
      const getEvent = (query: string): Partial<XEventsTypes> => {
        return {
          UserAcceptedAQuery: query
        };
      };

      return {
        getEvent
      };
    }
  });
</script>
